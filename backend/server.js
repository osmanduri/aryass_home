const express = require('express') ;
const bodyParser = require('body-parser');
require('dotenv').config()
require('./Model/dbConnection')
var cors = require('cors')
const cookieParser = require('cookie-parser');
const user_router = require('./Routes/userRoute')
const product_router = require('./Routes/productRoute')
const tag_router = require('./Routes/tagRoute')
var app = express()

/*app.use(cors({
  origin: ['http://localhost:3001','http://127.0.0.1:3001', 'https://les-bains-fidelite.netlify.app'],  // Remplacez par l'URL de votre application React
  credentials: true,
}));*/

app.use(cors())

app.use(cookieParser());

// Ajoutez les middlewares body-parser pour traiter les données de la requête
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// TEST DE L'API
app.get('/healthy', (req, res) => {
  res.json({ status: 'healthy' });
});

app.use('/api/users', user_router)
app.use('/api/product', product_router)
app.use('/api/tag', tag_router)


// Lancez le serveur sur le port: PORT
app.listen(process.env.PORT, () => {
  console.log('Le serveur est en cours d\'exécution sur le port ' + process.env.PORT);
});