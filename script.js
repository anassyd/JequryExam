$(function () {
    let sideBarinnerWidth = $(".sidebar-inner").innerWidth();
    $("#sidebar").css('left', -sideBarinnerWidth)


    $(document).ready(function () {

        $(`#loading .loader`).fadeOut(1000, function () {
            $('#loading').fadeOut(1000, function () {
                $(`.body`).css(`overflow-y`, 'auto')
                $('#loading').remove();
            });
        })
    })


    let colorsItem = $('.color-item');
    colorsItem.eq(0).css('backgroundColor', 'tomato');
    colorsItem.eq(1).css('backgroundColor', '#09c');
    colorsItem.eq(2).css('backgroundColor', 'teal');
    colorsItem.eq(3).css('backgroundColor', 'lightgreen');
    colorsItem.eq(4).css('backgroundColor', 'aqua');

    colorsItem.click(function () {
        let bgColor = $(this).css('backgroundColor');
        $('.change').css('color', bgColor);

    })  

    $('#sidebar .hide-btn').click(function () {


        if ($(`#sidebar`).css('left') == '0px') {
            $("#sidebar").animate({ left: -sideBarinnerWidth }, 1000)
            $('.fa-bars').show();
        $('.fa-times').hide();
        }
        else {
            $("#sidebar").animate({ left: "0px" }, 1000)
            $('.fa-bars').hide();
            $('.fa-times').show();
        }
    })
})











const meals=document.getElementById("meals");
 async function getMeals() {
    try{
        const result = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
        const resMeals =await result.json();
        const data =resMeals.meals ;
        dData(data);
        
    }catch(err){
    }
 }

getMeals();


function dData(data){
    let item = "";
    data.forEach(elment =>{
        item+=`  <div class="col ">
        <div class=" item border-0  rounded-3 position-relative overflow-hidden">
        <img class="w-100" src="${elment.strMealThumb}" alt="">
          <div class="item-layer  position-absolute p-0">
            <p class="cad-text  p-2"> ${elment.strMeal} </p>
          </div>
        </div>
      </div>`

    })
    meals.innerHTML=item;
}

 
//====================================================


const categoryItem=document.getElementById("categoryItem");
 async function getCtag() {
    try{
        const result = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
        const resCategory =await result.json();
        const data =resCategory.categories ;
        dCategory(data);
    
        
    }catch(err){
    }
 }

 getCtag();


function dCategory(data){
    let itemCategory = "";
    data.forEach(elment =>{
        itemCategory+=`  <div class="col ">
        <div class=" item border-0  rounded-3 position-relative overflow-hidden">
        <img class="w-100" src="${elment.strCategoryThumb}" alt="">
          <div class="categoriy-layer  position-absolute p-3">
          <h3 class="text-center">${elment.strCategory}</h3>
            <p class="cad-text  "> ${elment.strCategoryDescription} </p>
          </div>
        </div>
      </div>`

    })
    categoryItem.innerHTML=itemCategory;
}




//====================================================

const areaItem=document.getElementById("areaItem");
 async function getArea() {
    try{
        const result = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
        const data =await result.json();
        dArea(data.meals);

        
    }catch(err){
    }
 }

 getArea();

 async function getA(country) {
    try{
        const result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`)
        const data =await result.json();
        dA(data.meals);
      
        
    }catch(err){
    }
 }


function dArea(data){
    let itemArea = "";
    data.forEach(elment =>{
        itemArea+=`  <div class="col">
       <div class="text-white">
       <i class="fa-solid fa-house-laptop fa-4x "></i>
       </div >
          <h3 class="text-white po">${elment.strArea}</h3>
      </div>`

    })
    areaItem.innerHTML=itemArea;
}

function dA(data){
    let itemArea = "";
    data.forEach(elment =>{
        itemArea+=`  <div class="col ">
        <div class=" item border-0  rounded-3 position-relative overflow-hidden">
        <img class="w-100" src="${elment.strMealThumb}" alt="">
          <div class="item-layer  position-absolute p-0">
            <p class="cad-text  p-2"> ${elment.strMeal} </p>
          </div>
        </div>
      </div>`

    })
    areaItem.innerHTML=itemArea;
}
areaItem.addEventListener("click",(e)=>{
    if(e.target !== areaItem)
    {
        getA(e.target.innerText);
    }
})

//====================================================

const ingredientsItem = document.getElementById("ingredientsItem");

async function getIngredients() {
    try {
        const result = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
        const data = await result.json();
        dIngredients(data.meals);
    } catch (err) {
        console.error(err);
    }
}

getIngredients();

async function getI(ingredient) {
    try {
        const result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        const data = await result.json();
        dI(data.meals);
    } catch (err) {
        console.error(err);
    }
}

function dIngredients(data) {
    let itemIngredients = "";
    for (let i = 0; i < Math.min(20, data.length); i++) {
        const element = data[i];
        const description = element.strDescription.split(' ').slice(0, 20).join(' ');

        itemIngredients += `
            <div class="col text-white text-center">
                <div class="">
                    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                </div>
                <h3>${element.strIngredient}</h3>
                <p>${description}</p>
            </div>`;
    }

    ingredientsItem.innerHTML = itemIngredients;
}

function dI(data) {
    let itemIngredients = "";
    data.forEach(element => {
        itemIngredients += `
            <div class="col ">
                <div class="item border-0 rounded-3 position-relative overflow-hidden">
                    <img class="w-100" src="${element.strMealThumb}" alt="">
                    <div class="item-layer position-absolute p-0">
                        <p class="cad-text p-2">${element.strMeal}</p>
                    </div>
                </div>
            </div>`;
    });

    ingredientsItem.innerHTML = itemIngredients;
}

ingredientsItem.addEventListener('click', (e) => {
    if (e.target.tagName === 'H3') {
        const ingredientName = e.target.innerText;
        getI(ingredientName);
    }
});


$(".sidebar-item").click(function () {
    const target = $(this).data("target");
    $(`#${target}`).removeClass('d-none');
    $(".section").not(`#${target}`).addClass('d-none');
});




document.getElementById("submitButton").addEventListener("click", function () {
  
    const nameInput = document.getElementById("exampleInputEmail1");
    const phoneInput = document.getElementById("exampleInputEmail2");
    const passwordInput = document.getElementById("exampleInputEmail3");
    const emailInput = document.getElementById("exampleInputEmail4");
    const ageInput = document.getElementById("exampleInputEmail5");
    const repasswordInput = document.getElementById("exampleInputEmail6");

    
    if (
        nameInput.value === "" ||
        phoneInput.value === "" ||
        passwordInput.value === "" ||
        emailInput.value === "" ||
        ageInput.value === "" ||
        repasswordInput.value === ""
    ) {
      
        alert("Please fill in all the required fields.");
    } else {
        alert("Form submitted successfully!");
    }
});


