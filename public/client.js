import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCI9EuVlOfMn7LvyiBwD3wwcg9yQBH_Z14",
  authDomain: "shoe-cartuser.firebaseapp.com",
  databaseURL: "https://shoe-cartuser-default-rtdb.firebaseio.com",
  projectId: "shoe-cartuser",
  storageBucket: "shoe-cartuser.appspot.com",
  messagingSenderId: "723459168582",
  appId: "1:723459168582:web:77113a889d70448b40ed47",
  measurementId: "G-7R9QL64ELE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth();

const searchImg = document.querySelector('.search_image')
const userImg = document.querySelector('.user_image')
const cartImg = document.querySelector('.cart_image')
const cancelSearch = document.querySelector('.cancel')
const logSign = document.querySelector('.login_sign')
const cart_data = document.querySelector('.cart_items')
const showLogin = document.querySelector('.log')
const showLSignIn = document.querySelector('.sign')
const welcomeMessage = document.querySelector('.welcome')
const userlogin = document.querySelector('.login_page')
const userSignIn = document.querySelector('.signup_page')
const allConent = document.querySelector('.all_content')

const removeBrands = document.querySelector('.shop_brand')
const backArrow = document.querySelector('.back')
const clickAnyBrand = document.querySelectorAll('#brands')
const addCartBtn = document.querySelector('.add_cart')

//singup
const signEmailAdress = document.querySelector('.sign_email')
const signPassowrd = document.querySelector('.sign_passowrd')
const signButton = document.querySelector('.sign_in')

//login
const logEmailAdress = document.querySelector('.log_email')
const logPassowrd = document.querySelector('.log_passowrd')
const logButton = document.querySelector('.log_in')

//Logout
const logoutBtn = document.querySelector('.logoutBtn')

//Logout
const aboutBtn = document.querySelector('.about')

//  Error Messages
let err1 = document.querySelector('.password_sign')
let err2 = document.querySelector('.email_sign')
let err3 = document.querySelector('.em_log')
let err4 = document.querySelector('.pass_log')

//Display shoe names
let shoesElem = document.querySelector('.shoes');
let shoesTemplateText = document.querySelector('.shoesTemplate');
let theShoesTemplate = Handlebars.compile(shoesTemplateText.innerText);

//Display cart items
const cartElem = document.querySelector('.carting')
let cartTemplate = document.querySelector('.cartTemplate')
let theCartTemplate = Handlebars.compile(cartTemplate.innerText)

//Shipping Info
const shippingElem = document.querySelector('.shipp-information')
let shippingTemplate = document.querySelector('.shippingTemplate')
let theShippingTemplate = Handlebars.compile(shippingTemplate.innerText)

//Remove a shoe from the cart
let removeShoe = document.querySelector('.bin_image')

let body = document.querySelector('body')

//qty
let plus = document.querySelector('.minus')
let minus = document.querySelector('.plus')

//Go to checkout
let shippingSection = document.querySelector('.shipping')
let gotToCheck = document.querySelector('.proceed')
let shopBrabdTxt = document.querySelector('.shop_by')
let menu = document.querySelector('.menu_icon')
let icons = document.querySelector('.icons')

//Show sing in and up
let showIn = document.querySelector('.show_in')
let showUp = document.querySelector('.show_up')

//empty cart
let empty = document.querySelector('.empty_cart')

//shipping section
let shippingData = document.querySelector('.fill-shipping-data')
let shipEmail = document.querySelector('.logged-email')
let shipEmail2 = document.querySelector('.logged-email2')
let editClose = document.querySelector('.edit-shipping-1')
let editShippingInfo = document.querySelector('.show-shipping')


const fullName = document.querySelector(".full-name-1");
const selectCountry = document.querySelector(".country-1");
const streetAdress = document.querySelector(".street-address-1");
const streetAdress2 = document.querySelector(".street-address-2");
const city = document.querySelector(".city-1");
const province = document.querySelector(".input-field-1");
const postalCode = document.querySelector(".input-field-2");
const phoneNumber = document.querySelector(".phone-number-1");

