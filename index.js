const express = require('express');
const server = express();
const port = 5000;

server.use(express.json());

server.get('/', (req,res) => {
    res.status(200).json({ message: 'Server works :)'});
});

server.listen(port, () => console.log(`Server listening on port: ${port}....`));