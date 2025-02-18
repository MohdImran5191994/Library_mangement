const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  let isValids = users.filter((user) => {
    return user.username === username;
  });
  if (isValids.length > 0) {
    return true;
  } else {
    return false;
  }
};

const authenticatedUser = (username, password) => {
  let validusers = users.filter((user) => {
    return user.username === username && user.password === password;
  });
  if (validusers.length > 0) {
    return true;
  } else {
    return false;
  }
};

//only registered users can login
regd_users.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(404).json({ message: "Error logging in" });
  }
  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign(
      {
        data: password,
      },
      "access",
      { expiresIn: 60 * 60 }
    );

    req.session.authorization = {
      accessToken,
      username,
    };
    return res.status(200).send("User successfully logged in");
  } else {
    return res
      .status(208)
      .json({ message: "Invalid Login. Check username and password" });
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  let filtered_book = books[isbn];
  if (filtered_book) {
    //Write your code here
    let review = req.body.review;
    let reviewer = req.session.authorization["username"];
    if (review) {
      filtered_book["reviews"][reviewer] = review;

      books[isbn] = filtered_book;
    }
    res.send(`review for book with isbn ${isbn}`);
  } else {
    res.send("unable to find this isbn");
  }
});
/*let review = books[isbn];
    let myreview = req.body.review;*/
// let username = users["username"]
/*let newmet=Object.assign(review,{reviews:myreview})*/
//  let newmetod = Object.assign(newmet,{username:username})
// let newreview = review.append(myreview)
// if(review){
//     let newreview = req.body.review
//     const reviewsmy = books[newreview].reviews
//     reviewsmy.push(newreview)
// if(newreview){
//     review["reviews"] = newreview;
// }
// books[isbn] = review
/*return res.status(200).json(newmet)*/
//  return res.status(200).json(review)
// }
// return res.status(300).json({message: "Yet to be implemented"});
// }

regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  let filtered_book = books[isbn];
  // if(filtered_book){
  //Write your code here
  // let review = req.body.review;
  let reviewer = req.session.authorization["username"];

  // if(filter){

  delete filtered_book.reviews[reviewer];

  res.send(`Deleted book review with isbn ${isbn}`);
  // }
  // else{
  //   res.send("unable to find this isbn")
  // }
});
module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
