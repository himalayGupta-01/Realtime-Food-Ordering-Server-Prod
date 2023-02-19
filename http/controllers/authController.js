const User = require('../../models/userSchema');
const bcrypt=require("bcryptjs");

function authController(){
    return{
        async signup(req,res){

            const{name ,email,phone,password,cpassword}= req.body;

            if(!name || !email|| !phone|| !password|| !cpassword){
                return res.status(400).json({error:"Please Fill Fields Properly"})
            }

            try {
                const userExist = await User.findOne({email:email})

                if(userExist){
                    // console.log("Email already exist");
                    return res.status(401).json({message:"Server**Email already exist"}); //change
                }else if(password!=cpassword){
                    return res.status(401).json({error:"Confirm Password**Password Does Not Match"});
                }else{
                    const user=new User({name ,email,phone,password});

                await user.save();

                res.status(201).json(
                    {message:"User registered successfully"})
                }

            } catch (error) {
                // console.log(error);
                res.status(500).json({error:"Server**Internal server error"})
            }
        },
        async signin(req,res){
            try {
                const {email,password}=req.body;
        
                if(!email || !password){
                    // console.log("invalid dta match")
                    return res.status(400).json({error:"Please fill the data"})
                }
        
                const userLogin= await User.findOne({email:email});
        
                if(userLogin && userLogin.role==='customer'){
                    const isMatch = await bcrypt.compare(password,userLogin.password)
        
                    // creating jwt token 
                    const token = await userLogin.generateAuthToken();
                    
                    res.cookie("jwtToken",token,{
                        expires:new Date(Date.now()+(1000*60*60)),//1 hour
                        httpOnly:true
                    })
        
                    if(!isMatch){
                        return res.status(401).json({error:"Server**Invalid Credentials"})
                    }else{
                        return res.status(200).json({token:token,user:userLogin,message:'Login Successfull'})
                    }
                }
                else{
                   return res.status(401).json({error:"Server**Invalid Credentials"})
                }
        
            } catch (error) {
                // res.status(500).json({ message: "Internal Server Error", error: error })
                res.status(500).json({error:"Server**Internal Server Error" })
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