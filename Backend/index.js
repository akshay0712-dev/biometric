const express = require('express');
const xlsx = require('xlsx');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;
app.use(cors());

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Route to fetch data from Excel file
app.get('/data', (req, res) => {
  try {
    // Path to the Excel file
    // console.log(roll);
    
    const filePath = path.join(__dirname, 'biometric_data.xlsx');

    // Read the Excel file
    const workbook = xlsx.readFile(filePath);

    // Select the first sheet
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convert sheet data to JSON
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    // Log the data to console (for debugging purposes)
    console.log(jsonData);

    // Send the data as a response
    res.json(jsonData);
  } catch (error) {
    console.error('Error reading Excel file:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
