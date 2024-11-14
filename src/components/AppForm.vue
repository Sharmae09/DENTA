<template>
  <v-responsive class="align-center mx-auto" max-width="900">
    <form @submit.prevent="submit">
      <!-- ? BOOK APPOINTMENT -->
      <v-container class="fill-height">
        <h1>Pick a date</h1>
        <v-card class="mx-auto" max-width="328" rounded="lg" border>
          <v-confirm-edit v-model="date">
            <template v-slot:default="{ model: proxyModel, actions }">
              <v-date-picker
                v-model="proxyModel.value"
                :allowed-dates="allowedDates"
                min="2024-11-14"
                max="2024-11-21"
              >
                <template v-slot:actions>
                  <component :is="actions"></component>
                </template>
              </v-date-picker>
            </template>
          </v-confirm-edit>
        </v-card>

        <h1>Select a time</h1>

        <v-row class="d-flex justify-center">
          <!-- Loop through the time slots data and display two cards per row -->
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
      </v-container>

      <!-- concern -->
      <h1>Concern/s</h1>
      <v-text-field
        v-model="concern.value.value"
        :placeholder="'(natanggal na bracket, naputol na wire etc)'"
        :counter="10"
        :error-messages="concern.errorMessage"
        label="Pls type your concern here "
        style="height: 200px"
      ></v-text-field>

      <!-- Option 1 -->
      <v-checkbox
        v-model="procedure.value"
        :error-messages="procedure.errorMessage"
        label="Option 1: Wire removal"
        value="1"
      ></v-checkbox>

      <!-- Option 2 -->
      <v-checkbox
        v-model="procedure.value"
        :error-messages="procedure.errorMessage"
        label="Option 2: Fixing bracket"
        value="2"
      ></v-checkbox>

      <!-- Option 3 -->
      <v-checkbox
        v-model="procedure.value"
        :error-messages="procedure.errorMessage"
        label="Option 3: Check system"
        value="3"
      ></v-checkbox>
      <!-- Submit Button -->
      <v-btn class="me-4" type="submit">Submit</v-btn>
      <v-btn @click="handleReset">Clear</v-btn>
    </form>
  </v-responsive>
</template>

<script setup>
import { ref } from "vue";
import { useField, useForm } from "vee-validate";
import * as Yup from "yup";

import { shallowRef } from "vue";

const date = shallowRef();
const times = [
  "09:00AM - 10:00AM",
  "10:00AM - 11:00AM",
  "11:00AM - 12:00PM",
  "12:00PM - 01:00PM",
  "01:00PM - 02:00PM",
  "02:00PM - 03:00PM",
  "03:00PM - 04:00PM",
];

// Define validation schema using Yup
const validationSchema = Yup.object({
  concern: Yup.string()
    .min(2, "concern needs to be at least 2 characters.")
    .required(),
  procedure: Yup.boolean().oneOf([true], "Must be checked."),
});

// Initialize form
const { handleSubmit, handleReset } = useForm({
  validationSchema,
});

// Define form fields
const concern = useField("concern");
const procedure = useField("procedure");

// Items for select dropdown
const procedureitems = ref(["Item 1", "Item 2", "Item 3", "Item 4"]);

// Submit handler
const submit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2));
});
</script>
