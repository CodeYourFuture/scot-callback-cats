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
			console.error(e);
			res.sendStatus(400);
		});
});

router.post("/clients", (req, res) => {
	if (Array.isArray(req.body)) {
 return req.body.forEach((element) => {
			const newClientDateAdded = element.date_added;
			const newClientDateAddedIso = new Date(
				Date.parse(newClientDateAdded)
			).toISOString();
			const newClientName = element.name;
			const newClientBikes = element.bikes_needed;
			const newClientPhoneNumber = element.phone_number;
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
				"INSERT INTO clients (date_added, name,  bikes_needed, phone_number, booking_status,residency_status, country_of_origin, time_in_scotland, language_spoken, english_speaker, english_skill_level, gender, date_of_birth, postcode, referring_agency) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)";
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
				.then(() => res.json(req.body))
				.catch((e) => {
					console.error(e);
					res.sendStatus(400);
				});
		});
	} else {
		const newClientDateAdded = req.body.date_added;
		const newClientDateAddedIso = new Date(
			Date.parse(newClientDateAdded)
		).toISOString();
		const newClientName = req.body.name;
		const newClientBikes = req.body.bikes_needed;
		const newClientPhoneNumber = req.body.phone_number;
		const newClientBookingStatus = req.body.booking_status;
		const newClientResidencyStatus = req.body.residency_status;
		const newClientCountryOfOrigin = req.body.country_of_origin;
		const newClientTimeInScotland = req.body.time_in_scotland;
		const newClientLanguageSpoken = req.body.language_spoken;
		const newClientEnglishSpeaker = req.body.english_speaker;
		const newClientEnglishSkillLevel = req.body.english_skill_level;
		const newClientGender = req.body.gender;
		const newClientDateOfBirth = req.body.date_of_birth;
		const newClientDateOfBirthIso = new Date(
			Date.parse(newClientDateOfBirth)
		).toISOString();
		const newClientPostcode = req.body.postcode;
		const newClientReferringAgency = req.body.referring_agency;

		const createQuery =
			"INSERT INTO clients (date_added, name, phone_number, bikes_needed, booking_status,residency_status, country_of_origin, time_in_scotland, language_spoken, english_speaker, english_skill_level, gender, date_of_birth, postcode, referring_agency) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)";
		db.query(createQuery, [
			newClientDateAddedIso,
			newClientName,
			newClientPhoneNumber,
			newClientBikes,
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
			.then(() => res.json(req.body))
			.catch((e) => {
				console.error(e);
				res.sendStatus(400);
			});
	}
});

export default router;
