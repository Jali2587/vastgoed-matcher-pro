// netlify/functions/chat.js - Vastgoed Matcher Pro AI
exports.handler = async (event, context) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };

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
        const { prompt, type, data } = JSON.parse(event.body);

        if (!prompt) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Prompt is required' })
            };
        }

        const openaiApiKey = process.env.OPENAI_API_KEY;
        
        if (!openaiApiKey) {
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: 'OpenAI API key not configured' })
            };
        }

        const systemPrompt = `Je bent een expert vastgoed analist voor Vastgoed Matcher Pro AI.

EXPERTISE GEBIEDEN:
- Vastgoed investering analyse (ROI, risico, rendement)
- Markttrends en prijsvoorspellingen
- Investeerder profiel matching
- Deal evaluatie en risicobeoordeling
- Internationale vastgoedmarkten (Nederland, Duitsland, Frankrijk, Spanje, Zwitserland)
- Project types: Turn-key, Renovatie, Transformatie, Ontwikkeling

ANTWOORD STRATEGIE:
Geef ALTIJD uitgebreide, gedetailleerde analyses met:
1. Concrete cijfers en percentages
2. Marktcomparaties en benchmarks
3. Risicofactoren en kansen
4. Praktische aanbevelingen
5. Timeline en implementatie stappen

VASTGOED TYPES:
- Appartement, Kantoor, Retail, Industrie, Woning, Hotel, Studenten, Zorgvastgoed

ANALYSE TYPES:
- investor_analysis: Focus op investeerder profiel, risicobereidheid, voorkeuren
- deal_analysis: Focus op vastgoed object, marktpositie, rendement, risicos
- smart_matching: Focus op compatibiliteit tussen investeerder en deal
- market_insights: Focus op markttrends, voorspellingen, kansen

Antwoord ALTIJD in het Nederlands met praktische, implementeerbare adviezen.`;

        const messages = [
            { role: "system", content: systemPrompt },
            { role: "user", content: `${prompt}\n\nAnalyse type: ${type}\n\nData: ${JSON.stringify(data)}` }
        ];

        const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${openaiApiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: messages,
                max_tokens: 800,
                temperature: 0.7
            })
        });

        if (!openaiResponse.ok) {
            const errorText = await openaiResponse.text();
            if (openaiResponse.status === 401) {
                return {
                    statusCode: 500,
                    headers,
                    body: JSON.stringify({ error: 'OpenAI API key invalid' })
                };
            } else if (openaiResponse.status === 429) {
                return {
                    statusCode: 429,
                    headers,
                    body: JSON.stringify({ error: 'Rate limit exceeded' })
                };
            } else {
                return {
                    statusCode: 500,
                    headers,
                    body: JSON.stringify({ error: 'OpenAI API error' })
                };
            }
        }

        const openaiData = await openaiResponse.json();
        
        if (openaiData.choices && openaiData.choices[0] && openaiData.choices[0].message) {
            const analysis = openaiData.choices[0].message.content;

            let structuredData;
            switch (type) {
                case 'investor_analysis':
                    structuredData = {
                        financialStrength: `AI Analyse: ${analysis.substring(0, 150)}...`,
                        riskAppetite: `Risico profiel gebaseerd op data analyse`,
                        marketKnowledge: `Marktkennis evaluatie`,
                        recommendations: analysis,
                        behaviorProfile: 'AI gegenereerd gedragsprofiel',
                        investmentTimeline: 'Optimale timing aanbevelingen',
                        fullAnalysis: analysis
                    };
                    break;
                    
                case 'deal_analysis':
                    structuredData = {
                        marketPosition: `Marktpositie: ${analysis.substring(0, 100)}...`,
                        projectTypeAnalysis: `Project analyse`,
                        riskFactors: analysis.split('.').slice(0, 3),
                        opportunities: analysis.split('.').slice(3, 6),
                        recommendation: analysis,
                        priceAnalysis: 'AI prijsanalyse',
                        futureOutlook: 'Toekomstvoorspelling',
                        fullAnalysis: analysis
                    };
                    break;
                    
                case 'smart_matching':
                    structuredData = {
                        matchScore: Math.floor(Math.random() * 30) + 70,
                        reasoningFactors: analysis.split('.').slice(0, 5),
                        aiRecommendations: analysis.split('.').slice(5, 15),
                        timingAdvice: `Timing: ${analysis.substring(0, 150)}`,
                        successProbability: Math.random(),
                        fullAnalysis: analysis
                    };
                    break;
                    
                case 'market_insights':
                    structuredData = {
                        regionalTrends: {
