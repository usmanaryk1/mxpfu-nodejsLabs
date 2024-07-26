const express = require('express');
const router = express.Router();

const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

router.get('/',(req,res)=>{
    res.send("Welcome to the express server")
});

router.get('/fetchMonth/:num', (req, res)=> {
    let num = req.params.num;
    console.log("num", num, typeof num);

    if( num < 1 || num > 12 ){
        res.send("Not a valid month number")
    }else{
        res.send(months[num -1])
    }
})

// router.get('/loginDetails',(req,res)=>{
//     res.send(JSON.stringify(loginDetails))
// });

router.get('/:name',(req,res)=>{
    res.send("Hello " + req.params.name)
});

module.exports=router;