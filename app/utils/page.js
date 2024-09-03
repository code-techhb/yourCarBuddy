'use client'
import {db} from '@/firebase'
import { yellow } from '@mui/material/colors'
import { collection, doc, addDoc, query, where, getDocs  } from 'firebase/firestore'



const addUserCar = async (carData, userId) => {
    console.log('accessing the data????');  // Check if the function is entered
    try {
        
        console.log('Starting Firebase function');
        const collectionRef = collection(db, 'users');

        const q = query(collectionRef, where("VIN", "==", carData.VIN), where("user", "==", doc(db, 'users', userId)));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            console.log('VIN already exists in the database.');
            throw new Error('VIN already exists');
        } else {
        const userRef = doc(db, 'users', userId);

        console.log('Preparing to add document:', carData);
        
        const docRef = await addDoc(collectionRef, {
            ...carData,
            user: userRef,
        });

        console.log('Document written with ID: ', docRef.id);
    }
    } catch (e) {
        console.error('Error adding document', e);
    }
};


export {addUserCar}