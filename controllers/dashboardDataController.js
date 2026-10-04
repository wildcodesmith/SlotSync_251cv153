//handles the api request fired by dashboard page to fetch the dashboard data as per role

//bcrypt
import 'dotenv/config';

export const dashboardDataFetchingFunc = async (req, res) => {
    try {
        
        const userFetched = await Account.findById(req.user.userId)

        if(!userFetched){ //if user is not found throw error
            return res.status(404).json({
                message : "User not found"
            })
        }

        //redirect to user's dashboard
        res.json({message : 'success' , redirect : `/${userFetched.userRole}Dashboard`})

    } catch (error) { //error handling
        console.log("Dashboard data error:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
    
}