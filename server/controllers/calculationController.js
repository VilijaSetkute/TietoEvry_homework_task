module.exports = {
    kcalTableController: (req, res) => {
        const {planned, weightLogs} = req.body

        const calsNeeded = {
            total: weightLogs.length > 0 ? Math.round(weightLogs[weightLogs.length - 1].totalBmr) : 2000,
            fats: weightLogs.length > 0 ? Math.round(weightLogs[weightLogs.length - 1].totalBmr * 0.32) : 2000 * 0.32,
            carbs: weightLogs.length > 0 ? Math.round(weightLogs[weightLogs.length - 1].totalBmr * 0.50) : 2000 * 0.5,
            proteins: weightLogs.length > 0 ? Math.round(weightLogs[weightLogs.length - 1].totalBmr * 0.18) : 2000 * 0.18
        }

        const startedMeals = planned.filter(el => (el.recipe.quarter > 0))
        let totalUsed = 0, fatsUsed = 0, carbsUsed = 0, proteinsUsed = 0;
        let totalUsedPerc = 0, fatsUsedPerc = 0, carbsUsedPerc = 0, proteinsUsedPerc = 0;
        let totalLeft = 0, fatsLeft = 0, carbsLeft = 0, proteinsLeft = 0;
        let totalLeftPerc = 0, fatsLeftPerc = 0, carbsLeftPerc = 0, proteinsLeftPerc = 0;

        for (const meal of startedMeals) {
            totalUsed += Math.round(meal.recipe.calories * (meal.recipe.quarter / 4))
            fatsUsed += Math.round(meal.recipe.digest[0].total * 9 * (meal.recipe.quarter / 4))
            carbsUsed += Math.round(meal.recipe.digest[1].total * 4 * (meal.recipe.quarter / 4))
            proteinsUsed += Math.round(meal.recipe.digest[2].total * 4 * (meal.recipe.quarter / 4))
        }

        totalUsedPerc = Math.round(totalUsed / calsNeeded.total * 100)
        fatsUsedPerc = Math.round(fatsUsed / calsNeeded.fats * 100)
        carbsUsedPerc = Math.round(carbsUsed / calsNeeded.carbs * 100)
        proteinsUsedPerc = Math.round(proteinsUsed / calsNeeded.proteins * 100)

        totalLeft = calsNeeded.total >= totalUsed ? calsNeeded.total - totalUsed : 0
        fatsLeft = calsNeeded.fats >= fatsUsed ? calsNeeded.fats - fatsUsed : 0
        carbsLeft = calsNeeded.carbs >= carbsUsed ? calsNeeded.carbs - carbsUsed : 0
        proteinsLeft = calsNeeded.proteins >= proteinsUsed ? calsNeeded.proteins - proteinsUsed : 0

        totalLeftPerc = totalLeft !== 0 ? 100 - totalUsedPerc : 0
        fatsLeftPerc = fatsLeft !== 0 ? 100 - fatsUsedPerc : 0
        carbsLeftPerc = carbsLeft !== 0 ? 100 - carbsUsedPerc : 0
        proteinsLeftPerc = proteinsLeft !== 0 ? 100 - proteinsUsedPerc : 0

        const statistics = {
            total: {totalUsed, totalUsedPerc, totalLeft, totalLeftPerc},
            fats: {fatsUsed, fatsUsedPerc, fatsLeft, fatsLeftPerc},
            carbs: {carbsUsed, carbsUsedPerc, carbsLeft, carbsLeftPerc},
            proteins: {proteinsUsed, proteinsUsedPerc, proteinsLeft, proteinsLeftPerc}
        }

        res.send({success: true, statistics})

    }
}