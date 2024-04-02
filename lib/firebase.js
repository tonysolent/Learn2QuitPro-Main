
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";






let app;
let analytics;
let database;


if (typeof window !== "undefined") {
  
  
  analytics = getAnalytics(app);
  database = getDatabase(app);
}

export { app, analytics, database };
