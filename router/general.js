const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
      if (!isValid(username)) {
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});
      }
    }
    return res.status(404).json({message: "Unable to register user."});
  
    });
    // const doesExist = (username)=>{
    //     let userswithsamename = users.filter((user)=>{
    //       return user.username === username
    //     });
    //     if(userswithsamename.length > 0){
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   }

// Get the book list available in the shop
// const getBooks = () => {
//   return new Promise((resolve) => {
//     setTimeout(() =>{ resolve(books);
//     }, 3000); 
//   });
// };

// public_users.get('/', async (req, res) => {
//   try {
//      const books = await getBooks();
//     return res.status(200).json(books);
//   } catch (error) {
//     console.error('Error:', error);
//     return res.status(500).send('Internal Server Error');
//   }
// });

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  //Write your code here    
  const isbn = req.params.isbn
  new Promise((resolve,reject)=>{
    if(isbn<=books[isbn]){ 
    isbnbook = books[isbn]
      resolve(isbnbook)}
      reject(new Error('book not found'))
  }).then((isbnbook)=>{ res.status(300).json(isbnbook)
  }).catch((error) => {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    })
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author =req.params.author
  new Promise((resolve,reject)=>{
    // const bookkey = Object.keys(books)

    for(let i=1;i<=Object.keys(books).length;i++){
      if(books[i].author === author){
        const bookauthor = books[i]
        resolve (bookauthor)
}}
reject(new Error('book not found'))
}).then((bookauthor)=>{ res.status(300).json(bookauthor)
}).catch((error) => {
console.error('Error:', error);
res.status(500).send('Internal Server Error');
})
  
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title =req.params.title
    new Promise((resolve,reject)=>{
      // const bookkey = Object.keys(books)

      for(let i=1;i<=Object.keys(books).length;i++){
        if(books[i].title === title){
          const booktitle = books[i]
          resolve (booktitle)
}}
reject(new Error('book not found'))
}).then((booktitle)=>{ res.status(300).json(booktitle)
}).catch((error) => {
  console.error('Error:', error);
  res.status(500).send('Internal Server Error');
})
    });

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
   new Promise((resolve,reject)=>{
    const bokisbn=books[isbn];
    resolve(bokisbn)
}).then((bokisbn) =>{
  res.status(300).json(bokisbn.reviews)
}).catch((error) => {
  console.error('Error:', error);
  res.status(500).send('Internal Server Error');
});
}
);

    public_users.get('/',function (req, res) {
       new Promise((resolve, reject) => {
        const mybooks = books
        resolve(mybooks)
      }).then((mybooks)=>{
        res.send(JSON.stringify({ mybooks }, null, 4))
      }).catch((error) => {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
      });
      
    })
    
    
   
    
    // const fetchDataAsync = async () => {
    //   try {
    //     // Replace the URL with the actual API endpoint
    //     const response = await axios.get('/booksdb.js')
    //     return response.data;
    //   } catch (error) {
    //     throw error;
    //   }
    // };
    
    // public_users.get('/', async (req, res) => {
    //   try {
    //     // Using async/await to handle promises
    //     const books = await fetchDataAsync();
    //     return res.status(200).json(books);
    //   } catch (error) {
    //     console.error('Error:', error.message);
    //     return res.status(500).send('Internal Server Erorr');
    //   }
    // });
    

// public_users.get('/books', function (req, res) {
//     axios.get('http://localhost:5000/booksdb.js')
//         .then(response => {
//             res.send(JSON.stringify(response.data.books, null, 4));
//             console.log("Promise for Task 10 resolved");
//         })
//         .catch(error => {
//             // Handle error
//             console.error('Error fetching books:', error);
//             res.status(500).send('Error fetching books');
//         });
// });


    module.exports.general = public_users;



    /**https://johnhex19199-5000.theiadockernext-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/register */
/**https://johnhex19199-5000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/customer/login */