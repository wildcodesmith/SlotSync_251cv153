// Middleware to authorize Faculty and Convenor users

const requireStudentRole = (req, res, next) => {

    const allowedRoles = ["student"];

    if (!allowedRoles.includes(req.user.userRole)) {
        return res.render("unauthorizedPage.ejs");
    }

    next();
};

export default requireStudentRole;