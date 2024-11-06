import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductsServices from '../../../Services/ProductServices';

const CategoryList = () => {
    const [categoryProduct, setCategoryProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    const categoryLoading = new Array(13).fill(null);
    // console.log(categoryProduct,"kkkkkkkkkkkmmmmmmmmm")

    const fetchCategoryProduct = async () => {
        setLoading(true);
        const products = await ProductsServices.getProducts();

        // Get unique categories and only one product per category
        const productByCategory = [];
        const seenCategories = new Set();

        // Iterate through products and select the first one per category
        for (const product of products) {
            if (!seenCategories.has(product.category)) {
                productByCategory.push(product);
                seenCategories.add(product.category);
            }
        }

        setLoading(false);
        setCategoryProduct(productByCategory); // Store unique category products
    };

    useEffect(() => {
        fetchCategoryProduct();
    }, []);

    return (
        <div className="p-4 md:px-20 px-5">
            <div className="flex items-center gap-4 justify-between overflow-scroll scrollbar-none">
                {loading
                    ? categoryLoading.map((el, index) => (
                          <div
                              className="h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse"
                              key={'categoryLoading' + index}
                          ></div>
                      ))
                    : categoryProduct.map((product, index) => ( 
                          <Link
                              to={'/product-category?category=' + product?.category}
                              className="cursor-pointer"
                              key={index}
                          >
                              <div className="w-20 h-20 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center">
                                  <img
                                      src={product?.thumbnail}
                                      alt={product?.category}
                                      className="h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all"
                                  />
                              </div>
                              <p className="text-center text-sm md:text-base capitalize">{product?.category}</p>
                              {/* <p>{product.images[0]}</p> */}
                          </Link>
                      ))}
            </div>
        </div>  
    );
};

export default CategoryList;
