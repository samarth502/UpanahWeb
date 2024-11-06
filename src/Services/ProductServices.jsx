import apiConfig from "./apiConfig";

const ProductsServices = {
  getProducts: async () => {
    try {
      const url = `${apiConfig.baseUrl}products`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch products.");
      }

      const products = await response.json();
      return products;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },

  // POST method to add a new product
  addProduct: async (product) => {
    try {
      const url = `${apiConfig.baseUrl}products`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product), // Send the product data in the request body
      });

      if (!response.ok) {
        throw new Error("Failed to add product.");
      }

      const newProduct = await response.json();
      return newProduct;
    } catch (error) {
      console.error("Error adding product:", error);
    }
  },
};

export default ProductsServices;
