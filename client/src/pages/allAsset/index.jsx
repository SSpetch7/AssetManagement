import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { Tag } from 'primereact/tag';
import { InputText } from 'primereact/inputtext';
import { dataTable } from '../../assets/dummy';
import BorrowButton from '../../components/BorrowButton';


export default function AllAsset() {
  let emptydataTable = {
    order: '',
    asset_id: '',
    name: '',
    year: null,
    status: '',
    useable: '',
    room_id: '',
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
  const [product, setProduct] = useState(emptydataTable);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  useEffect(() => {
    // ProductService.getProducts().then((data) => setProducts(data));
    dataTable.getDatas().then((data) => setProducts(data));
  }, []);

  const formatCurrency = (value) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  const openNew = () => {
    setProduct(emptydataTable);
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
      setProduct(emptydataTable);
    }
  };

  const editProduct = (product) => {
    setProduct({ ...product });
    setProductDialog(true);
    console.log('edit product for click');
  };

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProduct = () => {
    let _products = products.filter((val) => val.id !== product.id);

    setProducts(_products);
    setDeleteProductDialog(false);
    setProduct(emptydataTable);
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

  const exportCSV = () => {
    dt.current.exportCSV();
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

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {/* <Button
          icon="pi pi-pencil"
          style={{ scale: ' 70%' }}
          rounded
          outlined
          className="mr-2"
          onClick={() => editProduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          style={{ scale: ' 70%' }}
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteProduct(rowData)}
        /> */}
        {/* <Button
          outlined
          icon="pi pi-calendar-times"
          //   rounded
          //   style={{ fontSize: '16px' }}
          className="mr-2 "
          onClick={() => editProduct(rowData)}
        /> */}
        <BorrowButton />
        <Button
          icon="pi pi-pencil"
          //   rounded
          outlined
          className="editBnt mr-2"
          onClick={() => editProduct(rowData)}
        />
      </React.Fragment>
    );
  };

  const getSeverity = (product) => {
    switch (product.inventoryStatus) {
      case 'ใช้จริง':
        return 'success';

      case 'ซ่อม':
        return 'warning';

      case 'กำลังใช้งาน':
        return 'danger';

      default:
        return null;
    }
  };

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
      <div className="flex gap-2">
        <Button
          label="เพิ่มครุภัณฑ์"
          icon="pi pi-plus"
          severity="success"
          onClick={openNew}
          style={{
            minWidth: '2rem',
            paddingRight: '13px',
            paddingLeft: '13px',
          }}
        />
        <Button
          label="Export"
          icon="pi pi-upload"
          className="p-button-help"
          onClick={exportCSV}
          style={{ width: '120px' }}
        />
      </div>
    </div>
  );
  const productDialogFooter = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-Testbutton"
        onClick={saveProduct}
      />
    </React.Fragment>
  );
  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteProductDialog}
      />
      <Button
        label="Yes"
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

  return (
    <div>
      <Toast ref={toast} />
      <div className="mt-12">
        <div className="pb-10">
          <span className="pl-32 font-bold  text-4xl text-gray-600 items-start">
            All Asset
          </span>
          <span className="pl-2  text-gray-400">ครุภัณฑ์ทั้งหมด</span>
        </div>
        <div className="flex justify-center h-full ">
          <div className=" bg-white h-5/6 rounded-xl w-9/12 labtop:m-0 px-8 pt-8 m-3 ">
            <DataTable
              ref={dt}
              value={products}
              selection={selectedProducts}
              onSelectionChange={(e) => setSelectedProducts(e.value)}
              dataKey="id"
              paginator
              rows={10}
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
              globalFilter={globalFilter}
              header={header}
              className="actionRow"
              scrollable
              //   scrollHeight="700px"
              tableStyle={{ minHeight: '10rem' }}
            >
              <Column
                field="order"
                header="ลำดับ"
                sortable
                style={{ minWidth: '5rem' }}
              ></Column>
              <Column
                field="asset_id"
                header="หมายเลขครุภัณฑ์"
                sortable
                style={{ minWidth: '11rem' }}
              ></Column>
              <Column
                field="name"
                header="ชื่อ"
                sortable
                style={{ minWidth: '16rem' }}
              ></Column>

              <Column
                field="year"
                header="ปี"
                sortable
                style={{ minWidth: '5rem' }}
              ></Column>
              <Column
                field="status"
                header="สภาพ"
                sortable
                style={{ minWidth: '4rem' }}
              ></Column>
              <Column
                field="useable"
                header="การใช้งาน"
                sortable
                style={{ minWidth: '9rem' }}
              ></Column>
              <Column
                field="room_id"
                header="ประจำที่"
                sortable
                style={{ minWidth: '8rem' }}
              ></Column>
              <Column
                body={actionBodyTemplate}
                // headerStyle={{ minWidth: '10rem' }}
                style={{ minWidth: '8rem' }}
              ></Column>
            </DataTable>
          </div>
        </div>
      </div>

      <div className="m-16">
        <p className="text-gray-700 text-center  m-16"> 2023 Final Project </p>
      </div>
      <Dialog
        visible={productDialog}
        style={{ width: '64rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header="รายละเอียดครุภัณฑ์"
        modal
        className="p-fluid"
        footer={productDialogFooter}
        onHide={hideDialog}
      >
        
        <div className="card p-4">
            <FileUpload name="demo[]" url={'/api/upload'} multiple accept="image/*" maxFileSize={1000000} emptyTemplate={<p className="m-0">อัพโหลดรูปครุภัณฑ์ที่นี่</p>} />
        </div>
        
        <div className="card p-4">
          <h1 className="text-kmuttColor-800 py-2">ข้อมูลครุภัณฑ์</h1>
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
              {submitted && !product.number && (
                <small className="p-error">No. is required.</small>
              )}
            </div>

            <div className="field col-start-2 col-end-5">
              <label htmlFor="name" className="font-bold">
                ชื่อรายการ
              </label>
              <InputText
                id="name"
                value={product.name}
                onChange={(e) => onInputChange(e, 'name')}
                required
                autoFocus
                className={classNames({
                  'p-invalid': submitted && !product.name,
                })}
              />
              {submitted && !product.name && (
                <small className="p-error">Name is required.</small>
              )}
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
                autoFocus
                className={classNames({
                  'p-invalid': submitted && !product.id,
                })}
              />
              {submitted && !product.id && (
                <small className="p-error">ProductID is required.</small>
              )}
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
                autoFocus
                className={classNames({
                  'p-invalid': submitted && !product.room,
                })}
              />
              {submitted && !product.room && (
                <small className="p-error">ProductRoom is required.</small>
              )}
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
          <h1 className="text-kmuttColor-800 py-2">ข้อมูลโครงการ</h1>
          <div className="grid grid-cols-4 gap-4">
            <div className="field col-start-1 col-end-5">
              <label htmlFor="project" className="font-bold">
                ชื่อโครงการ
              </label>
              <InputText
                id="project"
                value={product.project}
                onChange={(e) => onInputChange(e, 'ยพน่ำแะ')}
                required
                autoFocus
                className={classNames({
                  'p-invalid': submitted && !product.project,
                })}
              />
              {submitted && !product.project && (
                <small className="p-error">ProjectName is required.</small>
              )}
            </div>

            <div className="field col-start-1 col-end-5">
              <label htmlFor="id" className="font-bold">
                ชื่อแผนงาน
              </label>
              <InputText
                id="plan"
                value={product.plan}
                onChange={(e) => onInputChange(e, 'plan')}
                required
                autoFocus
                className={classNames({
                  'p-invalid': submitted && !product.plan,
                })}
              />
              {submitted && !product.plan && (
                <small className="p-error">PlanName is required.</small>
              )}
            </div>

            <div className="field">
              <label htmlFor="description" className="font-bold">
                ประเภทแผนงาน
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
          <div className="field">
            <label htmlFor="description" className="font-bold">
              หมายเหตุ
            </label>
            <InputTextarea
              id="description"
              value={product.description}
              onChange={(e) => onInputChange(e, 'description')}
              required
              rows={3}
              cols={20}
            />
          </div>
        </div>
      </Dialog>

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
    </div>
  );
}
