const Joi = require("joi");

class Credentials {

    constructor(credentials) {
        this.userName = credentials.userName;
        this.password = credentials.password;
    }

    static #validationSchema = Joi.object({
        userName: Joi.string().required().min(4).max(50),
        password: Joi.string().required().min(4).max(50)
    });

    validate() {
        const result = Credentials.#validationSchema.validate(this, { abortEarly: false });
        return result.error ? result.error.details.map(err => err.message) : null;
    }
}

module.exports = Credentials;