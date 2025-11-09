-- =============================================================================
-- Fireside Tribe - Initial seed content (episodes, artists, blog posts)
-- Run this in Supabase SQL editor or via `supabase db query`
-- Every insert uses ON CONFLICT to keep the script idempotent.
-- =============================================================================

-- Episodes --------------------------------------------------------------------
INSERT INTO public.fireside_episodes (
  slug, title, description, published_at, cover_image_url,
  spotify_url, youtube_url, featured
) VALUES
  ('rise-of-artists', 'The Rise of Cameroonian Artists Globally',
    'Discover how Cameroonian artists are making waves on the international music scene.',
    '2025-03-15T08:00:00Z',
    'https://fireside_assets.s3.amazonaws.com/images/sepo.jpg',
    'https://open.spotify.com/episode/4MLpsIqPq6fdhAsDfN5lP5?si=a32a205a9ed64ee3',
    'https://youtu.be/mw4xLb59QO0',
    true),
  ('afrobeats-scene', 'Exploring Cameroons Afrobeats Scene',
    'Dive into the rich sounds and rhythms of Cameroon''s growing Afrobeats movement.',
    '2025-04-20T08:00:00Z',
    'https://fireside_assets.s3.amazonaws.com/images/jail_time_records_cover.png',
    'https://open.spotify.com/episode/4qxmv4JdlfIwJM0nUFOhCJ?si=121bab7159174929',
    'https://youtu.be/kD-wI-jZQBY',
    true),
  ('douala-spotlight', 'Spotlight on Douala''s Music Scene',
    'Exploring the vibrant underground music culture in Cameroon''s largest city.',
    '2025-05-05T08:00:00Z',
    'https://fireside_assets.s3.amazonaws.com/images/ber_boys.jpg',
    'https://open.spotify.com/episode/4MLpsIqPq6fdhAsDfN5lP5?si=a32a205a9ed64ee3',
    'https://youtu.be/mw4xLb59QO0',
    false)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  published_at = EXCLUDED.published_at,
  cover_image_url = EXCLUDED.cover_image_url,
  spotify_url = EXCLUDED.spotify_url,
  youtube_url = EXCLUDED.youtube_url,
  featured = EXCLUDED.featured;

-- Artists ---------------------------------------------------------------------
INSERT INTO public.fireside_artists (
  slug, name, short_description, profile_image_url, profile_image_alt, order_rank, featured
) VALUES
  ('tayc', 'Tayc', 'French-Cameroonian R&B sensation taking Europe by storm',
    'https://fireside_assets.s3.amazonaws.com/images/tayc-2.jpeg', 'Portrait of Tayc in performance', 1, true),
  ('james-bks', 'James BKS', 'Producer blending African sounds with hip-hop',
    'https://s.rfi.fr/media/display/f7d06e02-06bd-11ed-9bb2-005056a90284/w:980/p:16x9/000_9C79L4.jpg', 'James BKS studio portrait', 2, true),
  ('kang', 'Kang', 'Innovative artist pushing Afrobeats with electronic influences',
    'https://fireside_assets.s3.amazonaws.com/images/kang_Gang.png', 'Kang promotional artwork', 3, true),
  ('haira-berylie', 'Haira Berylie', 'Singer-songwriter with vibrant Afro-pop sound',
    'https://fireside_assets.s3.amazonaws.com/images/haira_1.jpg', 'Haira Berylie press photo', 4, false),
  ('ronis-goliath', 'Ronis Goliath', 'DJ bringing Cameroonian rhythms to global dance floors',
    'https://africanmusiclibrary.org/_next/image?url=https%3A%2F%2Fd31btwpnsku5px.cloudfront.net%2F9e53c72a1e06.jpg&w=3840&q=75', 'Ronis Goliath DJ booth photo', 5, false)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  short_description = EXCLUDED.short_description,
  profile_image_url = EXCLUDED.profile_image_url,
  profile_image_alt = EXCLUDED.profile_image_alt,
  order_rank = EXCLUDED.order_rank,
  featured = EXCLUDED.featured;

