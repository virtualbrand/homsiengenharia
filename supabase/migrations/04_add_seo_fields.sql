-- Add SEO fields to blog_posts table
ALTER TABLE blog_posts
ADD COLUMN IF NOT EXISTS meta_title VARCHAR(60),
ADD COLUMN IF NOT EXISTS meta_description VARCHAR(160),
ADD COLUMN IF NOT EXISTS meta_keywords TEXT,
ADD COLUMN IF NOT EXISTS og_image TEXT;

-- Add comments for documentation
COMMENT ON COLUMN blog_posts.meta_title IS 'SEO meta title (50-60 characters)';
COMMENT ON COLUMN blog_posts.meta_description IS 'SEO meta description (150-160 characters)';
COMMENT ON COLUMN blog_posts.meta_keywords IS 'SEO keywords, comma-separated';
COMMENT ON COLUMN blog_posts.og_image IS 'Open Graph image URL for social sharing (1200x630px)';
