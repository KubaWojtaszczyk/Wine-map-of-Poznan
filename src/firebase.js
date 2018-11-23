import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyBvgxV1oiT8LPn4UAwofr2dF5feuRetEZw",
    authDomain: "wine-map-of-poznan.firebaseapp.com",
    databaseURL: "https://wine-map-of-poznan.firebaseio.com",
    projectId: "wine-map-of-poznan",
    storageBucket: "wine-map-of-poznan.appspot.com",
    messagingSenderId: "1056000917767"
};
firebase.initializeApp(config);
const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);

export {db}
export default firebase;



