const https = require("http");

// Test data that matches your form structure
const testFormData = {
  firstName: "John",
  lastName: "Doe",
  dateOfBirth: "1990-01-01",
  phone: "+1234567890",
  email: "john.doe@example.com",
  emergencyName: "Jane Doe",
  emergencyPhone: "+0987654321",
  emergencyRelationship: "Spouse",
  hearAboutUs: "Google search",
  referralDetails: "Found through online search",
  medicalHistory: {
    epilepsy: false,
    jaundiceHistory: true,
    pastIllnesses: ["rheumaticFever"],
    chronicDiseases: ["diabetes"],
    implants: [],
    infectionHistory: ["herpesSimplex"],
    bleedsLongerAfterCuts: false,
    bleedingDisorders: [],
    hypercoagulableState: false,
    bronchialAsthma: true,
    tuberculosisHistory: [],
    pepticUlcerSites: [],
    otherDiseases: "Mild allergies",
    currentMedications: "Metformin, Inhaler",
    surgeriesHistory: "Appendectomy in 2015",
    cigarettesPerDay: 0,
    drinksAlcoholDaily: false,
    usesDrugs: false,
  },
  hipaaConsent: true,
  treatmentConsent: true,
};

const data = JSON.stringify({
  formData: testFormData,
  lang: "en",
});

const options = {
  hostname: "localhost",
  port: 3001,
  path: "/api/send-form",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": data.length,
  },
};

console.log("Testing email service...");
console.log(
  "Sending test form data to:",
  `http://${options.hostname}:${options.port}${options.path}`
);

const req = https.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  console.log(`Headers:`, res.headers);

  let responseData = "";
  res.on("data", (chunk) => {
    responseData += chunk;
  });

  res.on("end", () => {
    try {
      const result = JSON.parse(responseData);
      console.log("\nResponse:", result);

      if (result.success) {
        console.log("\n✅ SUCCESS: Email sent successfully!");
        console.log("Message ID:", result.messageId);
      } else {
        console.log("\n❌ FAILED:", result.message);
      }
    } catch (error) {
      console.log("\n❌ Error parsing response:", responseData);
    }
  });
});

req.on("error", (error) => {
  console.error("\n❌ Request failed:", error.message);
  console.log("\nMake sure the backend server is running on port 3001");
  console.log("Run: cd server && npm start");
});

req.write(data);
req.end();
