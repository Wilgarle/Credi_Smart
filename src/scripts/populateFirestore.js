// Script para poblar Firestore con datos iniciales de créditos
// Ejecutar con: node src/scripts/populateFirestore.js

import dotenv from 'dotenv';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { creditsData } from '../data/creditsData.js';

// Cargar variables de entorno
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const populateCredits = async () => {
  try {
    console.log('Poblando colección "credits" en Firestore...');

    for (const credit of creditsData) {
      await addDoc(collection(db, 'credits'), credit);
      console.log(`✅ Agregado: ${credit.name}`);
    }

    console.log('🎉 Todos los créditos han sido agregados exitosamente!');
  } catch (error) {
    console.error('❌ Error al poblar Firestore:', error);
  }
};

populateCredits();