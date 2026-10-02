 
export const fetchAdminDashboardInfoController  = async (req,res) => {
     
    // try {
    //     let userData = await AdminDashboard.findById(req.user.userId)
    //     console.log(userData.userEmail)
    //     let userInfo = {
    //         userName : userData.userName,
    //         userEmail : userData.userEmail,
    //         userBranch : userData.userBranch,
    //         userRole : userData.userRole
    //     }

    //    return res.status(200).json(userInfo)

    // } catch (error) {
    //     console.log(error)
    //     res.status(500).json({message : "Internal server error"})
    // }

    res.status(200).json({message : 'dashboard work in progress....'})
}