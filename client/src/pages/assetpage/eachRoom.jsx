import React, { useState, useEffect, useRef } from 'react';
import downloadImages from '../api/DownLoadImage';
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
import { AssetService } from '../../service/AssetService';
import { EachRoomService } from '../../service/EachRoomService';

export default function AllAsset() {
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

  const [assets, setAssets] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const [dropdownRooms, setDropdownRooms] = useState(null);
  const [dropdownAllRooms, setDropdownAllRooms] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [allType, setAllType] = useState(null);

  const [asset, setAsset] = useState([]);
  const [assetImages, setAssetImages] = useState([]);
  const [showAssetDialog, setShowAssetDialog] = useState(false);

  useEffect(() => {
    if (selectedRoom == null || selectedRoom == 'ทั้งหมด') {
      EachRoomService.getAllRoom().then((data) => setDropdownRooms(data));
      AssetService.getAllAsset().then((data) => setAssets(data));
    } else {
      EachRoomService.getAssetByRoom(selectedRoom).then((data) =>
        setAssets(data)
      );
      console.log(selectedRoom);
    }
  }, [selectedRoom]);

  useEffect(() => {
    const fetchData = async () => {
      let data;
      data = await EachRoomService.getNumberTypeAll();
      console.log(data);
      return data;
    };
    fetchData().then((data) => {
      setAllType(data);
    });
  }, []);

  const handleSelectedRoom = (e) => {
    console.log('e.value');
    console.log(e.value);
    setSelectedRoom(e.value);
  };

  const [statuses] = useState(['ใช้งานได้', 'รอซ่อม', 'สิ้นสภาพ']);
  const [useable] = useState(['ใช้งาน', 'ไม่ได้ใช้งาน']);

  const hideDialog = () => {
    setShowAssetDialog(false);
  };

  const addAllOptionsDropdown = () => {
    let _rooms = [...dropdownRooms];
    _rooms = _rooms.filter((value) => value !== null);
    _rooms.unshift('ทั้งหมด');
    setDropdownAllRooms(_rooms);
    // return _rooms;
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

  const getUseable = (useable) => {
    switch (useable) {
      case 'ใช้งาน':
        return 'success';

      case 'ไม่ได้ใช้งาน':
        return 'danger';
    }
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
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          outlined
          icon="pi pi-search"
          //   rounded
          //   style={{ fontSize: '16px' }}
          className="firstBnt mr-1 "
          onClick={() => showAsset(rowData)}
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
          <div className="card flex justify-content-center">
            <Dropdown
              value={selectedRoom}
              onClick={addAllOptionsDropdown}
              onChange={(e) => handleSelectedRoom(e)}
              options={dropdownAllRooms}
              placeholder="ทั้งหมด"
              style={{ width: '400px' }}
            />
          </div>
        </span>
      </div>
    </div>
  );

  return (
    <div>
      <Toast ref={toast} />
      <div className="mt-12">
        <div className="pb-10">
          <span className="pl-32 font-bold  text-4xl text-gray-600 items-start">
            Asset For Each Room
          </span>
          <span className="pl-2  text-gray-400">ครุภัณฑ์ตามห้อง</span>
        </div>
        <div className="flex justify-center h-full ">
          <div className=" bg-white h-5/6 rounded-xl w-9/12 labtop:m-0 px-8 pt-8 m-3 ">
            <DataTable
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
                style={{ minWidth: '2rem' }}
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

      <div className="m-16"></div>

      <div className="mt-12">
        <div className="pb-10">
          <span className="pl-32 font-bold  text-4xl text-gray-600 items-start">
            สรุปครุภัณฑ์ตามห้อง
          </span>
        </div>
        <div className="flex justify-center h-full ">
          <div className=" bg-white h-5/6 rounded-xl w-9/12 labtop:m-0 px-8 pt-8 pb-8 m-3 ">
            <DataTable
              value={allType}
              dataKey="id"
              rows={10}
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
              className="actionRow typeTable"
              scrollable
              tableStyle={{ minHeight: '5rem', height: '10rem' }}
            >
              <Column
                field="category_name"
                header="ประเภท"
                style={{ minWidth: '30rem' }}
              ></Column>

              <Column
                field="total_asset"
                header="จำนวน"
                style={{ minWidth: '4rem' }}
              ></Column>
            </DataTable>
          </div>
        </div>
      </div>

      <div className="m-16">
        <p className="text-gray-700 text-center  m-16"> 2023 Final Project </p>
      </div>
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
    </div>
  );
}
