const express = require('express');
const { subcategoriesController } = require('../../../controller');
const upload = require('../../../middleware/upoad');
const router = express.Router();

router.get(
    '/',
    subcategoriesController.listSubcategories
)

router.get(
    '/:subcategory_id',
    subcategoriesController.getSubcategories
)

router.post(
    '/',
    upload.single('img'),
    subcategoriesController.addSubcategories
)

router.get(
    '/list-subcategory-by-category/:category_id',
    subcategoriesController.getCategory
)

router.put(
    '/:subcategory_id',
    subcategoriesController.updateSubcategories
)

router.delete(
    '/:subcategory_id',
    subcategoriesController.deleteSubcategories
)

module.exports = router