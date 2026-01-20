/*
  # Create bio_pages table

  1. New Tables
    - `bio_pages`
      - `id` (uuid, primary key)
      - `username` (text, unique) - URL-friendly username
      - `name` (text) - Display name
      - `description` (text) - Bio description
      - `avatar_url` (text) - Avatar image URL
      - `video_background_url` (text) - Optional video background
      - `enable_parallax` (boolean) - Enable mouse parallax effect
      - `enable_blur` (boolean) - Enable blur effect
      - `blur_amount` (integer) - Blur amount (0-50)
      - `links` (jsonb) - Array of social links
      - `theme` (text) - Theme color scheme
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `bio_pages` table
    - Add policy for public read access
*/

CREATE TABLE IF NOT EXISTS bio_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  name text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  avatar_url text NOT NULL DEFAULT 'https://picsum.photos/150?random=1',
  video_background_url text,
  enable_parallax boolean DEFAULT true,
  enable_blur boolean DEFAULT true,
  blur_amount integer DEFAULT 10,
  links jsonb DEFAULT '[]'::jsonb,
  theme text DEFAULT 'dark',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE bio_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Bio pages are publicly readable"
  ON bio_pages
  FOR SELECT
  TO public
  USING (true);

CREATE INDEX idx_bio_pages_username ON bio_pages(username);