const addShippingInfo = document.querySelector(".add-shipping-1");
const placeOrder = document.querySelector(".place-order-1");

const countTheItem = document.querySelector('.count-items')
const userIcon = document.querySelector('.user_icon')

let log_message = document.querySelector('.success_log')
let sign_message = document.querySelector('.success_sign')

let closeLogn = document.querySelector('.close-log')
let closeSign = document.querySelector('.close-sign')
let closeWelcome = document.querySelector('.close-welcome')
let closeCart = document.querySelector('.close-cart')
let closeShippingData = document.querySelector('.close-shipping-data')

closeLogn.addEventListener('click', function(e){
    userlogin.style.display = 'none'
})

closeSign.addEventListener('click', function(e){
    userSignIn.style.display = 'none'
})

closeWelcome.addEventListener('click', function(e){
    logSign.style.display = 'none'
})

closeCart.addEventListener('click', function(e){
    cart_data.style.display = 'none'
})

closeShippingData.addEventListener('click', function(e){
    shippingData.style.display = 'none'
})

signButton.addEventListener('click', function(e){

    const user = auth.currentUser;
    if(user == null){
    e.preventDefault();
    let email = signEmailAdress.value;
    let password = signPassowrd.value;
    let testPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
    let testEmail = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/


    if(testPassword.test(password) == false && password.length < 8){
        err1.style.display = "block";
        err1.innerHTML = 'Password must be 8 characters or more.'

    }
    if(testPassword.test(password) == true && password.length >= 8){
        err1.innerHTML = ''
    }

    if(testEmail.test(email) == false){
        err2.style.display = "block";
        err2.innerHTML = 'Please enter valid email.'
      

    }
    if(testEmail.test(email) == true){
        err2.innerHTML = ''

    }

    if (testPassword.test(password) == true && testEmail.test(email) == true ){

        createUserWithEmailAndPassword(auth, email, password).then(cred => {
        sign_message.style.display = "block"
        sign_message.innerHTML = 'Your account has been created.'
        });
        axios
        .post("/api/shoes/register",{
            email: email,
            password: password,
        })
        .then(result => {

        });
    }
    setTimeout(() => {
        err1.style.display = "none";
        err2.style.display = "none";
        sign_message.style.display = "none"
      }, 5000);
    }
})

logButton.addEventListener('click', function(e){
 
        const user = auth.currentUser;
        if(user == null){
            e.preventDefault();
            let email = logEmailAdress.value;
            let password = logPassowrd.value;
            let testPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
            let testEmail = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
        
            axios
            .post("/api/shoes/login",{
                    email: email,
                    password: password,
                })
                .then(result => {          
            });
        
            axios
            .get(`/api/shoes/logerror`)
            .then(result => {
                let counts = result.data;
                let count = counts.data;
               
                if(count == 1){
                    err3.innerHTML = ''
                    err4.innerHTML = ''
                    signInWithEmailAndPassword(auth, email, password)
                    .then(cred => {
                        log_message.style.display = "block"
                        log_message.innerHTML = 'Your login was successful.'
                    })
                    .catch(error => {
                        console.log(error.message);
                    })
                }
                if(count == 0 && testPassword.test(password) == false && password.length < 8){
                    err4.style.display = "block"
                    err4.innerHTML = "Enter valid passowrd"
                }
                if(count == 0 && testPassword.test(password) == false && password.length >= 8){
                    err4.innerHTML = ''
                }
                if(count == 0 && testEmail.test(email) == false){
                    err3.style.display = "block"
                    err3.innerHTML = 'Enter valid email'
                }
                if(count == 0 && testEmail.test(email) == true){
                    err3.innerHTML = ''
                }
        
                setTimeout(() => {
                    err3.style.display = "none";
                    err4.style.display = "none";
                    log_message.style.display = "none"
                  }, 5000);
            })
        }


})


