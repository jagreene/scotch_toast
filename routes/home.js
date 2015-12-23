var Orders = require('../models/orders');
var fs = require('fs');
var names = fs.readFileSync("names.txt", 'utf8').split(',');

module.exports = function (){
    return {
        getHome: function(req, res){
            res.render('home', {});
        },

        getKitchen: function(req, res){
            res.render('orders', {});
        },

        getIngredients: function(req, res){
            ingredients = []
            fs.readdir("public/images", (err, files) => {
                if(err){console.log(err)}
                else{
                    files.forEach((fileName, index) => {
                        ingredients.push({
                            image: fileName,
                            name: names[index]
                        })
                    })
                    console.log(ingredients);
                    res.json(ingredients);
                }
            })
        },

        getOrders: function(req, res){
            Orders.find({}, (err, orders) =>{
                if(err){console.log(err)}
                else{
                    res.json(orders);
                }
            })
        },

        postOrder: function(req, res){
            order = new Orders({ingredients: req.body['ingredients[]']});
            order.save(function(err, order){
                if(err){
                    console.log(err);
                } else {
                    console.log(order);
                    res.json(order);
                }
            })
        },

        deleteOrder: function(req, res){
            console.log(req.body);
            Orders.findByIdAndRemove(req.body.id, function(err){
                if(err){console.log(err)}
                else{
                    Orders.find({}, function(err, orders){
                        if(err){console.log(err)}
                        else{
                            res.json(orders);
                        }
                    })
                }
            })
        }
    }
}
