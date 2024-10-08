/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});

admin.initializeApp();

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


exports.getUserStats = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const usersSnapshot = await admin.firestore().collection("users").get();

      const stats = {
        countries: {},
        ageDistribution: {},
      };

      usersSnapshot.forEach((doc) => {
        const userData = doc.data();
        const country = userData.country || "Not Provided";
        let age = userData.age || "Not Provided";

        if (!stats.countries[country]) {
          stats.countries[country] = 0;
        }
        stats.countries[country] += 1;

        let ageRange = null;
        if (age !== "Not Provided" && !isNaN(age)) {
          age = parseInt(age);
          if (age <= 18) ageRange = "0-18";
          else if (age <= 25) ageRange = "19-25";
          else if (age <= 35) ageRange = "26-35";
          else if (age <= 50) ageRange = "36-50";
          else ageRange = "51+";
        }

        if (ageRange) {
          if (!stats.ageDistribution[ageRange]) {
            stats.ageDistribution[ageRange] = 0;
          }
          stats.ageDistribution[ageRange] += 1;
        }
      });

      res.status(200).send({
        countries: stats.countries,
        ageDistribution: stats.ageDistribution,
      });
    } catch (error) {
      console.error("Error fetching user stats:", error);
      res.status(500).send("Internal Server Error");
    }
  });
});

