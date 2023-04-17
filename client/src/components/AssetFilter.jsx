import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { Calendar } from 'primereact/calendar';

export default function AssetFilter() {
  let emptyProduct = {
    id: null,
    name: '',
    image: null,
    description: '',
    category: null,
    price: 0,
    quantity: 0,
    rating: 0,
    inventoryStatus: 'INSTOCK',
  };

  const [productStatus, setProductStatus] = useState(null);
  const status = [
    { name: 'ใช่งานได้', code: 'CU' },
    { name: 'รอซ่อม', code: 'FX' },
    { name: 'สิ้นสภาพ', code: 'BK' },
  ];

  const [products, setProducts] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  const formatCurrency = (value) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  const openNew = () => {
    setProduct(emptyProduct);
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
      let _products = [...products];
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
        _product.id = createId();
        _product.image = 'product-placeholder.svg';
        _products.push(_product);
        toast.current.show({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Created',
          life: 3000,
        });
      }

      setProducts(_products);
      setProductDialog(false);
      setProduct(emptyProduct);
    }
  };

  const deleteProduct = () => {
    let _products = products.filter((val) => val.id !== product.id);

    setProducts(_products);
    setDeleteProductDialog(false);
    setProduct(emptyProduct);
    toast.current.show({
      severity: 'success',
      summary: 'Successful',
      detail: 'Product Deleted',
      life: 3000,
    });
  };

  const findIndexById = (id) => {
    let index = -1;

    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const createId = () => {
    let id = '';
    let chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return id;
  };

  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };

  const deleteSelectedProducts = () => {
    let _products = products.filter((val) => !selectedProducts.includes(val));

    setProducts(_products);
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

  const [dates, setDates] = useState(null);

  const priceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.price);
  };

  const ratingBodyTemplate = (rowData) => {
    return <Rating value={rowData.rating} readOnly cancel={false} />;
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.inventoryStatus}
        severity={getSeverity(rowData)}
      ></Tag>
    );
  };

  const getSeverity = (product) => {
    switch (product.inventoryStatus) {
      case 'ใช้งานได้':
        return 'success';

      case 'รอซ่อม':
        return 'warning';

      case 'สิ้นสภาพ':
        return 'danger';

      default:
        return null;
    }
  };

  const productDialogFooter = (
    <React.Fragment>
      <div className="flex justify-center">
        <Button
          label="Search"
          icon="pi pi-search"
          className="p-Testbutton"
          onClick={saveProduct}
        />
      </div>
    </React.Fragment>
  );

  return (
    <div className="p-button p-component mr-2  p-button-icon-only p-button-outlined">
      <Button
        outlined
        //    icon="pi pi-calendar-times"
        //   rounded
        //   style={{ fontSize: '16px' }}
        className="mr-2 "
        // label="ยืม"
        icon="pi pi-filter"
        // severity="success"
        onClick={openNew}
      />

      <Dialog
        visible={productDialog}
        style={{ width: '64rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header="ตัวกรอง"
        modal
        filter
        className="p-fluid"
        footer={productDialogFooter}
        onHide={hideDialog}
      >
        <div className="card p-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="field col-start-1">
              <label htmlFor="name" className="font-bold">
                ลำดับที่
              </label>
              <InputText
                id="no"
                value={product.number}
                onChange={(e) => onInputChange(e, 'number')}
                required
                autoFocus
                className={classNames({
                  'p-invalid': submitted && !product.number,
                })}
              />
            </div>

            <div className="field col-start-2 col-end-4">
              <label htmlFor="name" className="font-bold">
                ชื่อรายการ
              </label>
              <InputText
                id="name"
                value={product.name}
                onChange={(e) => onInputChange(e, 'name')}
                required
                className={classNames({
                  'p-invalid': submitted && !product.name,
                })}
              />
            </div>

            <div className="field col-start-4 col-end-5">
              <label htmlFor="name" className="font-bold">
                ปีงบประมาณ
              </label>
              <InputText
                id="yeat"
                value={product.year}
                onChange={(e) => onInputChange(e, 'year')}
                required
                className={classNames({
                  'p-invalid': submitted && !product.year,
                })}
              />
            </div>

            <div className="field">
              <label htmlFor="id" className="font-bold">
                หมายเลขครุภัณฑ์
              </label>
              <InputText
                id="id"
                value={product.id}
                onChange={(e) => onInputChange(e, 'id')}
                required
                className={classNames({
                  'p-invalid': submitted && !product.id,
                })}
              />
            </div>

            <div className="formgrid grid">
              <div className="field col">
                <label htmlFor="price" className="font-bold">
                  ราคา
                </label>
                <InputNumber
                  id="price"
                  value={product.price}
                  onValueChange={(e) => onInputNumberChange(e, 'price')}
                  mode="currency"
                  currency="THB"
                  locale="en-US"
                />
              </div>
            </div>

            <div className="field col-start-3 col-end-5">
              <label htmlFor="room" className="font-bold">
                ประจำที่
              </label>
              <InputText
                id="room"
                value={product.room}
                onChange={(e) => onInputChange(e, 'room')}
                required
                className={classNames({
                  'p-invalid': submitted && !product.room,
                })}
              />
            </div>

            <div className="field">
              <label htmlFor="description" className="font-bold">
                สถานะ
              </label>
              <div className="card flex justify-content-center">
                <Dropdown
                  value={productStatus}
                  onChange={(e) => setProductStatus(e.value)}
                  options={status}
                  optionLabel="name"
                  placeholder="เลือกสถานะ"
                  className="w-full md:w-14rem"
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="description" className="font-bold">
                สภาพ
              </label>
              <div className="card flex justify-content-center">
                <Dropdown
                  value={productStatus}
                  onChange={(e) => setProductStatus(e.value)}
                  options={status}
                  optionLabel="name"
                  placeholder="เลือกสถานะ"
                  className="w-full md:w-14rem"
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="description" className="font-bold">
                การใช้งาน
              </label>
              <div className="card flex justify-content-center">
                <Dropdown
                  value={productStatus}
                  onChange={(e) => setProductStatus(e.value)}
                  options={status}
                  optionLabel="name"
                  placeholder="เลือกสถานะ"
                  className="w-full md:w-14rem"
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="description" className="font-bold">
                ประเภทครุภัณฑ์
              </label>
              <div className="card flex justify-content-center">
                <Dropdown
                  value={productStatus}
                  onChange={(e) => setProductStatus(e.value)}
                  options={status}
                  optionLabel="name"
                  placeholder="เลือกสถานะ"
                  className="w-full md:w-14rem"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card p-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="field col-start-1 col-end-3">
              <label htmlFor="project" className="font-bold">
                ชื่อผู้ยืม
              </label>
              <InputText
                id="borrower"
                value={product.borrower}
                onChange={(e) => onInputChange(e, 'borrower')}
                required
                className={classNames({
                  'p-invalid': submitted && !product.borrower,
                })}
              />
            </div>

            <div className="field col-start-3 col-end-4">
              <label htmlFor="borrowdate" className="font-bold">
                ช่วงเวลาการยืม
              </label>
              <Calendar
                value={dates}
                onChange={(e) => setDates(e.value)}
                selectionMode="range"
                readOnlyInput
                showIcon
              />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
