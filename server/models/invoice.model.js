const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const invoiceModel=new Schema(
{
    doctoremail: {
        type: String,
        trim: true,
   
    },
    date: {
        type: String,
        trim: true,
    },
    data: {
        type: Object,
        trim: true,
    },
    
},{
    timestamps: true,
});

const InvoiceModel = mongoose.model('invoice',invoiceModel);
module.exports=InvoiceModel;