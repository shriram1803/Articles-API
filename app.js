const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

const uri = 'mongodb://localhost:27017/wikiDB';

mongoose.connect(uri);

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model('Article', articleSchema);



app.listen(3000, function() {
    console.log("Server started at port 3000!");
});