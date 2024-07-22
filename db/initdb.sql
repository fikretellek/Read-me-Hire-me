\c readme_hireme_db;

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS portfolios CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR,
    password_hash VARCHAR,
    user_type VARCHAR
);

CREATE TABLE portfolios (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    readme TEXT,
    activity TEXT,
    projects TEXT
);

INSERT INTO users (username, password_hash, user_type) VALUES ('testUser@gmail.com', 'pass_hash', 'graduate');
INSERT INTO users (username, password_hash, user_type) VALUES ('testUser1@gmail.com', 'pass_hash', 'mentor');
INSERT INTO users (username, password_hash, user_type) VALUES ('testUser2@gmail.com', 'pass_hash', 'requiter');