import Joi from "joi"

export const joiUserSchema = Joi.object({
    name: Joi.string().required(),
    role: Joi.string().valid("admin", "tenant").required(),
    password: Joi.string().required()
});


export const joiBillSchema = Joi.object({
    amount: Joi.number().required(),
    dueDate: Joi.date().required(),
    status: Joi.string().valid("pending", "paid").required(),
    userId: Joi.string().required(),  
    billType: Joi.string().valid("security", "other").required()
});
