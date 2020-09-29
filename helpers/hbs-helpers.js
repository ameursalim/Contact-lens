const hbs = require("hbs")

hbs.registerHelper('areTheSame', function (val1, val2, options){
	if (val1.toString() === val2.toString()) {
		return options.fn(this)
	} else {
		return options.inverse(this)
	}  
})