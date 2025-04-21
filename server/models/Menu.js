const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
image: {type: String, required: true, unique: true},
title: {type: String, required: true, unique: true},
price: {type: Number, required: true, unique: true},
description: {type: String, required: true, unique: true},
category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
});

module.exports = mongoose.model('Menu', MenuSchema);
