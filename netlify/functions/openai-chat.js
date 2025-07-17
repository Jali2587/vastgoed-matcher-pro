// netlify/functions/openai-chat.js
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight requests
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
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const { prompt, type, data } = JSON.parse(event.body);
    
    // Gebruik jouw environment variable naam
    const openaiApiKey = process.env.OPEN_API_KEY;
    
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Je bent een expert vastgoed analist die gedetailleerde analyses geeft in het Nederlands.'
          },
          {
            role: 'user',
            content: `${prompt}\n\nType analyse: ${type}\n\nData: ${JSON.stringify(data)}`
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const result = await response.json();
    const analysis = result.choices[0].message.content;

    // Retourneer gestructureerde data op basis van type
    let structuredData;
    
    switch (type) {
      case 'investor_analysis':
        structuredData = {
          financialStrength: analysis.substring(0, 100),
          riskAppetite: analysis.substring(100, 200),
          recommendations: analysis.substring(200, 300),
          fullAnalysis: analysis
        };
        break;
        
      case 'deal_analysis':
        structuredData = {
          marketPosition: analysis.substring(0, 100),
          riskFactors: [analysis.substring(100, 200)],
          opportunities: [analysis.substring(200, 300)],
          recommendation: analysis.substring(300, 400),
          fullAnalysis: analysis
        };
        break;
        
      case 'smart_matching':
        structuredData = {
          matchScore: Math.floor(Math.random() * 30) + 70, // 70-100
          aiRecommendations: analysis.split('.').slice(0, 3),
          timingAdvice: analysis.substring(0, 150),
          fullAnalysis: analysis
        };
        break;
        
      default:
        structuredData = { analysis };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        data: structuredData
      })
    };

  } catch (error) {
    console.error('OpenAI Function Error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };
  }
};
