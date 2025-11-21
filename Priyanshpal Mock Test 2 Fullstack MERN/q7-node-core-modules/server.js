const fs = require('fs');
const path = require('path');
const http = require('http');

// Create logs directory if not exists
const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Write log file
const logFile = path.join(logDir, 'app.log');
fs.writeFileSync(logFile, 'App started\n');

console.log('Log written to:', logFile);

// Create HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'running' }));
});

server.listen(3000, () => {
  console.log('Q7 Server running on http://localhost:3000');
  console.log('Visit the URL to see JSON response');
});