DROP TABLE  IF EXISTS  users, clients, booking_status, residency_status, messages CASCADE;

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
    gender VARCHAR(120),
    date_of_birth DATE,
    postcode VARCHAR(20),
    referring_agency VARCHAR(120),
    pick_up_date TIMESTAMP,
    is_declined BOOLEAN DEFAULT FALSE,
    UNIQUE (phone_number),
    uuid CHAR(36) UNIQUE
);

CREATE TABLE messages
(	
    id SERIAL PRIMARY KEY,
    client_id INT,
	message VARCHAR,
	successfully_sent BOOLEAN,
    time_sent TIMESTAMP,
    url VARCHAR
);

CREATE TABLE booking_status 
(
	booking_status_id SERIAL PRIMARY KEY,
	status VARCHAR
);
	
INSERT INTO booking_status (status) VALUES ('waiting'), ('contacted'), ('booked'), ('declined'), ('completed'), ('cancelled');


CREATE TABLE residency_status 
(
	residency_status_id serial PRIMARY KEY,
	status VARCHAR
);

INSERT INTO residency_status (status) VALUES ('asylum seeker'), ('refugee'), ('unaccompanied minor'), ('destitute/failed asylum');


ALTER TABLE clients
ADD FOREIGN KEY (booking_status) REFERENCES booking_status(booking_status_id);

ALTER TABLE clients
ADD FOREIGN KEY (residency_status) REFERENCES residency_status(residency_status_id);

ALTER TABLE messages ADD FOREIGN KEY (client_id) REFERENCES clients (client_id);

