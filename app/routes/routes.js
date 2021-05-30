const Product = require('../services/product.js')
const Permision = require('../security/permision.js')

var routes = [
    { uri: '/login', httpmethod: 'post', component: Permision,  method: 'login', requireAuthentication: false},
    { uri: '/products', httpmethod: 'get', component: Product,  method: 'list', requireAuthentication: true},
]


function isEqual(text1, text2){
    text1 = text1.replace(/ /g, '')
    text2 = text2.replace(/ /g, '')
    var parsedtext1 = ''
    if (text1){
        parsedtext1 = text1.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase()
    }
    var parsedtext2 = ''
    if (text2){
        parsedtext2 = text2.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase()
    }
    return parsedtext1 === parsedtext2
}  

function getRoute(uri, httpmethod) {
    var rota = {}
    routes.map(route => {
        let uriExp = new RegExp(route.uri)
        if (uriExp.test(uri) && isEqual(route.httpmethod,httpmethod)){
            rota = route
        }
    })
    return rota
}

function requireAuthentication(uri, httpmethod) {
    var rota = getRoute(uri, httpmethod) 
    return rota.requireAuthentication
}

module.exports = {
    routes, requireAuthentication
}
