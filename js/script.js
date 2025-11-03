// All categoragies
const allCategorage = () => {
    const url = " https://taxi-kitchen-api.vercel.app/api/v1/categories";
    fetch(url)
        .then(res => res.json())
        .then(data => {
            allCategoryDisplayShow(data.categories)
        })
}

// all foods
const allfoods = () => {
    const url = "https://taxi-kitchen-api.vercel.app/api/v1/foods/random";
    fetch(url)
        .then(res => res.json())
        .then(foods => allFoodsDisplayShow(foods.foods))
}

// spinner
const spinner = isTrue => {
    const spinnerContainer = document.getElementById("spinner");
    const container = document.getElementById('main-container');

    if(isTrue) { 
        spinnerContainer.classList.remove("hidden")
        container.classList.add("hidden")
    }else{
        spinnerContainer.classList.add("hidden")
        container.classList.remove("hidden")
    }

}



// click handle 
const btnHandler = id => {
    spinner(true)
    console.log(id)
    const allBtns = document.querySelectorAll(".btns")
    allBtns.forEach(btn => {
        btn.classList.remove("active")
    });
    document.getElementById(`btn-${id}`).classList.add("active");


    // category id fecth
    const url = ` https://taxi-kitchen-api.vercel.app/api/v1/categories/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            allFoodsDisplayShow(data.foods)
            console.log(data)
        })
}

// All Foods Display Show
const allFoodsDisplayShow = (foods) => {
    const container = document.getElementById('main-container');
    container.innerHTML = ""

    foods.forEach(food => {
         const div = document.createElement("div");
        div.innerHTML = `
        <div class="bg-white shadow-xl rounded-2xl p-4 flex gap-4 md:gap-16 mt-5 hover:bg-[#ffe598]">
            <div>
                <img class="w-[190px] h-full md:w-[300px] object-cover rounded-2xl"
                     src=${food.foodImg} alt="">
            </div>
            <div class="w-full my-3">
                <div>
                    <h2 class="text-lg font-semibold">${food.title}</h2>
                    <p class="text-xs text-center bg-[#febf00] max-w-[100px] py-1 rounded-xl px-2 text-[#614901]">${food.category}</p>
                </div>

                <div class="flex items-center gap-3 my-3">
                    <div class="border border-gray-300 h-[1px] w-[20%]"></div>
                        <h2 class="text-[14px] font-semibold text-[#ffbf00]">$ ${food.price} BDT</h2>
                        <div class="border border-gray-300 h-[1px] w-[20%]"></div>
                        </div>
                    <div>
                    <button onclick="cardHandler(${food})" class="btn text-[12px] text-[#614901] bg-[#febf00]"><i class="fa-solid fa-plus"></i> Add This Item</button>
                    </div>
                </div>
        </div>
        `
        container.appendChild(div)
    });
    spinner(false)
}

// {
//     "id": 52992,
//     "title": "Soy-Glazed Meatloaves with Wasabi Mashed Potatoes & Roasted Carrots",
//     "catId": 1,
//     "foodImg": "https://www.themealdb.com/images/media/meals/o2wb6p1581005243.jpg",
//     "price": 518,
//     "category": "Beef"
// }

// all categoriege display show
const allCategoryDisplayShow = (data) => {
    const categoragies = data;

    const container = document.getElementById('cateogries');

    categoragies.forEach(category => {
        const div = document.createElement("div");
        div.innerHTML = `
    <div id="btn-${category.id}" onclick="btnHandler(${category.id})" class="hover:bg-[#504c4c] hover:text-white shadow-lg btns cursor-pointer flex items-center gap-3 bg-white p-2 rounded-lg mt-4">
        <img class="w-[40px]" src=${category.categoryImg} alt="">
        <h3 class="font-semibold">${category.categoryName}</h3>
    </div>
    `
        container.appendChild(div)
    });
};

allfoods()
allCategorage()