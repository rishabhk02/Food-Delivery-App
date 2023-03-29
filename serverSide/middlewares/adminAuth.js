function adminAuth(req,res,next){
    if(req.isAuthenticated() && req.user.role==='Admin'){
        
        return next();
    }
    // console.log(req.user.role);
    return res.redirect('/');
}

module.exports = adminAuth;