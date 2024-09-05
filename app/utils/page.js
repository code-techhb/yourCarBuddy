'use client'
import {db} from '@/firebase'
import { yellow } from '@mui/material/colors'
import { collection, doc, addDoc, query, where, getDocs  } from 'firebase/firestore'


const addUserCar = async (carData, userId) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks

    console.log('accessing the data????');  // Check if the function is entered
    const currentUserId = userId
    try {
        
        console.log('Starting Firebase function');
       // const collectionRef = collection(db, 'users');
        const carsCollectionRef = collection(db, "users", currentUserId, "cars");

        const q = query(carsCollectionRef, where("VIN", "==", carData.VIN), where("user", "==", doc(db, 'users', userId)));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            console.log('VIN already exists in the database.');
            throw new Error('VIN already exists');
        } else {
        const userRef = doc(db, 'users', userId);

        console.log('Preparing to add document:', carData);
        
        const docRef = await addDoc(carsCollectionRef, {
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