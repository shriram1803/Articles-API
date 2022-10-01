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

const Article = new mongoose.model('Article', articleSchema);

////////////Requests targeting all articles
app.route('/articles')
.get(function(req, res) {
    Article.find(function(err, articles) {
        if(err) {
            res.send(err);
        } else {
            res.send(articles);
        }
    });
})
.post(function(req, res) {
    const getTitle = req.body.title;
    const getContent = req.body.content;
    const anArticle = new Article({
        title: getTitle,
        content: getContent
    });
    anArticle.save(function(err) {
        if(err) {
            res.send(err);
        } else {
            res.send("Success!");
        }
    });
})
.delete(function(req, res) {
    Article.deleteMany(function(err) {
        if(err) {
            console.log(err);
        } else {
            res.send("Deleted!!!");
        }
    });
});

//////////////Requests targeting a specific article
app.route('/articles/:article')
.get(function(req, res) {
    Article.findOne({title: req.params.article}, function(err, getArticle) {
        if(err) {
            res.send(err);
        } else {
            if(getArticle) {
                res.send(getArticle);
            } else {
                res.send("No Articles Found!!");
            }
        }
    });
})
.put(function(req, res) {
    Article.updateOne(
        {title: req.params.article}, 
        {title: req.body.title, content: req.body.content},
        function(err) {
            if(!err) {
                res.send("Successfully Updated!!");
            } else {
                res.send(err);
            }
        }
    );
})
.patch(function(req, res) {
    Article.updateOne(
        {title: req.params.article}, 
        {$set: req.body},
        function(err) {
            if(!err) {
                res.send("Successfully Updated the Selected Articles!!");
            } else {
                res.send(err);
            }
        }
    );
})
.delete(function(req, res) {
    Article.deleteOne({title: req.params.article}, function(err) {
        if(err) {
            console.log(err);
        } else {
            res.send("Deleted the Specified Article!!!");
        }
    });
});

app.listen(3000, function() {
    console.log("Server started at port 3000!");
});