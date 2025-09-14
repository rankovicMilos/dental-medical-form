# Email Service Setup Guide

This guide explains how to set up and use the email service for the dental medical form application.

## Architecture

The email service consists of:

- **Frontend**: React form (`src/form/FormRenderer.tsx`) that submits form data
- **Backend**: Express.js server (`server/server.js`) that sends emails using Nodemailer
- **Email Provider**: Gmail, Outlook, or other SMTP service

## Setup Instructions

### 1. Install Dependencies

Backend dependencies are already installed. If you need to reinstall:

```powershell
cd server
npm install
```

### 2. Configure Email Credentials

1. Copy the example environment file:

```powershell
cd server
copy .env.example .env
```

2. Edit `.env` file with your email credentials:

#### For Gmail:

```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
RECIPIENT_EMAIL=dentist@clinic.com
PORT=3001
```

**Important for Gmail**:

- Enable 2-factor authentication
- Generate an "App Password" (not your regular password)
- Use the app password in EMAIL_PASSWORD

#### For Outlook:

```env
EMAIL_SERVICE=outlook
EMAIL_USER=your-email@outlook.com
EMAIL_PASSWORD=your-password
RECIPIENT_EMAIL=dentist@clinic.com
PORT=3001
```

### 3. Start the Services

#### Start Backend Email Service:

```powershell
cd server
npm start
```

Or for development with auto-restart:

```powershell
cd server
npm run dev
```

#### Start Frontend (in a new terminal):

```powershell
# From the main project directory
npm run dev
```

### 4. Test the Email Service

#### Health Check:

Visit: http://localhost:3001/api/health

#### Test Email:

```powershell
curl -X POST http://localhost:3001/api/test-email
```

Or use the test endpoint to verify email sending works.

## API Endpoints

### `POST /api/send-form`

Sends the medical form data via email.

**Request Body:**

```json
{
  "formData": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com"
    // ... other form fields
  },
  "lang": "en"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Form submitted and email sent successfully",
  "messageId": "email-message-id"
}
```

### `GET /api/health`

Health check endpoint to verify the service is running.

### `POST /api/test-email`

Sends a test email to verify email configuration.

## Email Template

The email includes:

- **Personal Information**: Name, date of birth, phone, email
- **Emergency Contact**: Name, phone, relationship
- **Medical History**: All medical conditions, medications, surgeries
- **Referral Information**: How patient found the clinic
- **Consent**: HIPAA and treatment consent status
- **Form Language**: Language used to fill the form
- **Submission Timestamp**: When the form was submitted

## Troubleshooting

### Common Issues:

1. **Gmail Authentication Error**

   - Make sure 2FA is enabled
   - Use App Password, not regular password
   - Check if "Less secure app access" is disabled (should be)

2. **Connection Refused**

   - Ensure backend server is running on port 3001
   - Check firewall settings
   - Verify the frontend is calling the correct URL

3. **Email Not Received**

   - Check spam/junk folder
   - Verify RECIPIENT_EMAIL in .env file
   - Check email service logs in terminal

4. **CORS Issues**
   - The server includes CORS middleware for cross-origin requests
   - If issues persist, check browser console for CORS errors

### Logs

The backend server logs all email sending attempts to the console:

- Successful sends show the message ID
- Errors show detailed error messages

## Security Considerations

1. **Never commit .env file** - It contains sensitive credentials
2. **Use App Passwords** - More secure than regular passwords
3. **Limit email recipient** - Set specific recipient email addresses
4. **Validate input** - Server validates form data before sending

## Production Deployment

For production:

1. Use environment variables instead of .env file
2. Configure proper SMTP settings for production email service
3. Add rate limiting to prevent spam
4. Add authentication/authorization if needed
5. Use HTTPS for secure data transmission
6. Consider using email queue for better reliability
