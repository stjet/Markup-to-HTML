const markdown = require("./markdown.js");
const express = require('express');
const nunjucks = require('nunjucks');

const app = express();

app.use(express.static('files'));

nunjucks.configure('templates', { autoescape: false });

app.get('/', async function (req, res) {
  let articles = markdown.get_articles();
  let articles_obj = [];
  for (i=0; i < articles.length; i++) {
    if (!markdown.get_metadata("articles/"+articles[i]).title) {
      continue;
    }
    articles_obj.push({"title":markdown.get_metadata("articles/"+articles[i]).title, "url":"/articles/"+articles[i].replace(".md","")})
  }
  return res.send(nunjucks.render('index.html', {"articles": articles_obj}));
})

app.get('/articles/:article', async function (req, res) {
  if (markdown.get_articles().includes(req.params.article+".md")) {
    let metadata = markdown.get_metadata("articles/"+req.params.article+".md");
    return res.send(nunjucks.render('md.html', {md: markdown.markdown_to_html(markdown.escape_html("articles/"+req.params.article+".md")), metadata: metadata}))
  }
  return res.sendStatus(404);
})

app.listen(8081, async () => {
  console.log(`App on`)
});