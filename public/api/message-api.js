const { Messages } = require('../models/messages');
const { Router } = require('express')

const router = Router();

router.post('/api/message', async (req, res) => {
    const { userName, message, date } = req.body;

    const doc = new Messages({
        userName, 
        message,
        date
    })

    const elem = await doc.save();
    return res.status(200).send(elem);
});

router.get('/api/show-messages', async (req, res) => {
    const queryDb = {};

    const msgs = await Messages.find(queryDb).sort({_id: -1}).limit(10);
    return res.status(200).send(msgs);
});

module.exports = { router };