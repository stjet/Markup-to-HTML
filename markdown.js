const fs = require('fs');

function get_articles() {
  return fs.readdirSync("articles")
}

function escape_html(markdown_file) {
  let file = fs.readFileSync(markdown_file, {encoding:'utf8'});
  file = file.replace(/>/g,"&gt");
  file = file.replace(/</g,"&lt");
  return file
}

function get_metadata(markdown_file) {
  let lines;
  if (markdown_file.endsWith(".md")) {
    let file = fs.readFileSync(markdown_file, {encoding:'utf8'});
    lines = file.split("\n");
  } else {
    lines = markdown_file.split("\n");
  }
  if (lines[0].startsWith("//")) {
    lines[0] = lines[0].replace("//","");
    return JSON.parse(lines[0]);
  }
  return false;
}

function markdown_to_html(markdown_file) {
  let lines;
  if (markdown_file.endsWith(".md")) {
    let file = fs.readFileSync(markdown_file, {encoding:'utf8'});
    lines = file.split("\n");
  } else {
    lines = markdown_file.split("\n");
  }
  let html = "";
  let unord_list = false;
  let code_block = false;
  let metadata = false;
  for (ln=0; ln < lines.length; ln++) {
    let line = lines[ln];
    if (ln == 0 && line.startsWith("//")) {
      //use get_metadata to get metadata
      continue
    }
    //code blocks
    if (line.startsWith("```")) {
      if (code_block) {
        line = "</pre>\n";
        code_block = false;
      } else {
        code_block = true;
        line = "<pre class='code-block'>\n";
      }
      html += line;
      continue
    }
    if (code_block) {
      html += line+"\n";
      continue
    }
    //if line is empty, new line
    if (line == "") {
      html += "<br>\n";
      continue
    }
    //horizontal line
    if (line == "---") {
      html += "<hr>\n";
      continue
    }
    //check for images ![title](url)
    if (line.startsWith("![")) {
      if (line.split("]").length-1 == 1) {
        let title = line.split("![")[1].split("]")[0]
        if (line.split("(").length-1 == 1) {
          if (line.split(")").length-1 == 1) {
            let url = line.split("(")[1].split(")")[0];
            line = "<img src='"+url+"' title='"+title+"'>";
            html += line;
            continue
          }
        }
      }
    }
    let paragraph = true;
    //blockquotes
    if (line.startsWith("~ ")) {
      line = "<blockquote>"+line.replace("~ ","")+"</blockquote>"
      paragraph = false;
    }
    //check for headings
    if (line.startsWith("### ")) {
      line = line.replace("### ","");
      line = "<h3>"+line+"</h3>";
      paragraph = false;
    } else if (line.startsWith("## ")) {
      line = line.replace("## ","");
      line = "<h2>"+line+"</h2>";
      paragraph = false;
    } else if (line.startsWith("# ")) {
      line = line.replace("# ","");
      line = "<h1>"+line+"</h1>";
      paragraph = false;
    }
    //check for unordered lists
    if (line.startsWith("- ")) {
      if (unord_list) {
        line = line.replace("- ","");
        line = "<li>"+line+"</li>";
      } else {
        unord_list = true;
        line = line.replace("- ","");
        line = "<li>"+line+"</li>";
        line = "<ul>\n"+line;
      }
      //list is over check
      if (lines.length > ln+1) {
        if (!lines[ln+1].startsWith("- ")) {
          line += "\n</ul>";
          unord_list = false;
        }
      } else {
        line += "\n</ul>";
        unord_list = false;
      }
      paragraph = false;
    }
    //check for bold
    //line.split("**").length-1 gets the amount of ** in a string
    if (line.split("**").length - 1 > 1) {
      for (i=0; i < Math.floor(line.split("**").length-1/2); i++) {
        line = line.replace("**","<b>");
        line = line.replace("**","</b>");
      }
    }
    //check for underlines
    if (line.split("__").length - 1 > 1) {
      for (i=0; i < Math.floor(line.split("__").length-1/2); i++) {
        line = line.replace("__","<u>");
        line = line.replace("__","</u>");
      }
    }
    if (line.split("`").length - 1 > 1) {
      let num = Math.floor((line.split("`").length-1)/2);
      for (i=0; i < num; i++) {
        line = line.replace("`","<code>");
        line = line.replace("`","</code>");
      }
    }
    //check for links
    let line_copy = line;
    for (i=0; i < line_copy.split("[").length-1; i++) {
      if (line_copy.split("[").length-1 > i) {
        if (line_copy.split("]").length-1 > i) {
          let name = line.split("[")[1].split("]")[0];
          if (line_copy.split("[")[1+i].split("(").length-1 > 0) {
            if (line_copy.split("[")[1+i].split(")").length-1 > 0) {
              let link = line.split("[")[1].split("(")[1].split(")")[0]
              line = line.replace("["+line.split("[")[1].split(")")[0]+")", '<a href="'+link+'">'+name+"</a>")
            }
          }
        }
      }
    }
    if (paragraph) {
      line = "<p>"+line+"</p>";
    }
    //todo: blockquotes
    html += line+"\n";
  }
  return html
}

module.exports = {
  markdown_to_html: markdown_to_html,
  escape_html: escape_html,
  get_articles: get_articles,
  get_metadata: get_metadata
}