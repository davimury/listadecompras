const request = require('request');
const cheerio = require('cheerio');

function mercadoLivre (link, callback){
    request(link, (error, response, html) => {
        if(!error && response.statusCode == 200){
            const $ = cheerio.load(html);
    
            const body = $('.vip-body');
            const productTitle = body.find('.item-title__primary').text().replace(/\s\s+/g, '');
            const productPrice = body.find('.price-tag').text().replace(/\s\s+/g, '');
            const productImage = body.find('.gallery-image-container').children('a').attr('href');
            
            //return [productTitle, productPrice, productImage];
            //console.log(productTitle, productPrice, productImage);
            //item(JSON.parse(productTitle, productPrice, productImage));
            var data = {
                title: productTitle,
                price: productPrice,
                image: productImage
            }
            //console.log(data);
            return callback(data);
            
        }
    });
}

module.exports.mercadoLivre = mercadoLivre;

