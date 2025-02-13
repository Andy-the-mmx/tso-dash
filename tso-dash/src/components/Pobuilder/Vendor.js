import React, { useState, useEffect } from 'react'

const Vendor = ({ onVendorSelect }) => {

    const [vendorData, setVendorData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedVendor, setSelectedVendor] = useState('');

    //Get vendors data
    useEffect(() => {
        setIsLoading(true);
        fetch('vendors.json')
        .then(response => response.json())
        .then(data => {
            setVendorData(data)
            console.log(data)
        })
        .catch(error => console.log('Error fetching vendors ', error))
        .finally(() =>  setIsLoading(false));
}, []);

const handleVendorChange = (event) => {
    const newVendor = event.target.value; 
    setSelectedVendor(newVendor); // Update the state with the new value
    onVendorSelect(newVendor);   // Pass the selected vendor to the parent
  };

  return (
            <div>
                {isLoading ? (
                <p>Loading vendors...</p> 
                ) : (
                    <select 
                    onChange={handleVendorChange}
                    value={selectedVendor}
                    type="select" 
                    name="vendor" 
                    id="vendor" 
                    className="w-1/2 h-full px-2 py-2 bg-red-500 border focus:ring-red-500 focus:border-red-500 sm:text-md" 
                    placeholder='Vendor'
                    
                >   
                    <option value="">Select Vendor</option>
                    {vendorData && vendorData.vendors && vendorData.vendors.map(vendor => (
                        <option key={vendor.id}>{vendor.Name}</option>
                    ))}
                </select>
                )}
                        
            </div>
  )
}

export default Vendor
