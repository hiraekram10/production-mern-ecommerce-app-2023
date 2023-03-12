import express from "express";
import {
    categoryController,
    createCategoryController,
    updateCategoryController,
    singleCategoryController,
    deleteCategoryController
} from "../controllers/categoryController.js";
import { isAdmin, requireSignIn } from "../middleWares/authMiddleware.js";

const router = express.Router()


//<><><><>>><><><><><>><<> CREATE CATEGORY
router.post('/create-category', requireSignIn, isAdmin, createCategoryController)


//><><><><><>><><><>>><>> UPDATE cATEGORY

router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController)

// <><>><><<<<<<<<<<<<<<<<<><<><><><<>><>
// ><><><><>>>>> GET ALL
router.get('/get-category', categoryController)



// <><>><><<<<<<<<<<<<<<<<<><<><><><<>><>
// ><><><><>>>>> single cat
router.get('/single-category/:slug', singleCategoryController)


// <><>><><<<<<<<<<<<<<<<<<><<><><><<>><>
// ><><><><>>>>> Delete PRODUCT

router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController)

export default router;