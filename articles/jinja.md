//{"Contributors":["jetstream0"], "title":"Jinja Tutorial", "description": "Learn how to use Jinja, a powerful templating engine"}
# Jinja Tutorial
---
![Jinja Logo](/images/jinja-logo.png)
## What is Jinja?
[Jinja](https://jinja.palletsprojects.com/en/3.0.x/) (which means 'shrine' in japanese) is a templating language great for easily making dynamic webpages. It is for python, but a templating engine with nearly identical syntax called [Nunjucks](https://mozilla.github.io/nunjucks/) exists for nodejs.
---
## What can it do?
- Customize pages easily (variables)
- Reduce the amount of lines needed and also make it more readable (macros, template extension, iteration)
- Show certain parts of a page if certain conditions are met (conditionals)
---
## Syntax
Let's jump right in!
### Variables
To show a variable, simply do `{{ variable_name }}`. Pretty simple. 
We can use this in all kinds of situations, such as returning a response to a form submitted by POST. Of course, the backend will have to process the form data and pass it to jinja's templating.
This is the form:
```
<form action="/" method="POST">
  <label for="name">Name:</label>
  <input type="text" name="name">
  <br>
  <input type="submit" value="Submit">
</form>
```
This would be the response returned using jinja:
```
<p><b>Your name is </b>: {{ name }}</p>
```
It is also possible to do math operations to variables, which is pretty convenient.
```
{{ length*5 }}
```
Remainder (`%`), division (`/`), multiplication (`*`), addition (`+`), subtraction (`-`), exponent (`**`), are all possible to do.
### Conditional
Conditional if - else if - else statements in jinja are incredibly useful yet simple.
For example, if we wanted to display different messages depending on the user's name, we could do it it like this:
```
{% if name == "jim" %}
  <p>How's it going?</p>
{% end if %}
```
Of course, we can add more personalized messages by using `elif` (else if):
```
{% if name == "jim" %}
  <p>How's it going?</p>
{% elif name == "steve %}
  <p>Welcome back!</p>
{% elif name == "billy %}
  <p>You're not welcome here...</p>
{% end if %}
```
And we can also add an `else` that shows up for anyone who is not named jim, steve, or billy.
```
{% if name == "jim" %}
  <p>How's it going?</p>
{% elif name == "steve %}
  <p>Welcome back!</p>
{% elif name == "billy %}
  <p>You're not welcome here...</p>
{% else %}
  <p>I don't think we've met.</p>
{% end if %}
```
Additionally, with if statements, instead of returning two different responses for the form and the name messages, we can combine them by creating a boolean variable, `form_completed`. We will show them the form if `form_completed` is false, and will show them the name messages if `form_completed` is true.
```
{% if form_completed %}
  {% if name == "jim" %}
    <p>How's it going?</p>
  {% elif name == "steve %}
    <p>Welcome back!</p>
  {% elif name == "billy %}
    <p>You're not welcome here...</p>
  {% else %}
    <p>I don't think we've met.</p>
  {% end if %}
{% else %}
  <form action="/" method="POST">
    <label for="name">Name:</label>
    <input type="text" name="name">
    <br>
    <input type="submit" value="Submit">
  </form>
{% endif %}
```
Besides `==`, other operators that are valid to use are:
- `!=`, 'Not equals'
- `<`, 'Smaller than'
- `>`, 'Greater than'
- `>=`, 'Smaller than or equal to'
- `<=`, 'Greater than or equal to'
The logic `and`, `or`, `not` can also be used.
### Iteration
Jinja iteration can be used to quickly create elements, especially when the amount of elements is not fixed (think search results or a list of people signed up).
An example where `names` is an array with strings:
```
<ul>
  {% for name in names %}
    <li>{{ name }}</li>
  {% endfor %}
</ul>
```
Also works when the array contains an object/dictionary.
```
<ul>
  {% for name in names %}
    <li>{{ name.last }}, {{ name.first }}: Age {{ name.age }}</li>
  {% endfor %}
</ul>
```
### Macros
Macros let you create reusable chunks of html. Effective use of them can cut down on the number of lines and make code a lot more readable.
how they can be defined:
```
{% macro function_name(param1, param2, default_param='placeholder') %}
  <div id="{{ param1 }}">
    <h1>{{ param2 }}</h1>
    <p>{{ default_param }}</p>
  </div>
{% endmacro %}
```
And then they can be called:
```
{{ function_name('a', 'b') }}
```
Which would render as this in html:
```
<div id="a">
  <h1>b</h1>
  <p>placeholder</p>
</div>
```
### Template Inheritance
Template inheritance enables the use of base templates, again cutting down on code and making things more readable. This is especially useful for webpages 
If we have a file, `base.html`:
```
<!DOCTYPE html>
<html>
<head>
  <title>{% block title %}{% endblock %}</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div id="header">
    <h1>This will be on every page</h1>
  </div>
  {% block content %}{% endblock %}
</body>
</html>
```
The `{% block content %}{% endblock %}` defines a place where the pages that extend the template can add their own html, like so:
```
{% extends "base.html" %}
{% block title %}Example Page{% endblock %}
{% block content %}
  <h2>Example Page</h2>
  <p>Exampe text</p>
{% endblock %}
```
This will render as:
```
<!DOCTYPE html>
<html>
<head>
  <title>Example Page</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div id="header">
    <h1>This will be on every page</h1>
  </div>
  <h2>Example Page</h2>
  <p>Exampe text</p>
</body>
</html>
```
### Escaping
The `{% raw %}` tells Jinja to ignore everything inside it, and not interpret it as Jinja syntax. This is necessary if one is say, making a tutorial about Jinja...
```
{% raw %}
  <p>{{ a }}</p>
  {% if b %}
    <b>Bold text</b>
  {% endif %}
{% endraw %}
```
will be rendered as 
```
<p>{{ a }}</p>
{% if b %}
  <b>Bold text</b>
{% endif %}
```
---
## Backend
In Python:
```
from jinja2 import Environment, FileSystemLoader
env = Environment(
    loader=FileSystemLoader('./templates_folder'),
)

template = env.get_template('template.html')

html = template.render({'variable_name':'variable content'})
```
You can then serve the html with a library of your choice. Flask offers a shortcut to do this:
```
import flask
app = flask.Flask("app name")

@app.route('/name/<name>')
def index(name):
  return flask.render_template('index.html', name=name)
```
In Node.js:
```
const nunjucks = require('nunjucks');
nunjucks.configure('templates_folder');
let html = nunjucks.render("index.html", {name: "Steve"});
```
---
## Conclusion
And that's all. There are a lot more cool things not covered here, which you can find by looking at the official documentation.