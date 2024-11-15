<template>
  <v-responsive class="align-center mx-auto" max-width="900">
    <form @submit.prevent="submit">
      <!-- ? BOOK APPOINTMENT -->
      <h1>Pick a date</h1>
      <v-container class="fill-height">
        <v-text-field
          v-model="selectedDate"
          label="Select Date"
          readonly
          prepend-inner-icon="mdi-calendar"
          @click:prepend-inner="showDatePicker = true"
        >
        </v-text-field>

        <!-- Date Picker Dialog -->
        <v-dialog v-model="showDatePicker" persistent width="290px">
          <v-card>
            <v-date-picker
              v-model="appDate.value"
              :allowed-dates="allowedDates"
              min="2024-11-14"
              max="2024-11-21"
            >
              <!-- ! HERE IS WHERE IT GOES WRONG -->
              <template v-slot:actions>
                <component
                  :is="(actions = { confirmDate, showDatePicker })"
                ></component>
                <v-btn text @click="confirmDate">OK</v-btn>
                <v-btn text @click="showDatePicker = false">Cancel</v-btn>
              </template>
            </v-date-picker>
          </v-card>
        </v-dialog>
      </v-container>

      <h1>Select a time</h1>
      <v-row class="d-flex justify-center">
        <!--? Loop through the time slots data and display two cards per row -->
        <v-col
          v-for="(time, index) in times"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          class="my-2"
        >
          <v-card class="mx-auto centered-card" max-width="344" link>
            <v-card-title class="text-center">
              {{ time }}
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>

      <h1>Concern/s</h1>

      <v-container class="">
        <v-text-field
          v-model="concern.value.value"
          :placeholder="'(natanggal na bracket, naputol na wire etc)'"
          :error-messages="concern.errorMessage"
          label="Pls type your concern here "
          style="height: 100px"
        ></v-text-field>
      </v-container>

      <h1>Procedures</h1>
      <v-container fluid>
        <v-checkbox
          v-for="(item, index) in procedureItems"
          :key="index"
          v-model="selectedProcedures"
          :value="item"
          :label="`Option ${index + 1}: ${item}`"
        ></v-checkbox>
      </v-container>
      <!-- Submit Button -->
      <v-btn class="me-4" type="submit">Submit</v-btn>
      <v-btn @click="handleReset">Clear</v-btn>
    </form>
  </v-responsive>
</template>

<script setup>
import { ref } from "vue";
import * as Yup from "yup";
import { db } from "@/main";
import { useField, useForm } from "vee-validate";
import { collection, addDoc } from "firebase/firestore";

// Reactive References
const selectedDate = ref(""); // The displayed date in the text field
const showDatePicker = ref(false); // Controls visibility of the date picker
const appDate = ref({ value: null }); // Model for date picker

// Date range filter
// !! Get min and max date from database
const allowedDates = (date) => {
  const minDate = new Date("2024-11-14");
  const maxDate = new Date("2024-11-21");
  const currentDate = new Date(date);
  return currentDate >= minDate && currentDate <= maxDate;
};

// Confirm the selected date and update the text field
const confirmDate = () => {
  if (appDate.value.value) {
    selectedDate.value = appDate.value.value;
    showDatePicker.value = false;
  }
};

// ? EDIT THIS SUCH THAT THE DATA COMES FROM FIREBASE
const times = [
  "09:00AM - 10:00AM",
  "10:00AM - 11:00AM",
  "11:00AM - 12:00PM",
  "12:00PM - 01:00PM",
  "01:00PM - 02:00PM",
  "02:00PM - 03:00PM",
  "03:00PM - 04:00PM",
];

const selectedProcedures = ref([]);

// Items for select dropdown
// ? EDIT THIS SUCH THAT THE DATA COMES FROM FIREBASE
const procedureItems = ref([
  "Ortho adjustment",
  "Tooth Extraction",
  "Cleaning",
]);

// Define validation schema using Yup
const validationSchema = Yup.object({
  concern: Yup.string(),
  procedure: Yup.boolean().oneOf([true], "Must be checked."),
});

// Initialize form
const { handleSubmit, handleReset } = useForm({
  validationSchema,
});

// Define form fields
const concern = useField("concern");

// Submit handler
// Submit name of the user as well
const submit = handleSubmit(async (values) => {
  // selectedDate: values.selectedDate,

  try {
    const procedures = selectedProcedures.value || [];
    // Reference to the Firestore collection
    const docRef = await addDoc(collection(db, "appointment"), {
      date: selectedDate.value,
      selectedProcedures: procedures,
      concern: values.concern,
    });

    alert(`Data submitted successfully! Document ID: ${docRef.id}`);
  } catch (e) {
    console.error("Error adding document: ", e);
    alert("Failed to submit data. Please try again.");
  }
  console.log("Submitting data:", {
    selectedDate: selectedDate.value,
    selectedProcedures: selectedProcedures.value,
    concern: values.concern,
  });
});
</script>
