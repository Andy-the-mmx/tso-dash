'use client'
import React, { useState, useEffect } from 'react';
import TopBar from '@/components/Dashboard/TopBar';
import Sidebar from '../Sidebar/Sidebar';
import getAllProducts from './GetStock';
import SearchStock from './SearchStock';


const SegwayStock = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
      const fetchProducts = async () => {
        const products = await getAllProducts();
        setProducts(products);
      };
  
      fetchProducts();
    }, []);

  return (
    <div className='container p-4 mx-auto'>
        <h1 className="mb-4 text-2xl font-bold">Segway Stock</h1>
        <SearchStock />
        <div className="flex flex-wrap gap-4">
          {products.map((product) => ( 
            <div key={product.node.id} className="w-1/3 p-4 border rounded-lg md:w-1/4 lg:w-1/5">
            <h2 className="mb-2 text-lg font-medium">{product.node.title}</h2>
            <p className="text-gray-600">
                {product.node.variants.edges[0].node.quantityAvailable > 0 ? (
                    <p>Stock: <span className='text-green-600'>{product.node.variants.edges[0].node.quantityAvailable}</span></p>
                    ) : (
                    <p className='text-red-500'>Out of Stock</p>
                    )}
              <img className='w-1/2' src={product.node.images.edges[0].node.originalSrc} alt={product.node.images.edges[0].node.altText} /> 
            </p>
            </div>
          ))}
    </div>
    </div>
  )
}

export default SegwayStock
