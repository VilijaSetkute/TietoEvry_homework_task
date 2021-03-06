const weightLogSchema = require('../models/weightLogSchema')
const plannedSchema = require('../models/plannedSchema')

module.exports = {
    quarterController: async (req, res) => {
        const {user, id, quarter} = req.body
        await plannedSchema.findOneAndUpdate({_id: id}, {$set: {'recipe.quarter':quarter, 'recipe.timestamp': Date.now()}}, {returnDocument: "after"})
        const updated = await plannedSchema.find({'recipe.user': user})
        res.send({success: true, planned: updated})
    },
    kcalTableController: async (req, res) => {
        const {user} = req.body;
        try {
            const userWeightLogs = await weightLogSchema.find({user})
            const userPlannedList = await plannedSchema.find({'recipe.user': user})

            const calsNeeded = {
                total: userWeightLogs.length > 0 ? Math.round(userWeightLogs[userWeightLogs.length - 1].totalBmr) : 2000,
                fats: userWeightLogs.length > 0 ? Math.round(userWeightLogs[userWeightLogs.length - 1].totalBmr * 0.32) : 2000 * 0.32,
                carbs: userWeightLogs.length > 0 ? Math.round(userWeightLogs[userWeightLogs.length - 1].totalBmr * 0.50) : 2000 * 0.5,
                proteins: userWeightLogs.length > 0 ? Math.round(userWeightLogs[userWeightLogs.length - 1].totalBmr * 0.18) : 2000 * 0.18
            };

            const startedMeals = userPlannedList.filter(el => (el.recipe.quarter > 0));
            let totalUsed = 0, fatsUsed = 0, carbsUsed = 0, proteinsUsed = 0;
            let totalUsedPerc = 0, fatsUsedPerc = 0, carbsUsedPerc = 0, proteinsUsedPerc = 0;
            let totalLeft = 0, fatsLeft = 0, carbsLeft = 0, proteinsLeft = 0;
            let totalLeftPerc = 0, fatsLeftPerc = 0, carbsLeftPerc = 0, proteinsLeftPerc = 0;

            for (const meal of startedMeals) {
                totalUsed += Math.round(meal.recipe.calories * (meal.recipe.quarter / 4));
                fatsUsed += Math.round(meal.recipe.digest[0].total * 9 * (meal.recipe.quarter / 4));
                carbsUsed += Math.round(meal.recipe.digest[1].total * 4 * (meal.recipe.quarter / 4));
                proteinsUsed += Math.round(meal.recipe.digest[2].total * 4 * (meal.recipe.quarter / 4));
            }

            totalUsedPerc = Math.round(totalUsed / calsNeeded.total * 100);
            fatsUsedPerc = Math.round(fatsUsed / calsNeeded.fats * 100);
            carbsUsedPerc = Math.round(carbsUsed / calsNeeded.carbs * 100);
            proteinsUsedPerc = Math.round(proteinsUsed / calsNeeded.proteins * 100);

            totalLeft = calsNeeded.total >= totalUsed ? calsNeeded.total - totalUsed : 0;
            fatsLeft = calsNeeded.fats >= fatsUsed ? calsNeeded.fats - fatsUsed : 0;
            carbsLeft = calsNeeded.carbs >= carbsUsed ? calsNeeded.carbs - carbsUsed : 0;
            proteinsLeft = calsNeeded.proteins >= proteinsUsed ? calsNeeded.proteins - proteinsUsed : 0;

            totalLeftPerc = totalLeft !== 0 ? 100 - totalUsedPerc : 0;
            fatsLeftPerc = fatsLeft !== 0 ? 100 - fatsUsedPerc : 0;
            carbsLeftPerc = carbsLeft !== 0 ? 100 - carbsUsedPerc : 0;
            proteinsLeftPerc = proteinsLeft !== 0 ? 100 - proteinsUsedPerc : 0;

            const statistics = {
                total: {totalUsed, totalUsedPerc, totalLeft, totalLeftPerc},
                fats: {fatsUsed, fatsUsedPerc, fatsLeft, fatsLeftPerc},
                carbs: {carbsUsed, carbsUsedPerc, carbsLeft, carbsLeftPerc},
                proteins: {proteinsUsed, proteinsUsedPerc, proteinsLeft, proteinsLeftPerc}
            };

            res.send({success: true, statistics});
        } catch (err) {
            console.log(err);
        }
    }
};
