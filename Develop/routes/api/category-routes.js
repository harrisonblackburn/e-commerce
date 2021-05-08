const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
// be sure to include its associated Product
router.get('/', (req, res) => {
  
    Category.findAll({
      attributes: ['id', 'category_name'],
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
      ]
    })
        .then(dbCategoryData => res.json(dbCategoryData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    });


    // find one category by its `id` value
    // be sure to include its associated Products
    router.get('/:id', (req, res) => {
      
        Category.findOne({
          where: { id: req.params.id },
          include: [
            {
              model: Product,
              attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
            },
          ]
        })
            .then(dbCategoryData => res.json(dbCategoryData))
            .catch(err => {
              console.log(err);
              res.status(500).json(err);
            })
        });

        // CREATE A Category
        router.post('/', async (req, res) => {
          try {
            const categoryData = await Category.create(req.body);
            res.status(200).json(categoryData);
          } catch (err) {
            res.status(400).json(err);
          }
        });

        // update a category by its `id` value

        router.put('/:id', async (req, res) => {
          try {
            const categoryData = await Category.put(req.body);
            res.status(200).json(categoryData);
          } catch (err) {
            res.status(400).json(err);
          }
        });

        // delete a category by its `id` value
        router.delete('/:id', async (req, res) => {
          try {
            const categoryData = await Category.destroy({
              where: {
                id: req.params.id
              }
            });

            if (!categoryData) {
              res.status(404).json({ message: 'No category found with this id!' });
              return;
            }

            res.status(200).json(categoryData);
          } catch (err) {
            res.status(500).json(err);
          }
        });


      

      module.exports = router;
