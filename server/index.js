const express = require('express');
const { config } = require('../utils/config');

const app = express();


app.listen(config.client.port, () => {
    console.log(`[Server] ativo na porta: ${config.client.port}`);
})