const LoginService = require("../services/login.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.register = async (req, res, next) => {
    if(!req.body?.username) {
        return next(new ApiError(400, "username can not be empty"));
    }

    if(!req.body?.password) {
        return next(new ApiError(400, "password can not be empty"));
    }

    try {
        const loginService = new LoginService(MongoDB.client);
        return res.send({
            message: `Register successfull`,
        });
    } catch (error) {
        return next(
            new ApiError(500, "An error register")
        );
    }
};

exports.login = async (req, res, next) => {
    try {
        const loginService = new LoginService(MongoDB.client);
        const document = await loginService.findLogin(req.body);
        if(document) {
            if(document.password == req.body.password) {
                return res.send({ message: "Login successfull"});
            } else {
                return next(new ApiError(500, "Password not found"));
            }
        } else {
            return next(new ApiError(500, "Account not found"));
        }
    } catch (error){
        console.log(error);
        return next(
            new ApiError(
                500,
                `Login error`
            )
        );
    }
};