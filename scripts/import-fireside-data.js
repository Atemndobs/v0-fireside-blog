#!/usr/bin/env node

/**
 * Fireside Data Import Script
 * Imports data from the JSON export file to the connected Supabase database
 * 
 * Usage: node scripts/import-fireside-data.js
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing required environment variables:');
  console.error('   - NEXT_PUBLIC_SUPABASE_URL');
  console.error('   - SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_SERVICE_KEY)');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Import order matters due to foreign key constraints
const TABLE_ORDER = [
  'fireside_artists',
  'fireside_episodes', 
  'fireside_blog_posts',
  'fireside_social_links',
  'fireside_about_page',
  'fireside_aaa_authors',
  'fireside_aaa_fun_facts',
  'fireside_aaa_page_settings',
  'fireside_aaa_quotes'
];

async function importData() {
  console.log('🔥 Fireside Data Import Script');
  console.log('==============================\n');
  console.log(`📡 Connecting to: ${SUPABASE_URL}\n`);

  // Load the JSON data
  const jsonPath = path.join(__dirname, '..', 'docs', 'fireside', '01-fireside-export.json');
  
  if (!fs.existsSync(jsonPath)) {
    console.error(`❌ JSON file not found: ${jsonPath}`);
    process.exit(1);
  }

  const rawData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  
  // Create a map for easy lookup
  const dataMap = {};
  for (const tableData of rawData) {
    dataMap[tableData.table_name] = tableData.data;
  }

  console.log(`📂 Found ${Object.keys(dataMap).length} tables to import\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const tableName of TABLE_ORDER) {
    const data = dataMap[tableName];
    
    if (!data || data.length === 0) {
      console.log(`⏭️  Skipping ${tableName} - no data`);
      continue;
    }

    console.log(`📥 Importing ${tableName} (${data.length} rows)...`);

    try {
      // Use upsert to handle conflicts with existing data
      const { data: result, error } = await supabase
        .from(tableName)
        .upsert(data, { 
          onConflict: 'id',
          ignoreDuplicates: false 
        })
        .select();

      if (error) {
        console.error(`   ❌ Error: ${error.message}`);
        
        // Try inserting one by one to identify problematic rows
        console.log(`   🔄 Retrying row-by-row...`);
        let rowSuccess = 0;
        let rowError = 0;
        
        for (const row of data) {
          const { error: rowErr } = await supabase
            .from(tableName)
            .upsert(row, { onConflict: 'id' });
          
          if (rowErr) {
            console.error(`      ❌ Row ${row.id}: ${rowErr.message}`);
            rowError++;
          } else {
            rowSuccess++;
          }
        }
        
        console.log(`   📊 Row-by-row result: ${rowSuccess} success, ${rowError} failed`);
        
        if (rowError > 0) {
          errorCount++;
        } else {
          successCount++;
        }
      } else {
        console.log(`   ✅ Success: ${result?.length || data.length} rows imported`);
        successCount++;
      }
    } catch (err) {
      console.error(`   ❌ Exception: ${err.message}`);
      errorCount++;
    }
  }

  console.log('\n==============================');
  console.log('📊 Import Summary');
  console.log('==============================');
  console.log(`✅ Successful tables: ${successCount}`);
  console.log(`❌ Failed tables: ${errorCount}`);
  console.log(`📦 Total tables: ${TABLE_ORDER.length}`);
  
  if (errorCount === 0) {
    console.log('\n🎉 All data imported successfully!');
  } else {
    console.log('\n⚠️  Some imports failed. Check the errors above.');
    process.exit(1);
  }
}

importData().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
