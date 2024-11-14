<template>
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
</template>

<script setup>
// Define the time slots array

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
</script>
<!-- <script setup>
import { ref } from "vue";

// Define the time slots array
const times = [
  "09:00AM - 10:00AM",
  "10:00AM - 11:00AM",
  "11:00AM - 12:00PM",
  "12:00PM - 01:00PM",
  "01:00PM - 02:00PM",
  "02:00PM - 03:00PM",
  "03:00PM - 04:00PM",
];

// Define a date state using ref
const date = ref(new Date("2018-03-02"));

// Define allowedDates function
const allowedDates = (val) => {
  // Using the date in ISO format, check if the day is even
  const day = parseInt(val.split("-")[2], 10);
  return day % 2 === 0;
};
</script> -->

<style scoped>
.centered-card {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
