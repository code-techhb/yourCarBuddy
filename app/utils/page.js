import { db } from '@/firebase';
import { collection, doc, query, where, getDocs, setDoc } from 'firebase/firestore';

const addUserCar = async (carData, userId) => {
    console.log('Accessing the data...');  // Check if the function is entered

    try {
        console.log('Starting Firebase function');

        
        const carsCollectionRef = collection(db, "users", userId, "cars");

       
        const q = query(carsCollectionRef, where("VIN", "==", carData.VIN));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            console.log('VIN already exists in the database.');
            throw new Error('VIN already exists');
        } else {
            
            const carDocRef = doc(db, "users", userId, "cars", carData.VIN);

            console.log('Preparing to add document with VIN as document ID:', carData);

            
            await setDoc(carDocRef, {
                ...carData,
                userId: userId, 
            });

            console.log('Document successfully written with VIN as document ID');
        }
    } catch (e) {
        console.error('Error adding document:', e);
    }
};

export { addUserCar };
