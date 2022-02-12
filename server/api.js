import { Router } from "express";
import db from "./db";
import { randomUUID } from "crypto";

const router = new Router();

router.get("/", (req, res) => {
	res.json({ message: "Hello, world!" });
});

router.get("/clients", (req, res) => {
	db.query("SELECT * from clients;")
    .then((result) => res.json(result.rows))
	.catch((e) => {
		console.error(e);
		res.sendStatus(400);
	});
});

router.post("/clients", (req, res) => {

	const newClientDateAdded = req.body.date_added;
	const newClientName = req.body.name;
	const newClientBikes = req.body.bikes_needed;
	const newClientPhoneNumber = req.body.phone_number;

	const createQuery = "INSERT INTO clients (date_added, name, bikes_needed, phone_number) VALUES ($1, $2, $3, $4)";
	db.query(createQuery, [newClientDateAdded, newClientName, newClientBikes, newClientPhoneNumber])
	.then(() => res.json(req.body))
	.catch((e) => {
		console.error(e);
		res.sendStatus(400);
	});
});
const saveUser = (client) => {
	const {
		dateAdded,
		name,
		bikesNeeded,
		phoneNumber,
		bookingStatus,
		residencyStatus,
		countryOfOrigin,
		timeInScotland,
		languageSpoken,
		englishSpeaker,
		englishSkillLevel,
		gender,
		dateOfBirth,
		postcode,
		referringAgency,
		pickUpDate,
		isDeclined,
	} = client;

	const validationErrors = [];

	if (!dateAdded) {
		validationErrors.push(
			"The field dateAdded is empty. It is required to have a date"
		);
	}
	if (!name) {
		validationErrors.push(
			"The field name is empty. It is requires to have a name"
		);
	}
	if (!bikesNeeded || isNaN(Number(bikesNeeded))) {
		validationErrors.push(
			"The field bikesNeeded is empty or it is not a number. It is required to have a numerical value"
		);
	}
	if (!phoneNumber) {
		validationErrors.push(
			"The field phoneNumber is empty. It is required to have a value"
		);
	}
	if (isDeclined === undefined) {
		validationErrors.push("The field isDeclined is empty");
	}
	if (validationErrors.length) {
		return Promise.reject(validationErrors);
	}

	const dateAddedIso = new Date(dateAdded).toISOString();
	const dateOfBirthIso = new Date(dateOfBirth).toISOString();
	const createQuery =
		"INSERT INTO clients (date_added, name,  bikes_needed, phone_number, booking_status,residency_status, country_of_origin, time_in_scotland, language_spoken, english_speaker, english_skill_level, gender, date_of_birth, postcode, referring_agency, pick_up_date, is_declined)" +
		" VALUES " +
		" ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)" +
		" ON CONFLICT (phone_number)" +
		" DO UPDATE SET date_added = EXCLUDED.date_added, name = EXCLUDED.name, bikes_needed = EXCLUDED.bikes_needed, booking_status = EXCLUDED.booking_status, residency_status = EXCLUDED.residency_status, country_of_origin = EXCLUDED.country_of_origin, time_in_scotland = EXCLUDED.time_in_scotland, language_spoken = EXCLUDED.language_spoken, english_speaker = EXCLUDED.english_speaker, english_skill_level = EXCLUDED.english_skill_level, gender = EXCLUDED.gender, date_of_birth = EXCLUDED.date_of_birth, postcode = EXCLUDED.postcode, referring_agency = EXCLUDED.referring_agency, pick_up_date = EXCLUDED.pick_up_date, is_declined = EXCLUDED.is_declined";

	return db.query(createQuery, [
		dateAddedIso,
		name,
		bikesNeeded,
		phoneNumber,
		bookingStatus,
		residencyStatus,
		countryOfOrigin,
		timeInScotland,
		languageSpoken,
		englishSpeaker,
		englishSkillLevel,
		gender,
		dateOfBirthIso,
		postcode,
		referringAgency,
		pickUpDate,
		isDeclined,
	]);
};

