# CMS Implementation Plan: About Page & A³ (AAA) Page

## Executive Summary

This document outlines the comprehensive plan to implement CMS functionality for both the About page and the A³ (Triple-A Team) page in the Fireside Tribe admin dashboard. The goal is to provide a user-friendly admin interface to edit all content dynamically without code changes.

---

## 1. About Page CMS Implementation

### 1.1 Current State Analysis

**Page Location**: `/app/about/page.tsx`

**Current Content Structure**:
- Hero section with title and tagline
- Mission section with image and text
- Story section with multiple paragraphs
- "What We Do" section with 3 cards (Podcast, Blog, Artist Spotlights)
- CTA section

**Hardcoded Content**:
- All text content is hardcoded in JSX
- Single image reference: `images/tripleateam1.png`
- Section layouts and structure are fixed

### 1.2 Database Schema Design

#### Table: `fireside_about_page`

```sql
CREATE TABLE fireside_about_page (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Hero Section
  hero_title VARCHAR(255) NOT NULL DEFAULT 'The Fireside Tribe',
  hero_tagline TEXT NOT NULL,

  -- Mission Section
  mission_title VARCHAR(255) NOT NULL DEFAULT 'Our Mission',
  mission_image_url TEXT,
  mission_image_alt VARCHAR(255),
  mission_paragraph_1 TEXT NOT NULL,
  mission_paragraph_2 TEXT NOT NULL,

  -- Story Section
  story_title VARCHAR(255) NOT NULL DEFAULT 'Our Story',
  story_paragraph_1 TEXT NOT NULL,
  story_paragraph_2 TEXT NOT NULL,
  story_paragraph_3 TEXT NOT NULL,

  -- What We Do Section
  what_we_do_title VARCHAR(255) NOT NULL DEFAULT 'What We Do',

  -- Podcast Card
  podcast_card_title VARCHAR(255) NOT NULL DEFAULT 'The Podcast',
  podcast_card_description TEXT NOT NULL,

  -- Blog Card
  blog_card_title VARCHAR(255) NOT NULL DEFAULT 'The Blog',
  blog_card_description TEXT NOT NULL,

  -- Artist Card
  artist_card_title VARCHAR(255) NOT NULL DEFAULT 'Artist Spotlights',
  artist_card_description TEXT NOT NULL,

  -- CTA Section
  cta_title VARCHAR(255) NOT NULL DEFAULT 'Join The Tribe',
  cta_description TEXT NOT NULL,
  cta_button_text VARCHAR(100) NOT NULL DEFAULT 'LISTEN TO OUR PODCAST',

  -- Metadata
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_by VARCHAR(255),

  -- Ensure single row
  CONSTRAINT single_row CHECK (id = '00000000-0000-0000-0000-000000000001')
);

-- Insert default values
INSERT INTO fireside_about_page (
  id,
  hero_tagline,
  mission_paragraph_1,
  mission_paragraph_2,
  story_paragraph_1,
  story_paragraph_2,
  story_paragraph_3,
  podcast_card_description,
  blog_card_description,
  artist_card_description,
  cta_description
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Celebrating and promoting Cameroonian music and Afrobeats through podcasts, articles, and artist features.',
  'The Fireside Tribe was created with a singular mission: to showcase the incredible talent and rich musical heritage of Cameroon to the world.',
  'Through our podcast, blog, and artist features, we aim to create a platform that celebrates Cameroonian artists both at home and in the diaspora, highlighting their contributions to the global music scene.',
  'The Fireside Tribe began as a passion project by a group of Cameroonian music enthusiasts who felt that the country''s vibrant music scene deserved more international recognition.',
  'What started as casual conversations about our favorite artists evolved into a podcast, and eventually into this comprehensive platform dedicated to all things Cameroonian music.',
  'Today, we''re proud to be a growing community of music lovers, artists, producers, and fans united by our appreciation for Cameroon''s unique sounds and rhythms.',
  'Our flagship podcast features interviews with artists, producers, and industry insiders, deep dives into Cameroonian music history, and discussions about the latest trends.',
  'Our blog offers thoughtful articles, artist profiles, and analysis of Cameroonian music''s influence on the global scene.',
  'We regularly feature both established and emerging Cameroonian artists, helping to amplify their voices and music.',
  'Whether you''re a longtime fan of Cameroonian music or just discovering it, we invite you to join our community and explore the rich sounds and stories we have to share.'
);
```

