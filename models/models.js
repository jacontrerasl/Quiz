var path = require('path');

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6] || null);
var user    = (url[2] || null);
var pwd     = (url[3] || null);
var protcol = (url[1] || null);
var dialect = (url[1] || null);
var port    = (url[5] || null);
var host    = (url[4] || null);
var storage = process.env.DATABASE_STORAGE;

var Sequelize = require('sequelize');

var sequelize = new Sequelize(DB_name, user, pwd, 
{
	dialect: protcol,
	protcol: protcol,
	port:    port,
	host:    host,
	storage: storage,
	omitNull: true
	//"sqlite", storage: "quiz.sqlite"
});

var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

exports.Quiz = Quiz;

sequelize.sync().then(function(){
	Quiz.count().then(function(count){
		if(count===0){
			Quiz.create({pregunta: 'Capital de Italia',
		                 respuesta: 'Roma'
		             });
			Quiz.create({pregunta: 'Capital de Portugual',
		                 respuesta: 'Lisboa'
		             })
			.then(function(){console.log('Base de Datos inicializada')});
		};
	});
});