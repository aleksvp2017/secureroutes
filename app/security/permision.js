
const checkForToken = (req, res, next) => {
    var Routes = require('../routes/routes.js')
    if (Routes.requireAuthentication(req.originalUrl, req.method)){
        var jwt = require('jsonwebtoken')
        jwt.verify(req.token, process.env.SECRET, async (err, decoded) => {
            if (err) {
                res.status(440).send({error: err})
            }
            else {    
                next()
            }
        })
    }
    else{
        next()
    }
}

const login = async function (req, res, next) {
    var jwt = require('jsonwebtoken')
    let token = jwt.sign({
        email: req.body.user.email
    }, process.env.SECRET, {
        expiresIn: 86400 //24h
    })
    res.status(200).json({ auth: true, usuario: { ...req.user, token: token}})
    next()
}



module.exports = {
    checkForToken, login
}