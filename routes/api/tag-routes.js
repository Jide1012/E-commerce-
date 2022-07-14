// const router = require('express').Router();
// const { Tag, Product, ProductTag } = require('../../models');

// // The `/api/tags` endpoint

// router.get('/', (req, res) => {
//   // find all tags
//   // be sure to include its associated Product data

// Tag.findAll({
//   include:[
//     {
//       model: Product,
//       attributes: ProductTag
//     }
//   ]
// })
// .then(dbTagData => res.json(dbTagData))
// .catch(err => { 
//   console.log(err);
//   res.status(500).json(err);
// });
// });

// router.get('/:id', (req, res) => {
//   // find a single tag by its `id`
//   // be sure to include its associated Product data
// Tag.findOne({
//   where: {
//     id: req.params.id
//   },
//   include: [
//     {
//       model: Product,
//       attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
//     }
//   ]
// })
// })
// .then(dbTagData => {
//   if (!dbTagData) {
//     res.status(404).json({ message: 'No tag found with this id' });
//   }

//   res.status(200).json(dbTagData);
// })
// .catch(err => res.status(400).json(err));



// router.post('/', (req, res) => {
//   // create a new tag
//   Tag.create(req.body)
//   .then(newTagData => res.status(200).json(newTagData))
//   .catch(err => res.status(400).json(err));
// });

// router.put('/:id', (req, res) => {
//   // update a tag's name by its `id` value
//   Tag.update(
//     {
//       tag_name: req.body.tag_name
//     },
//     {
//       where: {
//         id: req.params.id
//       }
//     })
//     .then(dbTagData => {
//       if (!dbTagData) {
//         res.status(404).json({ message: 'No tag with this ID.'});
//         return;
//       }
//       res.json(dbTagData);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// router.delete('/:id', (req, res) => {
//   Tag.destroy({
//     where: {
//       id: req.params.id
//     }
//   })
//     .then(response => res.status(200).json(response))
//     .catch(err => res.status(400).json(err));
// });
//   // delete on tag by its `id` value


// module.exports = router;


const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {
        model: Product,
        through: ProductTag
      }
    ]
  })
    .then(dbTagData => res.status(200).json(dbTagData))
    .catch(err => res.status(400).json(err));
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(dbTagData => {
      if (!dbTagData) {
        res.status(404).json({ message: 'No tag found with this id' });
      }

      res.status(200).json(dbTagData);
    })
    .catch(err => res.status(400).json(err));
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then(newTagData => res.status(200).json(newTagData))
  .catch(err => res.status(400).json(err));
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    })
      .then(response => res.status(200).json(response))
      .catch(err => res.status(400).json(err));
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(response => res.status(200).json(response))
    .catch(err => res.status(400).json(err));
});

module.exports = router;