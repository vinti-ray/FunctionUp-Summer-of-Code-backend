const billinModel=require("../model/billing")
// const { PDFDocument } = require('pdf-lib');
const nodemailer = require('nodemailer');
const fs = require('fs');
require('dotenv').config();
const passOutlook = process.env.PASSWORD;
const PDFDocument = require('pdfkit');
// const nodemailer = require('nodemailer');
const createBill=async(req,res)=>{
try {
                let data=req.body 

                let {customerName,email,number,item,organisationId,paymentMethod,total,netTotal}=data
                item=JSON.parse(item)
                if(!customerName) return res.status(400).send({status:false,message:"please provide customer name"})
                if(!number) return res.status(400).send({status:false,message:"please provide customer number"})
               //  if(typeof number!=="number") return res.status(400).send({status:false,message:"please provide customer number in number format"})
                if(item.length<1) return res.status(400).send({status:false,message:"please provide item"})
                
                if(!organisationId) return res.status(400).send({status:false,message:"please provide organisationId"})
                
                if(!paymentMethod) return res.status(400).send({status:false,message:"please provide paymentMethod"})
                

   
   
   
                  //creating data in database
                  let dataToCreate={customerName,email,number,item,organisationId,paymentMethod,total,netTotal}
                 const createData=await billinModel.create(dataToCreate)
                 console.log(createData);


                 if(email!=""){
                  const invoiceData = {
                     invoiceNumber:createData._id,
                     customerName: customerName,
                     items:[ ...item],
                     total:total,

                     netTotal:netTotal
                   };
                   
                   // Create the PDF invoice
                   const doc = new PDFDocument();
                   doc.pipe(fs.createWriteStream('invoice.pdf'));
                   
                   doc
                     .fontSize(25)
                     .text('Invoice', { align: 'center' })
                     // .moveDown();
                   
                   doc
                     .fontSize(16)
                     .text(`Invoice Number: ${invoiceData.invoiceNumber}`)
                     .moveDown();
                   
                   doc
                     .fontSize(14)
                     .text(`Customer Name: ${invoiceData.customerName}`)
                     .moveDown();
                   
                   doc
                     .fontSize(12)
                     .text('Items')
                     .moveDown();
                   

                   invoiceData.items.forEach(item => {
                     doc
                       .fontSize(14)
                       .text(`Item name: ${item.itemName}`)
                       .text(`Price: ${item.mrp}`)
                       .text(`Quantity: ${item.quantity}`)
                     //   .text(item.value)
                      .moveDown();
                   });
                   doc
                   .fontSize(14)
                   .text(`Total: ${invoiceData.total}`)
                   .moveDown();
                   doc
                   .fontSize(14)
                   .text(`CGST: 14`)
                   .moveDown();
                   doc
                   .fontSize(14)
                   .text(`SGST: 14`)
                   .moveDown();
                 
                   doc
                   .fontSize(14)
                   .text(`Total Paid: ${invoiceData.netTotal}`)
                   .moveDown();
                 
                   doc
                   .fontSize(14)
                   .text(`Thanks for shopping with us`)
                   .moveDown();
                 
                   
                   doc.end();
                   
                   // Send the email
                   const transporter = nodemailer.createTransport({
                     service: 'outlook',
                     auth: {
                       user: 'vinti9876@outlook.com',
                       pass:passOutlook,
                     },
                   });
                   
                   const mailOptions = {
                     from: 'vinti9876@outlook.com',
                     to: email,
                     subject: 'Supermarket Invoice',
                     text: 'Please find your invoice attached.',
                     attachments: [
                       {
                         filename: 'invoice.pdf',
                         path: 'invoice.pdf',
                       },
                     ],
                   };
                   
                   transporter.sendMail(mailOptions, (error, info) => {
                     if (error) {
                       console.error(error);
                     } else {
                       console.log(`Email sent: ${info.response}`);
                     }
                   });
                  
         

                 }
                 return res.status(201).send({status:true,message:createData})
} catch (error) {
   return res.status(500).send({status:false, message:error.message})
}
 


}

const getData=async(req,res)=>{
   try {
      // let token=req.headers["token"]
      let organisationId=req.decode.id
      // console.log(req.decode.id);
      const getData=await billinModel.find({organisationId:organisationId}).lean()
      if(!getData) return res.status(500).send({status:false, message:"no data present in data base"})
      for(let i=0;i<getData.length;i++){
         let x=getData[i].total
         getData[i].total=x.toFixed(2)
         let y=getData[i].netTotal
         getData[i].netTotal=y.toFixed(2)
      }
      return res.status(201).send({status:true,message:getData})
   } catch (error) {
      return res.status(500).send({status:false, message:error.message})
   }
}
module.exports={createBill,getData}