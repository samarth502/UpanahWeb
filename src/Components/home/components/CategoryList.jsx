import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductsServices from '../../../Services/ProductServices';

const CategoryList = () => {
    const [categoryProduct, setCategoryProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    const categoryLoading = new Array(13).fill(null);

    const fetchCategoryProduct = async () => {
        setLoading(true);
        const productsss = await ProductsServices.getProducts();
        setLoading(false);
        setCategoryProduct(productsss);
        console.log('myProducts', productsss);
    };

    useEffect(() => {
        fetchCategoryProduct();
    }, []);

    return (
        <div className="container mx-auto p-4 px-20">
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
                              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center">
                                  <img
                                      src={product?.images}
                                      alt={product?.category}
                                      className="h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all"
                                  />
                              </div>
                              <p className="text-center text-sm md:text-base capitalize">{product?.category}</p>
                          </Link>
                      ))}
            </div>
        </div>
    );
};

export default CategoryList;