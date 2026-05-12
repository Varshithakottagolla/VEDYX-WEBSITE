-- SUPABASE SETUP SCRIPT
-- Copy and paste this into the "SQL Editor" in your Supabase dashboard

-- 1. Create the Site Content table (for settings, hero, about, etc.)
CREATE TABLE IF NOT EXISTS site_content (
  section TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create the Blog Articles table
CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content JSONB, -- The array of blocks
  image TEXT,
  category TEXT,
  author TEXT,
  date TEXT,
  readTime TEXT,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Enable Public Access (Rls)
-- Note: For a real production site, you'd want to secure these.
-- For now, we'll allow public reads and keep writes behind your admin panel.

ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read site_content" ON site_content FOR SELECT USING (true);
CREATE POLICY "Admin write site_content" ON site_content FOR ALL USING (true); -- In production, restrict this to admin only

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read articles" ON articles FOR SELECT USING (true);
CREATE POLICY "Admin write articles" ON articles FOR ALL USING (true);

-- 4. Create the Inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  received_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin read inquiries" ON inquiries FOR SELECT USING (true);
CREATE POLICY "Admin write inquiries" ON inquiries FOR ALL USING (true);

-- 5. Create a Storage Bucket for Media
-- (Go to Storage in the Supabase Sidebar, create a bucket named 'media', and set it to PUBLIC)
