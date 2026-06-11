const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Product = require('../models/Product');

// دریافت همه دسته‌بندی‌ها
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find().sort('order');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// دریافت محصولات بر اساس categoryId
router.get('/products/:categoryId', async (req, res) => {
  try {
    const products = await Product.find({ categoryId: req.params.categoryId });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// دریافت همه محصولات (برای اطمینان)
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;