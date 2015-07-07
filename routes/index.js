var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'quiz' });
});

router.get('/author', function(req, res, next) {
  res.render('author', { autor: 'José Contreras' });
});

router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);

module.exports = router;
