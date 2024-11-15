<template>
  <v-container class="">
    <v-responsive class="align-center mx-auto" max-width="900">
      <div>
        <v-sheet class="d-flex" height="54" tile>
          <v-select
            v-model="type"
            :items="types"
            class="ma-2"
            label="View Mode"
            variant="outlined"
            dense
            hide-details
          ></v-select>
          <v-select
            v-model="weekday"
            :items="weekdays"
            class="ma-2"
            label="select available dates"
            variant="outlined"
            dense
            hide-details
          ></v-select>
        </v-sheet>
        <v-sheet>
          <v-calendar
            ref="calendar"
            v-model="value"
            :events="events"
            :view-mode="type"
            :weekdays="weekday"
          ></v-calendar>
        </v-sheet>
      </div>
    </v-responsive>
  </v-container>
</template>
<script>
import { useDate } from "vuetify";
// Get the data from firestore
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/main"; // Adjust the import path as necessary

export default {
  data: () => ({
    today: [new Date().toISOString().substr(0, 10)],
    focus: [new Date().toISOString().substr(0, 10)],
    type: "month",
    types: ["month", "week", "day"],
    weekday: [0, 1, 2, 3, 4, 5, 6],
    weekdays: [
      { title: "Sun - Sat", value: [0, 1, 2, 3, 4, 5, 6] },
      { title: "Mon - Sun", value: [1, 2, 3, 4, 5, 6, 0] },
      { title: "Mon - Fri", value: [1, 2, 3, 4, 5] },
      { title: "Mon, Wed, Fri", value: [1, 3, 5] },
    ],
    value: [new Date()],
    events: [],
    colors: [
      "blue",
      "yellow",
      "red",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1",
    ],
    titles: [],
  }),
  mounted() {
    const adapter = useDate();

    this.getEvents({
      start: adapter.startOfDay(adapter.startOfMonth(new Date())),
      end: adapter.endOfDay(adapter.endOfMonth(new Date())),
    });
  },
  methods: {
    async getEvents({ start, end }) {
      const eventsCollection = collection(db, "appointment");
      const snapshots = await getDocs(eventsCollection);
      const events = [];

      // Process fetched documents from Firestore
      snapshots.forEach((doc) => {
        const appData = doc.data();

        // Ensure your Firestore data has 'Name' and 'Start' fields
        const eventTitle = appData.Name || "Untitled Event";
        const eventStart = appData.selectedDate
          ? appData.selectedDate.toDate()
          : new Date();
        const eventEnd = appData.End
          ? new Date(appData.End)
          : new Date(eventStart.getTime() + 2 * 3600000); // Default to 2 hours duration if 'End' is missing
        const eventColor =
          this.colors.length > 0
            ? this.colors[this.rnd(0, this.colors.length - 1)]
            : "blue";

        events.push({
          title: eventTitle,
          start: eventStart,
          end: eventEnd,
          color: eventColor,
          allDay: false, // Set this based on your appData if needed
        });
      });

      // Assign fetched events to your component's events array
      this.events = events;
    },

    getEventColor(event) {
      return event.color;
    },

    // Helper function to generate random numbers within a range
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
  },
};
</script>
