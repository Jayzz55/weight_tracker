createdb weight_tracker;

psql -d weight_tracker

CREATE TABLE users (
  id SERIAL4 PRIMARY KEY,
  name VARCHAR(300),
  height DECIMAL(18,2),
  current_weight DECIMAL(18,1),
  goal_start_date DATE,
  goal_end_date DATE,
  goal_weight DECIMAL(18,1),
  created_at TIMESTAMP,
  password_digest VARCHAR(300)
);

CREATE TABLE weights (
  id SERIAL4 PRIMARY KEY,
  date_log DATE,
  weight DECIMAL(18,1),
  user_id INTEGER,
  created_at TIMESTAMP
);


-- ALTER TABLE budgets ADD password_digest VARCHAR(300);
