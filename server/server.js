const functions = require('firebase-functions');
const cors = require('cors');
const stripe = require('stripe')("sk_test_51NnMTXFm98DZVzhNUfFVnhj6GYTuskvUQQyz2f34IyJLxmCoYhfhpwwUcasLBJ3zlhGofJWdGOxeeDcjP9nmWEle00P7EDNaMY");

const corsHandler = cors({
    origin: 'http://localhost:4200',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
});

const YOUR_DOMAIN = 'http://localhost:4242';

exports.createCheckoutSession = functions.https.onRequest((req, res) => {
    corsHandler(req, res, async () => {
        console.log("Reçu :", req.body);
        try {
            const session = await stripe.checkout.sessions.create({
                line_items: req.body.item.map((item) => ({
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: item.nom,
                            images: ['https://www.maspatule.com/blog/wp-content/uploads/2021/08/SUSHI2-1440x1604.jpg']
                        },
                        unit_amount: item.prix * 100
                    },
                    quantity: 1,
                })),
                mode: 'payment',
                success_url: `${YOUR_DOMAIN}/success.html`,
                cancel_url: `${YOUR_DOMAIN}/cancel.html`,
            });

            res.status(200).json({ url: session.url });
        } catch (error) {
            res.status(500).send(error);
        }
    });
});