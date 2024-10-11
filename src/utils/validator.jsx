import Joi from 'joi';

const registerSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: false })
        .required()
        .messages({
            "string.empty": "Email is required"
        }),
    username: Joi.string()
        .pattern(/^[0-9a-zA-Z]{3,40}$/)
        .required()
        .messages({
            "string.empty": "Username is required",
            "string.pattern.base": "Username must contain a-z, A-Z, 0-9 and must be at least 3 characters."
        }),
    password: Joi.string()
        .required()
        .pattern(/^[0-9a-zA-Z]{6,40}$/)
        .messages({
            "string.empty": "Password is required",
            "string.pattern.base": "Password must contain a-z, A-Z, 0-9 and must be at least 6 characters."
        })
});

const validateRegister = (input) => {
    const { error } = registerSchema.validate(input, {
        abortEarly: false
    });

    if (error) {
        const formatError = error.details.reduce((prev, curr) => {
            prev[curr.path[0]] = curr.message;
            return prev;
        }, {});
        return formatError;
    }
    return null;
};

export default validateRegister;


