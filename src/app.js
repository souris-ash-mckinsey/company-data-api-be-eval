const express = require('express');
const { companyDataRoute } = require('./routes/companyDataRoute');

const app = express();
app.use(express.json());

const port = process.env.PORT || 8002;

app.use('/api', companyDataRoute);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});