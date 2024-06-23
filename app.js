// Importation du module Express pour créer une application web
const express = require('express');

// Création d'une application Express
const app = express();

const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

require('dotenv').config();

// Utilisation du middleware express.json() pour analyser les corps de requête en JSON
app.use(express.json());

// Définition d'un tableau d'objets pour stocker les utilisateurs
let users = [
    { id: 1, name: 'Alice', email: 'alice@example.com', password: 'abcde' },
    { id: 2, name: 'Bob', email: 'bob@example.com', password: '123456' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com', password: 'azerty' }
];

// Middleware pour hacher le mot de passe
const hashPassword = async (req, res, next) => {
    argon2.hash(req.body.password)
        .then((hashedPassword) => {
            console.log("asmaa toujours plus forte que moi");
            req.body.password = hashedPassword; // Remplacer le mot de passe par le mot de passe haché

            next();
        })
        .catch((err) => {
            console.error(err); // Afficher l'erreur dans la console
            res.sendStatus(500); // Répondre avec une erreur serveur
        });
};

// Middleware pour vérifier le token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']; // Extraire l'en-tête authorization
    const token = authHeader && authHeader.split(' ')[1]; // Extraire le token de l'en-tête

    if (!token) return res.sendStatus(401); // Si pas de token, renvoyer une réponse 401 (Non autorisé)

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Si le token est invalide, renvoyer une réponse 403 (Interdit)
        req.user = user; // Ajouter les informations de l'utilisateur décodées à l'objet de la requête
        next(); // Passer au middleware suivant
    });
};

// Route pour récupérer tous les utilisateurs
app.get('/users', (req, res) => {
    res.json(users); // Renvoyer la liste des utilisateurs sous forme de JSON
});

// Route pour récupérer un utilisateur par ID
app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10); // Extraire l'ID de l'utilisateur à partir des paramètres de l'URL
    const user = users.find(u => u.id === userId); // Trouver l'utilisateur avec l'ID correspondant
    if (user) {
        res.json(user); // Si trouvé, renvoyer les détails de l'utilisateur
    } else {
        res.status(404).send('Utilisateur non trouvé'); // Si non trouvé, renvoyer une réponse 404
    }
});

// Route pour créer un nouvel utilisateur
app.post('/users', hashPassword, (req, res) => {
    const { name, email, password } = req.body; // Extraire les informations du corps de la requête
    if (!name || !email || !password) {
        return res.status(400).send('Name, email and password are required'); // Si des champs sont manquants, renvoyer une réponse 400
    }

    const newUser = {
        id: users.length + 1,
        name: name,
        email: email,
        password: password
    };
    users.push(newUser); // Ajouter le nouvel utilisateur au tableau des utilisateurs
    res.status(201).json(newUser); // Renvoyer une réponse 201 avec les détails du nouvel utilisateur
});

// Route pour mettre à jour un utilisateur existant
app.put('/users/:id', authenticateToken, (req, res) => {
    const userId = parseInt(req.params.id, 10); // Extraire l'ID de l'utilisateur à partir des paramètres de l'URL
    const userIndex = users.findIndex(u => u.id === userId); // Trouver l'index de l'utilisateur avec l'ID correspondant

    if (userIndex !== -1) {
        const { name, email, password } = req.body; // Extraire les informations du corps de la requête
        if (!name || !email || !password) {
            return res.status(400).send('Name, email and password are required'); // Si des champs sont manquants, renvoyer une réponse 400
        }

        users[userIndex] = {
            id: userId,
            name: name,
            email: email,
            password: password
        };
        res.json(users[userIndex]); // Renvoyer les détails mis à jour de l'utilisateur
    } else {
        res.status(404).send('Utilisateur non trouvé'); // Si l'utilisateur n'est pas trouvé, renvoyer une réponse 404
    }
});

// Route pour supprimer un utilisateur
app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10); // Extraire l'ID de l'utilisateur à partir des paramètres de l'URL
    const userIndex = users.findIndex(u => u.id === userId); // Trouver l'index de l'utilisateur avec l'ID correspondant

    if (userIndex !== -1) {
        const deletedUser = users.splice(userIndex, 1); // Supprimer l'utilisateur du tableau
        res.json(deletedUser); // Renvoyer les détails de l'utilisateur supprimé
    } else {
        res.status(404).send('Utilisateur non trouvé'); // Si l'utilisateur n'est pas trouvé, renvoyer une réponse 404
    }
});

// Définition du port sur lequel le serveur écoutera
const PORT = 3000;

// Démarrer le serveur et écouter sur le port spécifié
app.listen(PORT, () => {
    console.log(`Le serveur tourne sur le port ${PORT}`); // Afficher un message dans la console lorsque le serveur démarre
});