interface EnvConfig {
    VITE_HOST: string;
    VITE_PORT: number;
    API_BASE_URL: string;
}

const envConfig: EnvConfig = {
    VITE_HOST: import.meta.env.VITE_HOST || "http://localhost",
    VITE_PORT: parseInt(import.meta.env.VITE_PORT || "3000"),
    get API_BASE_URL() {
        return `${this.VITE_HOST}:${this.VITE_PORT}`;
    },
};

const missingVariables = Object.entries(envConfig)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

if (missingVariables.length > 0) {
    throw new Error(
        `Missing required environment variables: ${missingVariables.join(", ")}. Check your .env file.`
    );
}

export default envConfig;
