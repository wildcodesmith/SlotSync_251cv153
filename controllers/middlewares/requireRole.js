//middleware to check the role of the user and serve the features as per the role
//Authorizes access based on role
const requiredRole = (requiredRole) => {
    return( req, res, next) => {
        if(req.user.userRole !== requiredRole){
            return res.status(403).json({
                 message: "Access forbidden"
            })
        }
        next();
    }
}
export default requiredRole;