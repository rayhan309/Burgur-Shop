// All categoragies
const allCategorage = () => {
    const url = " https://taxi-kitchen-api.vercel.app/api/v1/categories";
    fetch(url)
        .then(res => res.json())
        .then(data => {
            allCategoryDisplayShow(data.categories)
        })
};

// all foods
const allfoods = () => {
    const url = "https://taxi-kitchen-api.vercel.app/api/v1/foods/random";
    fetch(url)
        .then(res => res.json())
        .then(foods => allFoodsDisplayShow(foods.foods))
};

// spinner
const spinner = isTrue => {
    const spinnerContainer = document.getElementById("spinner");
    const container = document.getElementById('main-container');

    if (isTrue) {
        spinnerContainer.classList.remove("hidden")
        container.classList.add("hidden")
    } else {
        spinnerContainer.classList.add("hidden")
        container.classList.remove("hidden")
    }

};


// add card handler
const addCardHandler = cards => {
    const container = document.getElementById("cards")
    const div = document.createElement('div');

    div.innerHTML = `
     <div class="mt-4 flex gap-3 bg-white border-b-2 border-gray-300 p-2 rounded-xl relative">
        <img class="w-[55px] rounded-xl object-cover" src="${cards.foodImg}" alt="">
        <div>
            <h2 class="text-xs font-semibold">${cards.title}</h2>
            <h4 class="text-[15px] font-bold text-yellow-500">$ ${cards.price} BDT</h4>
        </div>
        <div class="bg-red-500 w-[30px] h-[30px]  font-bold text-white rounded-full flex justify-center items-center absolute top-5 right-3"><i class="fa-solid fa-xmark"></i></div>
    </div>
    `
    container.appendChild(div);
    // add money
    const ammount = Number(document.getElementById("ammounts").innerText);
    const totale = ammount + Number(cards.price);
    document.getElementById("ammounts").innerText = totale;
};



// fetch modale 
// const myModal = id => {
//     console.log(id);
//     const url = `https://taxi-kitchen-api.vercel.app/api/v1/foods/${id}`;
//     fetch(url)
//         .then(res => res.json())
//         .then(data => showMyModal(data.details))
// }

// display show modal
// const showMyModal = (food) => {
//     const modalCon = document.getElementById("modal-con");
//     modalCon.innerHTML = "";
//     const ecode = food.video.split("=")[1];
//     console.log(food.video.split("=")[1]);

//     modalCon.innerHTML = `
//         <iframe width="400" height="230" class="rounded-2xl" src="https://www.youtube.com/embed/${ecode}?si=mtV9WFTunGfEXlK8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>  
//   `;
//     document.getElementById("my_modal_3").showModal();
// };



// const showMyModal = data => {
//     console.log(data);
//     const modalCon = document.getElementById("modal-con");
//     const div = document.createElement('div');
//     div.innerHTML =`
    
//     `
//     // document.getElementById("my_modal_3").showModal()
// }


// click handle 
const btnHandler = id => {
    spinner(true)
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
        })
};

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
                    <p class="text-xs bg-[#febf00] badge  text-[#614901]">${food.category}</p>
                </div>

                <div class="flex items-center gap-3 my-3">
                    <div class="border border-gray-300 h-[1px] md:w-[35%] w-[20%]"></div>
                        <h2 class="text-[14px] font-semibold text-[#ffbf00]">$ ${food.price} BDT</h2>
                        <div class="border border-gray-300 h-[1px] md:w-[35%] w-[20%]"></div>
                        </div>
                    <button onclick='addCardHandler(${JSON.stringify(food)})' class="btn text-[12px] text-[#614901] off bg-[#febf00]"><i class="fa-solid fa-plus"></i> Add This Item</button>
                </div>
        </div>
        `
        container.appendChild(div)
    });
    spinner(false)
};

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

allfoods();
allCategorage();