'use client'
import React, { useState, useEffect } from 'react';
import TopBar from '@/components/Dashboard/TopBar';
import Sidebar from '../Sidebar/Sidebar';
import { motion } from 'framer-motion';
import { useAnimate, AnimatePresence } from 'motion/react';
import { FiTrash2 } from 'react-icons/fi';
import RenderPDF from './RenderPDF';
import Ponumber from './Ponumber';
import Vendor from './Vendor';



// Define handleSubmit outside Pobuilder
async function handleSubmit(e) {
  e.preventDefault();
  console.log('submitted form');
} 

const getDate = () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${date}/${month}/${year}`;
}

const Pobuilder = () => {
  const [productsData, setProductsData] = useState(null); // State for products
  const [locationsData, setLocationsData] = useState(null); // State for locations
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSKU, setSelectedSKU] = useState(null);
  const [qty, setQty] = useState(1); // Add state for quantity
  const [currentDate, setCurrentDate] = useState(getDate());
  const [selectedVendor, setSelectedVendor] = useState('');
  const [poNumber, setPoNumber] = useState('');

  

  const [rows, setRows] = useState([
    { 
      sku: null, 
      qty: 1, 
      description: '', 
      price: 0, 
      total: 0,
      state: '',
      address: ''
    }
  ]);

  useEffect(() => {
    setIsLoading(true);
    fetch('products.json')
      .then(response => response.json())
      .then(data => {
        setProductsData(data);
        console.log(data)
      })
      .catch(error => console.error('Error fetching data:', error))
      .finally(() => setIsLoading(false));

  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetch('locations.json')
    .then(response => response.json())
    .then(data => {
      setLocationsData(data);
      console.log(data)
    })
    .catch(error => console.error('Error getong locations:', error))
    .finally(() => setIsLoading(false));
  }, []);

  const handleStateChange = (e, rowIndex) => {
    const updatedRows = [...rows];
    const state = e.target.value;
    updatedRows[rowIndex].state = state;

    // Find the address based on the selected state
    const location = locationsData.locations.find(loc => loc.state === state);
    if (location) {
      updatedRows[rowIndex].address = location.address;
    } else {
      updatedRows[rowIndex].address = ''; // Clear address if no match
    }

    setRows(updatedRows);
  };

  const handleSKUChange = (e, rowIndex) => {
    setRows(prevRows => { 
      const updatedRows = [...prevRows];
      const selectedSKU = e.target.value;
      updatedRows[rowIndex].sku = selectedSKU;
  
      const selectedItem = productsData.products.find(product => product.SKU === selectedSKU);
      if (selectedItem) {
        updatedRows[rowIndex].description = selectedItem.Description;
        updatedRows[rowIndex].price = selectedItem.PriceEx;
        // Calculate total for the updated row:
        updatedRows[rowIndex].total = selectedItem.PriceEx * updatedRows[rowIndex].qty; 
      }
  
      return updatedRows;
    });
  };

  const handleQtyChange = (e, rowIndex) => {
    const updatedRows = [...rows];
    const newQty = parseInt(e.target.value, 10) || 0;
    updatedRows[rowIndex].qty = newQty;
    updatedRows[rowIndex].total = updatedRows[rowIndex].price * newQty;
    setRows(updatedRows);
  };

  const addNewRow = () => {
    setRows([
      ...rows,
      { 
        sku: null, 
        qty: 1, 
        description: '', 
        price: 0, 
        total: 0 
      }
    ]);
  };

  

  const handleRemoveRow = (rowIndex, scope) => {
    setRows(prevRows => {
      const updatedRows = [...prevRows];
      updatedRows.splice(rowIndex, 1); // Remove 1 row at rowIndex
      return updatedRows;
    });
  };
  
  const [scope, animate] = useAnimate();
  const removeElement = () => {
    animate(
      div,
      {
        opacity: 0,
      },
      {
        ease: "easeIn",
        duration: 0.125,
      }
    );
  }

  const GST = 0.10;
  const exGST = () => {
    return rows.reduce((acc, row) => acc + row.total, 0);
  };
  const taxAmount = () => {
    return rows.reduce((acc, row) => acc + row.total / GST * 0.01, 0);
  };
  const calculateGrandTotal = () => {
    return rows.reduce((acc, row) => acc + row.total + row.total * GST, 0);
  };
  const Notax = exGST();
  const tax = taxAmount();
  const grandTotal = calculateGrandTotal();

  return (
  <main className="">
      <div className='w-full px-2 py-5 mb-4 text-white bg-red-500'>
        <div className="grid grid-cols-2 py-2 place-content-between">
          <div className="grid vendor">
            <Vendor onVendorSelect={setSelectedVendor} />
          </div>
          <div className="grid poNum justify-items-end">
            <Ponumber onPoNumberGenerate={setPoNumber} />
            <div className="POdate">Todays date: {currentDate}</div>
          </div>
        </div>
      </div>
          <div className='w-full px-2 text-stone-500'>
            <div className='inline-grid justify-center w-full grid-cols-8 gap-1 py-2 text-sm text-white border-2 headers border-slate-500 bg-slate-700 auto-cols-fr'>
              <div className="px-2 border-r-2 border-slate-500 sku">SKU</div>
              <div className="px-2 border-r-2 border-slate-500 desc">Description</div>
              <div className="px-2 border-r-2 border-slate-500 state">State</div>
              <div className="px-2 border-r-2 border-slate-500 delad">Delivery Address</div>
              <div className="px-2 border-r-2 border-slate-500 qty">QTY</div>
              <div className="px-2 border-r-2 border-slate-500 uprice">Unit Price</div>
              <div className="total">Total</div>
              <div className="addNew">Add New row</div>
            </div>
            {rows.map((row, rowIndex) => (
                <motion.div
                ref={scope}
                key={rowIndex} 
                initial={'opacity: 1'}
                className='inline-grid justify-center w-full grid-cols-8 gap-1 py-2 text-sm transition-opacity duration-500 border-2 opacity-1 text-slate-500 datCol border-slate-500 auto-cols-fr'
                >
                {isLoading ? ( 
          <p>Loading...</p> 
      ) : (
          <div className="w-full h-full sku">
              <select 
                  onChange={(e) => handleSKUChange(e, rowIndex)}
                  value={row.sku || ""} 
                  type="select" 
                  name="SKU" 
                  id="SKU" 
                  className="w-full h-full focus:ring-red-500 focus:border-red-500 sm:text-md" 
                  placeholder='SKU'
                  
              >   
                  <option value="">Select SKU</option>
                  {productsData && productsData.products && productsData.products.map(product => (
                      <option key={product.id}>{product.SKU}</option>
                  ))}
              </select>
          </div>
      )}
       {isLoading ? ( 
          <p>Loading...</p> 
      ) : (
        <div className="w-full h-full desc"><textarea type="text" name="description" id="desc" className="w-full h-full focus:ring-red-500 focus:border-red-500 sm:text-md placeholder:translate-y-3" placeholder="Description" value={row.description} readOnly /></div>
        )}
              {isLoading ? ( 
          <p>Loading...</p> 
      ) : (
        <div className="w-full h-full state"><select  onChange={(e) => handleStateChange(e, rowIndex)}
        value={row.state || ""} type="select" id="state" className="w-full h-full text-sm focus:ring-red-500 focus:border-red-500 sm:text-md" placeholder='State'>
          <option value="">Select State</option>
                  {locationsData && locationsData.locations && locationsData.locations.map(location => (
                      <option key={location.id} value={location.state}>{location.state}</option>
                  ))}
        </select>
        </div>
      )}
        <div className="w-full h-full delad"><textarea id="Delivery"
              className="w-full h-full focus:border-red-500 sm:text-md placeholder:translate-y-3"
              placeholder="Delivery Address"
              value={row.address || ""} // Bind to row.address
              readOnly />
              </div>
        <div className="w-full h-full qty"><input type='number'  onChange={(e) => handleQtyChange(e, rowIndex)} 
          value={row.qty} id="qty" className="w-full h-full focus:ring-red-500 focus:border-red-500 sm:text-md" placeholder="Qty"/></div>
        {isLoading ? ( 
                <p>Loading...</p> 
            ) : (
            <div className="w-full h-full uprice"><input type='number'  onChange={e => setMessage(e.target.value)} id="uprice" className="w-full h-full focus:ring-red-500 focus:border-red-500 sm:text-md" placeholder="Unit Price" value={row.price} readOnly /></div>
            )}
        <div className="w-full h-full total"><input type='number'  id="total" className="w-full h-full focus:ring-red-500 focus:border-red-500 sm:text-md" placeholder="Total" value={row.total.toFixed(2)} readOnly/></div>
        <div className="px-3 addRow"><button onClick={addNewRow} className='w-full h-full text-white bg-red-500'>Add new row</button>
        <button onClick={() => { handleRemoveRow(rowIndex); removeElement();  }} className='items-end w-auto h-auto text-white bg-red-500 removeRow rounded-2xl'><FiTrash2 /></button></div>
                </motion.div>
                  ))}
              <div className="px-3 py-4 grand-total justify-items-end"> 
                <div className="w-full h-full total justify-items-end">
                  <label htmlFor="grandTotal" className="block text-sm font-medium leading-6 text-gray-900">
                    Tax:
                  </label>
                  <div className='font-bold sm:text-md"'> 
                    {GST * 100}%
                  </div>
                </div>
                <div className="w-full h-full total justify-items-end">
                  <label htmlFor="grandTotal" className="block text-sm font-medium leading-6 text-gray-900">
                    Tax:
                  </label>
                  <div className='font-bold sm:text-md"'> 
                    ${tax.toFixed(2)}
                  </div>
                </div>
                <div className="w-full h-full total justify-items-end">
                  <label htmlFor="grandTotal" className="block text-sm font-medium leading-6 text-gray-900">
                    Total Ex:
                  </label>
                  <div className='font-bold sm:text-md"'> 
                    ${Notax.toFixed(2)} {/* Display with $ and rounded */}
                  </div>
                </div>
                <div className="w-full h-full total justify-items-end">
                  <label htmlFor="grandTotal" className="block text-sm font-medium leading-6 text-gray-900">
                    Grand Total:
                  </label>
                  <div className='font-bold sm:text-md"'> 
                    ${grandTotal.toFixed(2)} {/* Display with $ and rounded */}
                  </div>
                </div>
              </div>
              <RenderPDF 
                  rows={rows} 
                  GST={GST} 
                  Notax={Notax} 
                  tax={tax} 
                  grandTotal={grandTotal} 
                  currentDate={currentDate}
                  selectedVendor={selectedVendor} 
                  poNumber={poNumber}
                />
              </div>
  </main>
  )
}

export default Pobuilder 
