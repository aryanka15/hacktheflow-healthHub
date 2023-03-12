const searchBtn = document.getElementById('food-search-btn');
const mealList = document.getElementById('meal');
const mealDetailContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

searchBtn.addEventListener('click', getMealList);

function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    console.log(searchInputTxt);
    fetch('www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}').then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
                data.meals.forEach(meal => {
                    html += `
                        <div class = "meal-item" data-id = "${meal.idMeal}">
                            <img src = "${meal.strMealThumb}"
                            alt = "food"></img>
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a?
                        </div>
                    `;
                })
        }
        mealList.innerHTML = html;
    })
}
