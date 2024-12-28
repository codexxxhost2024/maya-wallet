/*
  # Add face image support
  
  1. Changes
    - Add face_image_url column to users table
    - Create storage bucket for face images
    - Add policy for face image storage access
*/

-- Add face_image_url to users table
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS face_image_url TEXT;

-- Create storage bucket for face images if it doesn't exist
INSERT INTO storage.buckets (id, name)
VALUES ('faces', 'faces')
ON CONFLICT (id) DO NOTHING;

-- Enable RLS for storage
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to upload their own face images
CREATE POLICY "Users can upload their own face image"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'faces' AND 
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to read their own face images
CREATE POLICY "Users can read their own face image"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'faces' AND 
  (storage.foldername(name))[1] = auth.uid()::text
);