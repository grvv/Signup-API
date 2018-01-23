dbPerson.find({email: req.body.email}, (err, data)=>{
    if(err){
        res.json({
            success: false,
            msg: "hsdvjkfo"
        })
    }else if(data){
        res.json({
            success: false,
            msg: "Email already used"
        })
    }else{

    }
})


var unnique = dbPerson.find({email: req.body.email})
unnique.then(data=>{
    if(data){
        res.json({
            success: false,
            msg: "Email already used"
        })
    }else{

    }
}).catch(err=>{
    res.json({
        success: false,
        msg: "hsdvjkfo"
    })
})