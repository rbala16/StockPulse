const cron = require("node-cron");
const Product = require("../models/product");
const Reorder = require("../models/reOrder");
const mongooseConnectionFile = require("../db/mongoose");
// Schedule the job to run every hour
cron.schedule("* * * * *", async () => {
  try {
    console.log(
      "Cron job running to check for products below reorderThreshold..."
    );

    // Find products that need reordering
    const productsToReorder = await Product.find({
      $expr: {
        $lt: ['$quantity', '$reorderThreshold'],
      },
      reorderInProgress: false,
    });

    if (productsToReorder.length === 0) {
        console.log("No products below reorderThreshold at this time.");
    }
     else {
        console.log(`Found ${productsToReorder.length} products to reorder.`);
    }

    for (const product of productsToReorder) {
      console.log(`Initiating reorder for product: ${product.name}`);

      // Calculate reorder quantity
      const reorderQuantity = calculateReorderQuantity(product);

      // Create a new reorder document
      const reorder = await Reorder.create({
        productId: product._id,
        productName: product.name,
        SKU: product.SKU,
        quantityOrdered: reorderQuantity,
        supplier: product.supplier,
      });

      // await Reorder.save();

      // Update the product to mark reorderInProgress as true
      product.reorderInProgress = true;
      await product.save();

      console.log(
        `Reorder initiated for ${product.name}, quantity: ${reorderQuantity}`
      );
    }
  } catch (error) {
    console.error("Error in cron job:", error);
  }
});

// Function to calculate reorder quantity (restock up to a certain level)
function calculateReorderQuantity(product) {
  const maxStock = 100; // Maximum stock level after reorder
  return maxStock - product.quantity; // Order enough to reach max stock
}
