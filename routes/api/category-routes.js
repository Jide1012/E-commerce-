const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
    .then(dbCategoryData => res.status(200).json(dbCategoryData))
    .catch(err => res.status(400).json(err))
});
// be sure to include its associated Products


router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    // model: Product,
    // attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
  })
    .then(dbCategoryData => res.status(200).json(dbCategoryData))
    .catch(err => res.status(400).json(err))
});

// find one category by its `id` value
// be sure to include its associated Products


router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
    .then(newCategory => res.status(200).json(newCategory))
    .catch(err => res.status(400).json(err))

});
// create a new category


router.put('/:id', (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No Category with this id' });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(response => res.status(200).json(response))
    .catch(err => res.status(400).json(err))
  // delete a category by its `id` value
});

module.exports = router;
