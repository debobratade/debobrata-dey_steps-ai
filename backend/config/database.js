const { Client } = require('pg');
const dotenv=require('dotenv')
dotenv.config();
const client = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: Process.env.DATABASE_PASSWORD,
    database: 'hospital_management'
});

client.connect(err => {
    if (err) {
        console.error('Connection error', err.stack);
    } else {
        console.log('Connected to the database');
    }
});
