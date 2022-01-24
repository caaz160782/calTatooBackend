const express = require("express");
const router = express.Router();
const mercadopago = require("mercadopago");
const dateReservation = require("../usecases/dateReservationTatoo");
require("dotenv").config();

router.post("/", async (req, res) => {
  const payment = await mercadopago.payment.findById(req.body.paymentId);
  console.log("acaaaa", payment.body.status, payment.body.external_reference);
  const status = payment.body.status;
  if (status === "approved") {
    try {
      // const dateTatooData = req.body;
      const dateUpdate = await dateReservation.updatePayment(
        payment.body.external_reference
      );
      res.status(201).json({
        code: true,
        message: "Updated",
        status,
        payload: dateUpdate,
      });
    } catch (error) {
      res.status(404).json({
        code: false,
        message: "cita no encontrada",
        error: error,
      });
    }
  } else {
    res.status(404).json({
      code: false,
      message: "pago no aprobado",
      error: error,
    });
  }

  // res.json({
  //   Payment: req.query.payment_id,
  //   Status: req.query.status,
  //   MerchantOrder: req.query.merchant_order_id,
  // });
  //res.redirect(response.body.sandbox_init_point);
});

// app.get("/feedback", function (req, res) {
//   res.json({
//     Payment: req.query.payment_id,
//     Status: req.query.status,
//     MerchantOrder: req.query.merchant_order_id,
//   });
// });

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
