-- Adds a published toggle to fireside_blog_posts to support hiding posts from the public site
ALTER TABLE public.fireside_blog_posts
  ADD COLUMN IF NOT EXISTS published boolean NOT NULL DEFAULT true;

COMMENT ON COLUMN public.fireside_blog_posts.published IS 'Controls if a post is visible on the public site';
