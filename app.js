const express = require('express');
const axios = require('axios');
const { parseString } = require('xml2js');

const app = express();
const port = process.env.PORT || 3000;

// Middleware for CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.get('/', (req, res) => {
    res.send('Running!')
});
app.get('/get-feed', async (req, res) => {
    const feedUrl = req.query.url;
    const count = parseInt(req.query.count) || 10; // Default to 10 entries if count is not provided or invalid

    if (!feedUrl) {
        return res.json({ error: 'No RSS feed URL provided' });
    }

    try {
        const response = await axios.get(feedUrl);
        const xmlContent = response.data;

        parseString(xmlContent, (err, result) => {
            if (err) {
                throw new Error(`Error parsing XML: ${err.message}`);
            }

            const feedData = { entries: [] };

            if (result && result.rss && result.rss.channel && result.rss.channel[0] && result.rss.channel[0].item) {
                const entries = result.rss.channel[0].item.map(item => {
                    const entry = {};
                    Object.keys(item).forEach(key => {
                        entry[key] = item[key][0];
                    });
                    return entry;
                });

                entries.sort((a, b) => {
                    const dateA = new Date(a.pubDate);
                    const dateB = new Date(b.pubDate);
                    return dateB - dateA; // Sort in descending order
                });
                const len = entries.length;
                feedData.entries = entries.slice(0, count > len ? len : count);
            }

            res.json(feedData);
        });
    } catch (error) {
        res.json({ error: `Error fetching or parsing the feed: ${error.message}` });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
