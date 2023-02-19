const session = require('express-session');
const TestMenu = require('../../models/testpizza')

function homeController(){
    return{
        async index(req,res){
            try {
                const pizza= await TestMenu.find();
                console.log("object");
                res.json(pizza);
            } catch (error) {
                console.log(error);
            }
        }
    }
}

module.exports = homeController