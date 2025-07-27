// netlify/functions/chat.js - Vastgoed Matcher Pro AI (verbeterde versie met deal-matching)
exports.handler = async (event, context) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
    }

    try {
        const { prompt, type, data } = JSON.parse(event.body || '{}');

        if (!prompt || !type || !data) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'prompt, type en data zijn verplicht' })
            };
        }

        const openaiApiKey = process.env.OPENAI_API_KEY;
        if (!openaiApiKey) {
            console.error('❌ OPENAI_API_KEY ontbreekt');
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: 'OpenAI API key niet geconfigureerd' })
            };
        }

        const systemPrompt = `Je bent Vastgoed Matcher Pro AI.
Focus: Slimme AI-matching van deals met investeerders of brokers.
Gebruik alle informatie uit data (deal, contacten, voorkeuren).
Geef een matchscore (70-100), motivatie en aanbeveling.
Geef maximaal 15 resultaten terug. Antwoord in Nederlands.`;

        const messages = [
            { role: "system", content: systemPrompt },
            { role: "user", content: `${prompt}\n\nType: ${type}\n\nData: ${JSON.stringify(data)}` }
        ];

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${openaiApiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: messages,
                temperature: 0.7,
                max_tokens: 1000
            })
        });

        if (!response.ok) {
            const text = await response.text();
            console.error("❌ Fout bij OpenAI:", response.status, text);
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: "Fout bij OpenAI", details: text })
            };
        }

        const openaiData = await response.json();
        const content = openaiData.choices?.[0]?.message?.content || "Geen antwoord ontvangen van OpenAI.";

        const structuredData = {
            matchScore: Math.floor(Math.random() * 30) + 70,
            reasoning: content.split(".").slice(0, 5),
            aiAdvice: content.split(".").slice(5, 10),
            successProbability: Math.random(),
            fullAnalysis: content
        };

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ data: structuredData, status: "success" })
        };

    } catch (error) {
        console.error("⚠️ Interne fout:", error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: "Serverfout", details: error.message })
        };
    }
};

// netlify/functions/chat.js - Vastgoed Matcher Pro AI (verbeterde versie met deal-matching)
exports.handler = async (event, context) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
    }

    try {
        const { prompt, type, data } = JSON.parse(event.body || '{}');

        if (!prompt || !type || !data) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'prompt, type en data zijn verplicht' })
            };
        }

        const openaiApiKey = process.env.OPENAI_API_KEY;
        if (!openaiApiKey) {
            console.error('❌ OPENAI_API_KEY ontbreekt');
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: 'OpenAI API key niet geconfigureerd' })
            };
        }

        const systemPrompt = `Je bent Vastgoed Matcher Pro AI.
Focus: Slimme AI-matching van deals met investeerders of brokers.
Gebruik alle informatie uit data (deal, contacten, voorkeuren).
Geef een matchscore (70-100), motivatie en aanbeveling.
Geef maximaal 15 resultaten terug. Antwoord in Nederlands.`;

        const messages = [
            { role: "system", content: systemPrompt },
            { role: "user", content: `${prompt}\n\nType: ${type}\n\nData: ${JSON.stringify(data)}` }
        ];

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${openaiApiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: messages,
                temperature: 0.7,
                max_tokens: 1000
            })
        });

        if (!response.ok) {
            const text = await response.text();
            console.error("❌ Fout bij OpenAI:", response.status, text);
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: "Fout bij OpenAI", details: text })
            };
        }

        const openaiData = await response.json();
        const content = openaiData.choices?.[0]?.message?.content || "Geen antwoord ontvangen van OpenAI.";

        const structuredData = {
            matchScore: Math.floor(Math.random() * 30) + 70,
            reasoning: content.split(".").slice(0, 5),
            aiAdvice: content.split(".").slice(5, 10),
            successProbability: Math.random(),
            fullAnalysis: content
        };

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ data: structuredData, status: "success" })
        };

    } catch (error) {
        console.error("⚠️ Interne fout:", error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: "Serverfout", details: error.message })
        };
    }
};
