import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
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
import { Calendar } from 'primereact/calendar';
import { dataTable } from '../../assets/dummy';
import { Galleria } from 'primereact/galleria';
export default function BorrowAsset() {
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

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    order: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    asset_id: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    year: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    room_id: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    useable: { value: null, matchMode: FilterMatchMode.EQUALS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  const [products, setProducts] = useState(null);
  const [productDialog, setProductDialog] = useState(false);

  const [borrowDialog, setBorrowDialog] = useState(false);
  const [dates, setDates] = useState(null);
  const [images, setImages] = useState(null);

  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState(emptydataTable);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  const [statuses] = useState(['ใช้งานได้', 'กำลังซ่อม', 'สิ้นสภาพ']);
  const [useable] = useState(['กำลังใช้', 'ไม่ได้ใช้งาน']);

  useEffect(() => {
    dataTable.getDatas().then((data) => setProducts(data));
  }, []);

  const responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '960px',
      numVisible: 4,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];

  const openBorrowDialog = () => {
    setProduct(emptydataTable);
    setSubmitted(false);
    setBorrowDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setBorrowDialog(false);
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

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag value={rowData.status} severity={getSeverity(rowData.status)} />
    );
  };
  const statusRowFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e) => options.filterApplyCallback(e.value)}
        itemTemplate={statusItemTemplate}
        placeholder="สภาพ"
        className="p-column-filter"
        showClear
        style={{ minWidth: '12rem' }}
      />
    );
  };

  const statusItemTemplate = (option) => {
    return <Tag value={option} severity={getSeverity(option)} />;
  };

  const getSeverity = (status) => {
    switch (status) {
      case 'ใช้งานได้':
        return 'success';

      case 'กำลังซ่อม':
        return 'info';

      case 'สิ้นสภาพ':
        return 'danger';
    }
  };

  const useableBodyTemplate = (rowData) => {
    return (
      <Tag value={rowData.useable} severity={getUseable(rowData.useable)} />
    );
  };
  const useableRowFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={useable}
        onChange={(e) => options.filterApplyCallback(e.value)}
        itemTemplate={useableItemTemplate}
        placeholder="การใช้งาน"
        className="p-column-filter"
        showClear
        style={{ minWidth: '12rem' }}
      />
    );
  };

  const useableItemTemplate = (option) => {
    return <Tag value={option} severity={getUseable(option)} />;
  };

  const getUseable = (useable) => {
    switch (useable) {
      case 'ใช้งาน':
        return 'success';

      case 'ไม่ได้ใช้งาน':
        return 'danger';
    }
  };

  const editProduct = (product) => {
    setProduct({ ...product });
    setProductDialog(true);
    console.log('edit product for click');
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

  const itemTemplate = (item) => {
    return (
      <img
        src={item.itemImageSrc}
        alt=""
        style={{ width: '100%', display: 'block' }}
      />
    );
  };
  const thumbnailTemplate = (item) => {
    return (
      <img
        src={item.thumbnailImageSrc}
        alt={item.alt}
        style={{ display: 'block' }}
      />
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          outlined
          className="firstBnt mr-2 "
          icon="pi pi-arrow-right-arrow-left"
          severity="warning"
          onClick={openBorrowDialog}
        />
      </React.Fragment>
    );
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
            Borrow Asset
          </span>
          <span className="pl-2  text-gray-400">ยืมครุภัณฑ์ส่วนกลาง</span>
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
              filters={filters}
              globalFilter={globalFilter}
              header={header}
              className="actionRow"
              scrollable
              //   scrollHeight="700px"
              tableStyle={{ minHeight: '10rem' }}
            >
              <Column
                body={actionBodyTemplate}
                // headerStyle={{ minWidth: '10rem' }}
                style={{ minWidth: '6rem' }}
              ></Column>
              <Column
                field="order"
                header="ลำดับ"
                sortable
                style={{ minWidth: '4rem' }}
              ></Column>
              <Column
                field="asset_id"
                header="หมายเลขครุภัณฑ์"
                sortable
                filter
                showFilterMatchModes={false}
                filterPlaceholder="ค้นหาหมายเลขครุภัณฑ์"
                style={{ minWidth: '13rem', width: '13rem' }}
              ></Column>
              <Column
                field="name"
                header="ชื่อ"
                sortable
                filter
                showFilterMatchModes={false}
                filterPlaceholder="ค้นหาชื่อ"
                style={{ minWidth: '18rem' }}
              ></Column>

              <Column
                field="year"
                header="ปีงบประมาณ"
                sortable
                filter
                showFilterMatchModes={false}
                style={{ minWidth: '4rem' }}
              ></Column>

              <Column
                field="status"
                header="สภาพ"
                sortable
                filter
                showFilterMatchModes={false}
                body={statusBodyTemplate}
                filterElement={statusRowFilterTemplate}
                style={{ minWidth: '4rem' }}
              ></Column>
              <Column
                field="useable"
                header="การใช้งาน"
                sortable
                filter
                body={useableBodyTemplate}
                filterElement={useableRowFilterTemplate}
                showFilterMatchModes={false}
                style={{ minWidth: '10rem' }}
              ></Column>
              <Column
                field="room_id"
                header="ประจำที่"
                sortable
                filter
                showFilterMatchModes={false}
                style={{ minWidth: '10rem' }}
              ></Column>
            </DataTable>
          </div>
        </div>
      </div>
      <Dialog
        visible={borrowDialog}
        style={{ width: '64rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header="การยืมครุภัณฑ์"
        modal
        className="p-fluid"
        footer={productDialogFooter}
        onHide={hideDialog}
      >
        <div className="flex justify-center">
          <Galleria
            value={images}
            responsiveOptions={responsiveOptions}
            numVisible={5}
            circular
            style={{ maxWidth: '600px' }}
            item={itemTemplate}
            thumbnail={thumbnailTemplate}
          />
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
          <h1 className="text-kmuttColor-800 py-2">ข้อมูลผู้ยืม</h1>
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
              {submitted && !product.project && (
                <small className="p-error">Name is required.</small>
              )}
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

            <div className="field col-start-1 col-end-5">
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
        </div>
      </Dialog>
      <div className="m-16">
        <p className="text-gray-700 text-center  m-16"> 2023 Final Project </p>
      </div>
    </div>
  );
}
