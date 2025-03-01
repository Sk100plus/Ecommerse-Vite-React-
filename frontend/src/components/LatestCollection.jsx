import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
    const { products = [] } = useContext(ShopContext);  // Ensure `products` is at least an empty array
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            setLatestProducts(products.slice(0, 10));
        }
    }, [products]);  // Added `products` as a dependency

    return (
        <div className='my-10'>
            <div className="text-center py-8 text-3xl">
                <Title text1={'LATEST'} text2={'COLLECTIONS'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat, ab? Ratione mollitia asperiores quasi optio ipsam. Consequuntur quibusdam quia fuga beatae, voluptatibus fugiat doloremque iste. Eaque nulla ad qui dolor.
                </p>
            </div>
            {/* Rendering products */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {
                    latestProducts.map((item) => (
                        <ProductItem key={item._id} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))
                }
            </div>
        </div>
    );
}

export default LatestCollection;
