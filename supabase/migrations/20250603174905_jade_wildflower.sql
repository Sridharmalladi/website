/*
  # Create visitors table and functions

  1. New Tables
    - `visitors` table with a single row to store the visitor count
  2. Functions
    - `increment_visitors` function to safely increment the counter
*/

-- Create visitors table
CREATE TABLE IF NOT EXISTS visitors (
  id INT PRIMARY KEY DEFAULT 1,
  count BIGINT DEFAULT 0,
  CONSTRAINT single_row CHECK (id = 1)
);

-- Insert initial row
INSERT INTO visitors (id, count) VALUES (1, 0) ON CONFLICT (id) DO NOTHING;

-- Create function to increment visitors
CREATE OR REPLACE FUNCTION increment_visitors()
RETURNS void AS $$
BEGIN
  UPDATE visitors SET count = count + 1 WHERE id = 1;
END;
$$ LANGUAGE plpgsql;