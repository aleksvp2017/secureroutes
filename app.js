var express = require('express') 
var app = express()
var port = process.env.PORT

var bearerToken = require('express-bearer-token')
app.use(bearerToken())
app.use(express.urlencoded({ extended: true})) 
app.use(express.json())


var Permision = require('./app/security/permision.js')
app.use(Permision.checkForToken)

var Routes = require('./app/routes/routes.js')
Routes.routes.map(route => {
        app[route.httpmethod](route.uri, route.component[route.method])
})




app.listen(port, () => { console.log('Server up and listening at ' + port)})



