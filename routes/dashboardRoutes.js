import express from 'express'

const dashboardRouter = express.Router();

dashboardRouter.get('/', (req,res) => {
    res.render('dashboard.ejs')
})

export default dashboardRouter;