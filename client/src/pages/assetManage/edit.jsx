import React, { useState, useEffect, useRef } from 'react';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../firebaseconfig';
import downloadImages from '../api/DownLoadImage';
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
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  AssetService,
  AssetOptionService,
  UpdateAssetService,
} from '../../service/AssetService';

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

  const [assetImages, setAssetImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState([]);
  // asset new data
  const [newAssetDialog, setNewAssetDialog] = useState(false);
  const [assetLstOrder, setAssetLstOrder] = useState();
  const [assetCreateNew, setAssetCreateNew] = useState(null);

  //  asset edit data
  const [asset, setAsset] = useState(emptydataTable);
  const [assetDetail, setAssetDetail] = useState(emptydataTable);

  // asset data
  const [assets, setAssets] = useState(null);
  const [assetType, setAssetType] = useState(null);
  const [assetComType, setAssetComType] = useState(null);

  const [subDisable, setSubDisable] = useState(true);

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

  const [stock] = useState(['มีให้ตรวจสอบ', 'ไม่มีให้ตรวจสอบ']);
  const [status] = useState(['ใช้งานได้', 'รอซ่อม', 'สิ้นสภาพ']);
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
    console.log('update image');
    console.log(selectedImage);
  }, [selectedImage]);

  useEffect(() => {
    AssetService.getAllAsset().then((data) => setAssets(data));
    // NumService.getLstOrderAsset().then((data) => setAssetLstOrder(data));
    // AssetService.getAssetByID().then((data) => setAssetID(data));

    AssetOptionService.getTypeAsset().then((data) => setAssetType(data));
    AssetOptionService.getTypeCom().then((data) => setAssetComType(data));
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

  const handleImageChange = (index, e) => {
    let newImage = '';

    setSelectedImage({ index: index, file: e.target.files[0] });
    newImage = URL.createObjectURL(e.target.files[0]);
    const updatedAssetImages = [...assetImages];
    updatedAssetImages[index] = newImage;
    console.log('updatedAssetImages');
    console.log(updatedAssetImages);
    console.log('assetImages');
    console.log(assetImages);
    // setSelectedImage([]);
    setAssetImages(updatedAssetImages);
  };

  const handleOptionChange = (e, name) => {
    let _asset = { ...asset };
    _asset[`${name}`] = e.value;
    if (name === 'category') {
      switch (e.value) {
        case 'สำนักงาน':
          _asset[`cate_id`] = 1;
          setSubDisable(true);
          _asset[`sub_id`] = null;
          _asset[`subcategory`] = null;
          break;
        case 'การศึกษา':
          _asset[`cate_id`] = 2;
          setSubDisable(true);
          _asset[`sub_id`] = null;
          _asset[`subcategory`] = null;
          break;
        case 'คอมพิวเตอร์':
          _asset[`cate_id`] = 3;
          setSubDisable(false);
          break;
        case 'อาคารสำนักงาน':
          _asset[`cate_id`] = 4;
          setSubDisable(true);
          _asset[`sub_id`] = null;
          _asset[`subcategory`] = null;
          break;
        case 'อื่น ๆ ':
          _asset[`cate_id`] = 5;
          setSubDisable(true);
          _asset[`sub_id`] = null;
          _asset[`subcategory`] = null;
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

    setAsset(_asset);
  };

  const uploadImages = (files, assetID) => {
    if (!files || files.length === 0) return;
    let count = 1;
    files.forEach((file) => {
      const storageRef = ref(storage, `${assetID}/${assetID}_image${count}`);
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
        }
      );
    });
    count = 0;
  };

  const upDateImage = async (assetID) => {
    let _selectedImage = { ...selectedImage };
    console.log('_selectedImage');
    console.log(_selectedImage);
    const storageRef = ref(
      storage,
      `${assetID}/${assetID}_image${_selectedImage.index + 1}`
    );
    try {
      await uploadBytesResumable(storageRef, _selectedImage.file);
      console.log('success');
    } catch (error) {
      console.error('Error uploading image:', error);
    }
    return null;
  };

  const openNew = () => {
    // NumService.getLstOrderAsset().then((data) => setAssetLstOrder(data));
    setAsset(emptydataTable);
    setSubmitted(false);
    setSubDisable(true);
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
    let Duplicate = '';
    setSubmitted(true);
    if (asset.asset_name.trim()) {
      let _assets = [...assets];
      let _asset = { ...asset };

      console.log('done done 2');

      Duplicate = _assets.some((obj) =>
        Object.values(obj).includes(_asset['asset_id'])
      );
      if (Duplicate) {
        toast.current.show({
          severity: 'error',
          summary: 'Error',
          detail: 'มีหมายเลขครุภัณฑ์นี้อยู่แล้ว',
          life: 3000,
        });
        setNewAssetDialog(false);
        setImages([]);
        setImageURLs([]);
        setAsset(emptydataTable);
        return null;
      }

      uploadImages(images, asset.asset_id);

      _assets.push(_asset);
      toast.current.show({
        severity: 'success',
        summary: 'Successful',
        detail: 'เพิ่มครุภัณฑ์ใหม่สำเร็จ',
        life: 3000,
      });
      setAssets(_assets);
      setAsset(_asset);
      console.log('_asset new');
      console.log(_asset);
      setAssetCreateNew(_asset);
      setNewAssetDialog(false);
      setAsset(emptydataTable);
    }
    setImages([]);
    setImageURLs([]);
    console.log('assetCreateNew');
    console.log(assetCreateNew);
  };

  const saveUpDateAsset = async () => {
    setSubmitted(true);
    let type = 'UPDATEASSET';
    if (asset.asset_name.trim()) {
      let _assets = [...assets];
      let _asset = { ...asset };

      if (asset.asset_id) {
        const index = findIndexById(asset.asset_id);
        console.log('if asset.asset_id');
        _assets[index] = _asset;

        await upDateImage(asset.asset_id);
        toast.current.show({
          severity: 'success',
          summary: 'Successful',
          detail: 'อัพเดทครุภัณฑ์สำเร็จ',
          life: 1000,
        });
      }
      setAssets(_assets);
      setAsset(_asset);
      setAssetDetail(_asset);
      setEditAssetDialog(false);
      setNewAssetDialog(false);

      setAsset(emptydataTable);
    }
    setSelectedImage([]);
    setImages([]);
    setImageURLs([]);
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
        options={status}
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
    downloadImages(rowData.asset_id)
      .then((imageURLs) => {
        setAssetImages(imageURLs);
        console.log(assetImages);
      })
      .catch((error) => {
        console.log('Error retrieving images:', error);
      });
    setSubDisable(true);
    setEditAssetDialog(true);
  };

  const showAsset = (rowData) => {
    setAsset({ ...rowData });
    setAssetImages([]);
    downloadImages(rowData.asset_id)
      .then((imageURLs) => {
        setAssetImages(imageURLs);
        console.log(assetImages);
      })
      .catch((error) => {
        console.log('Error retrieving images:', error);
      });
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

  const navigate = useNavigate();
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
      .then((err) => console.log(err));
    console.log('http://localhost:5000' + ' one');
  }, []);

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
        <div className="card p-4">
          <label htmlFor="name" className="font-bold">
            รูปภาพครุภัณฑ์
          </label>
          <div className="flex justify-center w-full">
            {assetImages.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Image ${index}`}
                style={{
                  overflow: 'hidden',
                  padding: '4px',
                  height: '200px',
                  width: 'auto',
                  margin: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                }}
              />
            ))}
          </div>
        </div>
        <div className="card p-4">
          {/* <h1 className="text-kmuttColor-800 py-2">ข้อมูลครุภัณฑ์</h1> */}
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
              //   placeholder={asset.detail}
              value={asset.detail}
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
                      overflow: 'hidden',
                      padding: '4px',
                      height: '200px',
                      width: 'auto',
                      margin: '10px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                    }}
                  >
                    {console.log(imageSrc, 'image new')}
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
          {/* <h2>Uploading done {progress}%</h2> */}
        </div>

        <div className="card p-4">
          {/* <h1 className=" font-bold text-2xl fon py-2">ข้อมูลครุภัณฑ์</h1> */}
          <div className="grid grid-cols-4 gap-4">
            <div className="field col-start-1">
              <label htmlFor="asset_order" className="font-bold">
                ลำดับที่
              </label>
              <InputNumber
                id="asset_order"
                value={asset.asset_order}
                useGrouping={false}
                onChange={(e) => onInputChangeNumber(e, 'asset_order')}
                required
                // autoFocus
                className={classNames({
                  'p-invalid': submitted && !asset.asset_order,
                })}
              />
              {submitted && !asset.asset_order && (
                <small className="p-error">กรุณากรอกลำดับที่ครุภัณฑ์</small>
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
                <small className="p-error">กรุณากรอกชื่อครุภัณฑ์</small>
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
                className={classNames({
                  'p-invalid': submitted && !asset.asset_id,
                })}
              />
              {submitted && !asset.asset_id && (
                <small className="p-error">กรุณากรอกหมายเลขครุภัณฑ์</small>
              )}
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
                <small className="p-error">กรุณากรอกประจำที่</small>
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
                  options={stock}
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
                  options={status}
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
                  options={useable}
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
                  disabled={subDisable}
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
              value={asset.detail}
              onChange={(e) => onInputChange(e, 'detail')}
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
        <div className="Edit-Imamge card p-4">
          <label htmlFor="name" className="font-bold">
            รูปภาพครุภัณฑ์
          </label>
          <div className="flex justify-center w-full">
            {assetImages.map((url, index) => (
              <div
                className="assetImage-upload"
                key={index}
                style={{
                  position: 'relative',
                }}
              >
                <div
                  key={index}
                  className="assetImage-edit"
                  style={{
                    position: 'absolute',
                    right: '12px',
                    zIndex: '1',
                    top: '10px',
                  }}
                >
                  <input
                    id={`imageUpload${index}`}
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    style={{ display: 'none' }}
                    onChange={(e) => handleImageChange(index, e)}
                  />
                  <label for={`imageUpload${index}`}>
                    <i className="icon-edit pl-2 pi pi-pencil"></i>
                  </label>
                </div>
                <div className="assetImage-preview">
                  <img
                    id="assetImagePreview"
                    src={url}
                    alt={`Image ${index}`}
                    style={{
                      overflow: 'hidden',
                      padding: '4px',
                      height: '200px',
                      width: 'auto',
                      margin: '10px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-4">
          {/* <h1 className="text-kmuttColor-800 py-2">ข้อมูลครุภัณฑ์</h1> */}
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
                  options={stock}
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
                    options={status}
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
                  options={useable}
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
                  disabled={subDisable}
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
              value={asset.detail}
              onChange={(e) => onInputChange(e, 'detail')}
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
