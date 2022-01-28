const express = require("express");
const router = express.Router();
const mercadopago = require("mercadopago");
require("dotenv").config();
const config = require("../lib/config");

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN,
});

router.post("/", (req, res) => {
  let preference = {
    back_urls: {
      success: `${config.server.serverH}/agenda`,
      failure: `${config.server.serverH}/agenda`,
      pending: `${config.server.serverH}/agenda`,
    },
    auto_return: "approved",
    external_reference: req.body.reference,
    items: [
      {
        title: req.body.title,
        unit_price: parseInt(req.body.price),
        quantity: 1,
      },
    ],
    notification_url:
      "https://webhook.site/4d19eb23-ab51-463b-968a-074dd4fb565f",
    binary_mode: true,
    payment_methods: {
      installments: 1,
      excluded_payment_types: [{ id: "ticket" }, { id: "atm" }],
      excluded_payment_methods: [{ id: "paypal" }],
    },
  };
  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.redirect(response.body.init_point);
    })
    .catch(function (error) {
      console.log(error);
    });
});

module.exports = router;

//4075 5957 1648 3764
//11/25
