const express = require('express');
const path = require('path');
const https = require('https');
const fs = require('fs');

const app = express();
const PORT = 443;

// certificados Cloudflare Origin
const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, 'certs', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'certs', 'cert.pem')),
};

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
}); 

// servidor HTTPS
https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`Servidor HTTPS corriendo en https://localhost:${PORT}`);
});