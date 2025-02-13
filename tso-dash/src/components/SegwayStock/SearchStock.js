'use client'
import React, { useState } from 'react';
import segwayStockData from './SegwayStock';
import getStockData from './GetStock';

const SearchStock = () => {
    const [query, setQuery] = useState('');

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const filterResults = (query) => {
        console.log('Query:', query);
        console.log('Segway Stock Data:', segwayStockData);
        console.log('Get Stock Data:', getStockData);

        const segwayStockArray = Array.isArray(segwayStockData) ? segwayStockData : [segwayStockData];
        const getStockArray = Array.isArray(getStockData) ? getStockData : [getStockData];

        const segwayStockResults = segwayStockArray.filter(stock => stock.name.toLowerCase().includes(query.toLowerCase()));
        const getStockResults = getStockArray.filter(stock => stock.name.toLowerCase().includes(query.toLowerCase()));
        
        console.log('Segway Stock Results:', segwayStockResults);
        console.log('Get Stock Results:', getStockResults);

        return [...segwayStockResults, ...getStockResults];
    };
    
    const handleSearch = () => {
        const results = filterResults(query);
        console.log('Search results:', results);
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search stock..."
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchStock;