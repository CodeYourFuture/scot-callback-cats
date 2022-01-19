import { Pool } from "pg";

const dbUrl =
	process.env.DATABASE_URL || "postgres://localhost:5432/cyf-bike-app-dev";

const pool = new Pool({
	//connectionString: dbUrl,
	connectionTimeoutMillis: 5000,
	ssl: dbUrl.includes("localhost") ? false : { rejectUnauthorized: false },
	user: "postgres",
	password: "glasgow321!",
	host: "localhost",
	port: 5432,
	database: "cyf-bike-app-dev",
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
