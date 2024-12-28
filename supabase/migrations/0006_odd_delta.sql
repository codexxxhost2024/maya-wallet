/*
  # Add device tracking

  1. New Tables
    - `user_devices`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `agent_id` (text)
      - `user_agent` (text)
      - `platform` (text)
      - `browser` (text)
      - `last_used` (timestamptz)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `user_devices` table
    - Add policies for authenticated users
*/

-- Create user_devices table
CREATE TABLE IF NOT EXISTS user_devices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NOT NULL,
  agent_id TEXT NOT NULL,
  user_agent TEXT NOT NULL,
  platform TEXT NOT NULL,
  browser TEXT NOT NULL,
  last_used TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, agent_id)
);

-- Enable RLS
ALTER TABLE user_devices ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own devices"
  ON user_devices
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own devices"
  ON user_devices
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own devices"
  ON user_devices
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Create index for performance
CREATE INDEX IF NOT EXISTS user_devices_user_id_idx ON user_devices(user_id);
CREATE INDEX IF NOT EXISTS user_devices_agent_id_idx ON user_devices(agent_id);