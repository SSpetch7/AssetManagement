import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService, dataTable } from '../../assets/dummy';

export default function BasicDemo() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // ProductService.getProducts().then((data) => setProducts(data));
    dataTable.getDatas().then((data) => setProducts(data));
  }, []);

  return (
    <div className="card">
      <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
        <Column field="order" header="ลำดับ"></Column>
        <Column field="asset_id" header="หมายเลขครุภัณฑ์"></Column>
        <Column field="name" header="ชื่อรายการ"></Column>
        <Column field="year" header="ปี"></Column>
      </DataTable>
    </div>
  );
}
