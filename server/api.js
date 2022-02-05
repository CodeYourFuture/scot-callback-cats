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

router.post("/send-messages", (req, res) => {
	const message = req.body.message;
	const clientIds = req.body.ids;
	const timeSent = new Date().toISOString();


	clientIds.forEach((id)=>{
		console.log("sending SMS to " + id);
		randomUUID();
		const createQuery = "INSERT INTO messages (client_id, message, successfully_sent, time_sent) VALUES ($1, $2, $3, $4); UPDATE TABLE clients SET booking_status=2 WHERE client_id=$1";
		db.query(createQuery, [id, message, true, timeSent]);
	});

	res.sendStatus(200);
});


export default router;
