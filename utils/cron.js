const cron = require("node-cron");
const Product = require("./models/Product");
const Reorder = require("./models/Reorder");

// Schedule the job to run every hour
cron.schedule('0 * * * *', async () => {
  try {
    console.log(
      "Cron job running to check for products below reorderThreshold..."
    );

    // Find products that need reordering
    const productsToReorder = await Product.find({
      quantity: { $lt: "reorderThreshold" }, // Below threshold
      reorderInProgress: false, // No reorder in progress
    });

    for (let product of productsToReorder) {
      console.log(`Initiating reorder for product: ${product.name}`);

      // Calculate reorder quantity 
      const reorderQuantity = calculateReorderQuantity(product);

      // Create a new reorder document
      await Reorder.create({
        productId: product._id,
        quantity: reorderQuantity,
      });

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
