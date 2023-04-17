module.exports = function ShoeApi(db){



    async function stockByBrand (brand){
        try{
            let results = await db.manyOrNone(`SELECT stock.id, brands.brand, colors.color, names.shoe_Name, sizes.size, stock.price, stock.quantity, stockImages.image
            FROM stock
            INNER JOIN brands ON stock.brand_id = brands.id
            INNER JOIN colors ON stock.color_id = colors.id
            INNER JOIN names ON names.names_id = names.id
            INNER JOIN sizes ON stock.size_id = sizes.id
            INNER JOIN stockImages on stock.image_id = stockImages.id WHERE stock.brand_id = $1 ORDER BY id`, [brand])

        return results;
    }
        catch (err) {
            console.log(err);
          }
    }


    return {
        stockByBrand
    }
}

