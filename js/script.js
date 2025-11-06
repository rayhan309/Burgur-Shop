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


// checkout card & add card handler
 let checkoutCard = [];
const addCardHandler = (cards) => {

    const isExist = checkoutCard.find(card => card.id === cards.id);

    if (isExist) {
        // qountit increase
        isExist.quantity += 1;

        isExist.price = cards.price * isExist.quantity;

        Toastify({
            text: "Item already added  ",
            close: true,
            gravity: "top",
            position: "right",
            style: {
                background: "linear-gradient(to right, #ff5f6d, #ffc371)",
            },
            stopOnFocus: true,
            duration: 3000,
        }).showToast();
    } else {
        Toastify({
            text: `Item added successfully  `,
            close: true,
            gravity: "top",
            position: "right",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            stopOnFocus: true,
            duration: 3000,
        }).showToast();
        checkoutCard.push(isExist ? isExist : { ...cards, quantity: 1 });
    }
    // calculate total price
     const totalItems = document.getElementById("ammounts").innerText;

    const total = Number(totalItems) + Number(cards.price);

    document.getElementById("ammounts").innerText = total;

    displayCart();
};

const displayCart = () => {
        const container = document.getElementById("cards")
        container.innerHTML = "";
        checkoutCard.forEach(card => {
            const div = document.createElement('div');
            div.classList.add("card");
            div.id = card.id;
            div.innerHTML = `
            <div class="mt-4 flex gap-3 bg-white border-b-2 border-gray-300 p-2 rounded-xl relative">
                <img class="w-[55px] rounded-xl object-cover" src="${card.foodImg}" alt="">
                <div>
                    <h2 class="text-xs font-semibold">${card.title}</h2>
                    <h4 class="text-[15px] font-bold text-yellow-500">$ <span>${card.price}</span> BDT</h4>
                    <h4 class="text-[15px] font-bold text-yellow-500">Quantity: ${card.quantity}</h4>
                </div>
                <div onclick='removeCard(this)' class="bg-red-500 w-[30px] h-[30px]  font-bold text-white rounded-full flex justify-center items-center absolute top-5 right-3"><i class="fa-solid fa-xmark"></i></div>
            </div>
            ` 
            container.appendChild(div);
        });

};    



// remove card
const removeCard = (card) => {
    const cardId = card.closest(".card").id
    // console.log(cardId);
    const filtredCard = checkoutCard.filter(cards => cards.id != cardId);
    // displayCart(filtredCard);
    checkoutCard =filtredCard;
    // console.log({checkoutCard, filtredCard, card, cardId: card.id})
    
    const totalItems = document.getElementById("ammounts").innerText;

    const price = card.parentNode.children[1].children[1].children[0].innerText;

    const removePrice = Number(totalItems) - Number(price)

    document.getElementById("ammounts").innerText = removePrice;

    card.parentNode.remove();
};


// add food info
const addFoodInfo = id => {
    fetch(`https://taxi-kitchen-api.vercel.app/api/v1/foods/${id}`)
        .then(res => res.json())
        .then(data => showMyModal(data.details));
}

// show modal
const showMyModal = (food) => {
    const modalCon = document.getElementById("modal-con");
    modalCon.innerHTML = "";
    const ecode = food.video.split("=")[1];
    console.log(food.video.split("=")[1]);

    modalCon.innerHTML = `
        <iframe class="rounded-2xl max-w-[400px] h-[170px] md:h-[230px]" src="https://www.youtube.com/embed/${ecode}?si=mtV9WFTunGfEXlK8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>  
  `;
    document.getElementById("my_modal_3").showModal();
}


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

                         <div class="flex gap-4 items-center ">
                            <button onclick='addFoodInfo(${food.id})' class="btn text-[12px] text-[#614901] off bg-[#febf00]"><i class="fa-solid fa-info"></i></button>
                            <button onclick='addCardHandler(${JSON.stringify(food)})' class="btn w-auto md:text-[12px] text-[10px] text-[#614901] off bg-[#febf00]"><i class="fa-solid fa-plus"></i> Add This Item</button>
                        </div>

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