const emailValidator = require("email-validator");

module.exports = {
  loginValidator: async (req, res, next) => {
    const {email, pass} = req.body
    if (!email) return res.send({success: false, message: 'Provide email'})
    if (!emailValidator.validate(email)) return res.send({success: false, message: 'Invalid email'})
    if (!pass) return res.send({success: false, message: 'Provide password'})
    next()
  },
  registerValidator: async (req, res, next) => {
    const {email, pass, passRepeat} = req.body
    if (!email) return res.send({success: false, message: 'Provide email'})
    if (!emailValidator.validate(email)) return res.send({success: false, message: 'Invalid email'})
    if (!pass) return res.send({success: false, message: 'Provide password'})
    if (pass.length < 8) return res.send({success: false, message: 'Password must contain minimum 8 symbols'})
    if (!passRepeat) return res.send({success: false, message: 'Repeat password'})
    if (pass !== passRepeat) return res.send({success: false, message: 'Passwords don\'t match'})
    next()
  }
}
