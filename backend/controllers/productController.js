import Product from "../models/productModel.js";

/* export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}; */

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, category, countInStock } =
      req.body;
    const product = new Product({
      name,
      description,
      price,
      image,
      category,
      countInStock,
      user: req.user._id, // Assuming req.user is set after authentication
    });
    const createdProduct = await product.save();
    return res.status(201).json({ message: "Product created", createdProduct });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, price, image, category, countInStock } =
      req.body;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.image = image || product.image;
    product.category = category || product.category;
    product.countInStock = countInStock || product.countInStock;
    const updatedProduct = await product.save();
    return res.status(200).json({ message: "Product updated", updatedProduct });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.remove();
    return res.status(200).json({ message: "Product removed" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const keyword = req.query.search || "";
    const category = req.query.category || "";
    const minPrice = Number(req.query.minPrice) || 0;
    const maxPrice = Number(req.query.maxPrice) || Infinity;
    const inStock = req.query.inStock === "true";
    const sortField = req.query.sort || "createdAt";
    const sortOrder = req.query.order === "asc" ? 1 : -1;
    const minRating = Number(req.query.minRating) || 0;

    // Build the filter object
    const filter = {
      $and: [
        {
          $or: [
            { name: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
          ],
        },
        { price: { $gte: minPrice, $lte: maxPrice } },
        { rating: { $gte: minRating } },
      ],
    };

    if (category) {
      filter.$and.push({ category });
    }
    if (inStock) {
      filter.$and.push({ countInStock: { $gt: 0 } });
    }

    const totalProducts = await Product.countDocuments(filter);

    let products = [];

    if (!keyword) {
      // 👉 If NO keyword ➔ RANDOM fetch
      products = await Product.aggregate([
        { $match: filter.$and.length ? { $and: filter.$and } : {} },
        { $sample: { size: limit } },
      ]);
    } else {
      // 👉 If there is a keyword ➔ NORMAL search and sort
      products = await Product.find(filter)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ [sortField]: sortOrder });
    }

    return res.json({
      products,
      page,
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
