const express = require('express');
const server = express();
const port = 5000;

server.use(express.json());

const users = [{ id: 1, name: "Daniel Antonio", bio: "When's the next rave boiz?" }];

server.get('/api/users', (req,res) => {
    res.status(200).json(users);
});

server.get('/api/users/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);

    res.status(200).json(user);
});

server.post('/api/users', (req,res) => {
    let nextID = users.length;
    const newUser = { id: nextID + 1, ...req.body };
    users.push(newUser);

    res.status(201).json(users);
});

server.delete('/api/users/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === id);

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

    res.status(202).json(user);
})

server.listen(port, () => console.log(`Server listening on port: ${port}....`));