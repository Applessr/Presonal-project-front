import Joi from 'joi'


const loginSchema = Joi.object({
    identifier: Joi.alternatives()
      .try(
        Joi.string()
          .email({ tlds: false })
          .messages({
            "string.email": "Please enter a valid email address",
            "string.empty": "Email is required if username is not provided"
          }),
        Joi.string()
          .pattern(/^[0-9a-zA-Z]{3,40}$/)
          .messages({
            "string.pattern.base": "Username must contain only letters (a-z, A-Z) and numbers (0-9) and be at least 3 characters long",
            "string.empty": "Username is required if email is not provided"
          })
      )
      .required(),
    password: Joi.string()
      .required()
      .min(6)
      .messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters long"
      })
  })
  .required();
    
const validateLogin = (input) => {
    const {error} = loginSchema.validate(input, {
        abortEarly: false
    })

    if(error) {
        const formatError = error.details.reduce((prev, curr) => {
            prev[curr.path[0]] = curr.message
            return prev
        },{})
        return formatError
    }
    return null
};

export default validateLogin