### 1.3 Admin Implementation Plan

#### 1.3.1 Server Actions

**File**: `lib/actions/about-page.ts`

```typescript
"use server"

import { revalidatePath } from "next/cache"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export interface AboutPageFormData {
  hero_title: string
  hero_tagline: string
  mission_title: string
  mission_image_url: string
  mission_image_alt: string
  mission_paragraph_1: string
  mission_paragraph_2: string
  story_title: string
  story_paragraph_1: string
  story_paragraph_2: string
  story_paragraph_3: string
  what_we_do_title: string
  podcast_card_title: string
  podcast_card_description: string
  blog_card_title: string
  blog_card_description: string
  artist_card_title: string
  artist_card_description: string
  cta_title: string
  cta_description: string
  cta_button_text: string
}

export async function getAboutPageContent() {
  const supabase = getSupabaseServerClient()

  const { data, error } = await supabase
    .from("fireside_about_page")
    .select("*")
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true, data }
}

export async function updateAboutPage(formData: AboutPageFormData) {
  const supabase = getSupabaseServerClient()

  const { data, error } = await supabase
    .from("fireside_about_page")
    .update({
      ...formData,
      updated_at: new Date().toISOString(),
    })
    .eq("id", "00000000-0000-0000-0000-000000000001")
    .select()
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath("/about")
  return { success: true, data }
}
```

#### 1.3.2 Admin Page

**File**: `app/admin/(protected)/about/page.tsx`

```typescript
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getAboutPageContent } from "@/lib/actions/about-page"
import { AboutPageForm } from "@/components/admin/AboutPageForm"

export default async function AdminAboutPage() {
  const result = await getAboutPageContent()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black">About Page Settings</h1>
          <p className="mt-2 text-slate-300">
            Manage the content displayed on the About page
          </p>
        </div>
        <Link href="/about" target="_blank">
          <Button variant="outline" className="border-slate-700 bg-slate-800 text-white hover:bg-slate-700">
            Preview Page
          </Button>
        </Link>
      </div>

      {result.success ? (
        <AboutPageForm initialData={result.data} />
      ) : (
        <div className="text-red-400">Error loading about page content</div>
      )}
    </div>
  )
}
```

#### 1.3.3 Form Component

**File**: `components/admin/AboutPageForm.tsx`

Key features:
- Organized into collapsible sections (Hero, Mission, Story, What We Do, CTA)
- Image upload field for mission section image
- Rich text areas for longer content
- Real-time save with loading states
- Preview mode to see changes before publishing

---

## 2. A³ (AAA) Page CMS Implementation

### 2.1 Current State Analysis

**Page Location**: `/app/AAA/page.tsx`

**Current Content Structure**:
- Hero section with animated title
- Quote carousel (5 rotating quotes)
- Three author profiles with:
  - Personal info (name, role, bio)
  - Profile image
  - Fun facts (3 per author)
  - Color scheme (red/blue/purple)
- "Power of Three" section with role descriptions

**Hardcoded Content**:
- All quotes hardcoded in array
- All author data hardcoded in objects
- Images: `atemKeng_about.png`, `atem_e_about.png`, `anyang_afro_zoom.png`

### 2.2 Database Schema Design

#### Table: `fireside_aaa_quotes`

```sql
CREATE TABLE fireside_aaa_quotes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quote TEXT NOT NULL,
  author_name VARCHAR(100) NOT NULL,
  order_rank INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_aaa_quotes_order ON fireside_aaa_quotes(order_rank);

-- Insert default quotes
INSERT INTO fireside_aaa_quotes (quote, author_name, order_rank) VALUES
('Music is the universal language that connects us all, but Cameroonian music speaks with a unique accent that the world needs to hear.', 'Atem A.', 1),
('Our podcast is a campfire where stories and sounds from Cameroon can warm the hearts of listeners worldwide.', 'Atem N.', 2),
('We don''t just talk about music, we translate culture and build bridges between Cameroon and the global stage.', 'Anyang', 3),
('The rhythm of Cameroon flows through our veins and into every episode we create.', 'Atem A.', 4),
('Our mission is to amplify voices that have been whispering brilliance for too long.', 'Anyang', 5);
```

