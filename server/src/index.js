import express from 'express';
import axios from 'axios';
import {load} from 'cheerio';
import cors from 'cors';

const app = express();
const PORT = 9000;

// Allow requests from your frontend domain
app.use(
    cors({
      origin: "https://beyondchat-bot-z5xj.vercel.app", // Change this to your frontend's actual deployed URL
      methods: "GET,POST,PUT,DELETE",
      allowedHeaders: "Content-Type,Authorization",
    })
  );
  
  app.use(cors());
app.use(express.json());

app.get('/api/fetchMeta', async (req, res) => {
    const { url } = req.query;

    if (!url || typeof url !== 'string') {
        return res.status(400).json({ error: 'Invalid URL' });
    }

    try {
        // Fetch the HTML content of the webpage
        const { data } = await axios.get(url, { timeout: 10000 });

        // Load the HTML into cheerio
        const $ = load(data);

        // Extract meta description
        const description =
            $('meta[name="description"]').attr('content') ||
            $('meta[property="og:description"]').attr('content') ||
            'No description found.';

        return res.status(200).json({ description });
    } catch (error) {
        console.error('Error fetching metadata:', error);
        return res.status(500).json({ error: 'Failed to fetch meta description' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
