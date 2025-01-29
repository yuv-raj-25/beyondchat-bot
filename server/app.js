import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'


const app = express()


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


app.use(express.json({limit: '16kb'}));
app.use(express.urlencoded({ extended: true,limit: '16kb'}));
app.use(express.static("public"));
app.use(cookieParser());


app.get('/api/fetchMeta', async (req, res) => {
    const { url } = req.query;
  
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }
  
    try {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);
      const description = $('meta[name="description"]').attr('content') || 'No description available.';
      res.json({ description });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch meta description' });
    }
  });
  
  app.listen(3000, () => console.log('Server running on port 3000'));



export {app}