#### Table: `fireside_aaa_authors`

```sql
CREATE TABLE fireside_aaa_authors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(100) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  full_name VARCHAR(150) NOT NULL,
  role TEXT NOT NULL,

  -- Visual Theme
  color_bg VARCHAR(50) NOT NULL, -- Tailwind class like 'bg-red-500'
  color_text VARCHAR(50) NOT NULL,
  color_border VARCHAR(50) NOT NULL,
  color_shadow VARCHAR(100) NOT NULL,

  -- Content
  bio TEXT NOT NULL,
  profile_image_url TEXT,
  profile_image_alt VARCHAR(255),

  -- Ordering
  order_rank INTEGER NOT NULL DEFAULT 0,
  featured BOOLEAN DEFAULT TRUE,

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_aaa_authors_order ON fireside_aaa_authors(order_rank);
CREATE INDEX idx_aaa_authors_featured ON fireside_aaa_authors(featured);

-- Insert default authors
INSERT INTO fireside_aaa_authors (
  slug, name, full_name, role,
  color_bg, color_text, color_border, color_shadow,
  bio, order_rank
) VALUES
(
  'atem-keng',
  'Atem Keng',
  'Atem Keng',
  'Music Enthusiast & Digital Innovator',
  'bg-red-500',
  'text-red-500',
  'border-red-500',
  'shadow-[8px_8px_0px_0px_rgba(239,68,68,1)]',
  '<p class="mb-4">Atem Keng is the music technology enthusiast of The Fireside Tribe. With a passion for music discovery and curation, he''s developed innovative ways to share and promote Cameroonian music through playlists and digital platforms.</p><p class="mb-4">Known for his insights on performance energy and the role of algorithms in music discovery, Atem K. brings a tech-savvy perspective to the podcast. He''s particularly interested in how emerging artists can leverage digital platforms to gain exposure.</p><p>"Music discovery is influenced by personal connections and social media. Algorithms play a significant role in curating music preferences. Performance energy is crucial for an artist''s success."</p>',
  1
),
(
  'atem-eunice',
  'Atem Eunice',
  'Atem Eunice',
  'Music Curator & Cultural Storyteller',
  'bg-blue-600',
  'text-blue-600',
  'border-blue-600',
  'shadow-[8px_8px_0px_0px_rgba(37,99,235,1)]',
  '<p class="mb-4">Atem Eunice brings a cultural depth to The Fireside Tribe, exploring the connections between identity, food, music, and heritage. She delves into how these elements shape our understanding of ourselves and our communities.</p><p class="mb-4">Her discussions on the meaning of names and the role of food in cultural exchange highlight her interest in the personal stories that connect us. She''s passionate about how music empowers African identity and raises self-esteem.</p><p>"Food serves as a powerful connection to cultural identity. Exploring one''s cultural roots through names is important. Music plays a crucial role in raising self-esteem among Africans."</p>',
  2
),
(
  'anyang',
  'Anyang',
  'Anyang',
  'Social Impact Advocate & Industry Analyst',
  'bg-purple-600',
  'text-purple-600',
  'border-purple-600',
  'shadow-[8px_8px_0px_0px_rgba(147,51,234,1)]',
  '<p class="mb-4">Anyang brings a unique perspective to The Fireside Tribe, focusing on the social impact of music and its role in mental health and rehabilitation. His discussions on projects like Jail Time Records highlight music''s power beyond entertainment.</p><p class="mb-4">With keen insights on the music industry''s challenges, Anyang analyzes the investment landscape, marketing strategies, and growth opportunities for Cameroonian artists. He emphasizes the importance of environment and public engagement in nurturing talent.</p><p>"You learn a lot from filling interviews. Music can be a form of therapy for prisoners. Creativity thrives even in challenging environments."</p>',
  3
);
```

#### Table: `fireside_aaa_fun_facts`

