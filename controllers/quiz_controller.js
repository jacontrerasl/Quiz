exports.question=function(req, res){
	res.render('/quizes/question',{pregunta: '¿Cuál es la capital de Italia?'});
};

exports.answer=function(req, res){
	if(req.query.respuesta==='Roma')
	{
		res.render('quizes/answer',{respuesta: 'Corrrecto'});
	}
	else
	{
		res.render('quizes/answer',{respuesta: 'Incorrecto'});
	}
}