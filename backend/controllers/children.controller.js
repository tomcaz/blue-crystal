const express = require('express')
const { child, childrenList, updateChildren, deleteChildren, saveChildren } = require('../services/children.service');
const router = express.Router()

// define the home page route
router.get('/child/:id', child);
router.get('/:id', childrenList);
router.post('/:id', saveChildren);
router.put('/:childId', updateChildren);
router.delete('/:id', deleteChildren);


module.exports = router