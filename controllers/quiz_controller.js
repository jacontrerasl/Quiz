var models = require('../models/models.js');

exports.load = function(req, res, next, quizId){
	models.Quiz.findById(quizId).then(
		function(quiz){
			if(quiz)
			{
				req.quiz = quiz;
				next();
			}
			else
			{
				next(new Error('No existe quizId=' + quizId))
			}
		}
	).catch(function(error){next(error);});
};

exports.index = function(req, res){
	var search='%' + req.query.search + '%';
	var tema= req.query.tema;

	if(search != undefined)
	{
		search= search.replace(' ','%');
	}

	if(tema === 'todos')
	{
		tema = '%';
	}

	models.Quiz.findAll({where: ["pregunta like ? and indice like ?", search, tema]}).then(function(quizes){
		res.render('quizes/index.ejs', {quizes: quizes, errors: []});
		}
	).catch(function(error){next(error);});	
};

exports.show = function(req, res){
	res.render('quizes/show',{quiz: req.quiz, errors: []});
};

exports.answer = function(req, res){
	var resultado='Incorrecto';

	if(req.query.respuesta === req.quiz.respuesta)
	{
		resultado='Correcto';
	}
	res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado, errors: []});

};

exports.new = function(req, res)
{
	var quiz = models.Quiz.build(
		{pregunta: 'Pregunta', respuesta: 'Respuesta'}
		);

	res.render('quizes/new', {quiz: quiz, errors: []});
};

exports.create = function(req, res)
{
	var quiz = models.Quiz.build(req.body.quiz);

	quiz.validate().then(function(err){
		if(err)
		{
			res.render('quizes/new', {quiz: quiz, errors: err.errors});
		}
		else
		{
			quiz.save({fields: ['pregunta', 'respuesta', 'indice']}).then(function(){res.redirect('/quizes');});	
		}
	});
	
};

exports.edit = function(req, res)
{
	var quiz = req.quiz

	res.render('quizes/edit', {quiz: quiz, errors: []});
};

exports.update = function(req, res)
{
	req.quiz.pregunta  = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	req.quiz.indice    = req.body.quiz.indice;
 
	var quiz = req.quiz;

	quiz.validate().then(function(err){
		if(err)
		{
			res.render('quizes/edit', {quiz: quiz, errors: err.errors});
		}
		else
		{
			quiz.save({fields: ['pregunta', 'respuesta', 'indice']}).then(function(){res.redirect('/quizes');});	
		}
	});
	
};

exports.destroy = function(req, res)
{
	var quiz = req.quiz;

	req.quiz.destroy().then(function(){
		res.redirect('/quizes').catch(function(error){ next(error);});
	});
};
