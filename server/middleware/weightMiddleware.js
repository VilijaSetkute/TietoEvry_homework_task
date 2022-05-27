module.exports = {
    weightParamsValidator: async (req, res, next) => {
        const {weight, height, age, gender, activity} = req.body;
        if (!weight && !height && !age && !gender && !activity) return res.send({success: false, message: "Please fill in / select all fields"});
        if (weight < 30) return res.send({success: false, message: "Please provide your weight. If your weight is correct, then standard calculations cannot be applied to your current weight"});
        if (height < 100) return res.send({success: false, message: "Please provide your height. If your height is correct, then standard calculations cannot be applied to your current height"});
        if (age < 16) return res.send({success: false, message: "Please provide your age. Standard calculations cannot be applied to children, teenagers, pregnant women, sports professionals"});
        if (!gender) return res.send({success: false, message: "Please select gender"});
        if (activity === 0) return res.send({success: false, message: "Please select activity"});
        next();
    }
};