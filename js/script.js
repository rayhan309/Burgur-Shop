// All categoragies
const allCategorage = () => {
    const url = " https://taxi-kitchen-api.vercel.app/api/v1/categories";
    fetch(url)
        .then(res => res.json())
        .then(data => allCategoryDisplayShow(data.categories))
}

// all foods
const allfoods = () => {
    const url = "https://taxi-kitchen-api.vercel.app/api/v1/foods/random";
    fetch(url)
    .then(res => res.json())
    .then(foods => allFoodsDisplayShow(foods.foods))
}

// All Foods Display Show
const allFoodsDisplayShow =  (foods) => {
console.log(foods)
const container = document.getElementById('main-container')
}



// all categoriege display show
const allCategoryDisplayShow = (data) => {
    const categoragies = data;

    const container = document.getElementById('cateogries');

    categoragies.forEach(category => {
        const div = document.createElement("div");
        div.innerHTML = `
    <div class="hover:bg-gray-200 cursor-pointer flex items-center gap-3 bg-white p-2 rounded-lg mt-4">
        <img class="w-[40px]" src="https://www.themealdb.com/images/category/beef.png" alt="">
        <h3 class="font-semibold">${category.categoryName}</h3>
    </div>
    `
    container.appendChild(div)
    });
};

allfoods()
allCategorage()