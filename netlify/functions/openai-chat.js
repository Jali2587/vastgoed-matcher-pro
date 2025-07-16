// Netlify Function voor OpenAI API calls
const { Configuration, OpenAIApi } = require('openai');

exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse request body
    const { prompt, type, data } = JSON.parse(event.body);

    // Check for OpenAI API key
    if (!process.env.OPENAI_API_KEY) {
      console.log('OpenAI API key not found, using mock data');
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          data: getMockResponse(type),
          source: 'mock'
        })
      };
    }

    // Configure OpenAI
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    // Create system prompts based on type
    const systemPrompts = {
      investor_analysis: `Je bent een AI vastgoed expert. Analyseer dit investeerder profiel en geef gestructureerde insights over financiële sterkte, risico appetijt, markt kennis, preferred sectors, investment strategy, recommendations, behavior profile, investment timeline en market sentiment. Antwoord in het Nederlands.`,
      
      deal_analysis: `Je bent een AI vastgoed expert. Analyseer deze vastgoed deal en geef gestructureerde insights over market position, project type analysis, competitive analysis, risk factors, opportunities, price analysis, recommendation, market trends, demographic analysis en future outlook. Antwoord in het Nederlands.`,
      
      smart_matching: `Je bent een AI matchmaking expert voor vastgoed. Analyseer de match tussen deze investeerder en deal. Geef een match score (0-100), reasoning factors, AI recommendations, timing advice, negotiation strategy en success probability. Antwoord in het Nederlands.`,
      
      market_insights: `Je bent een AI markt analist voor internationaal vastgoed. Geef insights over regionale trends, price forecasts en best opportunities voor Nederland, Duitsland, Frankrijk, Spanje en Zwitserland. Antwoord in het Nederlands.`
    };

    const systemPrompt = systemPrompts[type] || systemPrompts.investor_analysis;
    
    // Create user prompt
    let userPrompt = prompt;
    if (data) {
      userPrompt += `\n\nData: ${JSON.stringify(data)}`;
    }

    // Call OpenAI API
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    const aiResponse = completion.data.choices[0].message.content;
    
    // Parse AI response into structured format
    const structuredResponse = parseAIResponse(aiResponse, type);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        data: structuredResponse,
        source: 'openai'
      })
    };

  } catch (error) {
    console.error('OpenAI API error:', error);
    
    // Return mock data on error
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        data: getMockResponse(type),
        source: 'mock_fallback',
        error: error.message
      })
    };
  }
};

// Parse AI response into structured format
function parseAIResponse(response, type) {
  // Voor nu gebruiken we mock data als fallback
  // In productie zou je hier de AI response parsen
  return getMockResponse(type);
}

// Mock responses
function getMockResponse(type) {
  const mockResponses = {
    investor_analysis: {
      financialStrength: 'Hoog - Stabiele inkomstenbron via vastgoedbeleggingen',
      riskAppetite: 'Gemiddeld tot hoog - Ervaren investeerder met diversified portfolio',
      marketKnowledge: 'Goed - Actief in Nederlandse vastgoedmarkt sinds 2015',
      preferredSectors: ['Residentieel', 'Commercieel retail'],
      projectTypePreference: ['Turn-key', 'Renovatie'],
      investmentStrategy: 'Buy-and-hold met focus op cashflow generatie',
      recommendations: 'Geschikt voor deals met stabiele huurinkomsten en potentieel voor waardestijging',
      behaviorProfile: 'Voorzichtige beslisser, graag veel informatie vooraf',
      investmentTimeline: 'Zoekt deals voor Q2-Q3 2024',
      marketSentiment: 'Positief over vastgoedmarkt, maar voorzichtig met nieuwe projecten'
    },
    deal_analysis: {
      marketPosition: 'Aantrekkelijk - Locatie in groeiende wijk met goede bereikbaarheid',
      projectTypeAnalysis: 'Turn-key voordeel: Direct rendement, lagere ontwikkelingsrisico\'s',
      competitiveAnalysis: 'Vergelijkbare panden in de buurt hebben 5-7% rendement',
      riskFactors: ['Mogelijke leegstand bij huurwisseling', 'Onderhoudskosten oudere panden'],
      opportunities: ['Huurverhoging mogelijk door renovatie', 'Waardestijging door buurtverbetering'],
      priceAnalysis: 'Marktconform geprijsd, kleine onderhandelingsruimte',
      recommendation: 'Aanbevolen voor conservatieve tot gemiddelde risico investeerders',
      marketTrends: 'Prijzen in dit gebied stijgen 3-5% per jaar',
      demographicAnalysis: 'Populair bij young professionals en small families',
      futureOutlook: 'Positieve ontwikkeling verwacht door infrastructuurprojecten'
    },
    smart_matching: {
      matchScore: 87,
      reasoningFactors: [
        'Budget perfect match (€350k binnen €100k-€500k range)',
        'Locatie voorkeur Amsterdam komt overeen',
        'Risicoprofiel past bij deal karakteristieken',
        'Verwacht rendement 5.5% boven minimum van 4%'
      ],
      aiRecommendations: [
        'Benadruk stabiele huurinkomsten in pitch',
        'Vermeld renovatiepotentieel voor waardestijging',
        'Deel marktanalyse van vergelijkbare panden',
        'Toon demografische trends in de buurt'
      ],
      timingAdvice: 'Optimaal moment - investeerder recent actief in vergelijkbare deals',
      negotiationStrategy: 'Start met asking price, investeerder waardeert transparantie',
      successProbability: 0.72
    },
    market_insights: {
      regionalTrends: {
        'Nederland': { growth: 4.2, hotspots: ['Amsterdam', 'Rotterdam'], outlook: 'Positief' },
        'Duitsland': { growth: 3.8, hotspots: ['Berlijn', 'München'], outlook: 'Stabiel' },
        'Frankrijk': { growth: 5.1, hotspots: ['Parijs', 'Lyon'], outlook: 'Zeer positief' },
        'Spanje': { growth: 6.2, hotspots: ['Madrid', 'Barcelona'], outlook: 'Zeer positief' },
        'Zwitserland': { growth: 2.8, hotspots: ['Zürich', 'Genève'], outlook: 'Conservatief' }
      },
      priceForecasts: {
        'Amsterdam': '+3.5% next 12 months',
        'Berlijn': '+2.8% next 12 months',
        'Parijs': '+4.2% next 12 months',
        'Madrid': '+5.1% next 12 months',
        'Zürich': '+1.8% next 12 months'
      },
      bestOpportunities: [
        'Studentenhuisvesting in universiteitssteden',
        'Duurzame nieuwbouw in groeikernen',
        'Herbestemming kantoren naar woningen',
        'Vakantievastgoed in Spanje',
        'Luxe vastgoed in Zwitserse steden'
      ]
    }
  };
  
  return mockResponses[type] || mockResponses.investor_analysis;
}
