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
            await db.oneOrNone(`UPDATE cart SET quantity=quantity+1 WHERE stock_id=$1 and register_id=$2`, [stock_id, user_id.id])
           }
    }
    async function displayCart(email){
        try{
            let cartShoes;
            let user_id = await await db.oneOrNone(`SELECT id FROM register WHERE email=$1`, [email]) || {}
            cartShoes = await db.manyOrNone(`SELECT stock.id, brands.brand, colors.color, sizes.size, names.shoe_name, stock.price, cart.id, cart.quantity, stockImages.image
            FROM cart
            INNER JOIN stock ON cart.stock_id = stock.id
            INNER JOIN brands ON stock.brand_id = brands.id
            INNER JOIN colors ON stock.color_id = colors.id
            INNER JOIN sizes ON stock.size_id = sizes.id
            INNER JOIN names ON stock.names_id = names.id
            INNER JOIN stockImages on stock.image_id = stockImages.id
            INNER JOIN register on cart.register_id = register.id
            WHERE cart.register_id=$1 ORDER by cart.id`, [user_id.id])

            return cartShoes;
        }catch(err){
            console.log(err)
        }
    }
    async function removeTheShoe(cart){
        let cartId = cart.id;
        await db.oneOrNone('DELETE from cart WHERE id=$1', [cartId])

    }
    return {
        stockByBrand,
        signInUser,
        logUser,
        getTheCount,
        postToCart,
        displayCart,
        removeTheShoe
    }
}

