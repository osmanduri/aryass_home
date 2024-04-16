const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY_TEST);
const commandeModel = require('../Model/commandeModel')
const express = require('express')
const bodyParser = require('body-parser');

router.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['stripe-signature'];

  let data;
  let eventType;

        let event;

        try {
          event = stripe.webhooks.constructEvent(req.body, sig, process.env.ENDPOINT_SECRET_WEBHOOK);
          console.log('Webhook verified')
        } catch (err) {
          console.log(`Webhook Error: ${err.message}`)
          res.status(400).send(`Webhook Error: ${err.message}`);
          return;
        }

        data = event.data.object;
        eventType = event.type;

  // Handle the event

    if(eventType === "checkout.session.completed"){
        stripe.customers.retrieve(data.customer)
        .then( async (customer) => {
            //console.log("my_customer", customer)
            //console.log("my_data", data)

            // Supposons que customer.metadata.cart contient l'ID avec des guillemets supplémentaires
            let cartId = customer.metadata.cart;
            // Enlever les guillemets supplémentaires si présents
            cartId = cartId.replace(/"/g, '');
            
            // Ensuite, utilisez l'ID nettoyé pour récupérer la commande
            const updatedOrder = await commandeModel.findByIdAndUpdate(
                cartId,
                {
                  $set: {
                    nomComplet: data.customer_details.name,
                    payment_method: data.payment_method_types, // Assumer plusieurs méthodes
                    email: data.customer_details.email,
                    adresse: data.customer_details.address.line1,
                    ville: data.customer_details.address.city,
                    pays: data.customer_details.address.country,
                    codePostal: data.customer_details.address.postal_code,
                    telephone: data.customer_details.phone,
                    status_paiement: data.payment_status,
                    monnaie:data.currency,
                    customer: data.customer,
                    payment_intent:data.payment_intent,
                    status:data.status,
                    procedure_paiement:"stripe"
                  }
                },
                { new: true }
              );
              if (!updatedOrder) {
                throw new Error("Order not found");
              }

              console.log("Order updated successfully", updatedOrder);
            
            console.log(data)
            console.log("my_customer !",customer)
            console.log("my_data_customer_details", data.customer_details, data.payment_status)
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    res.json({received: true});
});

router.post('/create-checkout-session', bodyParser.json(), async (req, res) => {
    try {

        const customer = await stripe.customers.create({
            metadata:{
                userId:req.body.userId,
            },
            
        })

        const lineItems = req.body.products.articles.map((product) => {
            // Convertir le tableau des tags en une chaîne de caractères
            const tagsDescription = product.tags.map(tag => `${tag.type}: ${tag.valeur}`).join(" / ");
            return {
                price_data: {
                    currency: "eur",
                    product_data: {
                        name: product.nomProduit,
                        images: [product.img[0]],
                        // Utilisation du champ description pour inclure les tags
                        description: tagsDescription,
                    },
                    unit_amount: product.prix * 100,
                },
                quantity: product.quantite,
            };
        });

        //console.log("customer_created", customer)
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            customer:customer.id,
            mode: "payment",
            success_url: `http://localhost:5173/payment_success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `http://localhost:5173/payment_cancel?session_id={CHECKOUT_SESSION_ID}`,
            billing_address_collection: 'required', // Ajoute un champ pour l'adresse de facturation
            shipping_address_collection: {
              allowed_countries: ['FR','BE','DE','NL','CH'], // Spécifiez les pays autorisés pour l'adresse de livraison
            },
            phone_number_collection: {
                // Mettre `enabled` à `true` pour rendre la collecte du numéro de téléphone obligatoire
                enabled: true,
              },
        });

        const newCommande = new commandeModel({
            user_id:req.body.userId,
            panier:req.body.products.articles,
            prixTotal:req.body.prixTotal,
            session_id:session.id,
            procedure_paiement:"stripe"
        })

        const cmd = await newCommande.save()

        await stripe.customers.update(customer.id, { // il faut mettre à jour le client avec le cmd._id pour le récuprer dans le webhook et mettre à jour les infos de la commande du client
            metadata: {
              userId: req.body.userId,
              cart: JSON.stringify(cmd._id),
            },
          });

        res.send({ sessionId: session.id });
    } catch (error) {
        console.error("Error creating checkout session:", error.message);
        res.status(500).send({ error: error.message });
    }
});

router.get('/verify-payment/:sessionId', async (req, res) => {
    const { sessionId } = req.params;
    
    try {
        // Récupérer les détails de la session de paiement de Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        // Ici, vous pouvez effectuer des vérifications supplémentaires telles que
        // confirmer que le statut de paiement est 'paid', que le montant est correct, etc.
        // Pour cet exemple, nous vérifierons simplement le statut de paiement.
        if (session.payment_status === 'paid') {
            res.json({ success: true, message: 'Paiement vérifié avec succès.' });
        } else {
            res.json({ success: false, message: 'Le paiement n\'a pas été effectué ou est encore en attente.', session:session });
        }
    } catch (error) {
        console.error('Erreur lors de la vérification de la session de paiement:', error);
        res.status(500).json({ success: false, message: 'Erreur lors de la vérification du paiement.' });
    }
});

module.exports = router;