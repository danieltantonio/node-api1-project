const express = require('express');
const server = express();
const port = 5000;

server.use(express.json());

const users = [{ id: 1, name: "Daniel Antonio", bio: "When's the next rave boiz?" }];
let nextID = users.length;

server.get('/api/users', (req,res) => {
    res.status(200).json(users);
});

server.listen(port, () => console.log(`Server listening on port: ${port}....`));