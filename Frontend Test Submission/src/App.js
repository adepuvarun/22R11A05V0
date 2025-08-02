import React, { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

function App() {
  const [url, setUrl] = useState("");
  const [shortcode, setShortcode] = useState("");
  const [validity, setValidity] = useState(30);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const body = { url };
      if (shortcode) body.shortcode = shortcode;
      if (validity) body.validity = parseInt(validity);

      const response = await axios.post("http://localhost:3001/url-shortener/src", body);
      setResult(response.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
      setResult(null);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h4">URL Shortener</Typography>

        <TextField
          label="Enter Long URL"
          fullWidth
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <TextField
          label="Optional Shortcode"
          fullWidth
          value={shortcode}
          onChange={(e) => setShortcode(e.target.value)}
        />
        <TextField
          label="Validity (minutes)"
          type="number"
          fullWidth
          value={validity}
          onChange={(e) => setValidity(e.target.value)}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Shorten URL
        </Button>

        {result && (
          <Box mt={2}>
            <Typography variant="body1">
              <strong>Short Link:</strong>{" "}
              <a href={result.shortLink} target="_blank" rel="noreferrer">
                {result.shortLink}
              </a>
            </Typography>
            <Typography variant="body2">
              <strong>Expires At:</strong> {result.expiry}
            </Typography>
          </Box>
        )}

        {error && (
          <Typography color="error" mt={2}>
            {error}
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default App;
