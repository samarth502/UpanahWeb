// import React from 'react';

const fetchCategoryWiseProduct = async (category) => {
    const response = await fetch(`http://localhost:8080/products?category=${category}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const dataResponse = await response.json();

    return dataResponse;
};

export default fetchCategoryWiseProduct;