router.post("/send-messages", (req, res) => {
	const message = req.body.message;
	const clientIds = req.body.ids;
	const timeSent = new Date().toISOString();

	const dbQueries = [];
	clientIds.forEach((id)=>{
		console.log("sending SMS to " + id);
		const uuid = randomUUID();
		const createQuery = "INSERT INTO messages (client_id, message, successfully_sent, time_sent) VALUES ($1, $2, $3, $4)";
		dbQueries.push(db.query(createQuery, [id, message, true, timeSent]));

		const updateQuery = "UPDATE clients SET booking_status=2, uuid=$1 WHERE client_id=$2";
		dbQueries.push(db.query(updateQuery, [uuid, id]));
	});

	Promise.allSettled(dbQueries)
  		.then((results) => {
			const rejectedQueries = results.filter((result) => result.status === "rejected");
			if (rejectedQueries.length > 0) {
				rejectedQueries.forEach((query) => {
					console.error("database error sending sms:", query.reason);
				});
				res.status(400).send("error inserting into database");
			} else {
				res.sendStatus(201);
			}
		});

});

const updateUser = (client, clientId) => {
	const {
		dateAdded,
		name,
		bikesNeeded,
		phoneNumber,
		bookingStatus,
		residencyStatus,
		countryOfOrigin,
		timeInScotland,
		languageSpoken,
		englishSpeaker,
		englishSkillLevel,
		gender,
		dateOfBirth,
		postcode,
		referringAgency,
		pickUpDate,
		isDeclined,
	} = client;
	const validationErrors = [];

	if (!dateAdded) {
		validationErrors.push(
			"The field dateAdded is empty. It is required to have a date"
		);
	}
	if (!name) {
		validationErrors.push(
			"The field name is empty. It is requires to have a name"
		);
	}
	if (!bikesNeeded || isNaN(Number(bikesNeeded))) {
		validationErrors.push(
			"The field bikesNeeded is empty or it is not a number. It is required to have a numerical value"
		);
	}
	if (!phoneNumber) {
		validationErrors.push(
			"The field phoneNumber is empty. It is required to have a value"
		);
	}

	if (validationErrors.length) {
		return Promise.reject(validationErrors);
	}

	const createQuery =
		"UPDATE clients " +
		"SET " +
		"date_added = $1, name = $2,  bikes_needed = $3, phone_number = $4, booking_status = $5,residency_status = $6, country_of_origin = $7, time_in_scotland = $8, language_spoken = $9, english_speaker = $10, english_skill_level = $11, gender = $12, date_of_birth = $13, postcode = $14, referring_agency = $15, pick_up_date = $16, is_declined = $17 " +
		" WHERE client_id = $18";

	return db.query(createQuery, [
		dateAdded,
		name,
		bikesNeeded,
		phoneNumber,
		bookingStatus,
		residencyStatus,
		countryOfOrigin,
		timeInScotland,
		languageSpoken,
		englishSpeaker,
		englishSkillLevel,
		gender,
		dateOfBirth,
		postcode,
		referringAgency,
		pickUpDate,
		isDeclined,
		clientId,
	]);
};

router.put("/clients/:clientId", (req, res) => {
	const { clientId } = req.params;
	updateUser(req.body, clientId)
		.then(() => res.status(200).send("Client updated"))
		.catch((e) => res.status(500).send(e));
});

router.get("/bookings", (req, res) => {
	const filter = req.query.filter;
	let query = "SELECT * FROM clients WHERE pick_up_date IS NOT NULL;";
	if (filter === "2weeks") {
		query =
			"SELECT * FROM clients WHERE pick_up_date between  Now () and (NOW () + interval '2 Weeks');";
	}
	db.query(query)
		.then((result) => res.json(result.rows))
		.catch((e) => {
			res.status(400).send(e);
		});
});

export default router;
