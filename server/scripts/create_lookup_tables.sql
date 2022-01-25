create table booking_status (
	booking_status_id SERIAL PRIMARY KEY,
	status VARCHAR
	);
	
insert into booking_status (status) values ('waiting'), ('contacted'), ('booked'), ('declined'), ('completed'), ('cancelled');


create table residency_status (
	residency_status_id serial primary key,
	status varchar
);

insert into residency_status (status) values ('asylum seeker'), ('refugee'), ('unaccompanied minor'), ('destitute/failed asylum');


ALTER TABLE clients
ADD FOREIGN KEY (booking_status) REFERENCES booking_status(booking_status_id);

ALTER TABLE clients
ADD FOREIGN KEY (residency_status) REFERENCES residency_status(residency_status_id);
