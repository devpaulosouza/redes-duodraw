import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan'

import indexRouter from './routes';

/**
 * código gerado com o express-generator com a configuração inicial do servidor HTTP
 * https://expressjs.com/pt-br/starter/generator.html
 */

const app = express();

// utiliza o jade como template html
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// habilita o log
app.use(logger('dev'));

// middleware utilizado para leitura de json
app.use(express.json());

// middleware utilizado para decodificação da url
app.use(express.urlencoded({ extended: false }));


// utilizado para cookie
app.use(cookieParser());

// habilita a pasta public para servir arquivos estáticos como de javascript, css e imagens
app.use(express.static(path.join(__dirname, 'public')));

// define qual método deve ser utilizado para servir a página inicial ( exemplo localhost:3000/ -> retorna a página index.jade)
app.use('/', indexRouter);

// define uma página padrão para erro de página não encontrada
app.use((req, res, next) => next(createError(404)));

// captura os erros no lado do servidor e exibe uma tela especificada
app.use((err, req, res, next) => {
  // define a mensagem
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // define o http status code
  res.status(err.status || 500);
  
  // define a página a ser exibida
  res.render('error');
});

export default app 
