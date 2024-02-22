const Joi = require("joi");

class VacationModel {

    constructor(vacation) {
        
        this.vacationId = vacation.vacationId;
        this.description = vacation.description ;
        this.destination = vacation.destination;
        this.Image = vacation.Image;
        this.startDate = vacation.startDate;
        this.endDate=vacation.endDate;
        this.price=vacation.price;
        this.amountFollowers=vacation.amountFollowers
    }

    static #validationSchema = Joi.object({
       
        vacationId :Joi.allow(),
        description :Joi.string().required(),
        destination :Joi.string().required(),
        Image :Joi.string().required(),
        startDate :Joi.string().required(),
        endDate:Joi.string().required(),
        price:Joi.number().required(),
        amountFollowers:Joi.allow(),
        
    });

    

    validate() {
        const result = VacationModel.#validationSchema.validate(this, { abortEarly: false });
        if (result.error) {
            const errObj = {};
            for (const err of result.error.details) {
                errObj[err.context.key] = err.message;
            } 
             console.log(errObj)
            return errObj
          
        }
        return null;
    }
}

module.exports = VacationModel;