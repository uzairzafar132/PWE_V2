const router = require('express').Router();
let Zipdata = require('../models/zipdata.model');

router.route('/add').post((req,res)=>{

             const zipcode = req.body.zipcode;
             const location=req.body.location;
             const county = req.body.county;
             const state=req.body.state;
             const city=req.body.city;
    
             const newApplication = new Zipdata({zipcode,location,county,state,city});
         
             newApplication.save()
             .then(()=> res.json('Zip Code Added'))
             .catch(err => res.status(400).json('Error:'+err));
    
       });


router.route('/all').get((req,res)=>{
    Zipdata.find()
.then(per=> res.json(per))
.catch(err => res.status(400).json('Error:'+err));
});





router.route('/findid/:id').get((req,res)=>{
    Zipdata.find({zipcode: req.params.id})
.then(User=> res.json(User))
.catch(err => res.status(400).json('Error:'+err));
});





router.route('/findserialid').post((req,res)=>{

   
    Zipdata.find({location:req.body.location})
.then(User=>{

    res.json(User);

})
.catch(err => res.status(400).json('Error:'+err));
});






router.route('/update/:id').post((req,res)=>{
   


    Zipdata.findById(req.params.id)
    .then(Applications=> {
     


    Applications.zipcode=req.body.zipcode;
    Applications.location = req.body.location;
    Applications.county=req.body.county;
    Applications.state = req.body.state;
    Applications.city = req.body.city;
    Applications.save()
    .then(Site=> res.json('Zipcode Updated Saved'))
    .catch(err => res.status(400).json('Error:'+err));

    })


});


router.route('/:id').delete((req,res)=>{

    Zipdata.findByIdAndDelete(req.params.id)
  .then(Device=>{
 
    res.json('Zipcode Deleted')
 
  })
  .catch(err => res.status(400).json('Error:'+err));
 });

module.exports = router;