-- Blog Posts ------------------------------------------------------------------
INSERT INTO public.fireside_blog_posts (
  slug, title, excerpt, author, published_at, featured_image_url, featured_image_alt, featured
) VALUES
  ('tayc-redefining-french-rb', 'How Tayc is Redefining French R&B',
    'Explore how Tayc''s Cameroonian heritage shapes his unique sound and appeal.',
    'The Fireside Tribe',
    '2025-04-15T08:00:00Z',
    'https://resources.tidal.com/images/f084332e/e75d/4448/9314/034a7950668a/750x750.jpg',
    'Tayc portrait photo',
    true),
  ('james-bks-legacy', 'The Legacy of Manu Dibango Through James BKS',
    'How James BKS is carrying forward his father''s musical legacy while creating his own path.',
    'The Fireside Tribe',
    '2025-03-28T08:00:00Z',
    'https://i.scdn.co/image/ab6761610000e5ebefcb83d283a993edd482360d',
    'James BKS promotional photo',
    true),
  ('cameroonian-artists-global', '5 Cameroonian Artists Making Waves Internationally',
    'From Kang to Ronis Goliath, these artists are putting Cameroon on the global music map.',
    'The Fireside Tribe',
    '2025-03-10T08:00:00Z',
    'https://fireside_assets.s3.amazonaws.com/images/kang_Gang.png',
    'Kang promotional artwork',
    false)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  author = EXCLUDED.author,
  published_at = EXCLUDED.published_at,
  featured_image_url = EXCLUDED.featured_image_url,
  featured_image_alt = EXCLUDED.featured_image_alt,
  featured = EXCLUDED.featured;

-- About Page -----------------------------------------------------------------
UPDATE public.fireside_about_page
SET
  hero_title = 'The Fireside Tribe',
  hero_tagline = 'Celebrating and promoting Cameroonian music and Afrobeats through podcasts, articles, and artist features.',
  mission_paragraph_1 = 'The Fireside Tribe was created with a singular mission: to showcase the incredible talent and rich musical heritage of Cameroon to the world.',
  mission_paragraph_2 = 'Through our podcast, blog, and artist features, we aim to create a platform that celebrates Cameroonian artists both at home and in the diaspora.',
  story_paragraph_1 = 'The Fireside Tribe began as a passion project by a group of Cameroonian music enthusiasts who felt that the country''s vibrant music scene deserved more international recognition.',
  story_paragraph_2 = 'What started as casual conversations about our favorite artists evolved into a podcast, and eventually into this comprehensive platform dedicated to all things Cameroonian music.',
  story_paragraph_3 = 'Today, we''re proud to be a growing community of music lovers, artists, producers, and fans united by our appreciation for Cameroon''s unique sounds and rhythms.',
  podcast_card_description = 'Our flagship podcast features interviews with artists, producers, and industry insiders, deep dives into Cameroonian music history, and discussions about the latest trends.',
  blog_card_description = 'Our blog offers thoughtful articles, artist profiles, and analysis of Cameroonian music''s influence on the global scene.',
  artist_card_description = 'We regularly feature both established and emerging Cameroonian artists, helping to amplify their voices and music.',
  cta_description = 'Whether you''re a longtime fan of Cameroonian music or just discovering it, we invite you to join our community and explore the rich sounds and stories we have to share.'
WHERE id = '00000000-0000-0000-0000-000000000001';

-- AAA Quotes -----------------------------------------------------------------
INSERT INTO public.fireside_aaa_quotes (id, quote, author_name, order_rank, active) VALUES
  ('10000000-0000-0000-0000-000000000001', 'Music is the universal language that connects us all, but Cameroonian music speaks with a unique accent that the world needs to hear.', 'Atem A.', 1, true),
  ('10000000-0000-0000-0000-000000000002', 'Our podcast is a campfire where stories and sounds from Cameroon can warm the hearts of listeners worldwide.', 'Atem N.', 2, true),
  ('10000000-0000-0000-0000-000000000003', 'We don''t just talk about music, we translate culture and build bridges between Cameroon and the global stage.', 'Anyang', 3, true),
  ('10000000-0000-0000-0000-000000000004', 'The rhythm of Cameroon flows through our veins and into every episode we create.', 'Atem A.', 4, true),
  ('10000000-0000-0000-0000-000000000005', 'Our mission is to amplify voices that have been whispering brilliance for too long.', 'Anyang', 5, true)
ON CONFLICT (id) DO UPDATE SET
  quote = EXCLUDED.quote,
  author_name = EXCLUDED.author_name,
  order_rank = EXCLUDED.order_rank,
  active = EXCLUDED.active;

