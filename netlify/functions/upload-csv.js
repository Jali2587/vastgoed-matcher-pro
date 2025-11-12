const { parse } = require('papaparse');

exports.handler = async (event) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { csvData, userId } = JSON.parse(event.body);
    
    if (!csvData || !userId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing CSV data or user ID' })
      };
    }

    // Parse CSV data
    const results = parse(csvData, {
      header: true,
      skipEmptyLines: true
    });

    const contacts = results.data.map(row => ({
      firstName: row['First Name'] || row['Voornaam'] || '',
      lastName: row['Last Name'] || row['Achternaam'] || '',
      email: row['Email Address'] || row['E-mailadres'] || '',
      company: row['Company'] || row['Bedrijf'] || '',
      position: row['Position'] || row['Functie'] || '',
      phone: row['Phone'] || row['Telefoon'] || '',
      linkedin: row['LinkedIn'] || row['URL'] || '',
      contactType: 'investor', // default
      owner_id: userId,
      created_at: new Date().toISOString()
    })).filter(contact => contact.firstName && contact.lastName);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: `Successfully parsed ${contacts.length} contacts`,
        contacts: contacts.slice(0, 10) // Return first 10 for preview
      })
    };

  } catch (error) {
    console.error('CSV upload error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to process CSV: ' + error.message })
    };
  }
};
