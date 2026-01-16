#!/usr/bin/env node

/**
 * Fireside Supabase to Convex Migration Script
 * 
 * Reads the JSON export from Supabase and imports it into Convex
 * 
 * Prerequisites:
 * 1. Run `npx convex dev` in another terminal to start the Convex dev server
 * 2. Make sure you've logged in with `npx convex login`
 * 
 * Usage: node scripts/migrate-to-convex.js
 */

const { ConvexHttpClient } = require("convex/browser");
const fs = require("fs");
const path = require("path");

// Load the Convex URL from the generated config
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

if (!convexUrl) {
  console.error("❌ NEXT_PUBLIC_CONVEX_URL not found in environment");
  console.error("   Make sure to run 'npx convex dev' first to generate the URL");
  console.error("   Then add NEXT_PUBLIC_CONVEX_URL to your .env.local file");
  process.exit(1);
}

const client = new ConvexHttpClient(convexUrl);

// Table mapping from Supabase names to Convex import mutation names
const TABLE_MIGRATION_MAP = {
  fireside_artists: { mutation: "migrations:importArtists", argName: "artists" },
  fireside_episodes: { mutation: "migrations:importEpisodes", argName: "episodes" },
  fireside_blog_posts: { mutation: "migrations:importBlogPosts", argName: "blogPosts" },
  fireside_social_links: { mutation: "migrations:importSocialLinks", argName: "socialLinks" },
  fireside_about_page: { mutation: "migrations:importAboutPage", argName: "aboutPage" },
  fireside_aaa_authors: { mutation: "migrations:importAaaAuthors", argName: "authors" },
  fireside_aaa_fun_facts: { mutation: "migrations:importAaaFunFacts", argName: "funFacts" },
  fireside_aaa_page_settings: { mutation: "migrations:importAaaPageSettings", argName: "pageSettings" },
  fireside_aaa_quotes: { mutation: "migrations:importAaaQuotes", argName: "quotes" },
};

// Import order (respects foreign key dependencies)
const IMPORT_ORDER = [
  "fireside_artists",
  "fireside_episodes",
  "fireside_blog_posts",
  "fireside_social_links",
  "fireside_about_page",
  "fireside_aaa_authors",     // Must be before fun_facts
  "fireside_aaa_fun_facts",   // Depends on authors
  "fireside_aaa_page_settings",
  "fireside_aaa_quotes",
];

async function migrateData() {
  console.log("🔥 Fireside: Supabase to Convex Migration");
  console.log("==========================================\n");
  console.log(`📡 Convex URL: ${convexUrl}\n`);

  // Load the JSON data
  const jsonPath = path.join(__dirname, "..", "docs", "fireside", "01-fireside-export.json");

  if (!fs.existsSync(jsonPath)) {
    console.error(`❌ JSON file not found: ${jsonPath}`);
    process.exit(1);
  }

  const rawData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

  // Create a map for easy lookup
  const dataMap = {};
  for (const tableData of rawData) {
    dataMap[tableData.table_name] = tableData.data;
  }

  console.log(`📂 Found ${Object.keys(dataMap).length} tables in export\n`);

  // Ask for confirmation
  console.log("⚠️  This will import data into your Convex database.");
  console.log("   Make sure 'npx convex dev' is running.\n");

  let successCount = 0;
  let errorCount = 0;
  const results = {};

  for (const tableName of IMPORT_ORDER) {
    const data = dataMap[tableName];
    const config = TABLE_MIGRATION_MAP[tableName];

    if (!data || data.length === 0) {
      console.log(`⏭️  Skipping ${tableName} - no data`);
      continue;
    }

    if (!config) {
      console.log(`⏭️  Skipping ${tableName} - no migration config`);
      continue;
    }

    console.log(`📥 Importing ${tableName} (${data.length} rows)...`);

    try {
      const args = { [config.argName]: data };
      const result = await client.mutation(config.mutation, args);

      if (result.errors && result.errors.length > 0) {
        console.log(`   ⚠️  Completed with ${result.errors.length} errors`);
        for (const err of result.errors) {
          console.log(`      ❌ ${err.supabaseId}: ${err.error}`);
        }
      }

      const importedCount = result.results ? result.results.length : (Array.isArray(result) ? result.length : 1);
      console.log(`   ✅ Success: ${importedCount} rows imported`);
      results[tableName] = result;
      successCount++;
    } catch (err) {
      console.error(`   ❌ Error: ${err.message}`);
      errorCount++;
    }
  }

  console.log("\n==========================================");
  console.log("📊 Migration Summary");
  console.log("==========================================");
  console.log(`✅ Successful tables: ${successCount}`);
  console.log(`❌ Failed tables: ${errorCount}`);
  console.log(`📦 Total tables: ${IMPORT_ORDER.length}`);

  if (errorCount === 0) {
    console.log("\n🎉 Migration completed successfully!");
    console.log("\nNext steps:");
    console.log("1. Update your app to use Convex instead of Supabase");
    console.log("2. Create Convex query functions to read the data");
    console.log("3. Test the app to ensure everything works");
  } else {
    console.log("\n⚠️  Some imports failed. Check the errors above.");
    process.exit(1);
  }
}

// Run the migration
migrateData().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
