// functions/updateVehicleLocation.js
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.updateVehicleLocation = functions.pubsub
  .schedule("every 2 minutes")
  .onRun(async () => {
    const vehicleRef = admin
      .firestore()
      .collection("vehicles")
      .doc("vehicle-001");

    const fakeRoute = [
      { lat: 9.8965, lng: 8.8583 },
      { lat: 9.901, lng: 8.862 },
      { lat: 9.9065, lng: 8.8655 },
      { lat: 9.91, lng: 8.87 },
    ];

    const randomLocation =
      fakeRoute[Math.floor(Math.random() * fakeRoute.length)];

    await vehicleRef.update({
      currentLocation: randomLocation,
      lastUpdated: admin.firestore.Timestamp.now(),
    });

    return null;
  });
