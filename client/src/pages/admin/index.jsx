import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { adminTable } from '../../assets/dummy';
import { Tag } from 'primereact/tag';
import AddAdmin from '../../components/AddAdmin';
import Userinfo from 'components/UserInfo';
import { Image } from 'primereact/image';
import ChangeDataAdmin from 'components/ChangeDataAdmin';
import { AdminService } from '../../service/AdminService';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Admin() {
  let emptyAdminTable = {
    amdin_id: '',
    admin_email: '',
    admin_username: '',
    addmin_addDate: '',
  };

  const [visible, setVisible] = useState(false);
  const footerContent = (
    <div>
      <Button
        label="บันทึก"
        className="p-Testbutton"
        icon="pi pi-check"
        onClick={() => setVisible(false)}
        autoFocus
      />
    </div>
  );

  const [products, setProducts] = useState(null);
  const [admins, setAdmins] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState(emptyAdminTable);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  useEffect(() => {
    AdminService.getAllAdamin().then((data) => setAdmins(data));
  }, []);
  
  const changeDate = (rowData) => {
  const date = new Date(rowData)
  const result = date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
      return result;
  };

  const changeAdmin = (rowData) => {
    
    switch (rowData) {
      case 'Head_Admin':
        return 'หัวหน้าผู้ดูแล';

      case 'Admin':
        return 'ผู้ดูแล';
    };}
 

  const reformBodyTemplate = (rowData)=>{
    return changeDate(rowData.admin_addDate)}
    
  

  const openNew = () => {
    setProduct(emptyAdminTable);
    setSubmitted(false);
    setProductDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const saveProduct = () => {
    setSubmitted(true);

    if (product.name.trim()) {
      let _products = [...admins];
      let _product = { ...product };

      if (product.id) {
        const index = findIndexById(product.id);

        _products[index] = _product;
        toast.current.show({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Updated',
          life: 3000,
        });
      } else {
        _product.image = 'product-placeholder.svg';
        _products.push(_product);
        toast.current.show({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Created',
          life: 3000,
        });
      }

      setAdmins(_products);
      setProductDialog(false);
      setProduct(emptyAdminTable);
    }
  };

  const editProduct = (product) => {
    setProduct({ ...product });
    setProductDialog(true);
  };

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProduct = () => {
    let _products = admins.filter((val) => val.id !== product.id);

    setAdmins(_products);
    setDeleteProductDialog(false);
    setProduct(emptyAdminTable);
    toast.current.show({
      severity: 'success',
      summary: 'Successful',
      detail: 'Product Deleted',
      life: 3000,
    });
  };

  const findIndexById = (id) => {
    let index = -1;

    for (let i = 0; i < admins.length; i++) {
      if (admins[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };

  const deleteSelectedProducts = () => {
    let _products = admins.filter((val) => !selectedProducts.includes(val));

    setAdmins(_products);
    setDeleteProductsDialog(false);
    setSelectedProducts(null);
    toast.current.show({
      severity: 'success',
      summary: 'Successful',
      detail: 'Products Deleted',
      life: 3000,
    });
  };

  const onCategoryChange = (e) => {
    let _product = { ...product };

    _product['category'] = e.value;
    setProduct(_product);
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _product = { ...product };

    _product[`${name}`] = val;

    setProduct(_product);
  };

  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _product = { ...product };

    _product[`${name}`] = val;

    setProduct(_product);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <ChangeDataAdmin />
      </React.Fragment>
    );
  };
  const actionDelete = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-trash"
          //   style={{ scale: ' 70%' }}
          //   rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </React.Fragment>
    );
  };

  const getSeverity = (product) => {
    switch (product.role) {
      case 'Head Admin':
        return 'danger';

      case 'Admin':
        return 'success';

      default:
        return null;
    }
  };

  const [auth, setAuth] = useState(false);
  const [role, setRole] = useState('');

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get('http://localhost:5000')
      .then((res) => {
        if (res.data.Status === 'Success') {
          setAuth(true);
          setRole(res.data.role);
        } else {
          setAuth(false);
        }
      })
      .then((err) => console.log(err))
  }, []);

  const navigate = useNavigate()
  useEffect(() => {
    axios
      .get('http://localhost:5000')
      .then((res) => {
        if (res.data.Status === 'Success') {
          navigate('/admin');
        } else {
          navigate('/home');
        }
      })
      .then((err) => console.log(err))
  }, []);


  const header = (
    <div className="flex  flex-wrap gap-2 align-items-center justify-between">
      {/* <h4 className="m-0">จัดการครุภัณฑ์</h4> */}
      <div className="flex">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="search"
            onInput={(e) => setGlobalFilter(e.target.value)}
            placeholder="ค้นหา..."
            style={{ width: '400px' }}
          />
        </span>
      </div>
      { role === 'Head_Admin' && (
      <div className="flex gap-2">
        <AddAdmin />
      </div>
      )} 
    </div>
  );

  const imageBodyTemplate = (product) => {
    return (
      <img
        src={`${product.picture}`}
        alt={product.picture}
        className="rounded-lg object-cover  w-12 h-12"
      />
    );
  };

  const productDialogFooter = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
    </React.Fragment>
  );
  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="ยกเลิก"
        icon="pi pi-times"
        severity="info"
        outlined
        onClick={hideDeleteProductDialog}
      />
      <Button
        label="ยืนยัน"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteProduct}
      />
    </React.Fragment>
  );
  const deleteProductsDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteProductsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteSelectedProducts}
      />
    </React.Fragment>
  );

  const roleBodyTemplate = (product) => {
    return <Tag value={changeAdmin(product.role)} severity={getSeverity(product)}></Tag>;
  };

  return (
    <div>
      <Toast ref={toast} />
      <div className="mt-12">
        <div className="pb-10">
          <span className="pl-32 font-bold  text-4xl text-gray-600 items-start">
            Admin Management
          </span>
          <span className="pl-2  text-gray-400">จัดการแอดมิน</span>
        </div>
        <div className="flex justify-center h-full ">
          <div className="bg-white h-5/6 rounded-xl w-9/12  labtop:m-0 px-8 pt-8 m-3">
            <DataTable
              ref={dt}
              value={admins}
              selection={selectedProducts}
              dataKey="id"
              paginator
              rows={10}
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
              globalFilter={globalFilter}
              header={header}
              className="actionRow"
            >
              <Column
                field="picture"
                header="รูปภาพ"
                // sortable
                body={imageBodyTemplate}
                style={{ minWidth: '12px', width: '12rem' }}
              ></Column>
              <Column
                field="admin_username"
                header="ชื่อ"
                sortable
                style={{ minWidth: '12rem', width: '12rem' }}
              ></Column>
              <Column
                field="admin_email"
                header="E-mail"
                sortable
                style={{ minWidth: '16rem' }}
              ></Column>

              <Column
                header="Role"
                body={roleBodyTemplate}
                // sortable
                style={{ minWidth: '8rem', textAlign: 'start' }}
              ></Column>
              <Column
                field="admin_addDate"
                header="วันที่เพิ่มเข้าสู่ระบบ"
                sortable
                style={{ minWidth: '12rem' }}
                body={reformBodyTemplate}
              ></Column>
              <Column
                body={actionBodyTemplate}
                // headerStyle={{ minWidth: '10rem' }}
                style={{ minWidth: '1rem' }}
              ></Column>
              <Column
                body={actionDelete}
                // headerStyle={{ minWidth: '10rem' }}
                style={{ minWidth: '1rem' }}
              ></Column>
            </DataTable>
          </div>
        </div>
      </div>

      <Dialog
        visible={deleteProductDialog}
        style={{ width: '32rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header="Confirm"
        modal
        footer={deleteProductDialogFooter}
        onHide={hideDeleteProductDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: '2rem' }}
          />
          {product && (
            <span>
              Are you sure you want to delete <b>{product.name}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteProductsDialog}
        style={{ width: '32rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header="Confirm"
        modal
        footer={deleteProductsDialogFooter}
        onHide={hideDeleteProductsDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: '2rem' }}
          />
          {product && (
            <span>Are you sure you want to delete the selected products?</span>
          )}
        </div>
      </Dialog>
      <div className="m-16">
        <p className="text-gray-700 text-center  m-16"> 2023 Final Project </p>
      </div>
    </div>
  );
}
