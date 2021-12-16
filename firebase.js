import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCBmL7O7s6IyUGdejc1FhhTWls7oapiWPA',
  authDomain: 'itechlib-332018.firebaseapp.com',
  projectId: 'itechlib-332018',
  storageBucket: 'itechlib-332018.appspot.com',
  messagingSenderId: '712390560273',
  appId: '1:712390560273:web:70d28fd53d119a64cb3fb0',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore()

export { db }
