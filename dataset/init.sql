CREATE TABLE user_account (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(64) NOT NULL,
    about VARCHAR(200),
    avatar VARCHAR,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    wishes UUID[],
    wishlists UUID[],
    createdat TIMESTAMP NOT NULL DEFAULT current_timestamp,
    updatedat TIMESTAMP NOT NULL DEFAULT current_timestamp
);
CREATE TABLE wish (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner UUID,
    wishlists UUID[],
    title VARCHAR(250) NOT NULL,
    link VARCHAR NOT NULL,
    image VARCHAR NOT NULL,
    price NUMERIC(2) NOT NULL,
    raised NUMERIC(2) NOT NULL,
    copied INTEGER NOT NULL,
    description VARCHAR(1024) NOT NULL,
    createdat TIMESTAMP NOT NULL DEFAULT current_timestamp,
    updatedat TIMESTAMP NOT NULL DEFAULT current_timestamp
);
CREATE TABLE wishlist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(250) NOT NULL,
    image VARCHAR,
    owner UUID,
    items UUID[],
    createdat TIMESTAMP NOT NULL DEFAULT current_timestamp,
    updatedat TIMESTAMP NOT NULL DEFAULT current_timestamp
);
-- Add FK
ALTER TABLE wish
ADD FOREIGN KEY (owner) REFERENCES user_account(id);
ALTER TABLE wish
ADD FOREIGN KEY (wishlists) REFERENCES wishlist(id);
ALTER TABLE wishlist
ADD FOREIGN KEY (owner) REFERENCES user_account(id);
ALTER TABLE wishlist
ADD FOREIGN KEY (items) REFERENCES wish(id);



-- User
COPY user_account (id, username, about, avatar, email, password, wishes, wishlists)
FROM '/docker-entrypoint-initdb.d/user.csv'
DELIMITER ','
CSV HEADER;

-- Wish
COPY wish (id, owner, wishlists, title,description, link, image, price, raised, copied)
FROM '/docker-entrypoint-initdb.d/wish.csv'
DELIMITER ','
CSV HEADER;

-- Wishlist
COPY wishlist (id, title, image, owner, items)
FROM '/docker-entrypoint-initdb.d/wishlist.csv'
DELIMITER ','
CSV HEADER;