function recordedShippData(){
    auth.onAuthStateChanged(user => {        
            if(user !== null){
                let email = user.email
                axios
                .get(`/api/shoes/shipinfo/${email}`)
                .then(result => {
                    let results = result.data;
                    let data2 = results.data;
                    shippingElem.innerHTML = theShippingTemplate({
                        data2
                    });
                });
            }        
        });
}

auth.onAuthStateChanged(user => {
    if(user !== null){
        let email = user.email
        axios
        .get(`/api/shoes/shipinfo/${email}`)
        .then(result => {
            let results = result.data;
            let data2 = results.data;
            shippingElem.innerHTML = theShippingTemplate({
            data2
            });
        });
    }

});


function allCart(){
    auth.onAuthStateChanged(user => {

        if(user !== null){
           let email = user.email;
           shipEmail.innerHTML = email;
           shipEmail2.innerHTML = email;
           welcomeMessage.innerHTML = 'YOUR ACCOUNT'
            axios
            .get(`/api/shoes/getcart/${email}`)
            .then(result => {
                let cart = result.data;
                let cartData = cart.data;

                if (cartData.length > 0) {
                    empty.style.display = 'none'

                    let countItem = cartData[0].count

                    if(countItem > 1){
                        for (var i = 0; i < cartData.length; i++) {
                            cartData[i].string = "s";
                          }  
                    }if(countItem == 1){
                        for (var i = 0; i < cartData.length; i++) {
                            cartData[i].string = " ";
                          }
                    }
                }
                if (cartData.length == 0) {
                    empty.style.display = 'block'
                }
                cartElem.innerHTML = theCartTemplate({
                cartData
                });
            });
        } 
        if(user == null){
            let email = 'none';
            shipEmail.innerHTML = ''
            shipEmail2.innerHTML = ''
            welcomeMessage.innerHTML = 'WELCOME'
             axios
             .get(`/api/shoes/getcart/${email}`)
             .then(result => {
                 let cart = result.data;
                 let cartData = cart.data;
                 if (cartData.length > 0) {
                    empty.style.display = 'none'
                 }
                 if (cartData.length == 0) {
                    empty.style.display = 'block'
                }
              
                 cartElem.innerHTML = theCartTemplate({
                 cartData
                 });
             });
         }        
    })
}

auth.onAuthStateChanged(user => {
    if(user !== null){
        let email = user.email;  
        shipEmail.innerHTML = email
        shipEmail2.innerHTML = email
        logoutBtn.style.display = 'block'
        showLSignIn.style.display = 'none'
        showLogin.style.display = 'none'
        welcomeMessage.innerHTML = 'YOUR ACCOUNT'
        axios
        .get(`/api/shoes/getcart/${email}`)
        .then(result => {
            let cart = result.data;
            let cartData = cart.data;
            
            if (cartData.length > 0) {
                empty.style.display = 'none'

                let countItem = cartData[0].count

                if(countItem > 1){
                    for (var i = 0; i < cartData.length; i++) {
                        cartData[i].string = "s";
                      }  
                }if(countItem == 1){
                    for (var i = 0; i < cartData.length; i++) {
                        cartData[i].string = " ";
                      }
                }
            }
            if (cartData.length == 0) {
                empty.style.display = 'block'
            }

            cartElem.innerHTML = theCartTemplate({
            cartData
            });
        });
    }
    
    if(user == null){
        let email = 'none';
        shipEmail.innerHTML = ''
        shipEmail2.innerHTML = ''
        logoutBtn.style.display = 'none'
        showLSignIn.style.display = 'block'
        showLogin.style.display = 'block'
        welcomeMessage.innerHTML = 'WELCOME'
        empty.style.display = 'block'
         axios
         .get(`/api/shoes/getcart/${email}`)
         .then(result => {
             let cart = result.data;
             let cartData = cart.data;
        
             cartElem.innerHTML = theCartTemplate({
             cartData
             });
         });
     }

    
})

