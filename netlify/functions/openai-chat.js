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
    
    console.log('🤖 AI Function called with type:', type);
    console.log('🔑 API Key available:', !!process.env.OPENAI_API_KEY);

    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      console.log('❌ No OpenAI API key found, using mock data');
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          data: getMockResponse(type),
          source: 'mock_no_api_key',
          message: 'OpenAI API key niet geconfigureerd'
        })
      };
    }

    // Initialize OpenAI client with v4+ syntax
    console.log('🚀 Initializing OpenAI client...');
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Create enhanced prompt based on type
    const enhancedPrompt = createEnhancedPrompt(prompt, type, data);
    console.log('📝 Enhanced prompt created for type:', type);

    // Call OpenAI API
    console.log('🔄 Calling OpenAI API...');
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { 
          role: "system", 
          content: getSystemPrompt(type)
        },
        { 
          role: "user", 
          content: enhancedPrompt 
        }
      ],
      max_tokens: 1500,
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0].message.content;
    console.log('✅ OpenAI response received:', aiResponse.substring(0, 200) + '...');

    // Parse AI response into structured format
    const structuredData = parseAIResponse(aiResponse, type);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        data: structuredData,
        source: 'openai_real',
        usage: completion.usage,
        model: completion.model,
        timestamp: new Date().toISOString()
      })
    };

  } catch (error) {
    console.error('❌ OpenAI API Error:', error);
    
    // Return enhanced error info but still provide mock data
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        data: getMockResponse(type),
        source: 'mock_error_fallback',
        error: error.message,
        errorType: error.name || 'UnknownError',
        timestamp: new Date().toISOString()
      })
    };
  }
};

// Enhanced system prompts per analysis type
function getSystemPrompt(type) {
  const systemPrompts = {
    investor_analysis: `
Je bent een ervaren vastgoed investment advisor. Analyseer investeerder profielen en geef praktische, datagedreven inzichten. 
Antwoord altijd in geldige JSON format met deze structuur:
{
  "financialStrength": "string - assessment van financiële sterkte",
  "riskAppetite": "string - risico bereidheid analyse", 
  "marketKnowledge": "string - marktkennis evaluatie",
  "preferredSectors": ["array", "van", "sectoren"],
  "projectTypePreference": ["array", "van", "project", "types"],
  "investmentStrategy": "string - investment strategie",
  "recommendations": "string - matching aanbevelingen",
  "behaviorProfile": "string - gedragsprofiel",
  "investmentTimeline": "string - investering tijdlijn",
  "marketSentiment": "string - markt sentiment"
}
`,
    deal_analysis: `
Je bent een vastgoed markt analist. Analyseer vastgoed deals en geef marktinzichten.
Antwoord altijd in geldige JSON format met deze structuur:
{
  "marketPosition": "string - marktpositie analyse",
  "projectTypeAnalysis": "string - project type analyse",
  "competitiveAnalysis": "string - concurrentie analyse",
  "riskFactors": ["array", "van", "risico", "factoren"],
  "opportunities": ["array", "van", "kansen"],
  "priceAnalysis": "string - prijs analyse",
  "recommendation": "string - aanbeveling",
  "marketTrends": "string - markt trends",
  "demographicAnalysis": "string - demografische analyse",
  "futureOutlook": "string - toekomst perspectief"
}
`,
    smart_matching: `
Je bent een AI matching expert voor vastgoed. Analyseer deal-investeerder matches en geef slimme inzichten.
Antwoord altijd in geldige JSON format met deze structuur:
{
  "matchScore": "number - score tussen 0-100",
  "reasoningFactors": ["array", "van", "matching", "redenen"],
  "aiRecommendations": ["array", "van", "AI", "aanbevelingen"],
  "timingAdvice": "string - timing advies",
  "negotiationStrategy": "string - onderhandelings strategie",
  "successProbability": "number - kans op succes tussen 0-1"
}
`,
    market_insights: `
Je bent een Europese vastgoed markt expert. Geef actuele marktinzichten voor verschillende regio's.
Antwoord altijd in geldige JSON format met deze structuur:
{
  "regionalTrends": {
    "Nederland": {"growth": "number", "hotspots": ["array"], "outlook": "string"},
    "Duitsland": {"growth": "number", "hotspots": ["array"], "outlook": "string"},
    "Frankrijk": {"growth": "number", "hotspots": ["array"], "outlook": "string"},
    "Spanje": {"growth": "number", "hotspots": ["array"], "outlook": "string"},
    "Zwitserland": {"growth": "number", "hotspots": ["array"], "outlook": "string"}
  },
  "priceForecasts": {
    "Amsterdam": "string",
    "Berlijn": "string", 
    "Parijs": "string",
    "Madrid": "string",
    "Zürich": "string"
  },
  "bestOpportunities": ["array", "van", "beste", "kansen"]
}
`
  };

  return systemPrompts[type] || systemPrompts.investor_analysis;
}

