const Product = require('../../models/product');
const slugify = require('slugify')
const fs=require("fs");
const path=require("path")

exports.createProduct = (req, res) => {

    const { name, price, description, category } = req.body;
    
    const product = new Product({
        name: name,
        slug: slugify(name),
        price,
        description,
        productPicture: req.file.filename,
        category,
        createdBy: req.user._id
    });

    product.save((error, product) => {
        if (error) return res.status(400).json({ error })
        if (product) {
            return res.status(201).json({ product })
        }
    })

}

exports.getProducts = (req, res) => {
    Product.find({}).exec((error, products) => {
        if (error) return res.status(400).json({ error })

        if (products) {
            return res.status(200).json({ products })
        }
    });
}

exports.updateProduct = async (req, res) => {
    const { name, price, description, category } = req.body;
    let product = {
            name,
            slug: slugify(name),
            price,
            description,
            category
    }
    
    if (req.file) {
        //if new picture was there then delete the previous one
        const previous=await Product.findById(req.params.id) ;
        fs.unlink(path.join(__dirname,"../../","uploads",previous.productPicture),(err)=>err?console.log("error removing file",err):"");
        product = {
            ...product,
            productPicture:req.file.filename
        }
    }
    const updatedProduct = await Product.findOneAndUpdate({ _id: req.params.id }, product, { new: true });
    return res.status(201).json(updatedProduct);

}

exports.deleteProduct = async (req, res) => {
    const result = await Product.findByIdAndDelete(req.params.id).exec((error, res) => {
        //delete the image of the deleted product
        fs.unlink(path.join(__dirname,"../../","uploads",res.productPicture),(err)=>err?console.log("error removing file",err):"");
        if (error) return res.status(400).json(error)
    });
}

