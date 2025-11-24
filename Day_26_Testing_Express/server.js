// in server.js run server seprately as app.js is only for app initialization
const app = require('./app');
const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});