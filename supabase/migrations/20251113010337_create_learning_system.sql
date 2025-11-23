/*
  # Learning System Schema

  1. New Tables
    - `user_subscriptions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `skill_type` (text: reading, writing, listening, speaking)
      - `level` (text: beginner, intermediate, advanced)
      - `stripe_payment_id` (text)
      - `amount_paid` (numeric)
      - `purchased_at` (timestamptz)
      - `expires_at` (timestamptz, nullable for lifetime access)
      - `is_active` (boolean)
      
    - `user_progress`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `skill_type` (text)
      - `level` (text)
      - `lesson_id` (text)
      - `completed` (boolean)
      - `score` (integer, nullable)
      - `completed_at` (timestamptz)
      - `created_at` (timestamptz)
      
    - `lessons`
      - `id` (uuid, primary key)
      - `skill_type` (text)
      - `level` (text)
      - `lesson_number` (integer)
      - `title` (text)
      - `content` (jsonb)
      - `exercises` (jsonb)
      - `created_at` (timestamptz)
      
  2. Security
    - Enable RLS on all tables
    - Users can read their own subscriptions and progress
    - Users can update their own progress
    - Anyone can read lessons they have access to
*/

-- Create user_subscriptions table
CREATE TABLE IF NOT EXISTS user_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  skill_type text NOT NULL,
  level text NOT NULL,
  stripe_payment_id text NOT NULL,
  amount_paid numeric NOT NULL,
  purchased_at timestamptz DEFAULT now() NOT NULL,
  expires_at timestamptz,
  is_active boolean DEFAULT true NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Create user_progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  skill_type text NOT NULL,
  level text NOT NULL,
  lesson_id text NOT NULL,
  completed boolean DEFAULT false NOT NULL,
  score integer,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE(user_id, skill_type, level, lesson_id)
);

-- Create lessons table
CREATE TABLE IF NOT EXISTS lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  skill_type text NOT NULL,
  level text NOT NULL,
  lesson_number integer NOT NULL,
  title text NOT NULL,
  content jsonb NOT NULL DEFAULT '{}',
  exercises jsonb NOT NULL DEFAULT '[]',
  created_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE(skill_type, level, lesson_number)
);

-- Enable RLS
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

-- Policies for user_subscriptions
CREATE POLICY "Users can view own subscriptions"
  ON user_subscriptions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own subscriptions"
  ON user_subscriptions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policies for user_progress
CREATE POLICY "Users can view own progress"
  ON user_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON user_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policies for lessons
CREATE POLICY "Anyone can view lessons"
  ON lessons FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_user_id ON user_subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_active ON user_subscriptions(user_id, is_active);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_lessons_skill_level ON lessons(skill_type, level);
