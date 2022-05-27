module.exports = {
    searchParamsValidator: async (req, res, next) => {
        const {name, meal, dish} = req.body
        if (name.length === 0 && meal.includes('Select') && dish.includes('Select')) return res.send({success: false, message: 'Please provide at least one search parameter'})
        if (name.length > 0 && name.length < 3) return res.send({success: false, message: 'Minimum length of ingredient is 2 symbols'})
        if (name.length > 0 && name.length >= 39) return res.send({success: false, message: 'Maximum length of ingredients is 20 symbols'})
        next()
    }
}