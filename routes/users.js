const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{
  res.send(users);
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
   // Extract the email parameter from the request URL
   const email = req.params.email;
   // Filter the users array to find users whose email matches the extracted email parameter
   let filtered_users = users.filter((user) => user.email === email);
   // Send the filtered_users array as the response to the client
   res.send(filtered_users);

   //for checking user by email from cmd write
   // curl localhost:5000/user/johnsmith@gamil.com
});


// POST request: Create a new user
router.post("/",(req,res)=>{
    // Push a new user object into the users array based on query parameters from the request
    users.push({
      "firstName": req.query.firstName,
      "lastName": req.query.lastName,
      "email": req.query.email,
      "DOB": req.query.DOB
  });
  // Send a success message as the response, indicating the user has been added
  res.send("The user " + req.query.firstName + " has been added!");

  //for checking and add user from cmd write
  // curl --request POST "http://localhost:5000/user?firstName=Jon^&lastName=Lovato^&email=jonlovato@theworld.com^&DOB=10/10/1995"

});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  // Copy the code here
  res.send("Yet to be implemented")//This line is to be replaced with actual return value
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  // Copy the code here
  res.send("Yet to be implemented")//This line is to be replaced with actual return value
});

module.exports=router;
