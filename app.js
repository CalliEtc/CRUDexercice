// Importer le module Express pour créer une application web
const express = require('express');

// Créer une application Express
const app = express();

// Utiliser le middleware express.json() pour parser les corps de requête en JSON
app.use(express.json());

// Définir un tableau d'objets pour stocker les utilisateurs
let users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com' }
];

// Route pour récupérer tous les utilisateurs
// Cette route répond aux requêtes GET à l'URL '/users'
app.get('/users', (req, res) => {
    // Renvoie la liste des utilisateurs sous forme de JSON
    res.json(users);
});

// Route pour récupérer un utilisateur par ID
// Cette route répond aux requêtes GET à l'URL '/users/id'
app.get('/users/:id', (req, res) => {
    // Extraire l'ID de l'utilisateur à partir des paramètres de l'URL
    const userId = parseInt(req.params.id, 10);
    // Trouver l'utilisateur avec l'ID correspondant
    const user = users.find(u => u.id === userId);
    if (user) {
        // Si l'utilisateur est trouvé, renvoyer les détails de l'utilisateur en JSON
        res.json(user);
    } else {
        // Si l'utilisateur n'est pas trouvé, renvoyer une réponse 404 avec un message d'erreur
        res.status(404).send('Utilisateur non trouvé');
    }
});

// Route pour créer un nouvel utilisateur
// Cette route répond aux requêtes POST à l'URL '/users'
app.post('/users', (req, res) => {
    // Extraire le nom et l'email du corps de la requête
    const { name, email } = req.body;
    // Vérifier que le nom et l'email sont fournis
    if (!name || !email) {
        // Si l'un des champs est manquant, renvoyer une réponse 400 avec un message d'erreur
        return res.status(400).send('Name and email are required');
    }

    // Créer un nouvel utilisateur avec un ID unique
    const newUser = {
        id: users.length + 1,
        name: name,
        email: email
    };
    // Ajouter le nouvel utilisateur au tableau des utilisateurs
    users.push(newUser);
    // Renvoie une réponse 201 (Created) avec les détails du nouvel utilisateur
    res.status(201).json(newUser);
});

// Route pour mettre à jour un utilisateur existant
// Cette route répond aux requêtes PUT à l'URL '/users/id'
app.put('/users/:id', (req, res) => {
    // Extraire l'ID de l'utilisateur à partir des paramètres de l'URL
    const userId = parseInt(req.params.id, 10);
    // Trouver l'index de l'utilisateur avec l'ID correspondant
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex !== -1) {
        // Extraire le nom et l'email du corps de la requête
        const { name, email } = req.body;
        // Vérifier que le nom et l'email sont fournis
        if (!name || !email) {
            // Si l'un des champs est manquant, renvoyer une réponse 400 avec un message d'erreur
            return res.status(400).send('Name and email are required');
        }

        // Mettre à jour les détails de l'utilisateur
        users[userIndex] = {
            id: userId,
            name: name,
            email: email
        };
        // Renvoyer les détails mis à jour de l'utilisateur
        res.json(users[userIndex]);
    } else {
        // Si l'utilisateur n'est pas trouvé, renvoyer une réponse 404 avec un message d'erreur
        res.status(404).send('Utilisateur non trouvé');
    }
});

// Route pour supprimer un utilisateur
// Cette route répond aux requêtes DELETE à l'URL '/users/:id'
app.delete('/users/:id', (req, res) => {
    // Extraire l'ID de l'utilisateur à partir des paramètres de l'URL
    const userId = parseInt(req.params.id, 10);
    // Trouver l'index de l'utilisateur avec l'ID correspondant
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex !== -1) {
        // Supprimer l'utilisateur du tableau
        const deletedUser = users.splice(userIndex, 1);
        // Renvoie les détails de l'utilisateur supprimé
        res.json(deletedUser);
    } else {
        // Si l'utilisateur n'est pas trouvé, renvoyer une réponse 404 avec un message d'erreur
        res.status(404).send('Utilisateur non trouvé');
    }
});

// Définir le port sur lequel le serveur écoutera
const PORT = 3000;

// Démarrer le serveur et écouter sur le port spécifié
app.listen(PORT, () => {
    // Afficher un message dans la console lorsque le serveur démarre
    console.log(`Le serveur tourne sur le port ${PORT}`);
});
