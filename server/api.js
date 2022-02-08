import { Router } from "express";
import db from "./db";

const router = new Router();

router.get("/", (req, res) => {
	res.json({ message: "Hello, world!" });
});

router.get("/clients", (req, res) => {
	db.query("SELECT * from clients;")
		.then((result) => res.json(result.rows))
		.catch((e) => {
			res.status(400).send(e);
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

	if (validationErrors.length) {
		return Promise.reject(validationErrors);
	}

	const dateAddedIso = new Date(dateAdded).toISOString();
	let dateOfBirthIso = null;
	if (dateOfBirth){
		dateOfBirthIso = new Date(dateOfBirth).toISOString();
	}
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

router.post("/clients", (req, res) => {
	if (Array.isArray(req.body)) {
		const promises = req.body.map((client) => {
			return saveUser(client);
		});
		Promise.all(promises)
			.then(() => res.status(200).send("All clients were inserted"))
			.catch((e) => res.status(500).send(e));
	} else {
		saveUser(req.body)
			.then(() => res.status(200).send("One client was inserted"))
			.catch((e) => res.status(500).send(e));
	}
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
