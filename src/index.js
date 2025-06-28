const { config } = require('dotenv');
const express = require('express');
const app = express();
const PORT = 3000;
const petsRoutes = require('./routes/petsRoutes');

if (process.env.NODE_ENV === 'development') {
  config({path: '.env.dev'});
  console.log('development mode:', process.env.DATABASE_URL);
} else {
  config();
  console.log('production mode:', process.env.DATABASE_URL);
}

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello from PetPals backend!');
});
app.use('/api/pets', petsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
