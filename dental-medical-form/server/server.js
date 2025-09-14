const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD, // Use app password for Gmail
  },
});

// Format patient data for email
const formatPatientDataForEmail = (data) => {
  console.log("Formatting patient data for email:", data);
  const { formData, lang } = data;

  // Helper function to format array values
  const formatArray = (arr) => {
    if (!arr || !Array.isArray(arr)) return "None";
    return arr.length > 0 ? arr.join(", ") : "None";
  };

  // Helper function to format boolean values
  const formatBoolean = (value) => (value ? "Yes" : "No");

  return `
    <h2>New Dental Medical Form Submission</h2>
    
    <h3>Personal Information</h3>
    <ul>
      <li><strong>Name:</strong> ${formData.firstName || "Not provided"} ${
    formData.lastName || ""
  }</li>
      <li><strong>Date of Birth:</strong> ${
        formData.dateOfBirth || "Not provided"
      }</li>
      <li><strong>Phone:</strong> ${formData.phone || "Not provided"}</li>
      <li><strong>Email:</strong> ${formData.email || "Not provided"}</li>
    </ul>
    
    <h3>Medical History</h3>
    <ul>
      <li><strong>Epilepsy:</strong> ${formatBoolean(formData.epilepsy)}</li>
      <li><strong>Jaundice:</strong> ${formatBoolean(formData.jaundice)}</li>
      <li><strong>Hypertension:</strong> ${formatBoolean(
        formData.hypertension
      )}</li>
      <li><strong>Past Illnesses:</strong> ${formatArray(
        formData.pastIllnesses
      )}</li>
      <li><strong>Chronic Diseases:</strong> ${formatArray(
        formData.chronicDiseases
      )}</li>
      <li><strong>Implants:</strong> ${formatArray(formData.implants)}</li>
      <li><strong>Infection History:</strong> ${formatArray(
        formData.infectionHistory
      )}</li>
      <li><strong>Bleeds Longer After Cuts:</strong> ${formatBoolean(
        formData.cut_bleed
      )}</li>
      <li><strong>Allergies:</strong> ${formatArray(formData.allergies)}</li>
      <li><strong>Bleeding Disorders:</strong> ${formatArray(
        formData.bleedingDisorders
      )}</li>
      <li><strong>Excessive Blood Clotting:</strong> ${formatBoolean(
        formData.blood_clot
      )}</li>
      <li><strong>Bronchial Asthma:</strong> ${formatBoolean(
        formData.asthma
      )}</li>
      <li><strong>Tuberculosis History:</strong> ${formatArray(
        formData.tuberculosisHistory
      )}</li>
      <li><strong>Peptic Ulcer Sites:</strong> ${formatArray(
        formData.pepticUlcerSites
      )}</li>
      <li><strong>Other Diseases:</strong> ${
        formData.otherDiseases || "None"
      }</li>
      <li><strong>Current Medications:</strong> ${
        formData.medications || "None"
      }</li>
      <li><strong>Surgeries History:</strong> ${
        formData.surgeries || "None"
      }</li>
      <li><strong>Cigarettes Per Day:</strong> ${
        formData.cigarettes ?? "Not specified"
      }</li>
      <li><strong>Drinks Alcohol Daily:</strong> ${formatBoolean(
        formData.alcohol
      )}</li>
      <li><strong>Uses Drugs:</strong> ${formatBoolean(formData.drugs)}</li>
    </ul>
    
    <h3>Consent</h3>
    <ul>
      <li><strong>HIPAA Consent:</strong> ${formatBoolean(
        formData.hipaaConsent
      )}</li>
      <li><strong>Treatment Consent:</strong> ${formatBoolean(
        formData.treatmentConsent
      )}</li>
    </ul>
    
    ${
      formData.signature
        ? "<h3>Signature</h3><p>Digital signature provided</p>"
        : ""
    }
    
    <p><strong>Form Language:</strong> ${lang}</p>
    <p><strong>Submitted on:</strong> ${new Date().toLocaleString()}</p>
  `;
};

// Email sending endpoint
app.post("/api/send-form", async (req, res) => {
  try {
    const { formData, lang } = req.body;
    console.log("Received form data:", formData, "Language:", lang);

    if (!formData) {
      return res.status(400).json({
        success: false,
        message: "Form data is required",
      });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL || "dentist@example.com",
      subject: `New Dental Medical Form - ${formData.firstName || "Unknown"} ${
        formData.lastName || "Patient"
      }`,
      html: formatPatientDataForEmail({ formData, lang }),
      replyTo: formData.email,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent successfully:", info.messageId);

    res.json({
      success: true,
      message: "Form submitted and email sent successfully",
      messageId: info.messageId,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send email",
      error: error.message,
    });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Email service is running",
    timestamp: new Date().toISOString(),
  });
});

// Test email endpoint
app.post("/api/test-email", async (req, res) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL || "test@example.com",
      subject: "Test Email from Dental Form Service",
      html: "<h2>Test Email</h2><p>This is a test email to verify the email service is working.</p>",
    };

    const info = await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: "Test email sent successfully",
      messageId: info.messageId,
    });
  } catch (error) {
    console.error("Error sending test email:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send test email",
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Email service running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
