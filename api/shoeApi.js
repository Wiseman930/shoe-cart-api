module.exports = function(shoeService, session) {


    async function stockBrand(req, res, next){
        try {
            let brandId = req.params.brand;
            let results = await shoeService.stockByBrand(brandId)

            res.json({
                status: 'success',
                data: results,
            });

        } catch (err) {
            next(err);

        }
    }

    async function registerUser(req, res, next){
        try {
            let registrar = req.body;
            await shoeService.signInUser(registrar)

            res.json({
                status: 'success'
            });

        } catch (err) {
            next(err);

        }
    }

    async function loginUser(req, res, next){
        try {
            let registrar = req.body;
            let email = registrar.email;
            let password = registrar.password;
            await shoeService.logUser(email, password)
            await shoeService.getTheCount()
            res.json({
                status: 'success'
            });

        } catch (err) {
            next(err);

        }
    }

    async function getLogCount(req, res, next){
        try {

        let results =  await shoeService.getTheCount()
            res.json({
                status: 'success',
                data: results
            });

        } catch (err) {
            next(err);

        }
    }


    async function postUserCart(req, res, next){
        try {

            let results = req.body;
            if(results){
            await shoeService.postToCart(results)
           // await shoeService.displayCart(results);
            }
            res.json({
                status: 'success',
            });

        } catch (err) {
            next(err);

        }
    }

    async function postUserQty(req, res, next){
        try {

            let results = req.body;
            if(results){
            await shoeService.postToQty(results)        
            }
            res.json({
                status: 'success',
            });
            
        } catch (err) {
            next(err);

        }
    }
    async function getCart(req, res, next){
        try{

           let email = req.params.getcart;
           let results;

            if(email !== null){
                 results = await shoeService.displayCart(email);
            }

           res.json({
            status: 'success',
            data: results
        });
        }
        catch (err) {
            next(err);
        }
    }

    async function removeShoe(req, res, next){
        try {
            let results = req.body;
            if(results){
                await shoeService.removeTheShoe(results)
            }
            res.json({
                status: 'success',
            });

        } catch (err) {
            next(err);

        }
    }

    async function addShippingData(req, res, next){
        try {
            let results = req.body;
            if(results){
                await shoeService.addTheShippingData(results)

            }
            res.json({
                status: 'success',
            });

        } catch (err) {
            next(err);

        }
    }

    async function returnShippData(req, res, next){
        try{

           let email = req.params.shipinfo;
           let results;
           
            if(email !== null){
                 results = await shoeService.getShippingData(email);
            }

           res.json({
            status: 'success',
            data: results
        });
        }
        catch (err) {
            next(err);
        }
    }

    /*try{

    }
    catch (err) {
        next(err);
    }*/

    return {
        stockBrand,
        registerUser,
        loginUser,
        getLogCount,
        postUserCart,
        getCart,
        removeShoe,
        postUserQty,
        addShippingData,
        returnShippData

    }
}