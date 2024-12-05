const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

// Route to start the OAuth flow
app.get('/auth/github', (req, res) => {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`);
});

// Callback route
app.get('/auth/github/callback', async (req, res) => {
    const { code } = req.query;
  
    try {
      const tokenResponse = await axios.post(
        'https://github.com/login/oauth/access_token',
        {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        { headers: { Accept: 'application/json' } }
      );
  
      const { access_token } = tokenResponse.data;
  
      // Redirect back to the frontend with the access token (in production, use a secure session)
      res.redirect(`http://localhost:5173?access_token=${access_token}`);
    } catch (error) {
      console.error('Error during GitHub OAuth:', error);
      res.status(500).send('Authentication failed');
    }
  });
  

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
