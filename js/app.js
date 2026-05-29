import {
  initDB,
  saveJournal,
  getAllJournals
} from "./db.js";

async function bootstrap(){

  await initDB();

  console.log("DB READY");

  initUI();

}

bootstrap();
