const { User } = require("../models");
const { Product } = require("../models");

async function admin(req, res, next) {
  try {
    const user = req.user;
    if (user.role !== "admin") throw { name: "forbidden" };
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function authorization(req, res, next) {
  try {
    const { id } = req.params;
    const user = req.user;
    const findProduct = Product.findByPk(id);
    if (!findProduct) throw { name: "product not found" };

    if (user.role !== "admin" && user.id !== findProduct.authorId)
      throw { name: "forbidden" };
    next();
  } catch (error) {
    console.log(error);
    next(error)
  }
}

module.exports = { admin, authorization };