// Create enhanced prompts based on analysis type
function createEnhancedPrompt(basePrompt, type, data) {
  const prompts = {
    investor_analysis: `
Analyseer dit investeerder profiel en geef gestructureerde inzichten:

INVESTEERDER DATA:
- Naam: ${data?.naam || 'Onbekend'}
- Budget: €${data?.minBudget?.toLocaleString()} - €${data?.maxBudget?.toLocaleString()}
- Risicoprofiel: ${data?.risicoprofiel || 'Onbekend'}
- Gewenst rendement: ${data?.gewenstRendement || 'Onbekend'}%
- Voorkeurs regio's: ${data?.voorkeursRegio?.join(', ') || 'Geen voorkeur'}
- Voorkeurs locaties: ${data?.voorkeursLocaties?.join(', ') || 'Geen voorkeur'}
- Vastgoed types: ${data?.vastgoedTypes?.join(', ') || 'Geen voorkeur'}
- Project types: ${data?.projectTypes?.join(', ') || 'Geen voorkeur'}
- Ervaring level: ${data?.ervaringLevel || 'Onbekend'}
- Investment motivatie: ${data?.investmentMotivatie || 'Niet opgegeven'}

Geef een diepgaande analyse van deze investeerder in JSON format.
    `,
    deal_analysis: `
Analyseer deze vastgoed deal en geef markt inzichten:

DEAL DATA:
- Titel: ${data?.titel || 'Onbekend'}
- Locatie: ${data?.locatie || 'Onbekend'}  
- Type: ${data?.type || 'Onbekend'}
- Project type: ${data?.projectType || 'Onbekend'}
- Prijs: €${data?.prijs?.toLocaleString() || 'Onbekend'}
- Verwacht rendement: ${data?.verwachtRendement || 'Onbekend'}%
- Risico niveau: ${data?.risico || 'Onbekend'}
- Oppervlakte: ${data?.oppervlakte || 'Onbekend'}m²
- Bouwjaar: ${data?.bouwjaar || 'Onbekend'}
- Huur potentie: €${data?.huurpotentie?.toLocaleString() || 'Onbekend'}/maand
- Beschrijving: ${data?.beschrijving || 'Geen beschrijving'}

Geef een uitgebreide markt analyse van deze deal in JSON format.
    `,
    smart_matching: `
Analyseer deze deal-investeerder match:

DEAL:
- ${data?.deal?.titel} in ${data?.deal?.locatie}
- Prijs: €${data?.deal?.prijs?.toLocaleString()}
- Type: ${data?.deal?.type} (${data?.deal?.projectType})
- Rendement: ${data?.deal?.verwachtRendement}%
- Risico: ${data?.deal?.risico}

INVESTEERDER:
- ${data?.investor?.naam} (${data?.investor?.bedrijf})
- Budget: €${data?.investor?.minBudget?.toLocaleString()} - €${data?.investor?.maxBudget?.toLocaleString()}
- Risicoprofiel: ${data?.investor?.risicoprofiel}
- Gewenst rendement: ${data?.investor?.gewenstRendement}%
- Voorkeur locaties: ${data?.investor?.voorkeursLocaties?.join(', ')}
- Voorkeur types: ${data?.investor?.vastgoedTypes?.join(', ')}

Bereken de match score en geef slimme aanbevelingen in JSON format.
    `,
    market_insights: `
Geef actuele vastgoed markt inzichten voor Europa in 2024-2025.

Focus op:
- Groei percentages per land
- Hotspots per regio  
- Prijs voorspellingen voor major cities
- Beste investment opportunities
- Market outlook per land

Geef een uitgebreide markt analyse in JSON format.
    `
  };

  return prompts[type] || basePrompt;
}

// Intelligent parsing of AI response
function parseAIResponse(response, type) {
  try {
    // Try to extract JSON from AI response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsedJson = JSON.parse(jsonMatch[0]);
      console.log('✅ Successfully parsed AI JSON response');
      return {
        ...parsedJson,
        aiGenerated: true,
        rawResponse: response,
        processedAt: new Date().toISOString()
      };
    }
  } catch (parseError) {
    console.log('⚠️ Could not parse AI response as JSON, using enhanced mock');
  }

  // Fallback: enhance mock data with AI insights
  const mockData = getMockResponse(type);
  return {
    ...mockData,
    aiGenerated: false,
    aiInsights: response.substring(0, 500) + '...',
    processedAt: new Date().toISOString(),
    note: 'AI response was not in expected JSON format, using structured mock data with AI insights'
  };
}

// Comprehensive mock responses for fallback
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
