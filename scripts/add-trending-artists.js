#!/usr/bin/env node
/**
 * Script to add trending artists to Convex database
 * Run with: node scripts/add-trending-artists.js
 */

const { ConvexHttpClient } = require("convex/browser");
const fs = require("fs");
const path = require("path");

// Load environment variables from .env.local
function loadEnv() {
  const envPath = path.join(__dirname, "..", ".env.local");
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, "utf8");
    content.split("\n").forEach((line) => {
      const [key, ...valueParts] = line.split("=");
      if (key && valueParts.length > 0) {
        process.env[key.trim()] = valueParts.join("=").trim();
      }
    });
  }
}

loadEnv();
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

if (!convexUrl) {
  console.error("NEXT_PUBLIC_CONVEX_URL is not set in .env.local");
  process.exit(1);
}

const client = new ConvexHttpClient(convexUrl);

const artists = [
  {
    name: "Lebianca",
    slug: "lebianca",
    shortDescription: "Rising Cameroonian star known for soulful Afrobeats and R&B.",
    profileImageUrl: "https://i.ytimg.com/vi/wBRe8D-PKOs/maxresdefault.jpg",
    profileImageAlt: "Lebianca",
    genre: "Afrobeats",
    countryCode: "CM",
    featured: true,
    orderRank: 1,
  },
  {
    name: "Kocee",
    slug: "kocee",
    shortDescription: "Cameroonian Afrobeats artist with infectious rhythms.",
    profileImageUrl: "https://i.ytimg.com/vi/wBRe8D-PKOs/maxresdefault.jpg",
    profileImageAlt: "Kocee",
    genre: "Afrobeats",
    countryCode: "CM",
    featured: true,
    orderRank: 2,
  },
  {
    name: "Jovi",
    slug: "jovi",
    shortDescription: "Le Monstre - Pioneering Cameroonian rapper and producer.",
    profileImageUrl: "/images/jovi3.png",
    profileImageAlt: "Jovi - Le Monstre",
    genre: "Hip-Hop",
    countryCode: "CM",
    featured: true,
    orderRank: 3,
  },
  {
    name: "DJ Bizi Brown",
    slug: "dj-bizi-brown",
    shortDescription: "Legendary Cameroonian DJ and music curator.",
    profileImageUrl: "/placeholder.svg",
    profileImageAlt: "DJ Bizi Brown",
    genre: "DJ",
    countryCode: "CM",
    featured: true,
    orderRank: 4,
  },
  {
    name: "Yame",
    slug: "yame",
    shortDescription: "Cameroonian artist blending traditional and modern sounds.",
    profileImageUrl: "https://i.ytimg.com/vi/lukT_WB5IB0/maxresdefault.jpg",
    profileImageAlt: "Yame",
    genre: "Afrobeats",
    countryCode: "CM",
    featured: true,
    orderRank: 5,
  },
];

async function addArtists() {
  console.log("Adding trending artists to Convex...\n");

  for (const artist of artists) {
    try {
      // Import the api dynamically
      const { api } = require("../convex/_generated/api");

      const result = await client.mutation(api.mutations.createArtist, artist);
      console.log(`✓ Added: ${artist.name}`);
    } catch (error) {
      console.error(`✗ Failed to add ${artist.name}:`, error.message);
    }
  }

  console.log("\nDone!");
}

addArtists();