-- AAA Authors ----------------------------------------------------------------
INSERT INTO public.fireside_aaa_authors (
  id, slug, name, full_name, role,
  color_bg, color_text, color_border, color_shadow,
  bio, profile_image_url, profile_image_alt, order_rank, featured
) VALUES
  (
    '20000000-0000-0000-0000-000000000001',
    'atem-keng',
    'Atem Keng',
    'Atem Keng',
    'Music Enthusiast & Digital Innovator',
    'bg-red-500',
    'text-red-500',
    'border-red-500',
    'shadow-[8px_8px_0px_0px_rgba(239,68,68,1)]',
    '<p class="mb-4">Atem Keng is the music technology enthusiast of The Fireside Tribe. With a passion for music discovery and curation, he''s developed innovative ways to share and promote Cameroonian music through playlists and digital platforms.</p><p class="mb-4">Known for his insights on performance energy and the role of algorithms in music discovery, Atem K. brings a tech-savvy perspective to the podcast. He''s particularly interested in how emerging artists can leverage digital platforms to gain exposure.</p><p>"Music discovery is influenced by personal connections and social media. Algorithms play a significant role in curating music preferences. Performance energy is crucial for an artist''s success."</p>',
    'images/atemKeng_about.png',
    'Portrait of Atem Keng',
    1,
    true
  ),
  (
    '20000000-0000-0000-0000-000000000002',
    'atem-eunice',
    'Atem Eunice',
    'Atem Eunice',
    'Music Curator & Cultural Storyteller',
    'bg-blue-600',
    'text-blue-600',
    'border-blue-600',
    'shadow-[8px_8px_0px_0px_rgba(37,99,235,1)]',
    '<p class="mb-4">Atem Eunice brings a cultural depth to The Fireside Tribe, exploring the connections between identity, food, music, and heritage. She delves into how these elements shape our understanding of ourselves and our communities.</p><p class="mb-4">Her discussions on the meaning of names and the role of food in cultural exchange highlight her interest in the personal stories that connect us. She''s passionate about how music empowers African identity and raises self-esteem.</p><p>"Food serves as a powerful connection to cultural identity. Exploring one''s cultural roots through names is important. Music plays a crucial role in raising self-esteem among Africans."</p>',
    'images/atem_e_about.png',
    'Portrait of Atem Eunice',
    2,
    true
  ),
  (
    '20000000-0000-0000-0000-000000000003',
    'anyang',
    'Anyang',
    'Anyang',
    'Social Impact Advocate & Industry Analyst',
    'bg-purple-600',
    'text-purple-600',
    'border-purple-600',
    'shadow-[8px_8px_0px_0px_rgba(147,51,234,1)]',
    '<p class="mb-4">Anyang brings a unique perspective to The Fireside Tribe, focusing on the social impact of music and its role in mental health and rehabilitation. His discussions on projects like Jail Time Records highlight music''s power beyond entertainment.</p><p class="mb-4">With keen insights on the music industry''s challenges, Anyang analyzes the investment landscape, marketing strategies, and growth opportunities for Cameroonian artists. He emphasizes the importance of environment and public engagement in nurturing talent.</p><p>"You learn a lot from filling interviews. Music can be a form of therapy for prisoners. Creativity thrives even in challenging environments."</p>',
    'images/anyang_afro_zoom.png',
    'Portrait of Anyang',
    3,
    true
  )
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  color_bg = EXCLUDED.color_bg,
  color_text = EXCLUDED.color_text,
  color_border = EXCLUDED.color_border,
  color_shadow = EXCLUDED.color_shadow,
  bio = EXCLUDED.bio,
  profile_image_url = EXCLUDED.profile_image_url,
  profile_image_alt = EXCLUDED.profile_image_alt,
  order_rank = EXCLUDED.order_rank,
  featured = EXCLUDED.featured;

-- AAA Fun Facts --------------------------------------------------------------
INSERT INTO public.fireside_aaa_fun_facts (id, author_id, fact, order_rank) VALUES
  ('30000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'Owns a collection of over 500 vinyl records from Cameroonian artists', 1),
  ('30000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000001', 'Played drums in a makossa fusion band for 5 years', 2),
  ('30000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000001', 'Can identify the region of Cameroon a song comes from within seconds', 3),
  ('30000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000002', 'Conducted over 200 interviews with musicians across Africa', 1),
  ('30000000-0000-0000-0000-000000000005', '20000000-0000-0000-0000-000000000002', 'Produces music documentaries in her spare time', 2),
  ('30000000-0000-0000-0000-000000000006', '20000000-0000-0000-0000-000000000002', 'Once traveled 500 miles to record a disappearing traditional music style', 3),
  ('30000000-0000-0000-0000-000000000007', '20000000-0000-0000-0000-000000000003', 'Has organized music festivals on three continents', 1),
  ('30000000-0000-0000-0000-000000000008', '20000000-0000-0000-0000-000000000003', 'Speaks five languages fluently', 2),
  ('30000000-0000-0000-0000-000000000009', '20000000-0000-0000-0000-000000000003', 'Helped negotiate international distribution deals for several Cameroonian artists', 3)
ON CONFLICT (id) DO UPDATE SET
  fact = EXCLUDED.fact,
  order_rank = EXCLUDED.order_rank;
