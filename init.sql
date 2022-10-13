CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  email VARCHAR(30) NOT NULL UNIQUE,
  password VARCHAR(20) NOT NULL
);

CREATE TABLE notes (
    notes_id SERIAL PRIMARY KEY,
    user_id INTEGER,
    title TEXT,
    body TEXT,
    CONSTRAINT user_link FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO users(name, email, password)
VALUES ('ddx', 'ddxtest1@gmail.com', '12345');