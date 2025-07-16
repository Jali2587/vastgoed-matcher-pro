const OpenAI = require('openai');

exports.handler = async (event, context) => {
  // CORS headers voor alle responses
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { 
      statusCode: 200, 
      headers, 
      body: '' 
    };
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
    const { prompt, type, data } = JSON.parse(event.body || '{}');
    
    console.log('Function called with type:', type);

    // Fallback to mock data if no API key is configured
    if (!process.env.OPENAI_API_KEY) {
      console.log('No OpenAI API key found, using mock data');
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          data: getMockResponse(type),
          source: 'mock_no_api_key'
        })
      };
    }

    // Initialize OpenAI client with v4+ syntax
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Create enhanced prompt based on type
    const enhancedPrompt = createEnhancedPrompt(prompt, type, data);

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { 
          role: "system", 
          content: "Je bent een AI vastgoed expert die helpt met investeerder matching, deal analyse en markt inzichten. Geef altijd praktische, datagedreven adviezen in het Nederlands." 
        },
        { 
          role: "user", 
          content: enhancedPrompt 
        }
      ],
      max_tokens: 1200,
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0].message.content;
    console.log('OpenAI response received');

    // Parse AI response into structured format
    const structuredData = parseAIResponse(aiResponse, type);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        data: structuredData,
        source: 'openai',
        usage: completion.usage
      })
    };

  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    // Always return mock data on error to keep app functional
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        data: getMockResponse(type),
        source: 'mock_error_fallback',
        error: error.message
      })
    };
  }
};

// Create enhanced prompts based on analysis type
function createEnhancedPrompt(basePrompt, type, data) {
  const prompts = {
    investor_analysis: `
      Analyseer dit investeerder profiel en geef gestructureerde inzichten:
      ${JSON.stringify(data, null, 2)}
      
      Geef een analyse met:
      - Financial strength assessment
      - Risk appetite evaluation  
      - Market knowledge level
      - Preferred sectors en project types
      - Investment strategy
      - Behavior profile
      - Recommendations voor matching
      
      Basis prompt: ${basePrompt}
    `,
    deal_analysis: `
      Analyseer deze vastgoed deal en geef markt inzichten:
      ${JSON.stringify(data, null, 2)}
      
      Geef een analyse met:
      - Market position assessment
      - Project type analysis (turn-key/renovatie/transformatie)
      - Competitive analysis
      - Risk factors en opportunities
      - Price analysis
      - Market trends
      - Target investor recommendations
      
      Basis prompt: ${basePrompt}
    `,
    smart_matching: `
      Analyseer deze deal-investeerder match en geef AI inzichten:
      Deal: ${JSON.stringify(data?.deal, null, 2)}
      Investeerder: ${JSON.stringify(data?.investor, null, 2)}
      
      Geef een smart matching analyse met:
      - Match score calculation reasoning
      - AI recommendations voor approach
      - Timing advice
      - Negotiation strategy
      - Success probability assessment
      
      Basis prompt: ${basePrompt}
    `,
    market_insights: `
      Geef actuele vastgoed markt inzichten voor Europa:
      
      Focus op:
      - Regional trends (Nederland, Duitsland, Frankrijk, Spanje, Zwitserland)
      - Price forecasts voor major cities
      - Best opportunities per regio
      - Investment recommendations
      
      Basis prompt: ${basePrompt}
    `
  };

  return prompts[type] || basePrompt;
}

// Parse AI response into structured format
function parseAIResponse(response, type) {
  // In een echte implementatie zou je de AI response intelligent parsen
  // Voor nu combineren we AI input met gestructureerde mock data
  const mockData = getMockResponse(type);
  
  // Je kunt hier AI response parsing logica toevoegen
  // Bijvoorbeeld: extract key insights from response text
  
  return {
    ...mockData,
    aiGeneratedInsights: response.substring(0, 500) + '...',
    processedAt: new Date().toISOString()
  };
}

// Comprehensive mock responses for all analysis types
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
      riskFactors: [
        'Mogelijke leegstand bij huurwisseling', 
        'Onderhoudskosten oudere panden',
        'Marktvolatiliteit bij economische onzekerheid'
      ],
      opportunities: [
        'Huurverhoging mogelijk door renovatie', 
        'Waardestijging door buurtverbetering',
        'Turn-key voordeel: Direct rendement, lagere ontwikkelingsrisico\'s',
        'Renovatie kansen: Waardecreatie door modernisering',
        'Transformatie potentieel: Functiewijziging verhoogt marktwaarde'
      ],
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
        'Verwacht rendement 5.5% boven minimum van 4%',
        'Project type turn-key past bij conservatieve benadering'
      ],
      aiRecommendations: [
        'Benadruk stabiele huurinkomsten in pitch',
        'Vermeld turn-key voordeel: geen ontwikkelingsrisico',
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
        'Luxe vastgoed in Zwitserse steden',
        'Turn-key studentenhuisvesting',
        'Transformatie projecten in stadscentra'
      ]
    }
  };
  
  return mockResponses[type] || mockResponses.investor_analysis;
}

function parseAIResponse(response, type) {
  // In een echte implementatie zou je de AI response parsen
  // Voor nu geven we mock data terug
  return getMockResponse(type);
}

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
      riskFactors: [
        'Mogelijke leegstand bij huurwisseling', 
        'Onderhoudskosten oudere panden'
      ],
      opportunities: [
        'Huurverhoging mogelijk door renovatie', 
        'Waardestijging door buurtverbetering'
      ],
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
        'Verwacht rendement 5.5% boven minimum van 4%',
        'Project type turn-key past bij conservatieve benadering'
      ],
      aiRecommendations: [
        'Benadruk stabiele huurinkomsten in pitch',
        'Vermeld turn-key voordeel: geen ontwikkelingsrisico',
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
        'Frankrijk': { growth: 5.1, hotspots: ['Parijs', 'Lyon'], outlook: 'Zeer positief' }
      },
      priceForecasts: {
        'Amsterdam': '+3.5% next 12 months',
        'Berlijn': '+2.8% next 12 months',
        'Parijs': '+4.2% next 12 months'
      },
      bestOpportunities: [
        'Studentenhuisvesting in universiteitssteden',
        'Duurzame nieuwbouw in groeikernen',
        'Herbestemming kantoren naar woningen'
      ]
    }
  };
  
  return mockResponses[type] || mockResponses.investor_analysis;
}
