import Account from "../models/account.js"

export const fetchStudentAccountInfo  = async (req,res) => {
     
    try {
        let userData = await Account.findById(req.user.userId)
       
        let userInfo = {
            userName : userData.userName,
            userEmail : userData.userEmail,
            userBranch : userData.userBranch,
            userRole : userData.userRole
        }

       return res.status(200).json(userInfo)

    } catch (error) {
        console.log(error)
        res.status(500).json({message : "Internal server error"})
    }
 
}