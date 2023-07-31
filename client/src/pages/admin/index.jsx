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
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Admin() {
  let emptyAdminTable = {
    amdin_id: null,
    admin_email: null,
    admin_username: null,
    addmin_addDate: null,
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
  const [editAdminDialog, setEditAdminDialog] = useState(false);

  const [newAdminDialog, setNewAdminDialog] = useState(false);
  const [newAdmin, setNewAdmin] = useState(emptyAdminTable);

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
    const date = new Date(rowData);
    const result = date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    return result;
  };

  const changeAdmin = (rowData) => {
    switch (rowData) {
      case 'Head_Admin':
        return 'หัวหน้าผู้ดูแล';

      case 'Admin':
        return 'ผู้ดูแล';
    }
  };

  const reformBodyTemplate = (rowData) => {
    return changeDate(rowData.admin_addDate);
  };

  const openNew = () => {
    setNewAdmin(emptyAdminTable);
    setNewAdminDialog(true);
    setSubmitted(false);
  };

  const hideDialog = () => {
    setNewAdminDialog(false);
    setSubmitted(false);
    setEditAdminDialog(false);
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
      setProduct(emptyAdminTable);
    }
  };

  const editProduct = (product) => {
    setProduct({ ...product });
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

  const saveNewAdmin = () => {
    setSubmitted(true);
    setNewAdminDialog(false);
  };

  const editAdmin = (rowData) => {
    setAdmin({ ...rowData });
    console.log(admin);
    setEditAdminDialog(true);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <>
        {role === 'Head_Admin' && (
          <React.Fragment>
            <Button
              icon="pi pi-pencil"
              //   rounded
              outlined
              className="editBnt mr-2"
              onClick={() => editAdmin(rowData)}
            />
          </React.Fragment>
        )}
      </>
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
      .then((err) => console.log(err));
  }, []);

  const navigate = useNavigate();
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
      .then((err) => console.log(err));
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
      {role === 'Head_Admin' && (
        <div className="flex gap-2">
          <Button
            className="p-Addbutton"
            label="เพิ่มผู้ดูแล"
            icon="pi pi-user"
            onClick={openNew}
            style={{ width: '120px' }}
          />
        </div>
      )}
    </div>
  );

  const imageBodyTemplate = (product) => {
    return (
      <img
        src="https://mindandculture.org/wordpress6/wp-content/uploads/2018/06/Fotolia_188161178_XS.jpg"
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

  const newAdminfooter = (
    <div>
      <Button
        label="ยืนยัน"
        className="p-Testbutton"
        icon="pi pi-check"
        // text
        onClick={saveNewAdmin}
      />
    </div>
  );
  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _newAdmin = { ...newAdmin };
    _newAdmin[`${name}`] = val;

    setNewAdmin(_newAdmin);
  };

  const roleBodyTemplate = (product) => {
    return (
      <Tag
        value={changeAdmin(product.role)}
        severity={getSeverity(product)}
      ></Tag>
    );
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
                // body={actionBodyTemplate}
                // headerStyle={{ minWidth: '10rem' }}
                style={{ minWidth: '1rem' }}
              ></Column>
              <Column
                // body={actionDelete}
                // headerStyle={{ minWidth: '10rem' }}
                style={{ minWidth: '1rem' }}
              ></Column>
            </DataTable>
          </div>
        </div>
      </div>

      <div className="m-16">
        <p className="text-gray-700 text-center  m-16"> 2023 Final Project </p>
      </div>
      <Dialog
        header="เพิ่มข้อมูลผู้ดูแล"
        visible={newAdminDialog}
        modal
        style={{ width: '40vw' }}
        onHide={hideDialog}
        footer={newAdminfooter}
      >
        <div className="flex flex-col pt-6">
          <Toast ref={toast} />
          <div className="flex justify-center p-2">
            <Image
              //   src="https://media.discordapp.net/attachments/949160978145214484/1001939245566533795/unknown.png"
              alt="Image"
              width="250"
            />
          </div>
          <div className="card flex justify-center">
            <Toast ref={toast}></Toast>
            <FileUpload
              mode="basic"
              name="demo[]"
              url="/api/upload"
              accept="image/*"
              maxFileSize={1000000}
              //   onUpload={onUpload}
              auto
              chooseLabel="อัพโหลดรูป"
            />
          </div>

          <div className="content-evenly mt-4 ">
            <div className="flex justify-evenly py-4 ">
              <div className="mb-2 lg:col-6 lg:mb-0 field col-start-1">
                <div className="p-input-icon-left">
                  <i className="pi pi-user" />
                  <InputText
                    required
                    // className="inputForm"
                    placeholder="ใส่ชื่อของผู้ดูแล"
                    value={newAdmin.admin_username}
                    onChange={(e) => onInputChange(e, 'admin_username')}
                    className={classNames({
                      'p-invalid': submitted && !newAdmin.admin_username,
                    })}
                  />
                  {submitted && !newAdmin.admin_username && (
                    <small className="p-error">user name is required.</small>
                  )}
                </div>
              </div>

              <div className="mb-2 lg:col-6 lg:mb-0">
                <span className="p-input-icon-left">
                  <i className="pi pi-envelope" />
                  <InputText
                    className="inputForm"
                    placeholder="Email"
                    id="email"
                    // value={newAdmin.admin_email}
                    // onChange={(e) => {
                    //   onInputChange(e, 'admin_email');
                    // }}
                  />
                  {/* {submitted && !newAdmin.admin_email && (
                    <small className="p-error">Email is required.</small>
                  )} */}
                </span>
              </div>
            </div>

            <div className="flex justify-evenly py-4">
              <div className="col-6 mb-2 lg:col-6 lg:mb-0">
                <span className="p-input-icon-left">
                  <i className="pi pi-lock" />
                  <InputText
                    disabled
                    placeholder="Admin"
                    className="inputForm text-kmuttColor-800"
                  />
                </span>
              </div>
              <div className="col-6 mb-2 lg:col-6 lg:mb-0">
                <span className="p-input-icon-left">
                  <i className="pi pi-calendar" />
                  <InputText
                    disabled
                    // placeholder={date}
                    className="inputForm text-kmuttColor-800"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
      <Dialog
        header="แก้ไขข้อมูลผู้ดูแล"
        visible={editAdminDialog}
        style={{ width: '40vw' }}
        onHide={hideDialog}
        footer={footerContent}
      >
        <div className="flex flex-col pt-6">
          <div className="flex justify-center p-2"></div>
          <div className="card flex justify-center">
            <Toast ref={toast}></Toast>
          </div>

          <div className="content-evenly mt-4 ">
            <div className="flex justify-evenly py-4">
              <div className="mb-2 lg:col-6 lg:mb-0">
                <span className="p-input-icon-left">
                  <i className="pi pi-user" />
                  <InputText
                    className="inputForm"
                    // placeholder={admin.admin_username}
                  />
                </span>
              </div>
              <div className="mb-2 lg:col-6 lg:mb-0">
                <span className="p-input-icon-left">
                  <i className="pi pi-envelope" />
                  <InputText className="inputForm" placeholder="Email" />
                </span>
              </div>
            </div>

            <div className="flex justify-evenly py-4">
              <div className="col-6 mb-2 lg:col-6 lg:mb-0">
                <span className="p-input-icon-left">
                  <i className="pi pi-lock" />
                  <InputText
                    disabled
                    placeholder="Admin"
                    className="inputForm text-kmuttColor-800"
                  />
                </span>
              </div>
              <div className="col-6 mb-2 lg:col-6 lg:mb-0">
                <span className="p-input-icon-left">
                  <i className="pi pi-calendar" />
                  <InputText
                    disabled
                    placeholder="01/03/2566"
                    className="inputForm text-kmuttColor-800"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
