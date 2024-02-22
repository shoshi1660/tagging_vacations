const Joi = require("joi");

class FollowModel {

    constructor(follow) {

        this.followingId=follow.followingId;
        this.id	=follow.id;
        this.vacationId=follow.vacationId;
       
    }

    static #validationSchema = Joi.object({
        followingId: Joi.allow(),
        id: Joi.number().required(),
        vacationId: Joi.number().required()
    });

    

    validate() {
        const result = FollowModel.#validationSchema.validate(this, { abortEarly: false });
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

module.exports = FollowModel;