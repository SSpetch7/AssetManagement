import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { Tag } from 'primereact/tag';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { dataTable } from '../../assets/dummy';
import BorrowButton from '../../components/BorrowButton';
import AssetFilter from '../../components/AssetFilter';
import { AssetService, AssetOptionService } from '../../service/AssetService';

export default function AllAsset() {
  let emptydataTable = {
    asset_order: '',
    asset_id: null,
    asset_name: '',
    asset_year: null,
    gallery_id: null,
    detail: null,
    room_id: '',
    category: '',
    subcategory: '',
    sck_name: '',
    s_name: '',
    u_name: '',
  };

  //   const [productStatus, setProductStatus] = useState(null);
  //   const status = [
  //     { name: 'ใช่งานได้', code: 'CU' },
  //     { name: 'รอซ่อม', code: 'FX' },
  //     { name: 'สิ้นสภาพ', code: 'BK' },
  //   ];

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    asset_name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    asset_order: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    asset_id: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    asset_year: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    s_name: { value: null, matchMode: FilterMatchMode.EQUALS },
    room_id: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    u_name: { value: null, matchMode: FilterMatchMode.EQUALS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  //  asset edit data
  const [asset, setAsset] = useState(emptydataTable);

  // asset data
  const [assets, setAssets] = useState();
  const [galleries, setGalleries] = useState(null);
  const [assetStatus, setAssetStatus] = useState();
  const [assetStock, setAssetStock] = useState(null);
  const [assetUseable, setAssetUseable] = useState(null);
  const [assetType, setAssetType] = useState(null);
  const [assetComType, setAssetComType] = useState(null);

  const [editAssetDialog, setEditAssetDialog] = useState(false);
  const [showAssetDialog, setShowAssetDialog] = useState(false);

  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState(emptydataTable);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  const [statuses] = useState(['ใช้งานได้', 'กำลังซ่อม', 'สิ้นสภาพ']);
  const [useable] = useState(['ใช้งาน', 'ไม่ได้ใช้งาน']);

  useEffect(() => {
    AssetService.getAllAsset().then((data) => setAssets(data));
    // AssetService.getAssetByID().then((data) => setAssetID(data));
    AssetOptionService.getStatusAsset().then((data) => setAssetStatus(data));
    AssetOptionService.getStockAsset().then((data) => setAssetStock(data));
    AssetOptionService.getUseableAsset().then((data) => setAssetUseable(data));
    AssetOptionService.getTypeAsset().then((data) => setAssetType(data));
    AssetOptionService.getTypeCom().then((data) => setAssetComType(data));
    console.log(assets);
    console.log(assetStatus);
  }, []);

  //   edit asset data
  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _asset = { ...asset };

    console.log('test input');
    console.log(_asset);
    _asset[`${name}`] = val;

    setAsset(_asset);
  };

  const handleOptionChange = (e, name) => {
    let _asset = { ...asset };
    console.log('test');
    _asset[`${name}`] = e.value;
    console.log(_asset);
    setAsset(_asset);
  };

  const openNew = () => {
    setAsset(emptydataTable);
    setSubmitted(false);
    setEditAssetDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setEditAssetDialog(false);
    setShowAssetDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const saveAsset = () => {
    setSubmitted(true);

    if (asset.asset_name.trim()) {
      let _assets = [...assets];
      let _asset = { ...asset };

      if (asset.asset_name) {
        const index = findIndexById(asset.asset_id);
        console.log(asset.id);
        _assets[index] = _asset;
        toast.current.show({
          severity: 'success',
          summary: 'Successful',
          detail: 'Asset Updated',
          life: 3000,
        });
      } else {
        _asset.asset_id = createId();
        _asset.image = 'product-placeholder.svg';
        _assets.push(_asset);
        toast.current.show({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Created',
          life: 3000,
        });
      }

      setAssets(_assets);
      setEditAssetDialog(false);
      setAsset(emptydataTable);
    }
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag value={rowData.s_name} severity={getSeverity(rowData.s_name)} />
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
    return <Tag value={rowData.u_name} severity={getUseable(rowData.u_name)} />;
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

  const getUseable = (status) => {
    switch (status) {
      case 'ใช้งาน':
        return 'success';

      case 'ไม่ได้ใช้งาน':
        return 'danger';
    }
  };

  const editAsset = (rowData) => {
    setAsset({ ...rowData });
    console.log(asset.sck_name);
    setEditAssetDialog(true);
  };

  const showAsset = (rowData) => {
    setAsset({ ...rowData });
    setShowAssetDialog(true);
    AssetService.getAssetByID(rowData.asset_id)
      .then((data) => {
        setAsset(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProduct = () => {
    let _products = assets.filter((val) => val.id !== product.id);

    setAssets(_products);
    setDeleteProductDialog(false);
    setAsset(emptydataTable);
    toast.current.show({
      severity: 'success',
      summary: 'Successful',
      detail: 'Product Deleted',
      life: 3000,
    });
  };

  const findIndexById = (id) => {
    let index = -1;

    for (let i = 0; i < assets.length; i++) {
      if (assets[i].asset_id === id) {
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
    let _products = assets.filter((val) => !selectedProducts.includes(val));

    setAssets(_products);
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

  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _product = { ...product };

    _product[`${name}`] = val;

    setProduct(_product);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          outlined
          icon="pi pi-search"
          //   rounded
          //   style={{ fontSize: '16px' }}
          className="mr-2 "
          onClick={() => showAsset(rowData)}
        />

        <Button
          icon="pi pi-pencil"
          outlined
          className="editBnt mr-2"
          onClick={() => editAsset(rowData)}
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
        <div className="flex gap-2">
          <AssetFilter />
        </div>
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
      </div>
    </div>
  );
  const productDialogFooter = (
    <React.Fragment>
      <Button
        label="ยกเลิก"
        icon="pi pi-times"
        severity="danger"
        outlined
        onClick={hideDialog}
      />
      <Button
        label="ยืนยัน"
        icon="pi pi-check"
        className="p-Testbutton"
        onClick={saveAsset}
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
              value={assets}
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
                field="asset_order"
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
                field="asset_name"
                header="ชื่อ"
                sortable
                filter
                showFilterMatchModes={false}
                filterPlaceholder="ค้นหาชื่อ"
                style={{ minWidth: '18rem' }}
              ></Column>

              <Column
                field="asset_year"
                header="ปีงบประมาณ"
                sortable
                filter
                showFilterMatchModes={false}
                style={{ minWidth: '4rem' }}
              ></Column>

              <Column
                field="s_name"
                header="สภาพ"
                sortable
                filter
                showFilterMatchModes={false}
                body={statusBodyTemplate}
                filterElement={statusRowFilterTemplate}
                style={{ minWidth: '4rem' }}
              ></Column>
              <Column
                field="u_name"
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
              <Column
                body={actionBodyTemplate}
                // headerStyle={{ minWidth: '10rem' }}
                style={{ minWidth: '6rem' }}
              ></Column>
            </DataTable>
          </div>
        </div>
      </div>

      <div className="m-16">
        <p className="text-gray-700 text-center  m-16"> 2023 Final Project </p>
      </div>

      {/* view asset */}
      <Dialog
        visible={showAssetDialog}
        style={{ width: '64rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header="รายละเอียดครุภัณฑ์"
        modal
        className="p-fluid"
        // footer={productDialogFooter}
        onHide={hideDialog}
      >
        <div className="card p-4">
          <FileUpload
            name="demo[]"
            url={'/api/upload'}
            multiple
            accept="image/*"
            maxFileSize={1000000}
            emptyTemplate={<p className="m-0">อัพโหลดรูปครุภัณฑ์ที่นี่</p>}
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
                placeholder={asset.asset_order}
                disabled
                required
                autoFocus
              />
            </div>

            <div className="field col-start-2 col-end-5">
              <label htmlFor="name" className="font-bold">
                ชื่อรายการ
              </label>
              <InputText
                id="name"
                placeholder={asset.asset_name}
                disabled
                required
              />
            </div>

            <div className="field">
              <label htmlFor="id" className="font-bold">
                หมายเลขครุภัณฑ์
              </label>
              <InputText id="id" placeholder={asset.asset_id} disabled />
            </div>

            <div className="formgrid grid">
              <div className="field col">
                <label htmlFor="year" className="font-bold">
                  ปีงบประมาณ
                </label>
                <InputText id="asset_year" value={asset.asset_year} />
              </div>
            </div>

            <div className="field col-start-3 col-end-5">
              <label htmlFor="room" className="font-bold">
                ประจำที่
              </label>
              <InputText id="room" placeholder={asset.room_id} disabled />
            </div>

            <div className="field">
              <label htmlFor="description" className="font-bold">
                สถานะ
              </label>
              <div className="card flex justify-content-center">
                <Dropdown
                  placeholder={asset.sck_name}
                  disabled
                  options={assetStock}
                  optionLabel="name"
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
                  placeholder={asset.s_name}
                  disabled
                  optionLabel="name"
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
                  placeholder={asset.u_name}
                  disabled
                  optionLabel="name"
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
                  placeholder={asset.category}
                  disabled
                  optionLabel="name"
                  className="w-full md:w-14rem"
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="description" className="font-bold">
                ประเภทครุภัณฑ์คอมพิวเตอร์
              </label>
              <div className="card flex justify-content-center">
                <Dropdown
                  placeholder={asset.subcategory}
                  disabled
                  className="w-full md:w-14rem"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card p-4">
          {/* <h1 className="text-kmuttColor-800 py-2">ข้อมูลโครงการ</h1>
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
                  value={assetStatus}
                  onChange={(e) => setAssetStatus(e.value)}
                  options={assetStatus}
                  optionLabel="name"
                  placeholder="เลือกสถานะ"
                  className="w-full md:w-14rem"
                />
              </div>
            </div>
          </div> */}
          <div className="field">
            <label htmlFor="description" className="font-bold">
              หมายเหตุ
            </label>
            <InputTextarea
              id="description"
              disabled
              value={product.detail}
              required
              rows={3}
              cols={20}
            />
          </div>
        </div>
      </Dialog>

      {/* edit asset */}
      <Dialog
        visible={editAssetDialog}
        style={{ width: '64rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header="แก้ไขครุภัณฑ์"
        modal
        className="p-fluid"
        footer={productDialogFooter}
        onHide={hideDialog}
      >
        <div className="card p-4">
          <FileUpload
            name="demo[]"
            url={'/api/upload'}
            multiple
            accept="image/*"
            maxFileSize={1000000}
            emptyTemplate={<p className="m-0">อัพโหลดรูปครุภัณฑ์ที่นี่</p>}
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
                id="order"
                value={asset.asset_order}
                onChange={(e) => onInputChange(e, 'asset_order')}
                required
                // autoFocus
                className={classNames({
                  'p-invalid': submitted && !asset.asset_order,
                })}
              />
              {submitted && !asset.asset_order && (
                <small className="p-error">No. is required.</small>
              )}
            </div>

            <div className="field col-start-2 col-end-5">
              <label htmlFor="asset_name" className="font-bold">
                ชื่อรายการ
              </label>
              <InputText
                id="asset_name"
                value={asset.asset_name}
                onChange={(e) => onInputChange(e, 'asset_name')}
                required
                className={classNames({
                  'p-invalid': submitted && !asset.asset_name,
                })}
              />
              {submitted && !asset.asset_name && (
                <small className="p-error">Name is required.</small>
              )}
            </div>

            <div className="field">
              <label htmlFor="asset_id" className="font-bold">
                หมายเลขครุภัณฑ์
              </label>
              <InputText
                id="asset_id"
                disabled
                value={asset.asset_id}
                onChange={(e) => onInputChange(e, 'asset_id')}
                required
                className={classNames({
                  'p-invalid': submitted && !asset.asset_id,
                })}
              />
              {submitted && !asset.asset_id && (
                <small className="p-error">ProductID is required.</small>
              )}
            </div>

            <div className="formgrid grid">
              <div className="field col">
                <label htmlFor="year" className="font-bold">
                  ปีงบประมาณ
                </label>
                <InputText id="asset_year" value={asset.asset_year} />
              </div>
            </div>

            <div className="field col-start-3 col-end-5">
              <label htmlFor="room" className="font-bold">
                ประจำที่
              </label>
              <InputText
                id="room"
                placeholder={asset.room_id}
                value={asset.room_id}
                onChange={(e) => onInputChange(e, 'room')}
                required
                className={classNames({
                  'p-invalid': submitted && !asset.room_id,
                })}
              />
              {submitted && !asset.room_id && (
                <small className="p-error">ProductRoom is required.</small>
              )}
            </div>

            <div className="field">
              <label htmlFor="sck_name" className="font-bold">
                สถานะ
              </label>
              <div className="card flex justify-content-center">
                <Dropdown
                  id="sck_name"
                  value={asset.sck_name}
                  placeholder={asset.sck_name}
                  onChange={(e) => handleOptionChange(e, 'sck_name')}
                  options={assetStock}
                  optionLabel="name"
                  className="w-full md:w-14rem"
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="s_name" className="font-bold">
                สภาพ
              </label>
              <div className="card flex justify-content-center">
                <Dropdown
                  id="s_name"
                  value={asset.s_name}
                  placeholder={asset.s_name}
                  onChange={(e) => handleOptionChange(e, 's_name')}
                  options={assetStatus}
                  //   optionLabel="name"
                  className="w-full md:w-14rem"
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="u_name" className="font-bold">
                การใช้งาน
              </label>
              <div className="card flex justify-content-center">
                <Dropdown
                  id="u_name"
                  value={asset.u_name}
                  placeholder={asset.u_name}
                  onChange={(e) => handleOptionChange(e, 'u_name')}
                  options={assetUseable}
                  //   optionLabel="name"
                  className="w-full md:w-14rem"
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="category" className="font-bold">
                ประเภทครุภัณฑ์
              </label>
              <div className="card flex justify-content-center">
                <Dropdown
                  value={asset.category}
                  placeholder={asset.category}
                  onChange={(e) => handleOptionChange(e, 'category')}
                  options={assetType}
                  optionLabel="name"
                  className="w-full md:w-14rem"
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="subcategory" className="font-bold">
                ประเภทครุภัณฑ์คอมพิวเตอร์
              </label>
              <div className="card flex justify-content-center">
                <Dropdown
                  value={asset.subcategory}
                  placeholder={asset.subcategory}
                  onChange={(e) => handleOptionChange(e, 'subcategory')}
                  options={assetComType}
                  optionLabel="subcategory"
                  className="w-full md:w-14rem"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card p-4">
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
