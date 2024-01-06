import Pool from "pg";

const pool = new Pool.Pool({
    user: 'postgres',
    password: 'fuad2001',
    host: 'test-db-hobby.cbw24qm2yhhk.eu-north-1.rds.amazonaws.com',
    port: 5432,
    database: 'test_hobby_db',
    ssl: {
        rejectUnauthorized: false,
    },
});

export default pool;