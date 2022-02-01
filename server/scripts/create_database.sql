DROP TABLE  IF EXISTS  users, clients;

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    email VARCHAR(80) NOT NULL,
    password VARCHAR(80) NOT NULL
);

CREATE TABLE clients
(
    client_id SERIAL PRIMARY KEY,
    date_added TIMESTAMP,
    name VARCHAR(120) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    bikes_needed INT NOT NULL,
    booking_status INT,
    residency_status INT,
    country_of_origin VARCHAR(120), 
    time_in_scotland VARCHAR(120),
    language_spoken VARCHAR(120),
    english_speaker BOOLEAN,
    english_skill_level VARCHAR(120),
    gender INT,
    date_of_birth DATE,
    postcode VARCHAR(20),
    referring_agency VARCHAR(120),
    UNIQUE (phone_number)
);
