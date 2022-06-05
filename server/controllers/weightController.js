const weightLogSchema = require('../models/weightLogSchema')

module.exports = {
    weightLogController: async (req, res) => {
        const {weight, height, age, gender, activity, user} = req.body;
        let bmr = 0;
        let totalBmr = 0;

        if (gender === "male") {
            bmr = 66.5 + (13.75 * weight) + (5.003 * height) - (6.75 * age);
        } else {
            bmr = 655.1 + (9.563 * weight) + (1.850 * height) - (4.676 * age);
        }

        switch (activity) {
            case 1:
                totalBmr = Math.ceil(bmr * 1.2);
                break;
            case 2:
                totalBmr = Math.ceil(bmr * 1.375);
                break;
            case 3:
                totalBmr = Math.ceil(bmr * 1.55);
                break;
            case 4:
                totalBmr = Math.ceil(bmr * 1.725);
                break;
            case 5:
                totalBmr = Math.ceil(bmr * 1.9);
                break;
            default:
                totalBmr = Math.ceil(bmr);
        }

        const bmi = Number((weight / ((height / 100) * (height / 100))).toFixed(1));
        let bmiEval = "";
        let color = "";

        if (bmi < 18.5) {
            bmiEval = "You have an underweight (< 18,5)";
            color = "text-primary";
        } else if (bmi < 25) {
            bmiEval = "You have a normal weight (18,5 - 24,9)";
            color = "text-success";
        } else if (bmi < 30) {
            bmiEval = "You have an overweight (25 - 30)";
            color = "text-warning";
        } else {
            bmiEval = "You have an obesity (> 30)";
            color = "text-danger";
        }

        const results = new weightLogSchema({
            user,
            bmi,
            bmiEval,
            bmr: Math.ceil(bmr),
            totalBmr,
            color,
            timestamp: Date.now()
        });

        await results.save()
        const userWeightLogs = await weightLogSchema.find({user})
        console.log(userWeightLogs);
        res.send({success: true, results: userWeightLogs, message: "Calculations completed successfully and added to your weight logs"});
    },
    allUserWeightController: async (req, res) => {
        const {user} = req.body
        const userWeightLogs = await weightLogSchema.find({user})
        console.log(userWeightLogs);
        res.send({success: true, results: userWeightLogs});
    }
};
