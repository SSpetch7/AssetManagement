import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import { ProductService } from './service/ProductService';
import { dataTable } from '../../assets/dummy';

export default function BasicDemo() {
  const [products, setProducts] = useState(dataTable);

  //   useEffect(() => {
  //     dataTable.getProductsMini().then((data) => setProducts(data));
  //   }, []);

  return (
    <div className="card">
      <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
        <Column field="code" header="Code"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="category" header="Category"></Column>
        <Column field="quantity" header="Quantity"></Column>
      </DataTable>
    </div>
  );
}
