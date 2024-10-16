/* eslint-disable max-len */
/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
// const logger = require('firebase-functions/logger')
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

admin.initializeApp();

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const bookCollection = admin.firestore().collection("books");
      const snapshot = await bookCollection.get();
      const count = snapshot.size;

      res.status(200).send({ count });
    } catch (error) {
      console.error("Error counting books: ", error.message);
      res.status(500).send("Error counting books");
    }
  });
});

exports.getAllBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const bookCollection = admin.firestore().collection("books");
      const snapshot = await bookCollection.get();

      const booklist = snapshot.docs.map((doc) => ({
        name: doc.data().name,
        isbn: doc.data().isbn,
      }));

      res.status(200).json({ booklist });
    } catch (error) {
      console.error("Error counting books: ", error.message);
      res.status(500).send("Error counting books");
    }
  });
});

exports.getWeather = onRequest((req, res) => {
  cors(req, res, async () => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");

    if (req.method === "OPTIONS") {
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
      res.writeHead(200);
      res.end();
      return;
    }

    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    const { q, city, lat, lon } = req.body;

    let url;
    if (q === "city" && city) {
      url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=db3fa359c8658445b7e1529836fa92ef`;
    } else if (q === "location" && lat && lon) {
      url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=db3fa359c8658445b7e1529836fa92ef`;
    } else {
      return res.status(400).send("Invalid query. Please provide either 'city' with a city name or 'location' with latitude and longitude.");
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data = await response.json();

      const weather = {
        city: data.name,
        country: data.sys.country,
        temperature: data.main.temp,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      };

      res.status(200).json({ weather });
    } catch (error) {
      console.error("Error getting weather: ", error.message);
      res.status(500).send(`Error getting weather: ${error.message}`);
    }
  });
});

