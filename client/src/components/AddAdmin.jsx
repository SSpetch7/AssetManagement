import React, { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Image } from 'primereact/image';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { classNames } from 'primereact/utils';
import { AdminService } from '../service/AdminService';

export default function AddUser() {
  const [newAdmin, setNewAdmin] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [visible, setVisible] = useState(false);

  function validateEmail(email) {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    return emailRegex.test(email);
  }

  const [resetSent, setResetSent] = useState(false);

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setNewAdmin.admin_email(inputValue);
    setIsValidEmail(validateEmail(inputValue));
  };
  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _newAdmin = { ...newAdmin };
    _newAdmin[`${name}`] = val;

    setNewAdmin(_newAdmin);
  };

  let emptydataAmdmin = {
    admin_username: '',
    admin_email: '',
  };
  const openNew = () => {
    setNewAdmin('');
    setSubmitted(false);
    setVisible(true);
  };
  const saveAdmin = () => {
    setSubmitted(true);
    AdminService.createAdmin(newAdmin);
    setResetSent(true);
    setVisible(false);
  };

  const hideDialog = () => {
    setVisible(false);
  };


  const createEmail = () => {};

  const footerContent = (
    <div>
      <Button
        label="บันทึก"
        className="p-Testbutton"
        icon="pi pi-check"
        // text
        onClick={(e) => { 
          saveAdmin()
       }}
      />
    </div>
  );
  const toast = useRef(null);

  const onUpload = () => {
    toast.current.show({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded',
    });
  };

  return (
    <>
    {!resetSent ? (
    <>
    <div className="card flex justify-content-center">
      <Button
        className="p-Addbutton"
        label="เพิ่มผู้ดูแล"
        icon="pi pi-user"
        onClick={openNew}
        style={{ width: '120px' }}
      />
      <Dialog
        header="เพิ่มข้อมูลผู้ดูแล"
        visible={visible}
        modal
        style={{ width: '40vw' }}
        onHide={hideDialog}
        footer={footerContent}
      >
        <div className="flex flex-col pt-6">
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
              onUpload={onUpload}
              auto
              chooseLabel="อัพโหลดรูป"
            />
          </div>

          <div className="content-evenly mt-4 ">
            <div className="flex justify-evenly py-4 ">
              <div className="flex mb-2 lg:col-6 lg:mb-0 field col-start-1">
                <div className="p-input-icon-left">
                  <i className="pi pi-user" />
                  <InputText
                    required
                    className="inputForm"
                    placeholder="ใส่ชื่อของผู้ดูแล"
                    value={newAdmin.admin_username}
                    onChange={(e) => onInputChange(e, 'admin_username')}
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
                    placeholder="Email"
                    id="email"
                    value={newAdmin.admin_email}
                    onChange={(e) => {onInputChange(e, 'admin_email')
                  
                  }}
                    className={classNames({
                      'p-invalid': submitted && !newAdmin.admin_email,
                    })}
                  />
                  {submitted && !newAdmin.admin_email && (
                    <small className="p-error">Email is required.</small>
                  )}
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
                    placeholder={date}
                    className="inputForm text-kmuttColor-800"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
    </>
    ) : (
      <h1>Password reset email sent. Please check your email.</h1>
    )}
    </>
  );
}
