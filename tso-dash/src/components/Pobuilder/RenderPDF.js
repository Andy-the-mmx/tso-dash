import React from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { FaFileDownload } from 'react-icons/fa';
import Ponumber from './Ponumber';
import Vendor from './Vendor';


const styles = StyleSheet.create({
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 5,
  },
  tableCellHeader: {
    fontWeight: 'normal',
    flex: 1,
    flexGrow: 1,
    fontFamily: 'Times-Roman',
    fontSize: 12,
    padding: 5,
    backgroundColor: 'red',
    color: 'white',
    marginRight: 1,
  },
  tableCell: {
    flex: 1,
    fontSize: 10,
    fontFamily: 'Times-Roman',
    color: 'black',
    marginRight: 1,
  },
  tableQty: {
    fontSize: 10,
    justifyContent: 'justify-center',
    fontFamily: 'Times-Roman',
    marginRight: 1,
    color: 'black',
  },
  totalsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    paddingRight: 10, 
  },
  totalLabel: {
    fontWeight: 'normal',
    marginRight: 10,
    fontFamily: 'Times-Roman',
    fontSize: 12,
  },
  totalAmount: {
    fontWeight: 'normal',
    fontFamily: 'Times-Roman',
    fontSize: 12,
  },
});

// Define your PDF document structure (MyDocument)
const MyDocument = ({ rows, GST, Notax, tax, grandTotal, vendor, currentDate, selectedVendor, poNumber }) => (
  <Document>
    <Page>
      <View>
        {/* Display vendor and purchase order header */}
        <View style={styles.tableRow}>
          <Text style={styles.tableCellHeader}>Vendor</Text>
          <Text style={styles.tableCellHeader}>Ship to</Text>
          <Text style={styles.tableCellHeader}>Date</Text>
          <Text style={styles.tableCellHeader}>Purchase order Number</Text>
        </View>
         {/* Display vendor and purchase order details */}
         <View style={styles.tableRow}>
          <Text style={styles.tableCellHeader}>{selectedVendor}</Text>
          <Text style={styles.tableCellHeader}>Techmotive PTY LTD</Text>
          <Text style={styles.tableCellHeader}>{currentDate}</Text>
          <Text style={styles.tableCellHeader}>TSO-{poNumber}</Text>
        </View>
        {/* Display the table headers */}
        <View style={styles.tableRow}>
          <Text style={styles.tableCellHeader}>SKU</Text>
          <Text style={styles.tableCellHeader}>Description</Text>
          <Text style={styles.tableCellHeader}>State</Text>
          <Text style={styles.tableCellHeader}>Delivery Address</Text>
          <Text style={styles.tableCellHeader}>QTY</Text>
          <Text style={styles.tableCellHeader}>Unit Price</Text>
          <Text style={styles.tableCellHeader}>Total</Text>
        </View>

        {/* Map through the rows data to display the table rows */}
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.tableRow}>
            <Text style={styles.tableCell}>{row.sku}</Text>
            <Text style={styles.tableCell}>{row.description}</Text>
            <Text style={styles.tableCell}>{row.state}</Text>
            <Text style={styles.tableCell}>{row.address}</Text>
            <Text style={styles.tableQty}>{row.qty}</Text>
            <Text style={styles.tableCell}>${row.price}</Text>
            <Text style={styles.tableCell}>${row.total.toFixed(2)}</Text>
          </View>
        ))}

        {/* Display the totals */}
        <View style={styles.totalsRow}>
          <Text style={styles.totalLabel}>Tax:</Text>
          <Text style={styles.totalAmount}>{GST * 100}%</Text>
        </View>
        <View style={styles.totalsRow}>
          <Text style={styles.totalLabel}>Tax Amount:</Text>
          <Text style={styles.totalAmount}>${tax.toFixed(2)}</Text>
        </View>
        <View style={styles.totalsRow}>
          <Text style={styles.totalLabel}>Total Ex:</Text>
          <Text style={styles.totalAmount}>${Notax.toFixed(2)}</Text>
        </View>
        <View style={styles.totalsRow}>
          <Text style={styles.totalLabel}>Grand Total:</Text>
          <Text style={styles.totalAmount}>${grandTotal.toFixed(2)}</Text>
        </View>
      </View>
    </Page>
  </Document>
);


const RenderPDF = ({ rows, GST, Notax, tax, grandTotal, Vendor, currentDate, selectedVendor, poNumber }) => (
  <div>
    <PDFDownloadLink 
      document={<MyDocument rows={rows} GST={GST} Notax={Notax} tax={tax} grandTotal={grandTotal} currentDate={currentDate} selectedVendor={selectedVendor} poNumber={poNumber}     />} 
      fileName="pobuilder.pdf"
      className='px-3 py-2 text-white bg-red-500'
    >
      {({ blob, url, loading, error }) => (
        loading ? 'Loading document...' : 'Download the PO '
      )}
    </PDFDownloadLink>
  </div>
);

export default RenderPDF;