import app from "./app";
import { AppDataSource } from "./config/data-source";

async function main() {
  try {
    await AppDataSource.initialize();

    console.log("Database connected");

    app.listen(app.get("port"), () => {
      console.log("Server working");
    });
  } catch (error) {
    console.log(error);
  }
}

main();
