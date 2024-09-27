// src/services/userService.js

import { toast } from "react-toastify";
import apiConfig from "./apiConfig";

const userService = {
  getUsers: async (email, password) => {
    console.log("Provided credentials:", email, password); // Log email and password for debugging
    try {
      const response = await fetch(`${apiConfig.baseUrl}users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users.");
      }

      const users = await response.json();
      console.log("Fetched users:", users); // Log fetched users for debugging

      const user = users.find(
        (u) => u.email === email && u.password === password
      );
      console.log("User found:", user); // Log the found user for debugging

      return user;
    } catch (error) {
      console.error("Login error:", error); // Log error for debugging
      toast.error(error.message || "Failed to login.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      throw error; // Rethrow error to be handled by calling function
    }
  },

  createUser: async (user) => {
    console.log(user);
    console.log(apiConfig.baseUrl);

    const response = await fetch(`${apiConfig.baseUrl}users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    
    const data = await response.json();
    return data;
  },

 
};

export default userService;
