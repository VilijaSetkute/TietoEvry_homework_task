const fetch = require("node-fetch");
const fullUrl = `${process.env.URL}&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}&q=`;

module.exports = {
    allRecipesController: (req, res) => {
        fetch(fullUrl)
            .then(res => res.json())
            .then(data => {
                res.send({success: true, data});
            })
            .catch(err => {
                console.log(err);
            });
    },
    searchRecipesController: (req, res) => {
        const {name, meal, dish} = req.body;
        const searchName = name.toLowerCase().replaceAll(" ", "%20");
        let searchMeal = "";
        let searchDish = "";
        if (!meal.includes("Select")) {
            searchMeal = "&mealType=" + meal.toLowerCase().replaceAll(" ", "%20");
        }
        if (!dish.includes("Select")) {
            searchDish = "&dishType=" + dish.toLowerCase().replaceAll(" ", "%20");
        }
        const searchUrl = `${fullUrl}${searchName}${searchMeal}${searchDish}`;
        fetch(searchUrl)
            .then(res => res.json())
            .then(data => {
                if (data.count > 0) {
                    res.send({success: true, data, message: `We found ${data.count} recipe(s) for you`});
                } else {
                    res.send({success: false, message: "Opps... We could not find anything based on your search parameters"});
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
};