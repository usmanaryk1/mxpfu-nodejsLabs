const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const itemRoutes = require('./routes/items.js');
const usersRoutes = require('./routes/users.js');

let users =[];

const doesExist = (username) => {
    let userwithsamename = users.filter((user)=>{
        return user.username === username; 
    })
    return userwithsamename.length > 0;
}

const authenticatedUser = (username, password)=>{
    let authenticatedUser = users.filter((user)=>{
        return user.username === username && user.password === password; 
    })
    return authenticatedUser.length > 0;
}

const app = new express();

app.use(express.json());//middleware //if not use req undefined
app.use(session({secret : "fingerprint",  resave: true, saveUninitialized: true })); //middleware

//app.get('/auth', function (req, res, next) { //this syntax is not working with api as middleware
const authMiddleware = ((req, res, next) => {
    console.log("auth",  req.session,  req.session.authentication);
    if(req.session.authentication){
        token = req.session.authentication['accessToken'];
        jwt.verify(token, "access", (err, user)=>{
            if(!err){
                req.user = user;
                next();
            }else{
                return res.status(403).json({"message": "User not authenticated"})
            }
        })
    }else{
        return res.status(403).json({"message": "User not logged in"})
    }
})

app.post('/login',(req,res)=>{
    console.log("req",req.body, users);
    const username = req.body.username;
    const password = req.body.password;
    if(!username || !password){
        return res.status(404).json({"message": "Error logging in"})
    }

    if(authenticatedUser(username, password)){

        let accessToken = jwt.sign({
            data:password
        }, 'access', { expiresIn: 60 * 60 });

        req.session.authentication = {
            accessToken:accessToken, 
            username:username
        }
        return res.status(200).json({"message": "User successfully logged in"})

    }else{
        return res.status(208).json({"message": "Invalid login. Check username and password"})
    }

});

app.post('/register',(req,res)=>{
    console.log("req",req.body);
    const username = req.body.username;
    const password = req.body.password;
    if(username && password){
        if(!doesExist(username)){
            users.push({"username": username, "password": password});
            return res.status(200).json({"message": "User successfully registered. Now you can login"})
        }else{
            return res.status(404).json({"message": "User already exists!"})
        }
    }
    return res.staus(404).json({message : "Unable to register user."})
});


app.post('/logout',authMiddleware,(req,res)=>{
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ "message": "Error logging out" });
        }
        res.clearCookie('connect.sid');
        return res.status(200).json({ "message": "User successfully logged out" });
    });
});

app.use('/items', authMiddleware, itemRoutes);
app.use('/users', authMiddleware, usersRoutes);

app.listen(3333, ()=> {
    console.log(`Listening at http://localhost:3333 `);
})