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

COPY user_account (id, username, about, avatar, email, password)
FROM '/docker-entrypoint-initdb.d/user.csv'
DELIMITER ','
CSV HEADER;

-- Wishlists
CREATE TABLE wishlist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(250) NOT NULL,
    image VARCHAR,
    owner UUID,
    createdat TIMESTAMP NOT NULL DEFAULT current_timestamp,
    updatedat TIMESTAMP NOT NULL DEFAULT current_timestamp,
    FOREIGN KEY (owner) REFERENCES user_account(id)
);

COPY wishlist (id, title, image, owner)
FROM '/docker-entrypoint-initdb.d/wishlist.csv'
DELIMITER ','
CSV HEADER;