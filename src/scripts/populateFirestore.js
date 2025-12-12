// Script para poblar Firestore con datos iniciales de créditos
// Ejecutar con: node src/scripts/populateFirestore.js

import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase.js';
import { creditsData } from '../data/creditsData.js';

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