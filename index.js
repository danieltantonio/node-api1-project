const express = require('express');
const server = express();
const port = 5000;

server.use(express.json());

const users = [{ id: 1, name: "Daniel Antonio", bio: "When's the next rave boiz?" }];

server.get('/api/users', (req,res) => {
    try {
        res.status(200).json(users);
    } catch {
        { errorMessage: "The users information could not be retrieved." }
    }
});

server.get('/api/users/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);

    if(!user) {
        res.status(404).json({ message: "The user with the specified ID does not exist." });
    } else {
        res.status(200).json(user);
    }
});

server.post('/api/users', (req,res) => {
    let nextID = users.length;
    const newUser = { id: nextID + 1, ...req.body };

    if(!req.body.name || !req.body.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    }
    
    try {
        users.push(newUser);
        res.status(201).json(users);
    } catch {
        res.status(500).json({ errorMessage: "The user information could not be retrieved." })
    }
});

server.delete('/api/users/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === id);

    if(userIndex < 0) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }

    if(userIndex >= 0) {
        users.splice(userIndex, 1);
        res.status(202).json(users);
    } else {
        res.status(404).json({ message: 'ERROR: No User Found!' })
    }

});

server.put('/api/users/:id', (req,res) => {
    const user = users.find(obj => obj.id === parseInt(req.params.id));
    const update = req.body;
    Object.assign(user, update);

    if(!req.body.name || !req.body.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    }

    if(!user) {
        res.status(404).json({ message: "The user with the specified ID does not exist." });
    }

    try {
        res.status(200).json(update);
    } catch {
        res.status(500).json({ errorMessage: "The user information could not be modified." });
    }
})

server.listen(port, () => console.log(`Server listening on port: ${port}....`));