```sql
CREATE TABLE fireside_aaa_fun_facts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id UUID NOT NULL REFERENCES fireside_aaa_authors(id) ON DELETE CASCADE,
  fact TEXT NOT NULL,
  order_rank INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_aaa_fun_facts_author ON fireside_aaa_fun_facts(author_id);
CREATE INDEX idx_aaa_fun_facts_order ON fireside_aaa_fun_facts(order_rank);

-- Insert fun facts (requires author IDs from previous insert)
-- This would be done after getting the author IDs
```

#### Table: `fireside_aaa_page_settings`

```sql
CREATE TABLE fireside_aaa_page_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Hero Section
  hero_subtitle TEXT NOT NULL DEFAULT 'THE VOICES BEHIND THE TRIBE',
  hero_description TEXT NOT NULL DEFAULT 'Three voices, one mission: to amplify Cameroonian music and culture through The Fireside Tribe podcast',

  -- Power Section
  power_section_title VARCHAR(255) NOT NULL DEFAULT 'THE POWER OF A³',
  power_section_description TEXT NOT NULL,

  -- Role Cards
  curator_title VARCHAR(100) NOT NULL DEFAULT 'THE CURATOR',
  curator_description TEXT NOT NULL,

  storyteller_title VARCHAR(100) NOT NULL DEFAULT 'THE STORYTELLER',
  storyteller_description TEXT NOT NULL,

  connector_title VARCHAR(100) NOT NULL DEFAULT 'THE CONNECTOR',
  connector_description TEXT NOT NULL,

  -- CTA
  cta_button_text VARCHAR(100) NOT NULL DEFAULT 'HEAR THEM IN ACTION',

  -- Metadata
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Ensure single row
  CONSTRAINT single_row CHECK (id = '00000000-0000-0000-0000-000000000002')
);

-- Insert default values
INSERT INTO fireside_aaa_page_settings (
  id,
  power_section_description,
  curator_description,
  storyteller_description,
  connector_description
) VALUES (
  '00000000-0000-0000-0000-000000000002',
  'When Atem, Atem, and Anyang come together, something magical happens. Their unique perspectives, skills, and passions combine to create a podcast that''s more than the sum of its parts. Like the perfect musical trio, each brings their distinct voice while harmonizing to create something greater than any could achieve alone.',
  'Atem A. selects the music and artists that form the backbone of each episode',
  'Atem N. crafts the narratives and conversations that bring the music to life',
  'Anyang bridges cultures and opens doors for Cameroonian music globally'
);
```

### 2.3 Admin Implementation Plan

#### 2.3.1 Server Actions

**File**: `lib/actions/aaa-page.ts`

Functions needed:
- `getAAAPageSettings()`
- `updateAAAPageSettings(data)`
- `getAllAAAQuotes()`
- `createAAAQuote(data)`
- `updateAAAQuote(id, data)`
- `deleteAAAQuote(id)`
- `getAllAAAAuthors()`
- `getAAAAuthorById(id)`
- `createAAAAuthor(data)`
- `updateAAAAuthor(id, data)`
- `deleteAAAAuthor(id)`
- `getAuthorFunFacts(authorId)`
- `updateAuthorFunFacts(authorId, facts[])`

#### 2.3.2 Admin Navigation Structure

```
/admin/aaa
  ├── /settings          (Hero, Power section, CTA)
  ├── /quotes           (Manage rotating quotes)
  ├── /authors          (List all authors)
  │   ├── /new         (Create new author)
  │   └── /[id]        (Edit author + fun facts)
```

#### 2.3.3 Admin Pages

##### Page 1: Settings Page
**File**: `app/admin/(protected)/aaa/settings/page.tsx`

Edit hero section, power section, and CTA settings.

##### Page 2: Quotes Management
**File**: `app/admin/(protected)/aaa/quotes/page.tsx`

- List all quotes with drag-and-drop reordering
- Add/Edit/Delete quotes
- Toggle active status
- Preview how quotes appear in carousel

##### Page 3: Authors List
**File**: `app/admin/(protected)/aaa/authors/page.tsx`

- Table of all authors with profile images
- Edit/Delete actions
- Drag-and-drop reordering
- "Create Author" button

