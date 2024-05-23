const nodemailer = require('nodemailer')
const path  = require('path');
const fs = require('fs');
const handlebars = require('handlebars');
const htmlToPdf = require('html-pdf');
const moment = require('moment');
moment.locale('fr');

module.exports.getAllInvoices = async (req, res) => {
    res.send('invoice ok')
}

// Fonction pour envoyer l'e-mail avec la pièce jointe
const sendEmailWithAttachment = async (pdfPath, toEmail) => {
    
  let transporter = nodemailer.createTransport({
    host:'smtp.ionos.fr',
    port:'465',
    auth: {
        user: process.env.USER_MAIL,
        pass: process.env.PASSWORD
    }
});  
  
    const attachmentOptions = {
      filename: 'facture.pdf',
      path: pdfPath,
    };
  
    const mailOptions = {
      from: process.env.USER_MAIL, // Utilisez l'adresse email spécifiée dans le transport
      to: toEmail,
      bcc: 'aryasshome@gmail.com',
      subject: "Facture Aryas Home",
      text: "Ceci est un texte",
      html: "<p>Bonjour,</p><p>Félicitaion pour votre achat chez Arya's home ! Veuillez trouver la facture en pièce jointe.</p>",
      attachments: [attachmentOptions],
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log('Le mail a été envoyé avec succès.');
    } catch (error) {
      console.error('Erreur lors de l’envoi du mail :', error);
    }
  
    /*fs.unlink(pdfPath, (err) => {
      if (err) {
        console.error('Erreur lors de la suppression du fichier PDF :', err);
      } else {
        console.log('Le fichier PDF a été supprimé avec succès.');
      }
    });*/
  };

const generatePDF = async (html, toEmail, nomComplet) => {
    try {
      const pdfPath = path.join(__dirname, `../Views/templates/factures/${nomComplet +'_'+Date.now()}.pdf`);

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
        await sendEmailWithAttachment(pdfPath, toEmail);
    } catch (error) {
        console.error('Erreur lors de la conversion Handlebars vers PDF :', error);
        throw error;
    }
};

function generateRandomNb(){
  var nombresAleatoires = Array.from({ length: 8 }, () => Math.floor(Math.random() * 9) + 1);
  return '010' + nombresAleatoires.join('');
}

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
        clientCodePostal:req.body.codePostal,
        clientVille:req.body.ville,
        articles:req.body.articles,
        totalAmount: req.body.prixTotal,
        invoice_number: generateRandomNb(), // 
        date_payment:moment().format('LL'),
    };


    const htmlContent = template(data);

    // Générer le PDF
    await generatePDF(htmlContent, req.body.email, data.clientName);

    res.status(200).send('La conversion Handlebars vers PDF a été effectuée avec succès');
} catch (error) {
    console.error('Erreur lors de la conversion Handlebars vers PDF :', error);
    res.status(500).send('Erreur lors de la conversion Handlebars vers PDF');
}
}