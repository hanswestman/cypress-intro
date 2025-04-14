const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();
const port = 5050;
var jsonParser = bodyParser.json();

/**
 * @typedef Post
 * @type {object}
 * @property {number} id
 * @property {string} title
 * @property {string} content
 */

/**
 * @typedef Database
 * @type {object}
 * @property {lastId: number} lastId
 * @property {posts: Post[]} posts
 */

/**
 * @type {Database}
 */
const database = {
    lastId: 0,
    posts: [],
};

app.use(cors());

app.listen(port, () => {
    console.log(`Server running on port ${port}`);

    loadData();
});

app.get("/", (req, res) => {
    res.status(200).send("Hello!");
});

app.get("/posts", (req, res) => {
    res.status(200).json(database.posts.toReversed());
});

app.get('/posts/:id', (req, res) => {
    const id = Number(req.params.id);
    const post = database.posts.find(post => post.id === id);

    if(!post){
        res.status(404).send();
        return;
    }

    res.status(200).json(post);
});

app.post('/posts', jsonParser, (req, res) => {
    const postData = req.body;
    
    database.lastId++;

    const post = {
        id: database.lastId,
        title: postData.title,
        content: postData.content, 
    };

    database.posts.push(post);

    saveData();

    res.status(201).json(post);
});

function saveData() {
    fs.writeFileSync("database.json", JSON.stringify(database, null, 2), "utf8");
}

function loadData() {
    let jsonData;
    try {
        jsonData = fs.readFileSync("database.json", "utf8");
    } catch (error) {
        console.log("File database.json not found, generating placeholder data.");

        generatePlaceholderData();
        return;
    }

    try {
        /**
         * @type {Database} parsedData
         */
        const parsedData = JSON.parse(jsonData);

        Object.assign(database, parsedData);

        console.log(`Loaded ${database.posts.length} post(s) from database.`);
    } catch (error) {
        console.log("Failed to read database.json, generating placeholder data.");

        generatePlaceholderData();
    }
}

function generatePlaceholderData() {
    database.posts = [
        {id: 1, title: "Lorem Ipsum", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum, sem in mollis fermentum, sapien felis pretium tellus, eget molestie libero diam eget massa. Nullam eget erat sed dui rhoncus porttitor vitae ultrices ligula. Vivamus urna velit, blandit ut nisi et, sodales fermentum orci. Fusce vulputate dui nec risus fringilla tempus. Vivamus tristique lacus ac commodo rhoncus. Nullam quis nulla id nisl laoreet vehicula ornare vel orci. Nulla consequat ullamcorper ullamcorper. Morbi gravida urna odio, at condimentum dolor tincidunt sed. Nam faucibus ipsum eu dolor consectetur placerat. Curabitur in massa vitae mi imperdiet laoreet. Nulla facilisi. Ut vel molestie elit, eget ullamcorper ex."},
        {id: 2, title: "Lorem Ipsum Continued", content: "Cras sapien nibh, egestas eu consectetur at, commodo at neque. In varius nisl nisl, sit amet ultricies libero ultrices vel. Vestibulum nibh justo, condimentum vitae fermentum et, feugiat non nisi. Curabitur pharetra ipsum purus, vel ullamcorper ipsum eleifend quis. Nulla lacinia sagittis mauris id blandit. Praesent efficitur quam sit amet enim hendrerit lobortis. Aliquam euismod ullamcorper ipsum, non tristique dui tempor sed. Cras at rutrum augue. Pellentesque condimentum vestibulum elit, et laoreet neque rhoncus vel. Curabitur vel pulvinar turpis. Nunc porta at nulla nec vestibulum."},
    ];
    database.lastId = 2;
}