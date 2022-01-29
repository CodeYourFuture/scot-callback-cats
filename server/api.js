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

const saveUser = async (element) => {
	return new Promise((resolve, reject) => {
		const newClientDateAdded = element.date_added;
		if (!newClientDateAdded) {
			return reject(
				"The field date added is empty, it is require to have a date"
			);
		}
		const newClientDateAddedIso = new Date(
			Date.parse(newClientDateAdded)
		).toISOString();
		const newClientName = element.name;
		if (!newClientName) {
			return reject(
				"The field name is empty and it is require to have client name"
			);
		}
		const newClientBikes = element.bikes_needed;
		if (!newClientBikes || isNaN(!newClientBikes)) {
			return reject(
				"The field bikes is empty or is not a number, it is require to have a numerical value"
			);
		}
		const newClientPhoneNumber = element.phone_number;
		if (!newClientPhoneNumber || isNaN(!newClientPhoneNumber)) {
			return reject(
				"The field phone number is empty or is not a number, it is require to have a numerical value"
			);
		}
		const newClientBookingStatus = element.booking_status;
		const newClientResidencyStatus = element.residency_status;
		const newClientCountryOfOrigin = element.country_of_origin;
		const newClientTimeInScotland = element.time_in_scotland;
		const newClientLanguageSpoken = element.language_spoken;
		const newClientEnglishSpeaker = element.english_speaker;
		const newClientEnglishSkillLevel = element.english_skill_level;
		const newClientGender = element.gender;
		const newClientDateOfBirth = element.date_of_birth;
		const newClientDateOfBirthIso = new Date(
			Date.parse(newClientDateOfBirth)
		).toISOString();
		const newClientPostcode = element.postcode;
		const newClientReferringAgency = element.referring_agency;

		const createQuery =
			"INSERT INTO clients (date_added, name,  bikes_needed, phone_number, booking_status,residency_status, country_of_origin, time_in_scotland, language_spoken, english_speaker, english_skill_level, gender, date_of_birth, postcode, referring_agency)" +
			"VALUES" +
			"($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)" +
			"ON CONFLICT (phone_number)" +
			"DO UPDATE SET date_added = EXCLUDED.date_added, name = EXCLUDED.name, bikes_needed = EXCLUDED.bikes_needed, booking_status = EXCLUDED.booking_status, residency_status = EXCLUDED.residency_status, country_of_origin = EXCLUDED.country_of_origin, time_in_scotland = EXCLUDED.time_in_scotland, language_spoken = EXCLUDED.language_spoken, english_speaker = EXCLUDED.english_speaker, english_skill_level = EXCLUDED.english_skill_level, gender = EXCLUDED.gender, date_of_birth = EXCLUDED.date_of_birth, postcode = EXCLUDED.postcode, referring_agency = EXCLUDED.referring_agency";
		db.query(createQuery, [
			newClientDateAddedIso,
			newClientName,
			newClientBikes,
			newClientPhoneNumber,
			newClientBookingStatus,
			newClientResidencyStatus,
			newClientCountryOfOrigin,
			newClientTimeInScotland,
			newClientLanguageSpoken,
			newClientEnglishSpeaker,
			newClientEnglishSkillLevel,
			newClientGender,
			newClientDateOfBirthIso,
			newClientPostcode,
			newClientReferringAgency,
		])
			.then(() => resolve())
			.catch((e) => {
				reject(e);
			});
	});
};

router.post("/clients", async (req, res) => {
	try {
		await db.query("BEGIN");
		if (Array.isArray(req.body)) {
			const promises = [];
			req.body.forEach((element) => {
				const promiseResult = saveUser(element);
				promises.push(promiseResult);
			});
			Promise.all(promises)
				.then(() => res.status(200).send("All clients were inserted"))
				.catch((e) => res.status(500).send(e));
		} else {
			saveUser(req.body)
				.then(() => res.status(200).send("One clients was inserted"))
				.catch((e) => res.status(500).send(e));
		}
		await db.query("COMMIT");
	} catch (error) {
		await db.query("ROLLBACK");
	}
});

export default router;
