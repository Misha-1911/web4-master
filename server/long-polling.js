const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const events = require('events');
const path = require('path');
const setTelegramBot = require('./telegram_bot');
const messagesController = require('../public/api/message-api')

const emitter = new events.EventEmitter();

const Mongo = require('../public/setupDB/setupDB')

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../public/dist')));

const setup = async () => {
    await Mongo.setupDb(process.env.MONGO_DB_URI);

    app.use(messagesController.router);
}

setup();

app.get('/messages', (req, res) => {
    emitter.once('new-message', (message) => {
        res.status(200).send({ message });
    });
});

app.post('/messages', (req, res) => {
    const message = req.body;
    console.log('message:', message);
    emitter.emit('new-message', message);
    return res.status(200).send();
});

app.get('/login', (req, res) => {
    const { id } = req.query;
    if (!id) {
        return res.status(400).send({
            message: 'parameter id is required'
        });
    }
    console.log(`Wait on login id:${id}`);
    emitter.once(`login-${id}`, (userInfo) => {
        res.status(200).send(userInfo);
    });
});

setTelegramBot(app, emitter);

app.listen(process.env.PORT, () => console.log(`Server was started on ${process.env.PORT}`));