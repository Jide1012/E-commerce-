// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category), {
  ForeignKey: 'category_id'
}
// Categories have many Products
Product.hasmany(Product), {
  ForeignKey: 'category_id'
}
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag), {
  ForeignKey: 'product_id'
}
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product), {
  ForeignKey: 'tag_id'
}
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
