## What is Kaa?

Kaa is a node.js/Titanium library which make Titanium and node.js share some code and work together easily. It is inspired by the meteorjs project. There are many codes need to be shared on both client side and server side. For example, you need to validate the form input at the client side immediately. But that is not safe enough. You need to validate the data from the server side again. Why should we write the codes twice. Just share your models and validation code on both side. 

## How to use?

### 1. include Kaa folder on both client and the server side.

### 2. create folder call 'Share' and put models you want to share in it, for example: Share/models.js

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


