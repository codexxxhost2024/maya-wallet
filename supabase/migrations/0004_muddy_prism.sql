/*
  # Fix users table and policies

  1. Changes
    - Drop and recreate users table with proper schema
    - Update RLS policies for proper access control
    - Add indexes for performance

  2. Security
    - Enable RLS
    - Add policies for authenticated users
    - Add policy for signup
*/

-- Recreate users table with proper schema
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users,
  email TEXT UNIQUE NOT NULL,
  phone TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  wallet_balance DECIMAL DEFAULT 0,
  sponsor_id UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;
DROP POLICY IF EXISTS "Users can read sponsor data" ON users;
DROP POLICY IF EXISTS "Users can insert during signup" ON users;

-- Create new policies
CREATE POLICY "Users can read own data"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert during signup"
  ON users FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can read sponsor data"
  ON users FOR SELECT
  TO authenticated
  USING (id IN (
    SELECT sponsor_id FROM users WHERE id = auth.uid()
  ));

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS users_phone_idx ON users(phone);
CREATE INDEX IF NOT EXISTS users_email_idx ON users(email);
CREATE INDEX IF NOT EXISTS users_sponsor_id_idx ON users(sponsor_id);