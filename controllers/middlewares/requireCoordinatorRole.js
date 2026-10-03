// Middleware to authorize Faculty and Convenor users

const requireCoordinatorRole = (req, res, next) => {

    const allowedRoles = ["faculty", "convenor"];

    if (!allowedRoles.includes(req.user.userRole)) {
        return res.render("unauthorizedPage.ejs");
    }

    next();
};

export default requireCoordinatorRole;