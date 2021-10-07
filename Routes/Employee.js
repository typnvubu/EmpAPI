// var multer = require('multer');
// var upload=multer();

var express=require('express');
var router=express.Router();
var empController=require('../Controllers/Employee');

router.get('/emp',empController.getAllEmployee);
router.post('/emp',empController.uploadImg,empController.newEmployee);
router.delete('/emp',empController.deleteAllEmployee);

router.get('/emp/:id',empController.getOneEmployee);
router.post('/emp/:id',empController.newComment);
router.delete('/emp/:id',empController.deleteOneEmployee);

module.exports = router;