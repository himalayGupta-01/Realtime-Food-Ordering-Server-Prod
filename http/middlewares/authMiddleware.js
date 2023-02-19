const jwt=require('jsonwebtoken');

exports.requireSignin=(req,res,next)=>{
    // console.log("Header is ",req.headers.authorization)

    if(req.headers.authorization){
        
        const token=req.headers.authorization.split(" ")[1]; 
        const user=jwt.verify(token,process.env.SECRET_KEY);
        req.user=user;
    }
    else{
        return res.status(500).json({message:'Authorization required'})
    }
    next();
};


exports.userMiddleware=(req,res,next)=>{
    if(req.user.role!=='customer'){
        return res.status(400).json({message:'User Access Denied'})
    }
    next();
}


exports.adminMiddleware=(req,res,next)=>{
    if(req.user.role!=='admin'){
        return res.status(400).json({message:'Admin Access Denied'})
    }
    next();
}
