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
  // Extract email parameter and find users with matching email
  const email = req.params.email;
  let filtered_users = users.filter((user) => user.email === email);
  
  if (filtered_users.length > 0) {
      // Select the first matching user and update attributes if provided
      let filtered_user = filtered_users[0];
      
        // Extract and update DOB if provided
      
      let DOB = req.query.DOB;    
      if (DOB) {
          filtered_user.DOB = DOB;
      }
      
      /*
      Include similar code here for updating other attributes as needed
      */
      //Extract and update firstName if provided
      let firstName = req.query.firstName;    
      if (firstName) {
          filtered_user.firstName = firstName;
      }

      //Extract and update lastName if provided
      let lastName = req.query.lastName;    
      if (lastName) {
          filtered_user.lastName = lastName;
      }
      
      // Replace old user entry with updated user
      users = users.filter((user) => user.email != email);
      users.push(filtered_user);
      
      // Send success message indicating the user has been updated
      res.send(`User with the email ${email} updated.`);
  } else {
      // Send error message if no user found
      res.send("Unable to find user!");
  }

  //for update user and checking from cmd write
  // curl --request PUT "localhost:5000/user/johnsmith@gamil.com?DOB=1/1/1971"
  // curl localhost:5000/user/johnsmith@gamil.com
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  // Copy the code here
  res.send("Yet to be implemented")//This line is to be replaced with actual return value
});

module.exports=router;
