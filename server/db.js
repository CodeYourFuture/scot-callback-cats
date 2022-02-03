import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: "cyf-bike-app-dev",
    password: process.env.DB_PASSWORD,
    port: 5432,
});

export const connectDb = async () => {
	let client;
	try {
		client = await pool.connect();
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
	console.log("Postgres connected to", client.database);
	client.release();
};

export const disconnectDb = () => pool.close();

export default { query: pool.query.bind(pool) };
