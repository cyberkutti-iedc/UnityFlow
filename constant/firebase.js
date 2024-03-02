
import { initializeApp } from 'firebase/app';

import { getAuth} from 'firebase/auth';


import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyA74blNWknlZxgHhyl_20C8Rr69ZXT6D5Y",
    authDomain: "unityflow-dadda.firebaseapp.com",
    projectId: "unityflow-dadda",
    storageBucket: "unityflow-dadda.appspot.com",
    messagingSenderId: "127300077353",
    appId: "1:127300077353:web:b36dccf9f9df124dcad938"
  };


//Initialize Firebase app
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);

 