## What is Kaa?

Kaa is a node.js/Titanium library which make Titanium and node.js share some code and work together easily. 

Kaa is inspired by the [meteorjs](http://www.meteor.com/) project. There are many codes need to be shared on both client side and server side. For example, you need to validate the form input at the client side immediately. But that is not safe enough. You need to validate the data from the server side again. Why should we write the codes twice. Just share your models and validation code on both side. 

## Features

* Form validation
* Form submition through HTTP API
* common API call
* common DB functions

## How to use?

1.clone Kaa into your node.js project
```bash
cd <your_nodejs_project_root>/node_modules
git clone https://github.com/formalin14/Kaa.git Kaa
```
2.create the Share folder in your node.js project for sharing codes(models)
```bash
cd <your_nodejs_project_root>/node_modules
mkdir Share
```
3.create files you want to share
```bash
cd <your nodejs_project_root>/node_modules/Share
vi models.js
```
with content: 
```javascript
var Form = require("Kaa/Form");

exports.loginForm = new Form({
	url: "/users/login",
	fields: [
		{name: "user", type: "text", "validates": ["required"], label: "用户名"},
		{name: "pass", type: "password", "validates": [["required", "密码也得填啊"]], label: "密码"},
	],
});
```
4.create soft links in your Titanium project
```bash
cd <your_titanium_project_root>/Resources
ln -s <your_nodejs_project_root>/node_modules/Kaa .
ln -s <your_nodejs_project_root>/node_modules/Share .
```

5.do validation and find errors on both side

