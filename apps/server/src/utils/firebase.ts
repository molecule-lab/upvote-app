import admin from "firebase-admin";
import { envVariables } from "./app-config";

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: envVariables.FIREBASE_PROJECT_ID,
    clientEmail: envVariables.FIREBASE_CLIENT_EMAIL,
    privateKey: envVariables.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  }),
});

export const firebaseAuth = admin.auth();
