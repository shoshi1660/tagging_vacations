const Joi = require("joi");

class UserModel {

    constructor(user) {

        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.userName = user.userName;
        this.password = user.password;
        this.role=user.role;
    }

    static #validationSchema = Joi.object({
        id: Joi.allow(),
        firstName: Joi.string().required().min(2).max(20),
        lastName: Joi.string().required().min(2).max(20),
        userName: Joi.string().required().min(6).max(20),
        password: Joi.string().required(),
        role:Joi.allow(),

    });

    

    validate() {
        const result = UserModel.#validationSchema.validate(this, { abortEarly: false });
        if (result.error) {
            const errObj = {};
            for (const err of result.error.details) {
                errObj[err.context.key] = err.message;
            }
            return errObj
        }
        return null;
    }
}

module.exports = UserModel;