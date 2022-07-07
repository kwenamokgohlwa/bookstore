module.exports = {
    HOST: process.env.DB_HOST || 'localhost',
    USER: process.env.DB_USER || 'postgres',
    PASSWORD: process.env.DB_PASSWORD || '',
    DB: process.env.DB_SCHEMA || 'postgres',
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    dialectOptions: {
        ssl: process.env.DB_SSL == "true"
    }
    };