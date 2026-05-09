import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCEaObg2EeaB9YohagqxL8PTNEcCgLhGWo",
  authDomain: "page-chat-375a9.firebaseapp.com",
  projectId: "page-chat-375a9",
  storageBucket: "page-chat-375a9.firebasestorage.app",
  messagingSenderId: "200287332598",
  appId: "1:200287332598:web:680425c8bdd05c8c4224d7",
  measurementId: "G-LEWTV33P6H"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Referencias a elementos del DOM
const inputMensaje = document.getElementById("mensaje");
const btnEnviar = document.getElementById("btnEnviar");
const contenedorChat = document.getElementById("chat");

// Función para enviar mensajes
const enviarMensaje = async () => {
  // Envía directamente lo que haya en el input a la colección "mensajes"
  await addDoc(collection(db, "mensajes"), {
    texto: inputMensaje.value
  });

  // Limpia el campo
  inputMensaje.value = "";
};

// Evento del botón
btnEnviar.addEventListener("click", enviarMensaje);

// Escuchar cambios en la base de datos en tiempo real
onSnapshot(collection(db, "mensajes"), (snapshot) => {
  contenedorChat.innerHTML = "";

  snapshot.forEach((doc) => {
    const p = document.createElement("p");
    p.textContent = doc.data().texto;
    contenedorChat.appendChild(p);
  });
});