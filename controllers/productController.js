const { Product } = require("../models");
const { v2: cloudinary } = require("cloudinary");
const { CLOUD_NAME, API_KEY_CLOUDINARY, API_SECRET_CLOUDINARY } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME  ,
  api_key: API_KEY_CLOUDINARY,
  api_secret: API_SECRET_CLOUDINARY,
});

class Controllers {
  static async fetchProducts(req, res, next) {
    try {
      let prod = await Product.findAll();
      prod.map((el) => {
        el.price = new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(el.price);

        return el;
      });
    
      res.status(200).json(prod);
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

  static async addProducts(req, res, next) {
    try {
      const { name, description, price, stock, imgUrl, categoryId } = req.body;
      const addProd = await Product.create({
        name,
        description,
        price,
        stock,
        imgUrl,
        categoryId,
        authorId: req.user.id,
      });
      res.status(201).json(addProd);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async productById(req, res, next) {
    try {
      const { id } = req.params;
      let findProduct = await Product.findByPk(id);
      findProduct.price = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(findProduct.price);

      res.status(200).json(findProduct);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async editProduct(req, res, next) {
    try {
      const { name, description, price, stock, categoryId } = req.body;
      const { id } = req.params;
      const prod = await Product.findByPk(id);
      if (!prod) throw { name: "product not found" };
      else {
        const update = await prod.update({
          name: name,
          description: description,
          price: price,
          stock: stock,
          categoryId: categoryId,
        });
        res.status(201).json(update);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async patchImage(req, res, next) {
    try {
      const {id} = req.params
      const productId = await Product.findByPk(id)
      if(!productId) throw {name: "product not found"}

      const stringBuffer = req.file.buffer.toString("base64");
      const uploadData = `data:${req.file.mimetype};base64,${stringBuffer}`
      const uploadFile = await cloudinary.uploader.upload(uploadData, {
        public_id: req.file.originalname,
        folder: "uniolo-project",
        resource_type: "auto"
      })
      await productId.update({imgUrl: uploadFile.secure_url})
      res.status(201).json({message: `image of ${productId.name} has been updated`})

    } catch (error) {
      console.log(error);
      next(error)
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const {id} = req.params
      const del = await Product.destroy({where: {id}})

      if(!del) throw {name: "product not found"}
      else res.status(201).json({message: `${id} success to delete`})

    } catch (error) {
      console.log(error);
      next(error)
    }
  }

}

module.exports = Controllers;
