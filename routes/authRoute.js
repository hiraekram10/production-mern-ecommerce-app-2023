import express from 'express'
import {registerController ,loginController, testController,}from '../controllers/registerController.js'
import { isAdmin, requireSignIn } from '../middleWares/authMiddleware.js';
//router object

const router=express.Router();
// register method post
router.post('/register',registerController);

//login post

router.post('/login',loginController)

//test route dummy    //MIDDLEWARES 2
router.get('/test',requireSignIn ,isAdmin,testController)


//protected route for user 
router.get('/user-auth',requireSignIn,(req,res)=>{
 res.status(200).send({ok:true})
})

//admin route
router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true})
   })

export default router;