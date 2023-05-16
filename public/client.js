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
const searchBar = document.querySelector('.search_by')
const logSign = document.querySelector('.login_sign')
const cart_data = document.querySelector('.cart_items')
const showLogin = document.querySelector('.log')
const showLSignIn = document.querySelector('.sign')
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
const logoutBtn = document.querySelector('.logout')

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

//Remove a shoe from the cart
let removeShoe = document.querySelector('.bin_image')

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
    auth.onAuthStateChanged(user => {

        if(user == null){
            let email = {};
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
function allCart(){
    auth.onAuthStateChanged(user => {
        if(user !== null){
           let email = user.email;
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
}

$('.cart_items').on('click', '.bin_image', function (e) {
    let cart_id = event.target.id;
    axios
    .post("/api/shoes/removeitem",{
        id: cart_id,
    })
    .then(result => {
        allCart()
    });
})

signButton.addEventListener('click', function(e){
    e.preventDefault();
    let email = signEmailAdress.value;
    let password = signPassowrd.value;
    let testPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
    let testEmail = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/



    if(testPassword.test(password) == false && password.length < 8){
        err1.innerHTML = 'Password must be 8 characters or more.'

    }
    if(testPassword.test(password) == true && password.length >= 8){
        err1.innerHTML = ''
    }

    if(testEmail.test(email) == false){
        err2.innerHTML = 'Please enter valid email.'

    }
    if(testEmail.test(email) == true){
        err2.innerHTML = ''

    }

    if (testPassword.test(password) == true && testEmail.test(email) == true ){

        createUserWithEmailAndPassword(auth, email, password).then(cred => {
            //alert('User signed up!');
        });
        axios
        .post("/api/shoes/register",{
            email: email,
            password: password,
        })
        .then(result => {

        });
    }
})

logButton.addEventListener('click', function(e){
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
            err4.innerHTML = ""
            signInWithEmailAndPassword(auth, email, password)
            .then(cred => {
                //alert('Logged in user!');
            })
            .catch(error => {
                console.log(error.message);
            })
        }
        if(count == 0 && testPassword.test(password) == false && password.length < 8){
            err4.innerHTML = "Enter valid passowrd"
        }
        if(count == 0 && testPassword.test(password) == false && password.length >= 8){
            err4.innerHTML = ''
        }
        if(count == 0 && testEmail.test(email) == false){
            err3.innerHTML = 'Enter valid email'
        }
        if(count == 0 && testEmail.test(email) == true){
            err3.innerHTML = ''
        }



    })

})



axios.defaults.baseURL = 'http://localhost:3018/';
let url = window.location.href
const strs = url.split('=');
let id = Number(strs.at(-1))

function removeBrand(){
    if(Number.isInteger(id) == true){
        removeBrands.style.display = 'none';
        backArrow.style.display = 'block'
    }
}

axios
.get(`/api/shoes/brand/${id}`)
.then(result => {
    let shoes = result.data;
    let shoeData = shoes.data;
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

auth.onAuthStateChanged(user => {

    if(user !== null){
        let email = user.email;
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

logoutBtn.addEventListener('click', e => {
    err1.innerHTML = ''
    err2.innerHTML = ""
    err3.innerHTML = ''
    err4.innerHTML = ""
    e.preventDefault();
    auth.signOut();
    //alert('User signed out!');
  })


$('.shoes').on('click', '.add_cart',  function (e) {
    let stock_id = e.target.id
    auth.onAuthStateChanged(user => {
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
});

auth.onAuthStateChanged(user => {
    let green_dot = document.querySelector('.logged_in_color')
    if (user) {
     // alert(user.email + " is logged in!");
      green_dot.style.display = 'inline-block'
    } else {
      green_dot.style.display = 'none'
    }
  });



