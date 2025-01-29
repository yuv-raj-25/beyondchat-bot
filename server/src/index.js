import express from 'express';
import axios from 'axios';
import { load } from 'cheerio';
import cors from 'cors';
import dotenv from 'dotenv';
import { app } from "./app.js"; // Ensure this file properly exports `app`

dotenv.config(); // Ensure .env file is loaded

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const API_BASE_URL = process.env.NODE_ENV === "production"
  ? "https://your-backend.com"
  : "http://localhost:3000";

app.get('/api/fetchMeta', async (req, res) => {
    const { url } = req.query;

    if (!url || typeof url !== 'string') {
        return res.status(400).json({ error: 'Invalid URL' });
    }

    try {
        const { data } = await axios.get(url, { timeout: 10000 });
        const $ = load(data);

        const description =
            $('meta[name="description"]').attr('content') ||
            $('meta[property="og:description"]').attr('content') ||
            'No description found.';

        return res.status(200).json({ description });
    } catch (error) {
        console.error('Error fetching metadata:', error.message);
        return res.status(500).json({ error: 'Failed to fetch meta description' });
    }
});

app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});
