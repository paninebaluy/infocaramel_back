const app = require('./app.js');
const { PORT } = require('./config');

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
