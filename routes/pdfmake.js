'use strict';
const express = require('express');
const router = express.Router();
const firebase = require('../db');
const Item = require('../models/item');
const firestore = firebase.firestore();


const pdfMake = require('../pdfmake/pdfmake');
const vfsFonts = require('../pdfmake/vfs_fonts');

pdfMake.vfs = vfsFonts.pdfMake.vfs;

router.post('/pdf', async (req, res, next) => {
    //res.send('PDF');

     try {
    //     const data = req.body;
    //     await firestore.collection('item').doc().set(data);
    //     //res.send('Record saved successfuly');
    
    // const item = req.body.name;
    // const desc = req.body.description;
    // const qunt = req.body.quantity;
    // const amt = req.body.amount;

    // var documentDefinition = {
    //     content: [
    //         `Item name  :     ${item}
    //         Description :    ${desc} 
    //         Quantity    :    ${qunt} 
    //         Amount      :    ${amt}` ,
    //         'Nice to meet you!'
    //     ]        
    // };

    
        
            const items = await firestore.collection('item');
            const data = await items.get();
            
         
            const itemsArray = [];
            if(data.empty) {
                res.status(404).send('No Item record found');
            }else {
                data.forEach(doc => {
                    const item = new Item(
                        doc.id,
                        doc.data().name,
                        doc.data().description,
                        doc.data().quantity,
                        doc.data().amount,
                       
                    );
                    itemsArray.push(item);
                });
                var documentDefinition = {
                    content: [
                         // `Item name  :     ${item}
                         // Description :    ${desc} 
                         // Quantity    :    ${qunt} 
                         // Amount      :    ${amt}` ,
                        
                             `${JSON.stringify(itemsArray)}`
                     ]        
                 };
               // res.send(itemsArray);
            }
           

        
         
    
    

    const pdfDoc = pdfMake.createPdf(documentDefinition);
    pdfDoc.getBase64((data)=>{
        res.writeHead(200, 
        {
            'Content-Type': 'application/pdf',
            'Content-Disposition':'attachment;filename="filename3.pdf"'
        });

        const download = Buffer.from(data.toString('utf-8'), 'base64');
        res.end(download);
    });
}
catch (error) {
    res.status(400).send(error.message);
}

});


module.exports = router;