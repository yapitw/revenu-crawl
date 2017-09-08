const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
})

router.get('/revenu', (req, res) => {
    res.render('revenu', {title: 'Revenu'});
})

module.exports = router