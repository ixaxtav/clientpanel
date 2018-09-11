import {createStore, combineReducers, compose} from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer} from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer} from 'redux-firestore';
// Reducers
// to-2do

const firebaseConfig = {
    apiKey: "AIzaSyAvdhp6C9tnECcwd1-6h6ZSiORV2yHO9A0",
    authDomain: "reactclientpanel-6fb48.firebaseapp.com",
    databaseURL: "https://reactclientpanel-6fb48.firebaseio.com",
    projectId: "reactclientpanel-6fb48",
    storageBucket: "reactclientpanel-6fb48.appspot.com",
    messagingSenderId: "978654224884"
};

//react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// init firebase instace
firebase.initializeApp(firebaseConfig);
// init firestore
const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), 
  reduxFirestore(firebase) 
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

const initialState = {};

const store = createStoreWithFirebase(
    rootReducer,
    initialState,
    compose(
        reactReduxFirebase(firebase),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        ));

export default store;