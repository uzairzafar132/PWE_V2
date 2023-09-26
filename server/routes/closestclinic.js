const router = require('express').Router();
let ClosestClinic = require('../models/closestclinic.model');

router.route('/add').post((req,res)=>{
  
   
             const clinic = req.body.clinic;

             const newApplication = new ClosestClinic({clinic});
         
             newApplication.save()
             .then(()=> res.json('Clinic Added'))
             .catch(err => res.status(400).json('Error:'+err));
    
       });


router.route('/all').get((req,res)=>{
    ClosestClinic.find()
.then(per=> res.json(per))
.catch(err => res.status(400).json('Error:'+err));
});





router.route('/findid/:id').get((req,res)=>{
    ClosestClinic.find({clinic: req.params.id})
.then(User=> res.json(User))
.catch(err => res.status(400).json('Error:'+err));
});





router.route('/findserialid').post((req,res)=>{

   
    ClosestClinic.find({location:req.body.location})
.then(User=>{

    res.json(User);

})
.catch(err => res.status(400).json('Error:'+err));
});






router.route('/update/:id').post((req,res)=>{
   


    ClosestClinic.findById(req.params.id)
    .then(Applications=> {
     


    Applications.clinic=req.body.clinic;
    Applications.save()
    .then(Site=> res.json('Clinic Updated Saved'))
    .catch(err => res.status(400).json('Error:'+err));

    })


});


router.route('/:id').delete((req,res)=>{

    ClosestClinic.findByIdAndDelete(req.params.id)
  .then(Device=>{
 
    res.json('Clinic Deleted')
 
  })
  .catch(err => res.status(400).json('Error:'+err));
 });

module.exports = router;