##### Page 4: Author Form
**File**: `app/admin/(protected)/aaa/authors/[id]/page.tsx`

Sections:
1. **Basic Info**
   - Name, Full Name, Role
   - Slug (auto-generated, editable)

2. **Visual Theme**
   - Color picker for background, text, border
   - Preview of how colors look

3. **Profile Image**
   - ImageUploadField component
   - Image preview

4. **Bio**
   - Rich text editor (or textarea with HTML support)
   - Preview mode

5. **Fun Facts**
   - Dynamic list with add/remove
   - Reorderable list

6. **Ordering**
   - Order rank number
   - Featured toggle

---

## 3. Implementation Steps

### Phase 1: Database Setup (Week 1)

#### Step 1.1: Create Database Tables
- [ ] Create `fireside_about_page` table
- [ ] Create `fireside_aaa_quotes` table
- [ ] Create `fireside_aaa_authors` table
- [ ] Create `fireside_aaa_fun_facts` table
- [ ] Create `fireside_aaa_page_settings` table
- [ ] Insert default/seed data
- [ ] Test all tables and relationships

#### Step 1.2: Set Up Row Level Security (RLS)
```sql
-- About Page RLS
ALTER TABLE fireside_about_page ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON fireside_about_page FOR SELECT USING (true);
CREATE POLICY "Admin write access" ON fireside_about_page FOR ALL USING (auth.role() = 'service_role');

-- AAA Tables RLS (similar pattern for all tables)
ALTER TABLE fireside_aaa_quotes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON fireside_aaa_quotes FOR SELECT USING (active = true);
CREATE POLICY "Admin write access" ON fireside_aaa_quotes FOR ALL USING (auth.role() = 'service_role');

-- Repeat for other AAA tables
```

### Phase 2: Server Actions (Week 1-2)

#### Step 2.1: About Page Actions
- [ ] Create `lib/actions/about-page.ts`
- [ ] Implement `getAboutPageContent()`
- [ ] Implement `updateAboutPage()`
- [ ] Test with Supabase client

#### Step 2.2: AAA Page Actions
- [ ] Create `lib/actions/aaa-page.ts`
- [ ] Implement settings actions
- [ ] Implement quotes CRUD actions
- [ ] Implement authors CRUD actions
- [ ] Implement fun facts actions
- [ ] Add proper error handling
- [ ] Add cache revalidation

### Phase 3: Frontend Updates (Week 2)

#### Step 3.1: Update About Page
- [ ] Update `/app/about/page.tsx` to fetch from database
- [ ] Replace hardcoded content with database values
- [ ] Add loading states
- [ ] Test with real data

#### Step 3.2: Update AAA Page
- [ ] Update `/app/AAA/page.tsx` to fetch from database
- [ ] Replace hardcoded quotes array with database fetch
- [ ] Replace hardcoded authors with database fetch
- [ ] Replace hardcoded settings with database fetch
- [ ] Maintain animations and interactions
- [ ] Test all features

### Phase 4: Admin Forms (Week 2-3)

#### Step 4.1: About Page Admin
- [ ] Create `app/admin/(protected)/about/page.tsx`
- [ ] Create `components/admin/AboutPageForm.tsx`
- [ ] Add form sections (Hero, Mission, Story, What We Do, CTA)
- [ ] Integrate ImageUploadField for mission image
- [ ] Add save/cancel actions
- [ ] Add success/error notifications
- [ ] Test form submission

#### Step 4.2: AAA Settings Admin
- [ ] Create `app/admin/(protected)/aaa/settings/page.tsx`
- [ ] Create `components/admin/AAASettingsForm.tsx`
- [ ] Add all settings fields
- [ ] Test form submission

#### Step 4.3: AAA Quotes Admin
- [ ] Create `app/admin/(protected)/aaa/quotes/page.tsx`
- [ ] Create `components/admin/AAAQuotesList.tsx`
- [ ] Create `components/admin/AAAQuoteForm.tsx`
- [ ] Add drag-and-drop reordering (use @dnd-kit/sortable)
- [ ] Add inline editing
- [ ] Test CRUD operations

