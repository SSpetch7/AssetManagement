import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dialog } from 'primereact/dialog';
import { Tag } from 'primereact/tag';
import { InputText } from 'primereact/inputtext';
import { SelectButton } from 'primereact/selectbutton';
import { ToggleButton } from 'primereact/togglebutton';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  AssetService,
  AssetOptionService,
  UpdateAssetService,
} from '../../service/AssetService';

export default function Remove() {
  let emptydataTable = {
    asset_order: null,
    asset_id: '',
    asset_name: '',
    asset_year: '',
    gallery_id: null,
    detail: null,
    room_id: null,
    categoryID: null,
    category: '',
    subcategoryID: null,
    subcategory: '',
    asset_stock: '',
    asset_status: '',
    asset_useable: '',
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
  const [assetDetail, setAssetDetail] = useState(emptyDataAssetDetail);

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

  const [RemoveDialog, setRemoveDialog] = useState(false);
  const [ChangeStatusDialog, setChangeStatusDialog] = useState(false);

  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState(emptydataTable);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  const [statuses] = useState(['ใช้งานได้', 'รอซ่อม', 'สิ้นสภาพ']);
  const [useable] = useState(['ใช้งาน', 'ไม่ได้ใช้งาน']);
  const options = ['ใช้งานได้', 'รอซ่อม', 'สิ้นสภาพ'];
  const [toggleValue, setToggleValue] = useState(false);
  useEffect(() => {
    AssetService.getAllAsset().then((data) => setAssets(data));
  }, []);

  useEffect(() => {
    UpdateAssetService.updateAsset(
      assetDetail.asset_id,
      assetDetail,
      (error, updateAsset) => {
        if (error) {
          console.log('Error Status updating to DB admin:', error);
        } else {
          console.log('Assset Status updated to DB successfully:', updateAsset);
          console.log(assetDetail);
        }
      }
    );
  }, [assetDetail]);

  //   edit asset data

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _asset = { ...asset };

    let _assetDetail = { ...assetDetail };
    _assetDetail[`${name}`] = val;

    _asset[`${name}`] = val;

    setAsset(_asset);
  };

  const handleStatusChange = (e) => {
    console.log('e.value');
    console.log(e.value);
    let _asset = { ...asset };
    _asset[`asset_status`] = e.value;
    console.log('_asset');
    console.log(_asset);
    setAsset(_asset);
    // setSelectedStatus(e.value);
  };

  const openChangeStatusDialog = (rowData) => {
    setChangeStatusDialog(true);
    setAsset(rowData);
  };

  const openRemoveDialog = (rowData) => {
    setRemoveDialog(true);
    setAsset(rowData);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setNewAssetDialog(false);
    setEditAssetDialog(false);
    setShowAssetDialog(false);
    setChangeStatusDialog(false);
    setRemoveDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const saveChangeStatus = () => {
    let _assets = [...assets];
    let _asset = { ...asset };
    if (asset.asset_id) {
      const index = findIndexById(asset.asset_id);
      console.log(asset.asset_id + ' id');
      _assets[index] = _asset;
    }
    toast.current.show({
      severity: 'success',
      summary: 'Successful',
      detail: 'เปลี่ยนสถานะครุภัณฑ์สำเร็จ',
      life: 3000,
    });
    setAsset(_asset);
    setAssets(_assets);
    console.log(_asset);
    setAssetDetail(_asset);
    setChangeStatusDialog(false);
    setAsset(emptydataTable);
  };

  const saveRemove = () => {
    let _assets = [...assets];
    let _asset = { ...asset };

    if (_asset['asset_status'] !== 'แทงจำหน่าย') {
      _asset['asset_status'] = 'แทงจำหน่าย';
      _asset['asset_useable'] = 'ไม่ได้ใช้งาน';
      if (asset.asset_id) {
        const index = findIndexById(asset.asset_id);
        console.log(asset.asset_id + ' id');
        _assets[index] = _asset;
      }

      setAsset(_asset);
      setAssets(_assets);
      console.log('_asset after');
      console.log(_asset);
      setAssetDetail(_asset);
      setRemoveDialog(false);
      setAsset(emptydataTable);
      toast.current.show({
        severity: 'success',
        summary: 'Successful',
        detail: 'แทงจำหน่ายครุภัณฑ์สำเร็จ',
        life: 2000,
      });
    } else if (_asset['asset_status'] === 'แทงจำหน่าย') {
      setAsset(emptydataTable);
      setRemoveDialog(false);
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'ครุภัณฑ์อยู่ในสภาพแทงจำหน่าย',
        life: 2000,
      });
    }
  };
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          severity="info"
          style={{ marginRight: '10px' }}
          className="changeStatusBnt mr-2"
          size="small"
          icon="pi text-white pi-sync"
          onClick={() => openChangeStatusDialog(rowData)}
        />

        <Button
          style={{ backgroundColor: 'var(--orange-500)' }}
          severity="warning"
          className="mr-2"
          size="small"
          icon="pi text-white pi-exclamation-circle"
          onClick={() => openRemoveDialog(rowData)}
        />
      </React.Fragment>
    );
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

  const navigate = useNavigate()
  useEffect(() => {
    axios
      .get('http://localhost:5000')
      .then((res) => {
        if (res.data.Status === 'Success') {
          navigate('/AssetManage/edit');
        } else {
          navigate('/home');
        }
      })
      .then((err) => console.log(err))
  }, []);

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
    </div>
  );
  const changeStatusDialogFooter = (
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
        onClick={saveChangeStatus}
      />
    </React.Fragment>
  );
  const removeDialogFooter = (
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
        onClick={saveRemove}
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
            Disposal Asset
          </span>
          <span className="pl-2  text-gray-400">แทงจำหน่ายครุภัณฑ์</span>
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
                style={{
                  minWidth: '10rem',
                  flexWrap: 'nowrap',
                }}
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
      <div className="mt-12">
        <div className="pb-10">
          <span className="pl-32 font-bold  text-4xl text-gray-600 items-start">
            Disposaled Asset
          </span>
          <span className="pl-2  text-gray-400">ครุภัณฑ์ที่แทงจำหน่าย</span>
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
                style={{
                  minWidth: '10rem',
                  flexWrap: 'nowrap',
                }}
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

      <Dialog
        visible={RemoveDialog}
        style={{ width: '64rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header="แทงจำหน่ายครุภัณฑ์"
        modal
        className="p-fluid"
        footer={removeDialogFooter}
        onHide={hideDialog}
      >
        {/* <div className="field-checkbox">
          <h2>แทงจำหน่าย</h2>
          <ToggleButton
            checked={toggleValue}
            onChange={(e) => setToggleValue(e.value)}
            onLabel="Yes"
            offLabel="No"
          />
        </div> */}
        <div className="card">
          <div className="grid grid-cols-4 gap-4">
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
      <Dialog
        visible={ChangeStatusDialog}
        style={{ width: '64rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header="เปลี่ยนสถานะครุภัณฑ์"
        modal
        className="p-fluid"
        footer={changeStatusDialogFooter}
        onHide={hideDialog}
      >
        <div className="dialog-changeStatus card">
          <div className="grid grid-cols-4 gap-4">
            <div className="field col-start-1 col-end-5">
              <div className="flex card justify-content-center grid w-5/6 grid-rows-1 gap-4 pt-4 pb-4">
                <SelectButton
                  //   value={asset.s_id}
                  className="statusOptions"
                  options={options}
                  value={asset.asset_status}
                  onChange={handleStatusChange}
                />
                <div className="col-span-3 row-span-1"></div>
              </div>
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
    </div>
  );
}
