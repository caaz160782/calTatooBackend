const express = require("express");
const router = express.Router();
const mercadopago = require("mercadopago");
require("dotenv").config();

// Agrega credenciales QUIEN ES EL VENDEDOR
mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN,
});

router.post("/", (req, res) => {
  let preference = {
    back_urls: {
      success: "http://localhost:3000/agenda",
      failure: "http://localhost:3000/failure",
      pending: "http://localhost:3000/pending",
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
      //"http://localhost:8000/feedback",
      "https://webhook.site/4d19eb23-ab51-463b-968a-074dd4fb565f",
    // binary_mode: true,
  };
  //se envian los parametros de la compra y mp devuelve la preferencia completada por ellos con datos adicionales
  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.redirect(response.body.init_point);
      //res.redirect(response.body.sandbox_init_point);
      // res.json({
      //   id: response.body.id,
      // });
    })
    .catch(function (error) {
      console.log(error);
    });
});

// router.post("/", (req, res) => {

//   mercadopago.configurations.setAccessToken(process.env.ACCESS_TOKEN);
//   const payment_data = {
//     transaction_amount: req.body.transaction_amount,
//     token: req.body.token,
//     description: req.body.description,
//     installments: Number(req.body.installments),
//     payment_method_id: req.body.paymentMethodId,
//     issuer_id: req.body.issuer,
//     payer: {
//       email: req.body.payer.email,
//       identification: {
//         type: req.body.payer.docType,
//         number: req.body.payer.docNumber,
//       },
//     },
//   };

//   mercadopago.payment
//     .save(payment_data)
//     .then((response) => {
//       return res.status(response.status).json({
//         status: response.body.status,
//         status_detail: response.body.status_detail,
//         id: response.body.id,
//       });
//     })
//     .catch((err) => {
//       return res.status(500).send(err);
//     });
// });

module.exports = router;

//4075 5957 1648 3764
//11/25
