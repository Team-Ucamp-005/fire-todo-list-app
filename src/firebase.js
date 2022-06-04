import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCImySRNy8lV5mkS_I_0hFuoFNtqSOb6Cs",
  authDomain: "crud-react-cbf65.firebaseapp.com",
  projectId: "crud-react-cbf65",
  storageBucket: "crud-react-cbf65.appspot.com",
  messagingSenderId: "362474185294",
  appId: "1:362474185294:web:7ff457291b800307f6d91f"
};

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp);

export { db }