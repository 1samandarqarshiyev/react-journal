import { initializeApp } from "firebase/app";
// import firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyCAWiO8z4PNc3S-h7g5ZNZtsh-EVHtSkjs",
//   authDomain: "journal-b12bb.firebaseapp.com",
//   projectId: "journal-b12bb",
//   storageBucket: "journal-b12bb.appspot.com",
//   messagingSenderId: "881705946624",
//   appId: "1:881705946624:web:6cbbe0f43857de300dd2e5",
//   measurementId: "G-TFD0QJNLN0",
// };
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIRE_API_KEY,
  authDomain: process.env.REACT_APP_FIRE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIRE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIRE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIRE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIRE_APP_ID,
  measurementId: process.env.REACT_APP_FIRE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
export const journalsCollection = collection(db, "journals");

export const getEntry = async (id) => {
  const journalDocRef = doc(db, "journals", id);
  const journalDoc = await getDoc(journalDocRef);
  console.log(journalDoc);
  return journalDoc;
};

export const getEntries = async () => {
  const data = await getDocs(journalsCollection);
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const createEntry = async (
  // title,
  // date,
  // content,
  // temperature,
  // location,
  // emotion
  payload
) => {
  await addDoc(
    journalsCollection,
    // {
    // title: title,
    // date: date,
    // content: content,
    // temperature: Number(temperature),
    // location: location,
    // emotion: emotion,
    // }
    payload
  );
};

export const updateEntry = async (id, updatedFields) => {
  const journalDoc = doc(db, "journals", id);
  // const newFields = { age: age + 1 };
  await updateDoc(journalDoc, updatedFields);
};

export const deleteEntry = async (id) => {
  const journalDoc = doc(db, "journals", id);
  await deleteDoc(journalDoc);
};
