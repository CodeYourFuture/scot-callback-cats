import { Router } from "express";
import { route } from "express/lib/application";
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
	} = client;

	const validationErrors = [];

	if (!dateAdded) {
		validationErrors.push("The field dateAdded is empty. It is required to have a date");
	}
	if (!name) {
		validationErrors.push("The field name is empty. It is requires to have a name");
	}
	if (!bikesNeeded || isNaN(Number(bikesNeeded))) {
		validationErrors.push("The field bikesNeeded is empty or it is not a number. It is required to have a numerical value");
	}
	if (!phoneNumber) {
		validationErrors.push("The field phoneNumber is empty. It is required to have a value");
	}

	if (validationErrors.length) {
		return Promise.reject(validationErrors);
	}

	const dateAddedIso = new Date(dateAdded).toISOString();
	const dateOfBirthIso = new Date(dateOfBirth).toISOString();
	const createQuery =
		"INSERT INTO clients (date_added, name,  bikes_needed, phone_number, booking_status,residency_status, country_of_origin, time_in_scotland, language_spoken, english_speaker, english_skill_level, gender, date_of_birth, postcode, referring_agency)" +
		"VALUES" +
		"($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)" +
		"ON CONFLICT (phone_number)" +
		"DO UPDATE SET date_added = EXCLUDED.date_added, name = EXCLUDED.name, bikes_needed = EXCLUDED.bikes_needed, booking_status = EXCLUDED.booking_status, residency_status = EXCLUDED.residency_status, country_of_origin = EXCLUDED.country_of_origin, time_in_scotland = EXCLUDED.time_in_scotland, language_spoken = EXCLUDED.language_spoken, english_speaker = EXCLUDED.english_speaker, english_skill_level = EXCLUDED.english_skill_level, gender = EXCLUDED.gender, date_of_birth = EXCLUDED.date_of_birth, postcode = EXCLUDED.postcode, referring_agency = EXCLUDED.referring_agency";

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

const editUser = (client, clientId) => {
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
		isDecline,
	} = client;

	//Is possible to have this validation to the update?, I found that the timestamp columns complaint if they are null.
	const validationErrors = [];

	if (!dateAdded) {
		validationErrors.push("The field dateAdded is empty. It is required to have a date");
	}
	if (!name) {
		validationErrors.push("The field name is empty. It is requires to have a name");
	}
	if (!bikesNeeded || isNaN(Number(bikesNeeded))) {
		validationErrors.push("The field bikesNeeded is empty or it is not a number. It is required to have a numerical value");
	}
	if (!phoneNumber) {
		validationErrors.push("The field phoneNumber is empty. It is required to have a value");
	}

	if (validationErrors.length) {
		return Promise.reject(validationErrors);
	}

	const createQuery =
	"INSERT INTO clients (date_added, name,  bikes_needed, phone_number, booking_status,residency_status, country_of_origin, time_in_scotland, language_spoken, english_speaker, english_skill_level, gender, date_of_birth, postcode, referring_agency)" +
	"VALUES" +
	"($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)" +
	"WHERE client_id == $18";

	db.query(createQuery,
		[dateAdded,
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
		isDecline,
		clientId,
	]);
};

route.put("/clients/:clientId", (req, res) => {
	const { clientId } = req.params;
		editUser(req.body, clientId)
	.then(() => res.status(200).send("Client updated"))
	.catch((e) => res.status(500).send(e));
});

export default router;
