# Fireside Tribe Documentation

Welcome to the Fireside Tribe documentation. This directory contains all technical documentation, implementation plans, and roadmaps for the project.

## 📚 Documentation Index

### 🗺️ Strategic Planning
- **[Product Roadmap](PRODUCT_ROADMAP.md)** - Comprehensive roadmap of all planned features and initiatives
- **[CMS Roadmap](custom-cms/roadmap.md)** - Technical roadmap for custom CMS implementation

### 🏗️ Architecture & Implementation
- **[Implementation Architecture](implementation-architecture.md)** - Overall system architecture and design decisions
- **[Content Management Analysis](content-management-analysis.md)** - Analysis of content management needs and solutions
- **[Backend Architecture](custom-cms/backend-architecture.md)** - Backend system design and data layer architecture

### 🚀 Setup & Configuration
- **[Supabase Setup](SETUP_SUPABASE.md)** - Guide for setting up Supabase database and services
- **[Asset Storage](asset-storage.md)** - Asset and media storage configuration
- **[Branding Assets](branding-assets.md)** - Brand guidelines and asset specifications

### 📋 Feature Implementation Plans
- **[Social Links Implementation](social-links-implementation-plan.md)** - Plan for social media links feature
- **[About AAA (Artists, Albums, Archives) CMS](cms-plan-about-aaa.md)** - Content management plan for AAA pages
- **[PostHog Events](custom-cms/posthog-events.md)** - Analytics event tracking documentation

### 🗄️ Database & Migrations
- **[Database Schema](custom-cms/fireside_schema.sql)** - Complete database schema definition
- **[Migrations](custom-cms/migrations/)** - Database migration scripts and history
  - [Migration README](custom-cms/migrations/README.md)
  - [Add Blog Published Flag](custom-cms/migrations/002_add_blog_published_flag.sql)
  - [Add AAA Publishing Fields](custom-cms/migrations/003_add_aaa_publishing_fields.sql)
  - [Create Social Links](custom-cms/migrations/004_create_fireside_social_links.sql)
- **[Initial Content Seeds](custom-cms/seeds/initial_content.sql)** - Seed data for initial content

### 📊 Content & Show Materials
- **[Show Content](show_content/)** - Content archives from shows and episodes
- **[Images](image/)** - Documentation images and diagrams

### 🔄 Version 2 Planning
- **[V2 Requirements](v2_request/implementation/requirements.md)** - Requirements for version 2
- **[V2 Implementation Plan](v2_request/implementation/IMPLEMENTATION_PLAN.md)** - Detailed implementation plan
- **[V2 Progress](v2_request/implementation/PROGRESS.md)** - Progress tracking for V2 features
- **[Session Summary](v2_request/implementation/SESSION_SUMMARY.md)** - Development session summaries

---

## 🎯 Quick Start Guide

### For New Developers
1. Start with [Implementation Architecture](implementation-architecture.md) to understand the system
2. Review [Supabase Setup](SETUP_SUPABASE.md) to configure your development environment
3. Check [CMS Roadmap](custom-cms/roadmap.md) to see current implementation status
4. Review [Database Schema](custom-cms/fireside_schema.sql) to understand data models

### For Content Editors
1. Review [Content Management Analysis](content-management-analysis.md) to understand content strategy
2. Check [About AAA CMS Plan](cms-plan-about-aaa.md) for AAA content guidelines
3. See [Branding Assets](branding-assets.md) for brand guidelines

### For Product Planning
1. Review [Product Roadmap](PRODUCT_ROADMAP.md) for upcoming features and priorities
2. Check [CMS Roadmap](custom-cms/roadmap.md) for technical implementation timeline
3. Review [V2 Requirements](v2_request/implementation/requirements.md) for next version planning

---

## 🔧 Project Structure

```
docs/
├── README.md                          # This file - documentation index
├── PRODUCT_ROADMAP.md                 # Product feature roadmap
├── SETUP_SUPABASE.md                  # Supabase configuration guide
├── implementation-architecture.md     # System architecture
├── content-management-analysis.md     # Content strategy analysis
├── asset-storage.md                   # Media storage setup
├── branding-assets.md                 # Brand guidelines
├── cms-plan-about-aaa.md             # AAA content planning
├── social-links-implementation-plan.md # Social links feature plan
│
├── custom-cms/                        # CMS-specific documentation
│   ├── roadmap.md                     # CMS technical roadmap
│   ├── backend-architecture.md        # Backend design
│   ├── posthog-events.md             # Analytics events
│   ├── fireside_schema.sql           # Database schema
│   ├── migrations/                    # Database migrations
│   │   ├── README.md
│   │   ├── 002_add_blog_published_flag.sql
│   │   ├── 003_add_aaa_publishing_fields.sql
│   │   └── 004_create_fireside_social_links.sql
│   └── seeds/                         # Seed data
│       └── initial_content.sql
│
├── show_content/                      # Show archives
├── image/                             # Documentation images
│
└── v2_request/                        # Version 2 planning
    └── implementation/
        ├── requirements.md
        ├── IMPLEMENTATION_PLAN.md
        ├── PROGRESS.md
        └── SESSION_SUMMARY.md
```

---

## 📖 Documentation Standards

### When Creating New Documentation
- Use clear, descriptive file names in lowercase with hyphens
- Include a brief description at the top of each document
- Use proper markdown formatting with headers, lists, and code blocks
- Link to related documentation where appropriate
- Keep technical documentation in `custom-cms/` directory
- Keep product/feature planning in root `docs/` directory

### When Updating Documentation
- Update the "Last Updated" date at the bottom of the document
- Add a note in relevant sections about what changed
- Update this README index if adding new files
- Link new documentation from related existing docs

---

## 🤝 Contributing

When adding new features or making significant changes:
1. Update relevant documentation before or during implementation
2. Create implementation plans for complex features
3. Document database changes with migration scripts
4. Update roadmaps to reflect completed work
5. Add entries to this index for new documentation files

---

**Last Updated**: November 16, 2024
**Maintained by**: Fireside Tribe Team
