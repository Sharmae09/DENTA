<template>
  <div>
    <v-img
      class="mx-auto my-6"
      max-width="228"
      src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
    ></v-img>

    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <div class="text-subtitle-1 text-medium-emphasis">Account</div>

      <v-text-field
        v-model="email"
        density="compact"
        placeholder="Email address"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
      ></v-text-field>

      <div
        class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
      >
        Password
        <a
          class="text-caption text-decoration-none text-blue"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Forgot login password?</a
        >
      </div>

      <v-text-field
        v-model="password"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="togglePasswordVisibility"
      ></v-text-field>

      <v-card class="mb-12" color="surface-variant" variant="tonal">
        <v-card-text class="text-medium-emphasis text-caption">
          Warning: After 3 consecutive failed login attempts, your account will
          be temporarily locked for three hours. If you must login now, you can
          also click "Forgot login password?" below to reset the login password.
        </v-card-text>
      </v-card>

      <v-btn
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
        block
        @click="handleLogin"
      >
        Log In
      </v-btn>

      <v-btn
        class="mb-8"
        color="red"
        size="large"
        variant="tonal"
        block
        @click="handleGoogleLogin"
      >
        <v-icon left icon="mdi-google"></v-icon> Sign in with Google
      </v-btn>

      <v-card-text class="text-center">
        <a
          class="text-blue text-decoration-none"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "@/main";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOj8ALBQrce0pCJTpcBEaDue3WFnddqrU",
  authDomain: "vue-calendar-ee58a.firebaseapp.com",
  projectId: "vue-calendar-ee58a",
  storageBucket: "vue-calendar-ee58a.firebasestorage.app",
  messagingSenderId: "992149003667",
  appId: "1:992149003667:web:f8d1af75547390109c1c66",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Reactive state
const email = ref("");
const password = ref("");
const visible = ref(false);

// Toggle password visibility
const togglePasswordVisibility = () => {
  visible.value = !visible.value;
};

// Email and Password Login
const handleLogin = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Logged in user:", user);
      window.location.href = "ClientForm.vue";
    })
    .catch((error) => {
      console.error("Login failed:", error.message);
      alert(`Login error: ${error.message}`);
    });
};

// Google Login
const provider = new GoogleAuthProvider();
const handleGoogleLogin = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log("Google sign-in user:", user);
      window.location.href = "ClientForm";
    })
    .catch((error) => {
      console.error("Google sign-in failed:", error.message);
      alert(`Google sign-in error: ${error.message}`);
    });
};
</script>
