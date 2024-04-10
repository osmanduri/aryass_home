const express = require('express') ;
require('dotenv').config()
require('./Model/dbConnection')
var cors = require('cors')
const cookieParser = require('cookie-parser');
const user_router = require('./Routes/userRoute')
const product_router = require('./Routes/productRoute')
const commande_router = require('./Routes/commandeRoute')
const tag_router = require('./Routes/tagRoute')
const stripe_router = require('./Routes/stripeRoute')
var app = express()
const bodyParser = require('body-parser');

/*app.use(cors({
  origin: ['http://localhost:3001','http://127.0.0.1:3001', 'https://les-bains-fidelite.netlify.app'],  // Remplacez par l'URL de votre application React
  credentials: true,
}));*/

app.use(cors())

app.use(cookieParser());


app.use(bodyParser.urlencoded({ extended: true }));

// TEST DE L'API
app.get('/healthy', (req, res) => {
  res.json({ status: 'healthy' });
});

app.use('/api/payment', stripe_router) // Non ne pouvons pas utiliser bodyParser pour stripe car nous utilisons un WebHook
app.use('/api/users', bodyParser.json(), user_router)
app.use('/api/product',bodyParser.json(),  product_router)
app.use('/api/commande',bodyParser.json(),  commande_router)
app.use('/api/tag', bodyParser.json(), tag_router)



// Lancez le serveur sur le port: PORT
app.listen(process.env.PORT, () => {
  console.log('Le serveur est en cours d\'exécution sur le port ' + process.env.PORT);
});