#### Step 4.4: AAA Authors Admin
- [ ] Create `app/admin/(protected)/aaa/authors/page.tsx`
- [ ] Create `app/admin/(protected)/aaa/authors/new/page.tsx`
- [ ] Create `app/admin/(protected)/aaa/authors/[id]/page.tsx`
- [ ] Create `components/admin/AAAAuthorForm.tsx`
- [ ] Add all form sections
- [ ] Add fun facts dynamic list
- [ ] Add color theme preview
- [ ] Test CRUD operations

### Phase 5: Admin Navigation (Week 3)

#### Step 5.1: Update Admin Menu
- [ ] Add "About Page" link to admin navigation
- [ ] Add "A³ Page" section with sub-menu:
  - Settings
  - Quotes
  - Authors
- [ ] Update `app/admin/(protected)/layout.tsx` or navigation component

### Phase 6: Testing & Polish (Week 3-4)

#### Step 6.1: Functional Testing
- [ ] Test About page content updates reflect on frontend
- [ ] Test AAA page content updates reflect on frontend
- [ ] Test image uploads for all pages
- [ ] Test quotes carousel with new quotes
- [ ] Test author profiles with fun facts
- [ ] Test form validation
- [ ] Test error states

#### Step 6.2: UI/UX Polish
- [ ] Add loading skeletons
- [ ] Add success toasts
- [ ] Add confirmation modals for deletions
- [ ] Improve form layouts
- [ ] Add help text and tooltips
- [ ] Test responsive design

#### Step 6.3: Performance
- [ ] Optimize database queries
- [ ] Add proper indexing
- [ ] Test with large datasets
- [ ] Optimize image loading

---

## 4. Technical Considerations

### 4.1 Rich Text Editing

For bio fields and longer content, consider:

**Option A: Simple Textarea with HTML**
- Pros: Simple, no dependencies
- Cons: Manual HTML editing required

**Option B: Markdown Editor**
- Pros: Easier to write, clean storage
- Cons: Need markdown parser on frontend

**Option C: WYSIWYG Editor (like TipTap or Lexical)**
- Pros: User-friendly, visual editing
- Cons: Adds bundle size, complexity

**Recommendation**: Start with Option A (HTML textarea), can upgrade to Option C later if needed.

### 4.2 Color Theme Management

For AAA authors, colors are currently Tailwind classes. Two approaches:

**Option A: Store Tailwind Classes**
- Store strings like `bg-red-500`
- Pros: Simple, matches current code
- Cons: Limited to predefined colors

**Option B: Store Hex Colors**
- Store hex values like `#ef4444`
- Convert to Tailwind or inline styles
- Pros: More flexible color choices
- Cons: More complex rendering logic

**Recommendation**: Option A for consistency with current design system.

### 4.3 Image Upload Organization

Follow existing pattern:
- About page images → `about/` folder
- AAA page images → `aaa/` folder
- Use Supabase Storage
- Return full URLs to database

### 4.4 Caching Strategy

```typescript
// Revalidate pages after updates
revalidatePath("/about")
revalidatePath("/AAA")

// Consider adding on-demand revalidation
// Or set revalidate time in page components
export const revalidate = 3600 // 1 hour
```

### 4.5 Data Migration

When deploying to production:

1. Create tables in production Supabase
2. Run seed SQL to populate with current content
3. Deploy updated frontend code
4. Test thoroughly before directing traffic

---

## 5. Optional Enhancements

### 5.1 Version History
- Track changes to About page content
- Show history of edits
- Ability to revert to previous versions

### 5.2 Preview Mode
- Preview changes before publishing
- Draft/Published states
- Scheduled publishing

### 5.3 Multi-language Support
- Add language field to tables
- Allow content in multiple languages
- Language switcher in admin

### 5.4 SEO Fields
- Add meta title, description fields
- OG image fields
- Structured data

### 5.5 Analytics Integration
- Track views on About/AAA pages
- A/B test different content
- Heat mapping

---

## 6. Success Criteria

### Must Have (MVP)
- ✅ Hide About page from public navigation
- ✅ All About page content editable in admin
- ✅ All AAA page content editable in admin
- ✅ Image uploads working for all pages
- ✅ Changes reflect on frontend immediately
- ✅ Forms have proper validation
- ✅ No code changes needed to update content

