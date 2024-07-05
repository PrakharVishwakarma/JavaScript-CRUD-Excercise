const express = require("express"); // Importing Express framework

const app = express(); // Creating an instance of Express

const port = 8080; // Defining the port number

const path = require("path"); // Importing Node.js path module

const { v4 : uuidv4 } = require('uuid'); // Importing uuidv4 function from uuid package
/*search :  npm uuid  */

const methodOverride = require("method-override"); // Importing method-override module

app.use(express.urlencoded({ extended: true })); // Middleware for parsing URL-encoded bodies

app.use(methodOverride("_method")); // Middleware for HTTP method override

app.set("view engine", "ejs"); // Setting the view engine to EJS
app.set("views", path.join(__dirname, "views")); // Setting views directory

app.use(express.static(path.join(__dirname, "public"))); // Serving static files from 'public' directory

let postsArr = [
    {
        id : uuidv4(), // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
        username: "Apna collage",
        content: "I love coding! Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio natus omnis dicta quasi animi libero nihil fugiat, delectus recusandae facere ea? Deleniti vel laudantium numquam laborum. Id ea est amet!",
    },
    {
        id : uuidv4(), 
        username: "Shradhha",
        content: "Hard work is important to acheive success.Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio natus omnis dicta quasi animi libero nihil fugiat, delectus recusandae facere ea? Deleniti vel laudantium numquam laborum. Id ea est amet! ",
    },
    {
        id : uuidv4(), 
        username: "Rahul kumar",
        content: "I got selected for my first internship.Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio natus omnis dicta quasi animi libero nihil fugiat, delectus recusandae facere ea? Deleniti vel laudantium numquam laborum. Id ea est amet!",
    }, 
];

app.get("/posts", (req, res)=>{
    res.render("index.ejs", {postsArr});
});
 

app.get("/posts/new", (req, res)=>{
    res.render("new.ejs");
});

app.post("/posts", (req, res)=>{
    // console.log(req.body);
    let {username, content} = req.body; 
    let id = uuidv4();
    postsArr.push({id, username, content});
    
    // res.send("Post request working");
    
    res.redirect("/posts");     // By default get request send kar dega /posts ko
});


app.get("/posts/:id", (req, res)=>{
    let {id} = req.params;
    let post = postsArr.find((p) => id === p.id);

    // console.log(post);
    // res.send("Request Working.");
    
    res.render("show.ejs", {post});
});
 

app.patch("/posts/:id", (req,res)=>{
    let {id} = req.params;
    console.log(id);

    let newContent = req.body.content;
    console.log(newContent);
    
    let post = postsArr.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    
    // res.send("Patch Request Working.");
    res.redirect("/posts");
});
/*Html form se keval get and post request send kar sakte hain.
For that we will use a package called method-override which lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
*/

app.get("/posts/:id/edit", (req, res)=>{
    let {id} = req.params;
    
    let post = postsArr.find((p) => id === p.id);
    
    res.render("edit.ejs", {post}); 
});

  
app.delete("/posts/:id", (req, res)=>{
    let {id} = req.params;
    
    postsArr = postsArr.filter((p) => id !== p.id);
    
    // res.send("Delete Request Working.");
    res.redirect("/posts");
});


app.listen(port, () => {
  console.log(`Listening on port : ${port}`);
});
