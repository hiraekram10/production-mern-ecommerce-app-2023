import express from "express";
import { createProductController, deleteProductController, getProductController, getSingleProductController, productPhotoController, updateProductController } from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middleWares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController)

router.get('/get-product',getProductController)


//  single product
router.get('/get-product/:slug',getSingleProductController)


//  for photo rote 

router.get('/product-photo/:pid',productPhotoController)

// for delete product
router.delete('/product/:pid',deleteProductController)

// for updating

router.put(
    "/update-product/:pid",
    requireSignIn,
    isAdmin,
    formidable(),
   updateProductController
  );


export default router;