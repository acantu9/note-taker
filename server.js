const express = require('express');
const apiRoutes = require('./routes/api-routes');
const htmlRoutes = require('./routes/html-routes');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(apiRoutes);
app.use(htmlRoutes);
console.log(apiRoutes);

app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
})