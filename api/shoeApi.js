module.exports = function(shoeService) {

    async function homeFunction(req, res, next){
        try {
            let brandId = req.params.brand
            let results = await shoeService.stockByBrand(brandId)
            res.json({
                status: 'success',
                data: results
            });

        } catch (err) {
            next(err);

        }
    }


    /*try{

    }
    catch (err) {
        next(err);
    }*/

    return {
        homeFunction,

    }
}