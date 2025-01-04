import * as dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
    PORT: number
    DB_HOST: string;
    DB_PORT: number;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_DATABASE: string;
    NODE_ENV: string;
    JWT_SECRET: string;
    WITHHOLDING_TASK: number
    USER_NAME: string
    USER_EMAIL: string
    USER_PASS: string
}

const envConfig: EnvConfig = {
    PORT: parseInt(process.env.PORT),
    DB_HOST: process.env.DB_HOST,
    DB_PORT: parseInt(process.env.DB_PORT),
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASE: process.env.DB_DATABASE,
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET,
    WITHHOLDING_TASK: parseFloat(process.env.WITHHOLDING_TASK),
    USER_NAME: process.env.USER_NAME,
    USER_EMAIL: process.env.USER_EMAIL,
    USER_PASS: process.env.USER_PASS
};


const missingVariables = Object.entries(envConfig)
    .filter(([key, value]) => !value)
    .map(([key]) => key);

if (missingVariables.length > 0) {
    throw new Error(
        `Missing required environment variables: ${missingVariables.join(", ")}. Check your .env file.`
    );
}

export default envConfig;