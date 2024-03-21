CREATE TABLE user_account (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(64) NOT NULL,
    about VARCHAR(200),
    avatar VARCHAR,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    createdat TIMESTAMP NOT NULL DEFAULT current_timestamp,
    updatedat TIMESTAMP NOT NULL DEFAULT current_timestamp
);

COPY user_account (username, about, avatar, email, password)
FROM '/docker-entrypoint-initdb.d/user.csv'
DELIMITER ','
CSV HEADER;