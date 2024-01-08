import Pool from "pg";
import config from 'dotenv'

config.config()

const pool = new Pool.Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: 5432,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: false,
    },

    // user: 'postgres',
    // password: 'fuadfuad2001',
    // host: 'localhost',
    // port: 5432,
    // database: 'card'
});

export default pool;