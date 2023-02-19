const User = require('../../../models/userSchema');
const bcrypt=require("bcryptjs");

function authController(){
    return{
        async signup(req,res){

            const{name ,email,phone,password,cpassword}= req.body;

            if(!name || !email|| !phone|| !password|| !cpassword){
                return res.status(401).json({error:"Server**Plz fill fields properly"})
            }

            try {
                const userExist = await User.findOne({email:email})

                if(userExist){
                    return res.status(401).json({message:"Server**Email already exist"}); // change
                }else if(password!=cpassword){
                    return res.status(401).json({error:"Server**Password Does Not Match"});
                }else{
                    const user=new User({name ,email,phone,password,role:'admin'});

                await user.save();

                res.status(201).json(
                    {message:"Admin registered successfully"})
                }

            } catch (error) {
                console.log(error);
                res.status(500).json({message:"Server**Internal server error"})
            }
        },
        async signin(req,res){
            try {
                const {email,password}=req.body;
        
                if(!email || !password){
                    return res.status(400).json({error:"Server**Please fill the data"})
                }
        
                const userLogin= await User.findOne({email:email});
        
                if(userLogin && userLogin.role==='admin'){
                    const isMatch = await bcrypt.compare(password,userLogin.password)
        
                    // creating jwt token 
                    const token = await userLogin.generateAuthToken();
                    
                    res.cookie("token",token,{
                        expires:new Date(Date.now()+(1000*60*60)),//1 hour
                        httpOnly:true
                    })
        
                    if(!isMatch){
                        res.status(401).json({error:"Server**Invalid Credential"})
                    }else{
                        res.status(200).json({token:token,user:userLogin,message:'Login Successfull'})
                    }
                }
                else{
                    res.status(401).json({error:"Server**Invalid Credential"})
                }
        
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: "Server**Internal Server Error", error: error })
            }
        },
        async signout(req,res){
             try {
                res.clearCookie('token');
                res.status(200).json({
                    message:'Signout Successfull...!'
                })
             } catch (error) {
                console.log(error);
             }
        }
    }
}

module.exports= authController