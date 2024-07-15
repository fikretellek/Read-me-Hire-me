\c readme_hireme_db;

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR,
    password_hash VARCHAR,
    user_type VARCHAR
);

INSERT INTO users (username, password_hash, user_type) VALUES ('testUser@gmail.com', 'pass_hash', 'graduate');