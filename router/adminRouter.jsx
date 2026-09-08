const express = require("express")

const {addProductController,listProductController,deleteProductController,updateProductController} = require("../controller/adminController.jsx")

const upload = require("../middleware/upload.jsx")

const router = express.Router()

router.post("/addProduct",upload.single("image"),addProductController)
router.get("/listProducts",listProductController)
router.delete("/deleteProduct/:id",deleteProductController)
router.put("/updateProduct/:id",updateProductController)

module.exports = router;