var api = require("Kaa/API");

function FakedControl(value) {
	this.value = value;
}

FakedControl.prototype.getValue = function() {
	return this.value;
};

// ------------------- 我是華麗的分割線 ----------------------

function Form(meta) {
	this.meta = meta;
}

Form.prototype.setFieldControl = function(name, control) {
	for (var i=0;i<this.meta.fields.length;i++) {
		var f = this.meta.fields[i];
		if (f.name == name) {
			f.control = control;
		}
	}
};

Form.prototype.setValueFromReq = function(req) {
	for (var i=0;i<this.meta.fields.length;i++) {
		var f = this.meta.fields[i];
		f.control = new FakedControl(req.body[f.name]);
	}
};

Form.prototype.checkError = function(f) {
	if (f.validates) {
		for (var i=0;i<f.validates.length;i++) {
			var rule = f.validates[i];
			if (!(rule instanceof Array)) {
				rule = [rule];
			}
			var rule_name = rule[0];
			var rule_msg = rule[1];
			var value = f.control.getValue();
			if (rule_name == "required") {
				if (value == null || value == undefined || value == "") {
					if (rule_msg) {
						f.error = rule_msg;
					} else {
						f.error = f.label + "必须填写";
					}
					this.isError = true;
					break;
				}		
			}
		}
	}
};

Form.prototype.cleanErrors = function() {
	for (var i=0;i<this.meta.fields.length;i++) {
		var f = this.meta.fields[i];
		f.error = null;
	}
	this.errors = null;
	this.isError = false;
};

Form.prototype.getErrors = function() {
	var errors = [];
	if (this.errors) {
		for (var i=0;i<this.errors.length;i++) {
			errors.push(this.errors[i]);
		}
	}
	for (var i=0;i<this.meta.fields.length;i++) {
		var f = this.meta.fields[i];
		if (f.error) {
			errors.push(f.error);
		}
	}
	return errors;
};

Form.prototype.errorsToString = function(sep) {
	var errors = this.getErrors();
	return errors.join(sep);
};

Form.prototype.getData = function() {
	var data = {};
	for (var i=0;i<this.meta.fields.length;i++) {
		var f = this.meta.fields[i];
		data[f.name] = f.control.getValue();
	}
	return data;
};

Form.prototype.validate = function() {
	this.cleanErrors();
	for (var i=0;i<this.meta.fields.length;i++) {
		var f = this.meta.fields[i];
		this.checkError(f);
	}
};

Form.prototype.submit = function(success_callback, fail_callback) {
	var form = this;
	
	//form.cleanErrors();
	form.validate();
	if (this.isError) {
		if (fail_callback) {
			fail_callback(this);
		}
		return;
	}
	
	api.go(this.meta.url, this.getData(), function(o) {
		if (success_callback) {
			success_callback(o);
		}
	}, function(errors) {
		form.errors = errors;
		form.isError = true;
		if (fail_callback) {
			fail_callback(form);
		}
	});
	
	return;
};

module.exports = Form;
