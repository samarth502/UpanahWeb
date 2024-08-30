import apiConfig from "./apiConfig";

const ProductsServices = {
  getProducts: async (filters = {}) => {
    try {
      // Construct the query string based on the filters object
      const queryString = new URLSearchParams(filters).toString();
      const url = `${apiConfig.baseUrl}products${queryString ? `?${queryString}` : ''}`;

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
};

export default ProductsServices;
