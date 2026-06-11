const mongoose = require('mongoose');
require('dotenv').config();
const Category = require('./models/Category');
const Product = require('./models/Product');

const categories = [
  { customId: "cakes-desserts", name: "Cakes & Desserts", image: "/images/Cakes-Desserts.webp", order: 1 },
  { customId: "cold-beverages", name: "Cold Beverages", image: "/images/Cold-Beverages.webp", order: 2 },
  { customId: "hot-beverages", name: "Hot Beverages", image: "/images/Hot-Beverages.webp", order: 3 },
  { customId: "croissant-sandwiches", name: "Croissant Sandwiches", image: "/images/Croissant-Sandwiches.webp", order: 4 },
  { customId: "health-menu", name: "Health Menu", image: "/images/Health-Menu.webp", order: 5 },
  { customId: "popsicles", name: "Popsicles", image: "/images/Popsicles.webp", order: 6 },
  { customId: "teas", name: "Teas", image: "/images/Teas.webp", order: 7 },
  { customId: "toasts", name: "Toasts", image: "/images/Toasts.webp", order: 8 },
];

const productsData = {
  "cakes-desserts": [
    { name: "Almond Chocolate Cookie", price: "$2.50", image: "/images/Almond-Chocolate-Cookie.webp" },
    { name: "Cinnamon Roll", price: "$2.20", image: "/images/Cinnamon-Roll.webp" },
    { name: "Creme Brulee Dessert", price: "$3.80", image: "/images/Creme-Brulee-Dessert.webp" },
    { name: "Dark Chocolate Cookie", price: "$2.50", image: "/images/Dark-Chocolate-Cookie.webp" },
    { name: "Pain Au Chocolat", price: "$2.70", image: "/images/Pain-Au-Chocolat.webp" },
    { name: "San Sebastian Cheesecake", price: "$4.20", image: "/images/San-Sebastian-Cheesecake.webp" },
    { name: "Three Milk Cake", price: "$3.50", image: "/images/Three-Milk-Cake.webp" },
    { name: "Tiramisu", price: "$4.00", image: "/images/Tiramisu.webp" },
  ],
  "cold-beverages": [
    { name: "Cappachillo", price: "$2.90", image: "/images/Cappachillo.webp" },
    { name: "Fruit Chillo", price: "$3.30", image: "/images/Fruit-Chillo.webp" },
    { name: "Iced Americano", price: "$2.20", image: "/images/Iced-Americano.webp" },
    { name: "Iced Caramel Macchiato", price: "$3.10", image: "/images/Iced-Caramel-Macchiato.webp" },
    { name: "Iced Latte", price: "$2.90", image: "/images/Iced-Latte.webp" },
    { name: "Iced Mocha", price: "$3.10", image: "/images/Iced-Mocha.webp" },
    { name: "Masala Chillo", price: "$2.90", image: "/images/Masala-Chillo.webp" },
    { name: "Persian Chillo", price: "$2.90", image: "/images/Persian-Chillo.webp" },
  ],
  "hot-beverages": [
    { name: "Americano", price: "$2.00", image: "/images/Americano.webp" },
    { name: "Cappuccino", price: "$2.60", image: "/images/Cappuccino.webp" },
    { name: "Caramel Macchiato", price: "$3.20", image: "/images/Caramel-Macchiato.webp" },
    { name: "Cortado", price: "$2.30", image: "/images/Cortado.webp" },
    { name: "Espresso", price: "$1.80", image: "/images/Espresso.webp" },
    { name: "Espresso Macchiato", price: "$2.10", image: "/images/Espresso-Macchiato.webp" },
    { name: "Latte", price: "$2.90", image: "/images/Latte.webp" },
    { name: "Persian Latte", price: "$2.90", image: "/images/Persian-Latte.webp" },
  ],
  "croissant-sandwiches": [
    { name: "Avocado With Chili Croissant", price: "$4.50", image: "/images/Avocado-With-Chili-Croissant.webp" },
    { name: "Cheese & Jam Croissants", price: "$3.50", image: "/images/Cheese-Jam-Croissants.webp" },
    { name: "Chocolate Banana Croissant", price: "$3.80", image: "/images/Chocolate-Banana-Croissant.webp" },
    { name: "Peanut Butter & Banana Croissant", price: "$3.90", image: "/images/Peanut-Butter-Banana-Croissant.webp" },
    { name: "Peanut Butter & Jam Croissants", price: "$3.80", image: "/images/Peanut-Butter-Jam-Croissants.webp" },
    { name: "Pesto Croissant", price: "$4.20", image: "/images/Pesto-Croissant.webp" },
    { name: "Turkey & Mustard Croissant", price: "$4.50", image: "/images/Turkey-Mustard-Croissant.webp" },
    { name: "Walnut Cheese Croissant", price: "$4.00", image: "/images/Walnut-Cheese-Croissant.webp" },
  ],
  "health-menu": [
    { name: "Avocado Cocoa Smoothie", price: "$3.90", image: "/images/Avocado-Cocoa-Smoothie.webp" },
    { name: "Avocado Smoothie", price: "$3.50", image: "/images/Avocado-Smoothie.webp" },
    { name: "Blue Spirulina Bowl", price: "$4.20", image: "/images/Blue-Spirulina-Bowl.webp" },
    { name: "Green Super Matcha Bowl", price: "$4.50", image: "/images/Green-Super-Matcha-Bowl.webp" },
    { name: "Moringa Protein Shake", price: "$4.00", image: "/images/Moringa-Protein-Shake.webp" },
    { name: "Peanut Butter Chocolate Protein Shake", price: "$4.50", image: "/images/Peanut-Butter-Chocolate-Protein-Shake.webp" },
    { name: "Protein Coffee", price: "$3.80", image: "/images/Protein-Coffee.webp" },
    { name: "Vegan Bulletproof Coffee", price: "$4.20", image: "/images/Vegan-Bulletproof-Coffee.webp" },
  ],
  "popsicles": [
    { name: "Cherry Popsicle", price: "$1.70", image: "/images/Cherry-Popsicle.webp" },
    { name: "Chocolate Icecream", price: "$2.00", image: "/images/Chocolate-Icecream.webp" },
    { name: "Coffee Popsicle", price: "$1.70", image: "/images/Coffee-Popsicle.webp" },
    { name: "Lime Popsicle", price: "$1.50", image: "/images/Lime-Popsicle.webp" },
    { name: "Masala Icecream", price: "$2.10", image: "/images/Masala-Icecream.webp" },
    { name: "Matcha Icecream", price: "$2.30", image: "/images/Matcha-Icecream.webp" },
    { name: "Peanut Butter Protein Ice Cream", price: "$2.60", image: "/images/Peanut-Butter-Protein-Ice-Cream.webp" },
    { name: "Persian Icecream", price: "$2.10", image: "/images/Persian-Icecream.webp" },
  ],
  "teas": [
    { name: "Black Iced Tea", price: "$1.70", image: "/images/Black-Iced-Tea.webp" },
    { name: "Black Tea", price: "$1.40", image: "/images/Black-Tea.webp" },
    { name: "Borage", price: "$1.50", image: "/images/Borage.webp" },
    { name: "Chamomile Tea", price: "$1.70", image: "/images/Chamomile-Tea.webp" },
    { name: "Green Iced Tea", price: "$1.70", image: "/images/Green-Iced-Tea.webp" },
    { name: "Green Tea", price: "$1.40", image: "/images/Green-Tea.webp" },
    { name: "Mint Tea", price: "$1.50", image: "/images/Mint-Tea.webp" },
    { name: "Strawberry Black Iced Tea", price: "$2.00", image: "/images/Strawberry-Black-Iced-Tea.webp" },
  ],
  "toasts": [
    { name: "Avocado Toast With Balsamic", price: "$4.20", image: "/images/Avocado-Toast-With-Balsamic.webp" },
    { name: "Banana & Chocolate Toast", price: "$3.50", image: "/images/Banana-Chocolate-Toast.webp" },
    { name: "French Toast", price: "$3.30", image: "/images/French-Toast.webp" },
    { name: "Peanut Butter & Banana Toast", price: "$3.50", image: "/images/Peanut-Butter-Banana-Toast.webp" },
    { name: "Pesto Toast", price: "$3.80", image: "/images/Pesto-Toast.webp" },
    { name: "Toast With Cheese And Jam", price: "$2.90", image: "/images/Toast-With-Cheese-And-Jam.webp" },
    { name: "Toast With Cheese And Walnut", price: "$3.30", image: "/images/Toast-With-Cheese-And-Walnut.webp" },
    { name: "Turkey & Mustard Toast", price: "$4.20", image: "/images/Turkey-Mustard-Toast.webp" },
  ],
};

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('🗑️ Old data cleared');

    const insertedCategories = await Category.insertMany(categories);
    console.log(`📁 ${insertedCategories.length} categories inserted`);

    const categoryMap = {};
    insertedCategories.forEach(cat => {
      categoryMap[cat.customId] = cat._id;
    });

    let totalProducts = 0;
    for (const [catId, products] of Object.entries(productsData)) {
      const categoryId = categoryMap[catId];
      if (categoryId && products.length > 0) {
        const productsWithCategory = products.map(p => ({ ...p, categoryId }));
        await Product.insertMany(productsWithCategory);
        totalProducts += products.length;
        console.log(`  ✅ Added ${products.length} products to ${catId}`);
      } else {
        console.log(`  ⚠️ No products for ${catId}`);
      }
    }
    console.log(`📦 ${totalProducts} products inserted`);
    console.log('✅ Seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();