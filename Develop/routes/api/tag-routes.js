const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

  // find all tags
  // be sure to include its associated Product data
  router.get('/', (req, res) => {
  
    Tag.findAll({
      attributes: ['id', 'category_name'],
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
      ]
    })
        .then(dbtagData => res.json(dbtagData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    });


    router.get('/:id', (req, res) => {
      // find a single tag by its `id`
      // be sure to include its associated Product data
      Tag.findOne({
          where: {
              id: req.params.id
          },
          attributes: ['id', 'tag_name'],
          include: [
              {
                  model: Product,
                  attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
              }
          ]
      })
          .then(dbtagData => {
              if (!dbtagData) {
                  res.status(404).json({ message: 'No tag found with this id' });
                  return;
              }
              res.json(dbTagData);
          })
          .catch(err => {
              console.log(err);
              res.status(500).json(err);
          });
  });


  // create a new tag
  router.post('/', async (req, res) => {
    try {
      const tagData = await Tag.create(req.body);
      res.status(200).json(tagData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.put(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

  // delete on tag by its `id` value
  router.delete('/:id', async (req, res) => {
    try {
      const tagData = await Tag.destroy({
        where: {
          id: req.params.id
        }
      });

      if (!tagData) {
        res.status(404).json({ message: 'No tag found with this id!' });
        return;
      }

      res.status(200).json(tagData);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;
