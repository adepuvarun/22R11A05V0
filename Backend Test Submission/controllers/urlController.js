const shortid = require('shortid');
const Log = require('../log');

const urlDatabase = {

}; 

const shortenURL = async (req, res) => {
  const { longUrl, shortcode, validity } = req.body;

  if (!longUrl) {
    await Log('backend', 'error', 'controller', 'Missing longUrl in request');
    return res.status(400).json({ error: 'longUrl is required' });
  }

  const code = shortcode || shortid.generate();
  const validTime = parseInt(validity) || 30;
  const expireAt = Date.now() + validTime * 60 * 1000;

  urlDatabase[code] = { longUrl, expireAt };

  await Log('backend', 'info', 'controller', `Created short URL for ${longUrl} as ${code}`);

  res.json({
    shortUrl: `http://localhost:3000/${code}`,
    validTill: new Date(expireAt),
  });
};

const redirectURL = async (req, res) => {
  const code = req.params.shortcode;
  const entry = urlDatabase[code];

  if (!entry) {
    await Log('backend', 'error', 'controller', `Shortcode ${code} not found`);
    return res.status(404).json({ error: 'Shortcode not found' });
  }

  if (Date.now() > entry.expireAt) {
    await Log('backend', 'warn', 'controller', `Shortcode ${code} expired`);
    return res.status(410).json({ error: 'Shortcode expired' });
  }

  await Log('backend', 'info', 'controller', `Redirecting shortcode ${code} to ${entry.longUrl}`);
  res.redirect(entry.longUrl);
};

module.exports = { shortenURL, redirectURL };
