/*
  # Kids Learning System Database Schema

  1. New Tables
    - `kids_profiles`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `display_name` (text)
      - `avatar` (text)
      - `total_points` (integer)
      - `level` (integer)
      - `badges` (jsonb)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `kids_lesson_progress`
      - `id` (uuid, primary key)
      - `profile_id` (uuid, references kids_profiles)
      - `language_id` (text)
      - `lesson_id` (integer)
      - `completed` (boolean)
      - `score` (integer)
      - `points_earned` (integer)
      - `completed_at` (timestamptz)
      - `created_at` (timestamptz)

    - `kids_game_progress`
      - `id` (uuid, primary key)
      - `profile_id` (uuid, references kids_profiles)
      - `language_id` (text)
      - `game_id` (integer)
      - `high_score` (integer)
      - `times_played` (integer)
      - `points_earned` (integer)
      - `last_played_at` (timestamptz)
      - `created_at` (timestamptz)

    - `kids_achievements`
      - `id` (uuid, primary key)
      - `profile_id` (uuid, references kids_profiles)
      - `achievement_type` (text)
      - `achievement_name` (text)
      - `description` (text)
      - `icon` (text)
      - `earned_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Kids Profiles Table
CREATE TABLE IF NOT EXISTS kids_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text NOT NULL DEFAULT 'Young Learner',
  avatar text DEFAULT '👦',
  total_points integer DEFAULT 0,
  level integer DEFAULT 1,
  badges jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE kids_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own kids profile"
  ON kids_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own kids profile"
  ON kids_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own kids profile"
  ON kids_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Kids Lesson Progress Table
CREATE TABLE IF NOT EXISTS kids_lesson_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES kids_profiles(id) ON DELETE CASCADE NOT NULL,
  language_id text NOT NULL,
  lesson_id integer NOT NULL,
  completed boolean DEFAULT false,
  score integer DEFAULT 0,
  points_earned integer DEFAULT 0,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(profile_id, language_id, lesson_id)
);

ALTER TABLE kids_lesson_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own lesson progress"
  ON kids_lesson_progress FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM kids_profiles
      WHERE kids_profiles.id = kids_lesson_progress.profile_id
      AND kids_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own lesson progress"
  ON kids_lesson_progress FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM kids_profiles
      WHERE kids_profiles.id = kids_lesson_progress.profile_id
      AND kids_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own lesson progress"
  ON kids_lesson_progress FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM kids_profiles
      WHERE kids_profiles.id = kids_lesson_progress.profile_id
      AND kids_profiles.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM kids_profiles
      WHERE kids_profiles.id = kids_lesson_progress.profile_id
      AND kids_profiles.user_id = auth.uid()
    )
  );

-- Kids Game Progress Table
CREATE TABLE IF NOT EXISTS kids_game_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES kids_profiles(id) ON DELETE CASCADE NOT NULL,
  language_id text NOT NULL,
  game_id integer NOT NULL,
  high_score integer DEFAULT 0,
  times_played integer DEFAULT 0,
  points_earned integer DEFAULT 0,
  last_played_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  UNIQUE(profile_id, language_id, game_id)
);

ALTER TABLE kids_game_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own game progress"
  ON kids_game_progress FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM kids_profiles
      WHERE kids_profiles.id = kids_game_progress.profile_id
      AND kids_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own game progress"
  ON kids_game_progress FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM kids_profiles
      WHERE kids_profiles.id = kids_game_progress.profile_id
      AND kids_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own game progress"
  ON kids_game_progress FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM kids_profiles
      WHERE kids_profiles.id = kids_game_progress.profile_id
      AND kids_profiles.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM kids_profiles
      WHERE kids_profiles.id = kids_game_progress.profile_id
      AND kids_profiles.user_id = auth.uid()
    )
  );

-- Kids Achievements Table
CREATE TABLE IF NOT EXISTS kids_achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES kids_profiles(id) ON DELETE CASCADE NOT NULL,
  achievement_type text NOT NULL,
  achievement_name text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  earned_at timestamptz DEFAULT now()
);

ALTER TABLE kids_achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own achievements"
  ON kids_achievements FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM kids_profiles
      WHERE kids_profiles.id = kids_achievements.profile_id
      AND kids_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own achievements"
  ON kids_achievements FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM kids_profiles
      WHERE kids_profiles.id = kids_achievements.profile_id
      AND kids_profiles.user_id = auth.uid()
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_kids_profiles_user_id ON kids_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_profile_id ON kids_lesson_progress(profile_id);
CREATE INDEX IF NOT EXISTS idx_game_progress_profile_id ON kids_game_progress(profile_id);
CREATE INDEX IF NOT EXISTS idx_achievements_profile_id ON kids_achievements(profile_id);
