const router = require('express').Router()
const nodemailer = require('nodemailer')
const path  = require('path');
const hbs = require('nodemailer-express-handlebars')
const fs = require('fs');
const handlebars = require('handlebars');
const htmlToPdf = require('html-pdf');

module.exports.getAllInvoices = async (req, res) => {
    res.send('invoice ok')
}

const generatePDF = async (html, toEmail, lang) => {
    try {
        const pdfPath = path.join(__dirname, '../Views/templates/facture.pdf');

        // Options pour html-to-pdf
        const options = {
            format: 'A4',
        };

        // Convertir HTML en PDF
        await new Promise((resolve, reject) => {
            htmlToPdf.create(html, options).toFile(pdfPath, (err, res) => {
                if (err) {
                    console.error('Erreur lors de la génération du PDF :', err);
                    reject(err);
                } else {
                    console.log(`Le fichier PDF a été généré avec succès : ${pdfPath}`);
                    resolve();
                }
            });
        });

        // Envoyer l'e-mail avec la pièce jointe
        //await sendEmailWithAttachment(pdfPath, toEmail, lang);
    } catch (error) {
        console.error('Erreur lors de la conversion Handlebars vers PDF :', error);
        throw error;
    }
};

module.exports.convertHandlebarsToPdf = async (req, res) => {

try {
    const chemin_fichier_handlebars = path.join(__dirname, `../Views/templates/facture.handlebars`);
    const htmlTemplate = fs.readFileSync(chemin_fichier_handlebars, 'utf8');
    const template = handlebars.compile(htmlTemplate);

    const data = {
        clientName: req.body.prenom + ' ' + req.body.nom,
        clientEmail: req.body.email,
        clientPhone: req.body.telephone,
        clientAddress: req.body.adresse,
        articles:req.body.articles,
        totalAmount: req.body.prix,
        invoice_number:req.body.invoice_number,
        date_payment:req.body.date_payment,
    };


    const htmlContent = template(data);

    // Générer le PDF
    await generatePDF(htmlContent, req.body.email);

    res.status(200).send('La conversion Handlebars vers PDF a été effectuée avec succès');
} catch (error) {
    console.error('Erreur lors de la conversion Handlebars vers PDF :', error);
    res.status(500).send('Erreur lors de la conversion Handlebars vers PDF');
}
}