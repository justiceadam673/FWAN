// src/utils/VehicleSimulator.js
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../FireBaseConfig";

// Simulated polyline (mock route)
const route = [
  { lat: 9.8965, lng: 8.8583 }, // Start
  { lat: 9.8968, lng: 8.859 },
  { lat: 9.8972, lng: 8.86 },
  { lat: 9.8975, lng: 8.861 },
  { lat: 9.8979, lng: 8.8625 }, // Destination
];

let index = 0;

export const startVehicleSimulation = (orderId) => {
  const interval = setInterval(async () => {
    if (index >= route.length) {
      clearInterval(interval);
      await updateDoc(doc(db, "vehicleTracking", orderId), {
        status: "arrived",
      });
      return;
    }

    const currentPosition = route[index];
    await updateDoc(doc(db, "vehicleTracking", orderId), {
      location: currentPosition,
    });

    index++;
  }, 5000); // every 5 sec
};
