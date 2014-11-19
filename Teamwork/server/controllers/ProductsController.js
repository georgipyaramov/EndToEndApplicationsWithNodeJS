var Product = require('mongoose').model('Product'),
    fs = require('fs');

//TODO: delete, update, find by id, load file in create/update product

module.exports = {
    //TODO: validate data
    createProduct: function (req, res) {
        var fstream,
            product = {};

        req.pipe(req.busboy);

        req.busboy.on('file', function (fieldname, file, filename) {
            fstream = fs.createWriteStream(__dirname + '/../../app/images/' + filename);
            file.pipe(fstream);
            product.picture = filename;
        });

        req.busboy.on('field', function (fieldname, val) {
            product[fieldname] = val;
        });

        req.busboy.on('finish', function () {
            var productToAdd = JSON.parse(product.product);
            Product.create({
                    name: productToAdd.name,
                    description: productToAdd.description,
                    price: productToAdd.price * 1,
                    count: productToAdd.count * 1,
                    categories: productToAdd.categories},
                function (err, addedProduct) {
                    if (err) {
                        console.log('Failed to create new product: ' + err);
                        return;
                    }

                    var extensionIndex = product.picture.lastIndexOf('.'),
                        extension = product.picture.substring(extensionIndex);

                    fs.rename(__dirname + '/../../app/images/' + product.picture, __dirname + '/../../app/images/' + addedProduct._id + extension, function (err, success) {
                        addedProduct.picture = addedProduct._id + extension;
                        addedProduct.save();

                        res.status(201);
                        res.send(addedProduct);
                    });
                });
        });
    },
    getAllProducts: function (req, res) {
        Product.find({}).exec(function (err, collection) {
            if (err) {
                console.log('Error while listing products: ' + err);
            }

            res.send(collection);
        });
    },
    getAllProductsFromCategory: function (req, res) {
        // /api/products?category=<category>
        var category = req.params.category;
        Product.find({categories: {$elemMatch: {description: category}}}).exec(function (err, collection) {
            if (err) {
                console.log('Error while listing products: ' + err);
            }

            res.send(collection);
        });
    },
    getDetails: function (req, res) {
        var id = req.params.id;
        Product.findOne({_id: id}).exec(function (err, product) {
            if (err) {
                console.log('Error while getting details for product: ' + err);
            }

            res.send(product);
        })
    }
}