### Nice to Have
- ✅ Drag-and-drop reordering for quotes and authors
- ✅ Color theme preview for authors
- ✅ Rich text editor for bios
- ✅ Fun facts dynamic list management

### Future Enhancements
- ⏳ Version history
- ⏳ Preview mode
- ⏳ Multi-language support
- ⏳ SEO optimization fields

---

## 7. Timeline Estimate

| Phase | Duration | Tasks |
|-------|----------|-------|
| Phase 1: Database Setup | 2-3 days | Create tables, seed data, RLS policies |
| Phase 2: Server Actions | 3-4 days | Implement all CRUD operations |
| Phase 3: Frontend Updates | 2-3 days | Connect pages to database |
| Phase 4: Admin Forms | 5-7 days | Build all admin interfaces |
| Phase 5: Navigation | 1 day | Update admin menu |
| Phase 6: Testing & Polish | 3-4 days | QA, bug fixes, polish |
| **Total** | **3-4 weeks** | Full implementation |

---

## 8. Dependencies

### NPM Packages
- `@supabase/supabase-js` (already installed)
- `framer-motion` (already installed for AAA page)
- Optional: `@dnd-kit/core` and `@dnd-kit/sortable` for drag-and-drop
- Optional: `@tiptap/react` or similar for rich text editing

### Environment Variables
- `NEXT_PUBLIC_SUPABASE_URL` (already configured)
- `SUPABASE_SERVICE_ROLE_KEY` (already configured)
- `NEXT_PUBLIC_ASSET_BUCKET` (already configured)

---

## 9. Risks & Mitigation

### Risk 1: Data Loss During Migration
**Mitigation**:
- Backup current content before database migration
- Test migration in staging environment first
- Keep hardcoded content as fallback initially

### Risk 2: Complex HTML in Bio Fields
**Mitigation**:
- Sanitize HTML input
- Use allowlist of safe HTML tags
- Consider markdown as safer alternative

### Risk 3: Image Upload Failures
**Mitigation**:
- Robust error handling in upload component
- Fallback to default images
- Clear error messages to users

### Risk 4: Performance with Large Datasets
**Mitigation**:
- Proper database indexing
- Pagination for lists
- Caching strategies

---

## 10. Next Steps

1. **Review Plan**: Share with team, get feedback
2. **Create Tasks**: Break down into tickets/issues
3. **Set Up Database**: Start with Phase 1
4. **Iterative Development**: Build and test incrementally
5. **User Testing**: Get feedback from content editors
6. **Documentation**: Create user guide for admin CMS

---

## Appendix A: Database Relationships

```
fireside_about_page (1 row singleton)

fireside_aaa_page_settings (1 row singleton)

fireside_aaa_quotes (many rows)

fireside_aaa_authors (many rows)
  └── fireside_aaa_fun_facts (many rows per author)
```

## Appendix B: Admin URL Structure

```
/admin/about                    → About Page Editor
/admin/aaa/settings             → AAA Page Settings
/admin/aaa/quotes               → Quotes Management
/admin/aaa/authors              → Authors List
/admin/aaa/authors/new          → Create New Author
/admin/aaa/authors/[id]         → Edit Author
```

## Appendix C: File Structure

```
lib/actions/
  ├── about-page.ts
  └── aaa-page.ts

components/admin/
  ├── AboutPageForm.tsx
  ├── AAASettingsForm.tsx
  ├── AAAQuotesList.tsx
  ├── AAAQuoteForm.tsx
  ├── AAAAuthorForm.tsx
  └── AAAAuthorsList.tsx

app/admin/(protected)/
  ├── about/
  │   └── page.tsx
  └── aaa/
      ├── settings/
      │   └── page.tsx
      ├── quotes/
      │   └── page.tsx
      └── authors/
          ├── page.tsx
          ├── new/
          │   └── page.tsx
          └── [id]/
              └── page.tsx
```

---

**End of Implementation Plan**

This plan provides a comprehensive roadmap for implementing CMS functionality for both the About page and A³ page. The modular approach allows for iterative development and testing at each phase.
