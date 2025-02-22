import app from "./app";
import { AppDataSource } from "./config/data-source";
import { createInitUser } from './config/createInitUser'
async function main() {
  try {
    await AppDataSource.initialize();
    console.log("Database connected");

    await createInitUser();

    app.listen(app.get("port"), () => {
      console.log("Server working");
    });
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    throw new Error(
      "Failed to connect to the database. Please check your configuration."
    );
  }
}

main();
