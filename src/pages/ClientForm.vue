<template>
  <v-responsive class="align-center mx-auto" max-width="900">
    <form @submit.prevent="submit">
      <!-- * Name -->
      <v-text-field
        v-model="name.value.value"
        :placeholder="''"
        :error-messages="name.errorMessage"
        label="Complete Name"
      ></v-text-field>

      <!-- ? Birthday -->
      <!-- ! Birthday -->
      <v-date-picker
        v-model="birthday.value.value"
        @input="birthdayMenu = false"
        :max="maxDate"
        scrollable
      ></v-date-picker>

      <!-- * Age -->
      <v-text-field
        v-model="age.value.value"
        color="primary"
        :placeholder="'Enter your age'"
        :error-messages="age.errorMessage"
        label="Age"
      ></v-text-field>

      <!-- ! Address -->
      <!-- SELECT PROVINCE -->
      <!-- SELECT CITY -->
      <!-- SELECT BARANGAY -->
      <!-- ? Address -->
      <v-text-field
        v-model="address.value.value"
        :placeholder="'Enter your address'"
        :error-messages="address.errorMessage"
        label="Address"
      ></v-text-field>

      <!-- * Phone -->
      <v-text-field
        v-model="phone.value.value"
        :placeholder="'ex: 09123456789'"
        :counter="11"
        :error-messages="phone.errorMessage"
        label="Phone Number"
      ></v-text-field>

      <!-- * Occupation -->
      <v-text-field
        v-model="occupation.value.value"
        :placeholder="'Ex. Student/Nurse'"
        :error-messages="occupation.errorMessage"
        label="Occupation"
      ></v-text-field>

      <!-- * Facebook Name -->
      <v-text-field
        v-model="fbName.value.value"
        :placeholder="'Enter your Facebook/Messenger Name'"
        :error-messages="fbName.errorMessage"
        label="Facebook/Messenger Name"
      ></v-text-field>

      <!-- * Email -->
      <v-text-field
        v-model="email.value.value"
        :placeholder="'Ex: juandelacruz@gmail.com'"
        :error-messages="email.errorMessage"
        label="E-mail"
      ></v-text-field>

      <!-- Submit Button -->
      <v-btn class="me-4" type="submit">Submit</v-btn>
      <v-btn @click="handleReset">Clear</v-btn>
    </form>
  </v-responsive>
</template>

<script setup>
import { ref } from "vue";
import { useField, useForm } from "vee-validate";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/main";

import * as Yup from "yup";

// Define validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name needs to be at least 2 characters.")
    .required(),
  age: Yup.number().min(1, "Age must be valid.").required(),
  birthday: Yup.date()
    .required("Birthday is required")
    .max(new Date(), "Birthday cannot be in the future"),
  address: Yup.string().required(),
  phone: Yup.string()
    .matches(/^\d{11}$/, "Phone number must be exactly 11 digits.")
    .required("Phone number is required."),
  occupation: Yup.string().required(),
  email: Yup.string().email("Must be a valid e-mail.").required(),
  fbName: Yup.string()
    .min(2, "Name needs to be at least 2 characters.")
    .required(),
});

// Initialize form
const { handleSubmit, handleReset } = useForm({
  validationSchema,
});

// Define form fields
const name = useField("name");
const age = useField("age");
const phone = useField("phone");
const email = useField("email");
const occupation = useField("occupation");
const fbName = useField("fbName");
const address = useField("address");
const birthday = useField("birthday");

// Date Picker Menu Control
const birthdayMenu = ref(false);
const maxDate = new Date().toISOString().split("T")[0]; // Today's date

// Submit handler
const submit = handleSubmit(async (values) => {
  try {
    // Reference to the Firestore collection
    const docRef = await addDoc(collection(db, "users"), {
      name: values.name,
      age: values.age,
      phone: values.phone,
      email: values.email,
      occupation: values.occupation,
      fbName: values.fbName,
      address: values.address,
      birthday: values.birthday,
    });

    alert(`Data submitted successfully! Document ID: ${docRef.id}`);
  } catch (e) {
    console.error("Error adding document: ", e);
    alert("Failed to submit data. Please try again.");
  }
});
</script>
