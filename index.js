const express = require('express');
const app = express();
const PORT = 3000;
const petsRoutes = require('./routes/petsRoutes');

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello from PetPals backend!');
});
app.use('/api/pets', petsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
