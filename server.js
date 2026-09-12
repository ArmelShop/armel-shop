const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const orderSchema = new mongoose.Schema({
  nom: String,
  telephone: String,
  email: String,
  adresse: String,
  paiement: String,
  articles: Array,
  total: Number,
  statut: { type: String, default: 'en_attente' },
  date: { type: Date, default: Date.now }
});
const Order = mongoose.model('Order', orderSchema);

const produits = [
  { id: 1, nom: "T-shirt Classic Noir", prix: 15000, categorie: "Homme", image: "https://placehold.co/400x500/222/fff?text=T-Shirt" },
  { id: 2, nom: "Chemise Blanche", prix: 20000, categorie: "Homme", image: "https://placehold.co/400x500/eee/333?text=Chemise" },
  { id: 3, nom: "Robe Ete Fleurie", prix: 25000, categorie: "Femme", image: "https://placehold.co/400x500/f9c/fff?text=Robe" },
  { id: 4, nom: "Jean Slim Bleu", prix: 22000, categorie: "Homme", image: "https://placehold.co/400x500/36f/fff?text=Jean" },
  { id: 5, nom: "Pull Col Rond Gris", prix: 18000, categorie: "Homme", image: "https://placehold.co/400x500/888/fff?text=Pull" },
  { id: 6, nom: "Jupe Plissee Beige", prix: 17000, categorie: "Femme", image: "https://placehold.co/400x500/d4b/fff?text=Jupe" },
  { id: 7, nom: "Casquette Logo", prix: 8000, categorie: "Accessoires", image: "https://placehold.co/400x500/111/fff?text=Casquette" },
  { id: 8, nom: "Sac a Dos Urban", prix: 30000, categorie: "Accessoires", image: "https://placehold.co/400x500/444/fff?text=Sac" }
];

app.get('/api/products', (req, res) => {
  res.json(produits);
});

app.post('/api/orders', async (req, res) => {
  try {
    const commande = await Order.create(req.body);
    res.status(201).json(commande);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const commandes = await Order.find().sort({ date: -1 });
    res.json(commandes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connecte a MongoDB avec succes.'))
  .catch(err => console.log('Erreur de connexion :', err.message));

app.listen(PORT, () => {
  console.log('Serveur demarre sur le port ' + PORT);
});
