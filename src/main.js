/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App
 */

// Plugins
import { registerPlugins } from "@/plugins";

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";
// import { loadFonts } from "./plugins/webfontloader";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase with configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOj8ALBQrce0pCJTpcBEaDue3WFnddqrU",
  authDomain: "vue-calendar-ee58a.firebaseapp.com",
  projectId: "vue-calendar-ee58a",
  storageBucket: "vue-calendar-ee58a.firebasestorage.app",
  messagingSenderId: "992149003667",
  appId: "1:992149003667:web:f8d1af75547390109c1c66",
};


// Initialize Firebase App
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(firebaseApp);

// Create Vue App
const vueApp = createApp(App);

// Register plugins (e.g., Vuetify, Vue Router, etc.)
registerPlugins(vueApp);

// Mount Vue App
vueApp.mount("#app");
