module.exports = function ShoeApi(db){

    let errorCount;
    let emails;
    let passwords;

    async function stockByBrand (id){
        try{
            let results;
            if(Number(id)){
             results = await db.manyOrNone(`SELECT stock.id, brands.brand, colors.color, names.shoe_Name, sizes.size, stock.price, stock.quantity, stockImages.image
            FROM stock
            INNER JOIN brands ON stock.brand_id = brands.id
            INNER JOIN colors ON stock.color_id = colors.id
            INNER JOIN names ON stock.names_id = names.id
            INNER JOIN sizes ON stock.size_id = sizes.id
            INNER JOIN stockImages on stock.image_id = stockImages.id WHERE stock.brand_id = $1`, [Number(id)])
            }

        return results;
    }
        catch (err) {
            console.log(err);
          }
    }
    async function signInUser(registrar){
        try{
            let results;
            let count = await db.oneOrNone(`SELECT COUNT(*) FROM register WHERE email=$1 and password=$2`, [registrar.email, registrar.password])
            if(count.count == 0 && registrar.email !== null && registrar.password !== null){
             results = await db.oneOrNone(`INSERT into register (email, password) values($1, $2)`, [registrar.email, registrar.password])
            }
    }
        catch (err) {
            console.log(err);
          }
    }

    async function logUser(email, password){
        try{
             emails = email;
             passwords = password
        }
        catch (err) {
            console.log(err);
          }
    }
    async function getTheCount(){
        errorCount = await db.oneOrNone(`SELECT COUNT(*) FROM register WHERE email=$1 and password=$2`, [emails, passwords])
        return errorCount.count;

    }
    async function postToCart(results){
        let email = results.email;
        let stock_id = results.stock;

        let stock =  await db.manyOrNone(`SELECT id, brand_id, color_id, size_id, price, quantity, image_id FROM stock WHERE id=$1`, [stock_id])
        let cart_items = stock[0]
        let user_id = await await db.oneOrNone(`SELECT id FROM register WHERE email=$1`, [email])
        let count = await db.oneOrNone(`SELECT COUNT(*) FROM cart WHERE stock_id=$1 and register_id=$2`, [stock_id, user_id.id])

        let stockQuantity = await db.oneOrNone(`SELECT quantity FROM stock WHERE id=$1`, [stock_id])
        let cartQuantity = await db.oneOrNone(`SELECT quantity FROM cart WHERE stock_id=$1 and register_id=$2`, [stock_id, user_id.id])

        if(count.count == 0){
            await db.oneOrNone(`INSERT INTO cart (brand, color, size, price, quantity, stock_id, register_id, cart_image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            [cart_items.brand_id, cart_items.color_id, cart_items.size_id, cart_items.price, 1, cart_items.id, user_id.id, cart_items.image_id])
           }
           if(count.count == 1 && stockQuantity.quantity > cartQuantity.quantity){
           // await db.oneOrNone(`UPDATE cart SET quantity=quantity+1 WHERE stock_id=$1 and register_id=$2`, [stock_id, user_id.id])
           }
    }

    async function postToQty(results){
        let email = results.email;
        let minus = results.minus;
        let plus = results.plus;
        let stock_id = results.stock;
        let user_id =  await db.oneOrNone(`SELECT id FROM register WHERE email=$1`, [email])
        let stock_price = await db.manyOrNone(`SELECT stock.price
        FROM cart
        INNER JOIN stock ON cart.stock_id = stock.id
        INNER JOIN brands ON stock.brand_id = brands.id
        INNER JOIN colors ON stock.color_id = colors.id
        INNER JOIN sizes ON stock.size_id = sizes.id
        INNER JOIN names ON stock.names_id = names.id
        INNER JOIN stockImages on stock.image_id = stockImages.id
        INNER JOIN register on cart.register_id = register.id
        WHERE cart.register_id=$1 AND cart.stock_id=$2 ORDER by cart.id`, [user_id.id, stock_id]);


        let stockQuantity = await db.oneOrNone(`SELECT quantity FROM stock WHERE id=$1`, [stock_id])
        let cartQuantity = await db.oneOrNone(`SELECT quantity FROM cart WHERE stock_id=$1 and register_id=$2`, [stock_id, user_id.id])
       

        if(minus == 'minus' && stockQuantity.quantity >= cartQuantity.quantity && cartQuantity.quantity > 1){
            await db.oneOrNone(`UPDATE cart SET quantity=quantity-1 WHERE stock_id=$1 and register_id=$2`, [stock_id, user_id.id])
            await db.oneOrNone(`UPDATE cart SET price=price-$1 WHERE stock_id=$2 and register_id=$3`, [stock_price[0].price, stock_id, user_id.id])

        }
        
        if(plus == 'plus' && stockQuantity.quantity > cartQuantity.quantity){
            await db.oneOrNone(`UPDATE cart SET quantity=quantity+1 WHERE stock_id=$1 and register_id=$2`, [stock_id, user_id.id])
            await db.oneOrNone(`UPDATE cart SET price=price+$1 WHERE stock_id=$2 and register_id=$3`, [stock_price[0].price, stock_id, user_id.id])
        }

    }

    async function displayCart(email){
        try{
            let cartShoes;
            let count;
            let total;
            let user_id = await await db.oneOrNone(`SELECT id FROM register WHERE email=$1`, [email]) || {}
            cartShoes = await db.manyOrNone(`SELECT stock.id, brands.brand, colors.color, sizes.size, names.shoe_name, cart.price, cart.id, cart.quantity, stockImages.image, cart.stock_id
            FROM cart
            INNER JOIN stock ON cart.stock_id = stock.id
            INNER JOIN brands ON stock.brand_id = brands.id
            INNER JOIN colors ON stock.color_id = colors.id
            INNER JOIN sizes ON stock.size_id = sizes.id
            INNER JOIN names ON stock.names_id = names.id
            INNER JOIN stockImages on stock.image_id = stockImages.id
            INNER JOIN register on cart.register_id = register.id
            WHERE cart.register_id=$1 ORDER by cart.id`, [user_id.id]);

            count = await db.manyOrNone(`SELECT SUM(quantity) AS quantity FROM cart WHERE register_id=$1`, [user_id.id])
            total = await db.manyOrNone('SELECT SUM(price) AS total FROM cart WHERE register_id=$1', [user_id.id])

            const countObjects = cartShoes.map((object) => {
                object.count = count[0].quantity;
                object.total = total[0].total;
                return object;
            });
            return countObjects;
        }catch(err){
            console.log(err)
        }
    }
    async function removeTheShoe(cart){
        let email = cart.email;
        let cartId = cart.id;

        let user_id = await await db.oneOrNone(`SELECT id FROM register WHERE email=$1`, [email])
        await db.oneOrNone('DELETE from cart WHERE stock_id=$1 and register_id=$2', [cartId, user_id.id])

    }
    async function addTheShippingData(data){
        
        let email = data.email;
        let user_id =  await db.oneOrNone(`SELECT id FROM register WHERE email=$1`, [email])
        let fullNames =  data.fullName;
        let country = data.country;
        let address = data.address;
        let theCity = data.city;
        let theProvince = data.province;
        let thePostalCode = data.postalCode;
        let thePhoneNumber =  data.phoneNumber;
        let shippingCost =  await db.oneOrNone(`SELECT shipping_cost FROM ship_provinces WHERE province_name=$1`, [theProvince])
       
        let count = await db.oneOrNone(`SELECT COUNT(*) FROM shipping WHERE register_id=$1 `, 
        [user_id.id])

        if(count.count == 0){
            await db.oneOrNone(`INSERT INTO shipping (register_id, shipping_full_name, shipping_country, shipping_address, shipping_city, shipping_province, shipping_zipcode, shipping_phone_number, shipping_cost)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`, 
            [user_id.id, fullNames, country, address, theCity, theProvince, thePostalCode, thePhoneNumber, shippingCost.shipping_cost])
        }
        if(!count.count == 0){
            await db.oneOrNone(`UPDATE shipping
            SET shipping_full_name = $2,
            shipping_country = $3,
            shipping_address = $4,
            shipping_city = $5,
            shipping_province = $6,
            shipping_zipcode = $7,
            shipping_phone_number = $8,
            shipping_cost = $9
            WHERE register_id = $1;`, 
            [user_id.id, fullNames, country, address, theCity, theProvince, thePostalCode, thePhoneNumber, shippingCost.shipping_cost])
        }
        
          
    }

    async function getShippingData(email){
        let email1 = email;
        let user_id =  await db.oneOrNone(`SELECT id FROM register WHERE email=$1`, [email1])
        let myData = await db.oneOrNone(`SELECT * FROM shipping WHERE register_id=$1 `, [user_id.id])

        return myData;
    }
    return {
        stockByBrand,
        signInUser,
        logUser,
        getTheCount,
        postToCart,
        displayCart,
        removeTheShoe,
        postToQty,
        addTheShippingData,
        getShippingData
    }
}