addShippingInfo.addEventListener('click', function(){
// Name error
const nameError = document.querySelector(".name-error");
// Country error
const countryError = document.querySelector(".country-error");
// Address error
const addressError = document.querySelector(".address-error");
const addressError2 = document.querySelector(".address-error2");
// City error
const cityError = document.querySelector(".city-error");
// Province error
const provinceError = document.querySelector(".province-error");
// Postal error
const postalError = document.querySelector(".postal-error");
// Phone error
const phoneError = document.querySelector(".phone-error");

//card information
const form = document.querySelector('.payment-section');
const cardNumber = form.querySelector('#card-number');
const cardName = form.querySelector('#card-name');
const expiryDate = form.querySelector('#expiry-date');
const cvvNumber = form.querySelector('#cvv');


    let fullNames =  fullName.value;
    let country = selectCountry.value;
    let address = streetAdress.value;
    let address2 = streetAdress2.value;
    let theCity = city.value;
    let theProvince = province.value;
    let thePostalCode = postalCode.value;
    let thePhoneNumber =  phoneNumber.value;

    const requiredFields = [fullNames, country, address, address2, theCity, theProvince, thePostalCode, thePhoneNumber];


    auth.onAuthStateChanged(user => {
        if(fullNames == ''){
            nameError.style.display = "block";
            nameError.innerHTML = 'Full Name is required'
        }
        if(country == ''){
            countryError.style.display = "block";
            countryError.innerHTML = 'Country is required'
        }
        if(address == ''){
            addressError.style.display = "block"
            addressError.innerHTML = 'Adress Line 1 is required'
        }
        if(address2 == ''){
            addressError2.style.display = "block"
            addressError2.innerHTML = 'Adress Line 2 is required'
        }
        if(theCity == ''){
            cityError.style.display = "block";
            cityError.innerHTML = 'City is required'
        }
        if(theProvince == ''){
            provinceError.style.display = "block";
            provinceError.innerHTML = 'Province is required'
        }
        if(thePostalCode == ''){
            postalError.style.display = "block";
            postalError.innerHTML = 'Postal Code is required'
        }
        if(thePhoneNumber == ''){
            phoneError.style.display = "block";
            phoneError.innerHTML = 'Phone Number is required'
        }

        setTimeout(() => {
            nameError.style.display = "none";
            countryError.style.display = "none";
            addressError.style.display = "none";
            addressError2.style.display = "none";
            cityError.style.display = "none";
            provinceError.style.display = "none";
            postalError.style.display = "none";
            phoneError.style.display = "none";
          }, 5000);

        if(user !== null && requiredFields.every(field => field.value !== '')){
            let email = user.email;
            
            axios
            .post("/api/shoes/shippinginfo",{
                email: email,
                fullName: fullNames,
                country: country,
                address: address,
                address2: address2,
                city: theCity,
                province: theProvince,
                postalCode: thePostalCode,
                phoneNumber: thePhoneNumber,
            })
            .then(result => {
                recordedShippData()
                allCart()
            });
        }
    })

})





axios.defaults.baseURL = 'http://localhost:3018/';

editClose.addEventListener('click', function(){
  
    var text = this.textContent;
    if (text == "Edit") {
       // this.textContent = "Close";
        shippingData.style.display = 'block'
      } 
      /*else {
        this.textContent = "Edit";
        shippingData.style.display = 'none'
      }*/
})



