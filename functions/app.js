var express = require('express');
var bodyParser = require('body-parser');
const request = require('request');
const cheerio = require('cheerio');
var ml = require('./mercadolivre');

//declarar o express
var app = express();

//Função de captura de POST
var urlencodedParser = bodyParser.urlencoded({extended: false});

//Usar Ejs
app.set('view engine', 'ejs');

//Tudo dentro de assets fica acessivel, por exemplo style.css
app.use('/assets', express.static('assets'));

//Renderizar pagina home
app.get('/', function(req, res){
    res.render('index');
});

//Capturar post da pagina
app.post('/', urlencodedParser, function(req, res){
    data = req.body;
    //console.log(data.link);
    //ml.mercadoLivre(data.link);
    //res.render('sucess', {data: ml.mercadoLivre(data.link)});
    ml.mercadoLivre(data.link, function(response){
        res.render('sucess', response);
        console.log(JSON.stringify(response, null, 2));
    });
});

//Pegar parametro pelo o link, exemplo: (localhost/profile/davi) ira pegar davi como uma variavel
app.get('/profile/:name', function(req, res){
    var data = {age: 29, job: 'ninja'}
    res.render('profile', {person: req.params.name, data: data}); 
});

//pagina login renderizar login.ejs
app.get('/login', function(req, res){
    res.render('login');
});

//Rota Dinamica.
app.get("/:page", (req, res) => {
    res.render(req.params.page);
  });

//Incia servidor na porta 8000
app.listen(8000);

/*
//        Proucurar/Renderizar arquivo
function renderHtml(path, response){
    fs.readFile(path, null, function(error, data){
        if (error) {
            response.writeHead(404);
            response.write('Arquivo Não Encontrado!');
        } else{
            response.write(data);
        }
        response.end();
    });
}
//        Função de Rota
function handleRequest(request, response){
    response.writeHead(200, {'Content-Type': 'text/html'});
    var path = url.parse(request.url).pathname;
    switch (path) {
        case '/':
            renderHtml('./index.html', response);
            break;
        case '/login':
            renderHtml('./login.html', response);
            break;
        default:
            response.writeHead(404);
            response.write('Rota não Definida');
            response.end(); 
    }
}

module.exports.handleRequest = handleRequest;



*/











/*module.exports = {
    handleRequest: function(request, response){
        response.writeHead(200, {'Content-Type': 'text/html'});

        var path = url.parse(request.url).pathname;
        switch (path) {
            case '/':
                renderHtml('./index.html', response);
                break;
            case '/login':
                renderHtml('./login.html', response);
                break;
            default:
                response.writeHead(404);
                response.write('Route not Defines');
                response.end(); 
        }

    }

};*/