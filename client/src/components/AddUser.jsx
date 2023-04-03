import React, { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Image } from 'primereact/image';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';

export default function AddUser() {
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
  const toast = useRef(null);

  const onUpload = () => {
    toast.current.show({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded',
    });
  };

  return (
    <div className="card flex justify-content-center">
      <Button
        className="p-Addbutton"
        label="เพิ่มผู้ใช้"
        icon="pi pi-user"
        style={{ width: '120px' }}
        onClick={() => setVisible(true)}
      />
      <Dialog
        header="เพิ่มข้อมูลผู้ใช้"
        visible={visible}
        style={{ width: '40vw' }}
        onHide={() => setVisible(false)}
        footer={footerContent}
      >
        <div className="flex flex-col pt-6">
          <div className="flex justify-center p-2">
            <Image
              src="https://primefaces.org/cdn/primereact/images/galleria/galleria7.jpg"
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
            <div className="flex justify-evenly py-4">
              <div className="mb-2 lg:col-6 lg:mb-0">
                <span className="p-input-icon-left">
                  <i className="pi pi-user" />
                  <InputText className="inputForm" placeholder="เจ" />
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
                  <i className="pi pi-book" />
                  <InputText className="inputForm" placeholder="สาขาวิชา" />
                </span>
              </div>
              <div className="col-6 mb-2 lg:col-6 lg:mb-0">
                <span className="p-input-icon-left">
                  <i className="pi pi-building" />
                  <InputText className="inputForm" placeholder="ประจำห้องที่" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
