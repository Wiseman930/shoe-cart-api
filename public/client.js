const searchImg = document.querySelector('.search_image')
const userImg = document.querySelector('.user_image')
const cartImg = document.querySelector('.cart_image')
const cancelSearch = document.querySelector('.cancel')
const searchBar = document.querySelector('.search_by')
const logSign = document.querySelector('.login_sign')
const cart_data = document.querySelector('.cart_items')
const showLogin = document.querySelector('.log')
const showLSignIn = document.querySelector('.sign')
const userlogin = document.querySelector('.login_page')
const userSignIn = document.querySelector('.signup_page')
const allConent = document.querySelector('.all_content')


const clickAnyBrand = document.querySelectorAll('#brands')


document.addEventListener('mouseup', function(e) {
    if (!cart_data.contains(e.target)) {
        cart_data.style.display = 'none';
    }
    if (!logSign.contains(e.target)) {
        logSign.style.display = 'none';
    }
    if (!userlogin.contains(e.target)) {
        userlogin.style.display = 'none';
    }
    if (!userSignIn.contains(e.target)) {
        userSignIn.style.display = 'none';
    }
});

searchImg.addEventListener('click', function(){
    searchBar.style.display = 'block'
})

userImg.addEventListener('click', function(){
    cart_data.style.display = 'none'
    if(logSign.style.display !== 'block' ){
        logSign.style.display = 'block'
    }
    else{
        logSign.style.display = 'none'
    }
})

cartImg.addEventListener('click', function(){
    logSign.style.display = 'none'
    if(cart_data.style.display !== 'block' ){
        cart_data.style.display = 'block'
    }
    else{
        cart_data.style.display = 'none'
    }
})

cancelSearch.addEventListener('click', function(){
    searchBar.style.display = 'none'
})

showLogin.addEventListener('click', function(){
    userSignIn.style.display = 'none'
    if(userlogin.style.display !== 'block' ){
        userlogin.style.display = 'block'
    }
    else{
        userlogin.style.display = 'none'
    }
})

showLSignIn.addEventListener('click', function(){
    userlogin.style.display = 'none'
    if(userSignIn.style.display !== 'block' ){
        userSignIn.style.display = 'block'
    }
    else{
        userSignIn.style.display = 'none'
    }
})

let shoesElem = document.querySelector('.shoes');
let shoesTemplateText = document.querySelector('.shoesTemplate');
let theShoesTemplate = Handlebars.compile(shoesTemplateText.innerText);

$('.shop_brand').on('click', '#brands', function (e) {

    let url = window.location.href
    const strs = url.split('=');
    const id = Number(strs.at(-1))


    axios
    .get(`/api/shoes/brand/${id}`)
    .then(result => {
        let shoes = result.data;
        let shoeData = shoes.data;
        shoesElem.innerHTML = theShoesTemplate({
        shoeData
        });
    });

    });






