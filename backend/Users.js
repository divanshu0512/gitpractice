const mongoose = require("mongoose");

const schema = mongoose.Schema({
    data:Object,
    getVouchers:Object,
    data:Array,
})

module.exports = mongoose.model('cards',schema);    