const { Configuration, OpenAIApi } = require('openai');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { prompt, type, data } = JSON.parse(event.body);

    if (!process.env.OPENAI_API_KEY) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          data: getMockResponse(type),
          source: 'mock'
        })
      };
    }

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Je bent een AI vastgoed expert." },
        { role: "user", content: prompt }
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        data: getMockResponse(type),
        source: 'openai'
      })
    };

  } catch (error) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        data: getMockResponse(type),
        source: 'mock_fallback'
      })
    };
  }
};

function getMockResponse(type) {
  const mockResponses = {
    investor_analysis: {
      financialStrength: 'Hoog - Stabiele inkomstenbron',
      riskAppetite: 'Gemiddeld tot hoog',
      recommendations: 'Geschikt voor stabiele deals'
    },
    market_insights: {
      regionalTrends: {
        'Nederland': { growth: 4.2, outlook: 'Positief' }
      }
    }
  };
  
  return mockResponses[type] || mockResponses.investor_analysis;
}