document.addEventListener('mouseup', function(e) {
    var text = this.textContent;

    if (!cart_data.contains(e.target)) {
        cart_data.style.display = 'none';
    
    }
    if (!shippingData.contains(e.target)) {
        shippingData.style.display = 'none';
        this.textContent = "Edit";
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
    if (!icons.contains(e.target) && window.innerWidth < 900) {
        icons.style.display = 'none';
    }
});

showUp.addEventListener('click', function(){
    userlogin.style.display = 'none';
    userSignIn.style.display = 'block';
})

showIn.addEventListener('click', function(){
    userlogin.style.display = 'block';
    userSignIn.style.display = 'none';

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

menu.addEventListener('click', function(){
    if(icons.style.display = 'none'){
        icons.style.display = 'flex'
    }
})


cartImg.addEventListener('click', function(){

    logSign.style.display = 'none'
    if(cart_data.style.display !== 'block' ){
        cart_data.style.display = 'block'
     
    }
    else{
        cart_data.style.display = 'none'
        body.style.opacity = '';
    }
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

let url2 = window.location.href
const strs2 = url2.split('=');
let page = strs2.at(-1)


if(page == 'checkout'){
    shippingSection.style.display = 'block'
    removeBrands.style.display = 'none';
    shopBrabdTxt.style.display = 'none';
    userIcon.style.display = 'none'   
}


$('.carting').on('click', '.proceed', function (e) {
    allCart()
    let url2 = window.location.href
    const strs2 = url2.split('=');
    let page = strs2.at(-1)

    if(page == 'checkout'){
        shippingSection.style.display = 'block'
        removeBrands.style.display = 'none';
        shopBrabdTxt.style.display = "none" 
        userIcon.style.display = 'none' 
    }
})

$('.cart_items').on('click', '.bin_del', function (e) {
    let cart_id = e.target.id;
    let email;
    
    const user = auth.currentUser;
    if(user !== null){
        email = user.email;
        axios
        .post("/api/shoes/removeitem",{
            id: cart_id,
            email: email
        })
        .then(result => {
            allCart()
        });
    }


})

$('.cart_items').on('click', '.plus', function (e) {
    let pluss = 'plus';
    let stock_id = e.target.id

        
    const user = auth.currentUser;
        let email;
            if(user !== null){
                 email = user.email;
                axios
                .post("/api/shoes/postqty",{
                    email: email,
                    plus: pluss,
                    stock: stock_id
                    
                })
                .then(result => {
                    allCart()
                });
            }
})

$('.cart_items').on('click', '.minus', function (e) {
    let minuss = 'minus';
    let stock_id = e.target.id
   
    
    const user = auth.currentUser;
        let email
            if(user !== null){
                 email = user.email;
                axios
                .post("/api/shoes/postqty",{
                    email: email,
                    minus: minuss,
                    stock: stock_id
                    
                })
                .then(result => {
                    allCart()
                });
            }

})

let url = window.location.href
const strs = url.split('=');
let id = Number(strs.at(-1))

function removeBrand(){
    if(Number.isInteger(id) == true){
        removeBrands.style.display = 'none';
        backArrow.style.display = 'block'
        aboutBtn.style.display = 'none'
    }
}

axios
.get(`/api/shoes/brand/${id}`)
.then(result => {
    let shoes = result.data;
    let shoeData = shoes.data;
    let buttonBrand = document.querySelector('#brands')
    let shopByTxt = document.querySelector('.shop_by_text')
    let text = buttonBrand.innerHTML;

    if(id){
    shopByTxt.innerHTML = 'Shop ' + shoeData[0].brand;
    }
    
    removeBrand();
    shoesElem.innerHTML = theShoesTemplate({
    shoeData
    });
});


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
    removeBrand();
});

logoutBtn.addEventListener('click', e => {
    logEmailAdress.value = '';
    logPassowrd.value = '';
    log_message.innerHTML = ''
    sign_message.innerHTML = ''
    err1.innerHTML = ''
    err2.innerHTML = ''
    err3.innerHTML = ''
    err4.innerHTML = ''
    e.preventDefault();
    auth.signOut();
    recordedShippData()
    allCart();
  })

$('.shoes').on('click', '.add_cart',  function (e) {
    let stock_id = e.target.id
    
    const user = auth.currentUser;
 
    let email
        if(user !== null){
             email = user.email;
            axios
            .post("/api/shoes/postcart",{
                email: email,
                stock: stock_id,
            })
            .then(result => {
                allCart()
            });
        }
        if(user == null){
            userlogin.style.display = 'block'
        }

});

auth.onAuthStateChanged(user => {
    let green_dot = document.querySelector('.logged_in_color')
    if (user) {
      green_dot.style.display = 'inline-block'

    } else {
      green_dot.style.display = 'none'
      empty.style.display = 'block'
    }
  });

 



