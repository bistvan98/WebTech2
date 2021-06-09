const express = require('express');
const Product = require('../schema/Product');
const router = express.Router();

//GET
router.get('/', (req, res, next) => {
    Product.find().then((products) => {
        res.send(products);
    })
});

//ADD
router.post('/', (req, res, next) => {
    Product.create(req.body)
        .then((product) => {
            res.send(product)
        })
        .catch(next);
});

//DELETE
router.delete('/:id', (req, res, next) => {
    Product.findByIdAndRemove({ _id: req.params.id })
        .then((product) => {
            res.send(product);
        });
});


module.exports = router;