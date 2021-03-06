const path = require('path');
const fs = require('fs');
const p = path.join(
	path.dirname(process.mainModule.filename),
	'data',
	'products.json',
);

const getProductFromFile = (cb) => {
	fs.readFile(p, (err, fileData) => {
		if (err) {
			cb([]);
		} else {
			cb(JSON.parse(fileData));
		}
	});
};

module.exports = class Product {
	constructor(t) {
		this.title = t;
	}

	save() {
		getProductFromFile((products) => {
			products.push(this);
			fs.writeFile(p, JSON.stringify(products), (err) => {
				if (err) throw err;
			});
		});
	}

	static fetchAll(cb) {
		getProductFromFile(cb);
	}
};
