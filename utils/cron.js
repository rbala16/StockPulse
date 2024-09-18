const cron = require("node-cron");
const Product = require("../models/product");
const ReOrder = require("../models/reOrder");

// Run every day at midnight
cron.schedule("0 0 * * *", async () => {
  try {
    const lowStockProducts = await Product.find({
      stock: { $lt: this.reorderThreshold },
      reorderInProgress: false,
    });

    for (let product of lowStockProducts) {
      // Initiate reorder for each product
      await Reorder.create({
        productId: product._id,
        quantity: calculateReorderQuantity(product),
      });

      // Set reorderInProgress to true to avoid duplicate reorders
      product.reorderInProgress = true;
      await product.save();

      console.log(`Reorder initiated for product ${product.name}`);
    }
  } catch (error) {
    console.error("Error during stock check: ", error);
  }
});
