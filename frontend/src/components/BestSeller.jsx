import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem.jsx';

const BestSeller = () => {
    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        // Filter products where `bestseller` is true
        const bestProduct = products.filter((item) => item.bestSeller === true);
        setBestSeller(bestProduct.slice(0, 5)); // Limit to 5 items
    }, [products]);

    return (
        <div className='my-10'>
            <div className="text-center text-3xl py-8">
                <Title text1="BEST" text2="SELLERS" />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Discover our top-selling products loved by our customers.
                </p>   
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {bestSeller.map((item) => (
                    <ProductItem key={item._id} id={item._id} image={item.image} name={item.name} price={item.price} />
                ))}
            </div>
        </div>
    );
};

export default BestSeller;
