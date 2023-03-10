import { initializeApp } from "firebase/app"
import { getAuth,onAuthStateChanged,signOut } from "firebase/auth";
import {  
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  getDoc,
  setDoc,
  query,
  where,
} from "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyBHMpeiDdc3nTXz_xXhMTAchwLPAT5B54E",
    authDomain: "easy-automation-e4326.firebaseapp.com",
    projectId: "easy-automation-e4326",
    storageBucket: "easy-automation-e4326.appspot.com",
    messagingSenderId: "545105394712",
    appId: "1:545105394712:web:fe8a4128d5efe110ed576d",
    measurementId: "G-Q9P0VHY45S"
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

export { auth,db,getFirestore,doc,onSnapshot,getDoc,collection,onAuthStateChanged,signOut};

//Obtenemos los documentos de las colecciones (Rooms/Devices) de manera estática
export const dameDocs = (ref)=> getDocs(collection(db,ref))

//Obtenemos los documentos filtrados por campo y valor
export const dameDocsFiltro = async (ref, campo, valor) => {
  const querySnapshot = await getDocs(query(collection(db, ref), where(campo,"==", valor)));
  //Esto retorna un array vacío si no encuentra resultados en la query
  return querySnapshot.empty ? [] : querySnapshot.docs.map((doc) => doc.data());
}

// Actualiza los documentos filtrados por campo y valor con un objeto de datos nuevo
export const actualizaDocsFiltro = async (ref, campo, valor, newData) => {
  const querySnapshot = await getDocs(query(collection(db, ref), where(campo, "==", valor)))
  querySnapshot.forEach((doc) => {
    updateDoc(doc.ref, newData)
  })
}

export const borraDocsFiltro = async (ref, campo, valor) => {
  const querySnapshot = await getDocs(query(collection(db, ref), where(campo, '==', valor)))
  querySnapshot.forEach((doc) => {
    deleteDoc(doc.ref)
  })
}


//Obtenemos los documentos de las colecciones (Room/Devices) de manera dinámica
export const giveCollection = (ref, callback) => onSnapshot(collection(db,ref), callback)


//Añadimos un nuevo documento a las colecciones
export const anadir = (ref, reserva) => addDoc(collection(db,ref),reserva)

//Eliminamos un documento
export const borraDoc = (ref, id) => deleteDoc(doc(db,ref,id))

//Buscamos un documento para su posterior modificación
export const dameDoc = (ref,id) => getDoc(doc(db,ref,id))

//Actualizamos un documento entero
export const actualizaDoc = (ref,id,objeto) => setDoc(doc(db,ref,id), objeto)

//Actualizamos un campo de un documento
export const actualizaFieldDoc = (ref, id, objeto) =>updateDoc(doc(db,ref,id),objeto)

//Cambios de documento
export const onCambioDoc = (ref, id, callback) => onSnapshot(doc(db, ref, id), callback)
