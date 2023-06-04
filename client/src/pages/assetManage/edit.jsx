import React, { useState, useEffect, useRef } from 'react';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../firebaseconfig';

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
import {
  AssetService,
  AssetOptionService,
  UpdateAssetService,
} from '../../service/AssetService';
import { gridColumnGroupsLookupSelector } from '@mui/x-data-grid';
import { Hidden } from '@mui/material';

export default function AllAsset() {
  let emptydataTable = {
    asset_order: null,
    asset_id: '',
    asset_name: '',
    asset_year: '',
    gallery_id: null,
    detail: null,
    room_id: null,
    category: '',
    cate_id: null,
    sub_id: null,
    subcategory: '',
    asset_stock: null,
    asset_status: null,
    asset_useable: null,
  };

  let emptyDataAssetDetail = {
    asset_order: null,
    asset_id: '',
    asset_name: '',
    asset_year: '',
    gallery_id: null,
    detail: null,
    room_id: null,
    cate_id: null,
    sub_id: null,
    asset_stock: null,
    asset_status: null,
    asset_useable: null,
  };

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
    asset_status: { value: null, matchMode: FilterMatchMode.EQUALS },
    room_id: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    asset_useable: { value: null, matchMode: FilterMatchMode.EQUALS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  // asset new data
  const [newAssetDialog, setNewAssetDialog] = useState(false);
  const [assetLstOrder, setAssetLstOrder] = useState();
  const [assetCreateNew, setAssetCreateNew] = useState(null);

  //  asset edit data
  const [asset, setAsset] = useState(emptydataTable);
  const [assetDetail, setAssetDetail] = useState(emptydataTable);

  // asset data
  const [assets, setAssets] = useState(null);
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

  const [progress, setProgress] = useState(0);
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

  const [statuses] = useState(['ใช้งานได้', 'กำลังซ่อม', 'สิ้นสภาพ']);
  const [useable] = useState(['ใช้งาน', 'ไม่ได้ใช้งาน']);

  useEffect(() => {
    if (images.length < 1) return;
    const newImageURLs = [];
    images.forEach((image) => newImageURLs.push(URL.createObjectURL(image)));
    setImageURLs(newImageURLs);
  }, [images]);

  function onImageChange(e) {
    setImages([...e.target.files]);
  }

  useEffect(() => {
    AssetService.getAllAsset().then((data) => setAssets(data));
    // NumService.getLstOrderAsset().then((data) => setAssetLstOrder(data));
    // AssetService.getAssetByID().then((data) => setAssetID(data));

    AssetOptionService.getStatusAsset().then((data) => setAssetStatus(data));
    AssetOptionService.getStockAsset().then((data) => setAssetStock(data));
    AssetOptionService.getUseableAsset().then((data) => setAssetUseable(data));
    AssetOptionService.getTypeAsset().then((data) => setAssetType(data));
    AssetOptionService.getTypeCom().then((data) => setAssetComType(data));
    console.log(assetLstOrder + ' test oder1');
  }, []);

  useEffect(() => {
    UpdateAssetService.updateAsset(
      assetDetail.asset_id,
      assetDetail,
      (error, updateAsset) => {
        if (error) {
          console.log('Error updating to DB admin:', error);
        } else {
          console.log('Assset updated to DB successfully:', updateAsset);
        }
      }
    );
  }, [assetDetail]);

  useEffect(() => {
    UpdateAssetService.newAsset(assetCreateNew, (error, newAsset) => {
      if (error) {
        console.log('Error new create to DB admin:', error);
      } else {
        console.log('Assset new create to DB successfully:', newAsset);
      }
    });
  }, [assetCreateNew]);
  //   edit asset data
  const onInputChangeNumber = (e, name) => {
    const val = e.value;
    let _asset = { ...asset };
    _asset[`${name}`] = val;
    setAsset(_asset);
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _asset = { ...asset };

    let _assetDetail = { ...assetDetail };
    _assetDetail[`${name}`] = val;

    _asset[`${name}`] = val;

    setAsset(_asset);
  };

  //   const firstState=

  const handleOptionChange = (e, name) => {
    let _asset = { ...asset };
    _asset[`${name}`] = e.value;
    if (name === 'category') {
      switch (e.value) {
        case 'สำนักงาน':
          _asset[`cate_id`] = 1;
          break;
        case 'การศึกษา':
          _asset[`cate_id`] = 2;
          break;
        case 'คอมพิวเตอร์':
          _asset[`cate_id`] = 3;
          break;
        case 'อาคารสำนักงาน':
          _asset[`cate_id`] = 4;
          break;
        case 'อื่น ๆ ':
          _asset[`cate_id`] = 5;
          break;
      }
    }
    if (name === 'subcategory') {
      switch (e.value) {
        case 'เครื่องคอมพิวเตอร์':
          _asset[`sub_id`] = 1;
          break;
        case 'โน๊ตบุ๊ค':
          _asset[`sub_id`] = 2;
          break;
        case 'แท็บเล็ต':
          _asset[`sub_id`] = 3;
          break;
      }
    }
    console.log('e.value');
    console.log(e.value);
    setAsset(_asset);
  };

  const uploadFiles = (files, assetID) => {
    if (!files || files.length === 0) return;
    let count = 1;
    files.forEach((file) => {
      const storageRef = ref(storage, `${assetID}_image${count}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      count++;
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log('Upload progress:', progress);
        },
        (error) => {
          console.log('Upload error:', error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('uploadTask.snapshot.ref');
            console.log(uploadTask.snapshot.ref);
            console.log('File available at:', downloadURL);
          });
        }
      );
    });
    count = 0;
  };

  const openNew = () => {
    // NumService.getLstOrderAsset().then((data) => setAssetLstOrder(data));
    console.log(assetLstOrder + '');
    setAsset(emptydataTable);
    setSubmitted(false);
    setNewAssetDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setImageURLs([]);
    setImages([]);
    setNewAssetDialog(false);
    setEditAssetDialog(false);
    setShowAssetDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const saveNewAsset = () => {
    uploadFiles(images, asset.asset_id);
    let type = 'NEWASSET';
    setSubmitted(true);
    if (asset.asset_name.trim()) {
      let _assets = [...assets];
      let _asset = { ...asset };

      console.log('_asset');
      console.log(_asset);
      _assets.push(_asset);
      toast.current.show({
        severity: 'success',
        summary: 'Successful',
        detail: 'เพิ่มครุภัณฑ์ใหม่สำเร็จ',
        life: 3000,
      });
      setAssets(_assets);
      console.log('push');
      console.log(_asset);
      setAsset(_asset);
      setAssetCreateNew(_asset);
      setNewAssetDialog(false);
      setAsset(emptydataTable);
    }
    console.log('assetCreateNew');
    console.log(assetCreateNew);
  };

  const saveUpDateAsset = () => {
    setSubmitted(true);
    let type = 'UPDATEASSET';
    if (asset.asset_name.trim()) {
      let _assets = [...assets];
      let _asset = { ...asset };

      if (asset.asset_id) {
        const index = findIndexById(asset.asset_id);
        console.log(asset.asset_id + ' id');
        _assets[index] = _asset;
        toast.current.show({
          severity: 'success',
          summary: 'Successful',
          detail: 'อัพเดทครุภัณฑ์สำเร็จ',
          life: 1000,
        });
      } else if (asset.asset_id === '0') {
        toast.current.show({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Created',
          life: 3000,
        });
      }
      setAssets(_assets);
      setAsset(_asset);
      setAssetDetail(_asset);
      setEditAssetDialog(false);
      setNewAssetDialog(false);

      setAsset(emptydataTable);
    }
    setImages([]);
    setImageURLs([]);
    console.log('null ???');
    console.log(asset);
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.asset_status}
        severity={getSeverity(rowData.asset_status)}
      />
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
        break;
      case 'รอซ่อม':
        return 'warning';
        break;
      case 'สิ้นสภาพ':
        return 'danger';
        break;
      case 'แทงจำหน่าย':
        return 'disposal';
        break;
    }
  };

  const useableBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.asset_useable}
        severity={getUseable(rowData.asset_useable)}
      />
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
    console.log(asset.asset_stock);
    setEditAssetDialog(true);
  };

  const showAsset = (rowData) => {
    setAsset({ ...rowData });
    setShowAssetDialog(true);
    // AssetService.getAssetByID(rowData.asset_id)
    //   .then((data) => {
    //     console.log('data in api');
    //     console.log(data);
    //     setAsset(data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
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

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          outlined
          icon="pi pi-search"
          //   rounded
          //   style={{ fontSize: '16px' }}
          className="firstBnt mr-2 "
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
      </div>
    </div>
  );
  const newAssetDialogFooter = (
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
        onClick={saveNewAsset}
      />
    </React.Fragment>
  );
  const upDateAssetDialogFooter = (
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
        onClick={saveUpDateAsset}
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
            Edit Asset
          </span>
          <span className="pl-2  text-gray-400">แก้ไขครุภัณฑ์</span>
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
                body={actionBodyTemplate}
                // headerStyle={{ minWidth: '10rem' }}
                style={{ minWidth: '8rem' }}
              ></Column>
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
                field="asset_status"
                header="สภาพ"
                sortable
                filter
                showFilterMatchModes={false}
                body={statusBodyTemplate}
                filterElement={statusRowFilterTemplate}
                style={{ minWidth: '4rem' }}
              ></Column>
              <Column
                field="asset_useable"
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
        <div>
          <h2>Upload Images</h2>
          <div className="server-message"></div>
        </div>
        <div className="input-div">
          <p>
            Drag & Drop images here to <span className="borwse">Browse</span>
          </p>
        </div>
        <div className="card p-4">
          <h1 className="text-kmuttColor-800 py-2">ข้อมูลครุภัณฑ์</h1>
          <div className="grid grid-cols-4 gap-4">
            <div className="field col-start-1">
              <label htmlFor="name" className="font-bold">
                ลำดับที่
              </label>
              <InputNumber
                id="no"
                useGrouping={false}
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
                <InputNumber
                  useGrouping={false}
                  id="asset_year"
                  disabled
                  value={asset.asset_year}
                />
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
                  placeholder={asset.asset_stock}
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
                  placeholder={asset.asset_status}
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
                  placeholder={asset.asset_useable}
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
                  //   optionLabel="name"
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

      {/*new asset */}
      <Dialog
        visible={newAssetDialog}
        style={{ width: '64rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header="เพิ่มครุภัณฑ์ใหม่"
        modal
        className="p-fluid"
        footer={newAssetDialogFooter}
        onHide={hideDialog}
      >
        <div className="card p-4">
          <div class="md:flex">
            <div class="w-full">
              <div class="flex items-center  p-3">
                <div class="mb-2 pr-10">
                  <div class="relative h-10 w-32 rounded-lg border-dashed border-2 border-gray-200 bg-white flex justify-center items-center hover:cursor-pointer">
                    <div class="absolute">
                      <div class="flex flex-col items-center ">
                        <i class="fa fa-cloud-upload fa-3x text-gray-200"></i>

                        <span class="block text-blue-400 font-normal">
                          เลือกรูปภาพ
                        </span>
                      </div>
                    </div>
                    <input
                      type="file"
                      class="h-full w-full opacity-0"
                      multiple="multiple"
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={onImageChange}
                    />
                  </div>
                  <div class="flex  justify-between items-center text-gray-400">
                    <span>เฉพาะ *png *jpeg *jpg</span>
                  </div>
                </div>
                <div class="">
                  <div class="flex pl-1 justify-between items-center text-gray-400">
                    <span>รูปภาพที่เลือก</span>
                  </div>
                </div>
              </div>
              <div class="flex justify-start w-full">
                {imageURLs.map((imageSrc, index) => (
                  <div
                    key={index}
                    style={{
                      width: '120px',
                      height: '120px',
                      overflow: 'hidden',
                      padding: '4px',
                    }}
                  >
                    <img
                      src={imageSrc}
                      alt={`Image ${index + 1}`}
                      style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* <form onSubmit={formHandler}>
            <input type="file" className="input" />
            <button type="submit">Upload</button>
          </form>{' '}
          <hr />
          <h2>Uploading done {progress}%</h2> */}
        </div>

        <div className="card p-4">
          <h1 className="text-kmuttColor-800 py-2">ข้อมูลครุภัณฑ์</h1>
          <div className="grid grid-cols-4 gap-4">
            <div className="field col-start-1">
              <label htmlFor="asset_order" className="font-bold">
                ลำดับที่
              </label>
              <InputNumber
                id="asset_order"
                value={assetLstOrder}
                useGrouping={false}
                placeholder={assetLstOrder}
                onChange={(e) => onInputChangeNumber(e, 'asset_order')}
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
                // disabled
                value={asset.asset_id}
                onChange={(e) => onInputChange(e, 'asset_id')}
                required
              />
            </div>

            <div className="formgrid grid">
              <div className="field col">
                <label htmlFor="asset_year" className="font-bold">
                  ปีงบประมาณ
                </label>
                <InputNumber
                  id="asset_year"
                  useGrouping={false}
                  value={asset.asset_year}
                  onChange={(e) => onInputChangeNumber(e, 'asset_year')}
                />
              </div>
            </div>

            <div className="field col-start-3 col-end-5">
              <label htmlFor="room_id" className="font-bold">
                ประจำที่
              </label>
              <InputText
                id="room_id"
                value={asset.room_id}
                placeholder={asset.room_id}
                onChange={(e) => onInputChange(e, 'room_id')}
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
              <label htmlFor="asset_stock" className="font-bold">
                สถานะ
              </label>
              <div className="card flex justify-content-center">
                <Dropdown
                  id="asset_stock"
                  value={asset.asset_stock}
                  placeholder={asset.asset_stock}
                  onChange={(e) => handleOptionChange(e, 'asset_stock')}
                  options={assetStock}
                  //   optionLabel="name"
                  className="w-full md:w-14rem"
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="asset_status" className="font-bold">
                สภาพ
              </label>
              <div className="card flex justify-content-center">
                <Dropdown
                  id="asset_status"
                  value={asset.asset_status}
                  placeholder={asset.asset_status}
                  onChange={(e) => handleOptionChange(e, 'asset_status')}
                  options={assetStatus}
                  //   optionLabel="name"
                  className="w-full md:w-14rem"
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="asset_useable" className="font-bold">
                การใช้งาน
              </label>
              <div className="card flex justify-content-center">
                <Dropdown
                  id="asset_useable"
                  value={asset.asset_useable}
                  placeholder={asset.asset_useable}
                  onChange={(e) => handleOptionChange(e, 'asset_useable')}
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
                  //   optionLabel="name"
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

      {/* edit asset */}
      <Dialog
        visible={editAssetDialog}
        style={{ width: '64rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header="แก้ไขครุภัณฑ์"
        modal
        className="p-fluid"
        footer={upDateAssetDialogFooter}
        onHide={hideDialog}
      >
        <div class="md:flex">
          <div class="w-full">
            <div class="p-3">
              <div class="mb-2">
                <div class="relative h-40 rounded-lg border-dashed border-2 border-gray-200 bg-white flex justify-center items-center hover:cursor-pointer">
                  <div class="absolute">
                    <div class="flex flex-col items-center ">
                      <i class="fa fa-cloud-upload fa-3x text-gray-200"></i>

                      <span class="block text-blue-400 font-normal">
                        เลือกรูปภาพ
                      </span>
                    </div>
                  </div>
                  <input
                    type="file"
                    class="h-full w-full opacity-0"
                    multiple="multiple"
                    accept="image/png, image/jpeg, image/jpg"
                  />
                </div>
                <div class="flex justify-between items-center text-gray-400">
                  <span>เฉพาะ *png *jpeg *jpg</span>
                </div>
              </div>

              <div class="mt-3 text-center pb-3">
                <button class="w-full h-12 text-lg w-32 bg-blue-600 rounded text-white hover:bg-blue-700">
                  Create
                </button>
              </div>
              <div>show image</div>
              <form id="queued-form">
                <div class="header">
                  <h3>Queued In Frontend</h3>
                </div>
                <div class="queued-div"></div>
              </form>
            </div>
          </div>
        </div>

        <div className="card p-4">
          <h1 className="text-kmuttColor-800 py-2">ข้อมูลครุภัณฑ์</h1>
          <div className="grid grid-cols-4 gap-4">
            <div className="field col-start-1">
              <label htmlFor="name" className="font-bold">
                ลำดับที่
              </label>
              <InputNumber
                id="order"
                useGrouping={false}
                value={asset.asset_order}
                onChange={(e) => onInputChangeNumber(e, 'asset_order')}
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
              />
            </div>

            <div className="formgrid grid">
              <div className="field col">
                <label htmlFor="year" className="font-bold">
                  ปีงบประมาณ
                </label>
                <InputNumber
                  id="asset_year"
                  useGrouping={false}
                  onChange={(e) => onInputChangeNumber(e, 'asset_year')}
                  value={asset.asset_year}
                />
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
              />
            </div>

            <div className="field">
              <label htmlFor="asset_stock" className="font-bold">
                สถานะ
              </label>
              <div className="card flex justify-content-center">
                <Dropdown
                  id="asset_stock"
                  value={asset.asset_stock}
                  placeholder={asset.asset_stock}
                  onChange={(e) => handleOptionChange(e, 'asset_stock')}
                  options={assetStock}
                  //   optionLabel="name"
                  className="w-full md:w-14rem"
                />
              </div>
            </div>
            <div className="field">
              <div className="field">
                <label htmlFor="asset_status" className="font-bold">
                  สภาพ
                </label>
                <div className="card flex justify-content-center">
                  <Dropdown
                    id="asset_status"
                    value={asset.asset_status}
                    placeholder={asset.asset_status}
                    onChange={(e) => handleOptionChange(e, 'asset_status')}
                    options={assetStatus}
                    // optionLabel="name"
                    className="w-full md:w-14rem"
                  />
                </div>
              </div>
            </div>
            <div className="field">
              <label htmlFor="asset_useable" className="font-bold">
                การใช้งาน
              </label>
              <div className="card flex justify-content-center">
                <Dropdown
                  id="asset_useable"
                  value={asset.asset_useable}
                  placeholder={asset.asset_useable}
                  onChange={(e) => handleOptionChange(e, 'asset_useable')}
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
                  //   optionLabel="name"
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
