CREATE DATABASE spotify_db;

CREATE TABLE Songs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    image VARCHAR(255),
    file VARCHAR(255),
    description TEXT,
    duration VARCHAR(50),
    album VARCHAR(255) NULL,
    CONSTRAINT fk_album FOREIGN KEY (album) REFERENCES Albums(name) ON DELETE SET NULL
);

CREATE TABLE Albums (
     id SERIAL,
     name VARCHAR(255) PRIMARY KEY UNIQUE,
     image VARCHAR(255),
     description TEXT,
     bgColor VARCHAR(20)
);