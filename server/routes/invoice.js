const router = require("express").Router();
let Invoice = require('../models/invoice.model');



router.route('/findalldoc/:email/:start/:end').get((req,res)=>{
console.log("Looking for Invoice");
   
    Invoice.find({doctoremail:req.params.email,date:{$gte:req.params.start,$lte:req.params.end}})
.then(User=>{

  res.json(User);

})
.catch(err => res.status(400).json('Error:'+err));
});



router.route('/all').get((req,res)=>{
    Invoice.find()
.then(per=> res.json(per))
.catch(err => res.status(400).json('Error:'+err));
});








router.route('/add').post((req,res)=>{
  
   

const doctoremail =req.body.doctoremail;
const data =req.body.data;
const date =req.body.date;
Invoice.find({doctoremail:req.body.doctoremail,date:req.body.date}).then(User=>{

    if(User.length>0){
       
      Invoice.findById(User[0]._id)
      .then(Applications=> {
       
  
  
      Applications.doctoremail=req.body.doctoremail;
      Applications.data=req.body.data;
      Applications.date=req.body.date;
      Applications.save()
      .then(Site=> res.json('Invoice Updated'))
      .catch(err => res.status(400).json('Error:'+err));
  
      })
      
      
      




    }else{
        const NewInvoice = new Invoice({doctoremail,data,date});

        NewInvoice.save()
        .then(()=>  res.json('Invoice Added'))
        .catch(err => res.status(400).json('Error:'+err));
    }

  
  
  })




});

router.route('/:id').delete((req,res)=>{

    Invoice.findByIdAndDelete(req.params.id)
.then(Device=>{

  res.json('Invoice Deleted')

})
.catch(err => res.status(400).json('Error:'+err));
});

module.exports = router;