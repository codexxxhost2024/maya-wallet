/*
  # Fix user policies and consolidate schema

  1. Changes
    - Drop profiles table (consolidating with users)
    - Update users table RLS policies
    - Add policy for inserting new users

  2. Security
    - Enable RLS
    - Add policy for user creation during signup
    - Maintain existing read/update policies
*/

-- Drop profiles table as we're consolidating with users
DROP TABLE IF EXISTS profiles CASCADE;

-- Update users table policies
DROP POLICY IF EXISTS "Users can insert during signup" ON users;
CREATE POLICY "Users can insert during signup"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Ensure policies are enabled
ALTER TABLE users ENABLE ROW LEVEL SECURITY;