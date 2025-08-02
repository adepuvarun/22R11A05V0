const express = require('express');
const router = express.Router();
const db = require('../db');
const Log = require('../log');

const generateShortCode = () => {
  return Math.random().toString(36).substring(2, 8);
};

router.post('/shorturls', async (req, res) => {
  const { url, validity = 30, shortcode } = req.body;
  let short = shortcode || generateShortCode();
  const createdAt = new Date();
  const expiresAt = new Date(createdAt.getTime() + validity * 60000);

  const query = 'INSERT INTO urls (long_url, short_code, created_at, expires_at) VALUES (?, ?, ?, ?)';
  db.query(query, [url, short, createdAt, expiresAt], async (err) => {
    if (err) {
      await Log("backend", "error", "db", "Database insertion failed.");
      return res.status(500).json({ error: "Failed to shorten URL" });
    }

    await Log("backend", "info", "controller", `Shortened URL created for: ${url}`);
    res.status(201).json({
      shortLink: `http://localhost:3000/${short}`,
      expiry: expiresAt.toISOString()
    });
  });
});

router.get('/:shortcode', (req, res) => {
  const code = req.params.shortcode;

  const query = 'SELECT long_url, expires_at FROM urls WHERE short_code = ?';
  db.query(query, [code], async (err, results) => {
    if (err || results.length === 0) {
      await Log("backend", "warn", "handler", `Shortcode not found: ${code}`);
      return res.status(404).send("Short URL not found");
    }

    const { long_url, expires_at } = results[0];
    const isExpired = new Date(expires_at) < new Date();

    if (isExpired) {
      await Log("backend", "info", "handler", `Shortcode expired: ${code}`);
      return res.status(410).send("This short URL has expired");
    }

    await Log("backend", "info", "handler", `Redirecting to ${long_url}`);
    res.redirect(long_url);
  });
});

module.exports = router;
