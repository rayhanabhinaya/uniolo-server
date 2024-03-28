function errorHandler(error, req, res, next) {

    if(error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
        const validationErr = error.errors.map(el => el.message)
        res.status(400).json({validationErr})
    } else if(error.name === "invalid username") {
        res.status(400).json({message: "invalid username or password"})
    } else if(error.name === "unauthenticated") {
        res.status(401).json({message: "invalid token"})
    } else if(error.name === "product not found") {
        res.status(401).json({message: "this product not found"})
    } else if(error.name === "forbidden") {
        res.status(403).json({message: "FORBIDDEN"})
    }else {
        console.log(error)
    }

}

module.exports = errorHandler