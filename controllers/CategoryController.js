const Category = require('../models/Category');
const { validationResult } = require('express-validator');
const checkError = require('../helper/checkError');

exports.addCategory = async (req, res) => {
    try {
        const { categoryName, description } = req.body;

        // Field Validation
        const validationErr = validationResult(req);
        checkError(res, validationErr?.errors?.length > 0, validationErr.array());
    
        // Category exist check
        const existCategory = await Category.findOne({ categoryName: categoryName });
        checkError(res, existCategory, 'Category already exists!');
    
        // Save Category
        const category = new Category({
            categoryName: categoryName,
            description: description
        });
    
        // const category = new Category(req.body);
    
        const addedCategory = await category.save({ new: true });
        res.status(200).json(addedCategory);
        // res.status(200).send('Category added!');
    } catch (err) {
        checkError(res, err, err.message, 500);
    }
}

exports.getCategory = async (req, res) => {
    try {
        const category = await Category.findById({ _id: req.params.id });
        res.status(200).json(category);

    }
    catch (err) {
        checkError(res, err, err.message, 500);
    }

}

exports.updateCategory = async (req, res) => {
    try {
        // Validation
        const validationErr = validationResult(req);
        checkError(res, validationErr?.errors.length > 0, validationErr.array());

        // Update
        const updatedCategory = await Category.findOneAndUpdate(
            { _id: req.body.id },
            { ...req.body, status: 'updated' },
            { new: true, runValidators: true });

            // res.status(200).send('Category updated!');
            res.status(200).json(updatedCategory);

    } catch (err) {
        checkError(res, err, err.message, 500);
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Category.findOneAndUpdate(
            { _id: req.params.id },
            { status: 'deleted', deletedAt: Date.now() },
            { new: true });
        res.status(200).json(deletedCategory);
    } catch (err) {
        checkError(res, err, err.message, 500);
    }
} 

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find({}).where('status', /[^deleted]/);
        res.status(200).json(categories);
    } catch (err) {
        checkError(res, err, err.message, 500);
    }
}

exports.destroyCategory = async (req, res) => {
    try {
        await Category.deleteOne({ _id: req.params.id });
        res.status(200).send('Data is deleted!')
    } catch (err) {
        checkError(res, err, err.message, 500);
    }
}