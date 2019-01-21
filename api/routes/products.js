const express = require("express");
const router = express.Router();

// The shop inventory
let productOrders = [];

// This allows us to add items to the shop
router.post('/', (req, res, next) => {
    const product = {
        title: req.body.title,
        price: req.body.price,
        inventory_count: req.body.inventory_count
    }
    let index = 0;
    for (let i = 0; i < productOrders.length; i++) {
        if (product.title === productOrders[i].title) {
            productOrders[i].inventory_count++;
            index = i;
        }
    }
    if (index == 0) productOrders.push(product);
    res.status(201).json({
        message: "Handling POST requests to /products",
        createdProduct: product
    });
});

// This allows us to query by product name or by all
router.get('/:title', (req, res, next) => {
    let ensure_quant = req.params.check;
    if (req.params.title == "all") {
        res.status(200).json({
            message: "Here are all the products in store:",
            products: productOrders
        });
    } else {
            for (let i = 0; i < productOrders.length; i++) {
                if (req.params.title === productOrders[i].title) {
                    res.status(200).json({
                        message: "Here is the product " + req.params.title,
                        products: productOrders[i]
                    });
                }
            }
        }
});

// This allows us to query by all but only for items in stock
router.get('/:title/:check', (req, res, next) => {
    if (req.params.check) {
        if (req.params.title == "all") {
            for (let i = 0; i < productOrders.length; i++) {
                if (productOrders[i].inventory_count > 0) {
                    res.status(200).json({
                        message: "Here is the product " + productOrders[i].title,
                        products: productOrders[i]
                    });
                }
            }
        } else {
            res.status(200).json({
                message: "Here are all the products in store:",
                products: productOrders
            });
        }
    }
});

// This allows us to purchase an item
router.delete("/:title", (req, res, next) => {
    for (let i = 0; i < productOrders.length; i++) {
        if (req.params.title == productOrders[i].title && productOrders[i].inventory_count > 0) {
            res.status(200).json({
                message: "You have purchased " + productOrders[i].title,
                products: productOrders[i]
            });
            productOrders[i].inventory_count--;
        } else {
            res.status(200).json({
                message: "Product is sold out"
            });
        }
    }
});

module.exports = router;
