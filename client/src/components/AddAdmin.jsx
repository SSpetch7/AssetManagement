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
        label="เพิ่มผู้ดูแล"
        icon="pi pi-user"
        onClick={() => setVisible(true)}
        style={{ width: '120px' }}
      />
      <Dialog
        header="เพิ่มข้อมูลผู้ดูแล"
        visible={visible}
        style={{ width: '40vw' }}
        onHide={() => setVisible(false)}
        footer={footerContent}
      >
        <div className="flex flex-col pt-6">
          <div className="flex justify-center p-2">
            <Image
              src="https://media.discordapp.net/attachments/949160978145214484/1001939245566533795/unknown.png"
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
                  <InputText placeholder="ใส่ชื่อของผู้ดูแล" />
                </span>
              </div>
              <div className="mb-2 lg:col-6 lg:mb-0">
                <span className="p-input-icon-left">
                  <i className="pi pi-envelope" />
                  <InputText placeholder="Email" />
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
                    className="text-kmuttColor-800"
                  />
                </span>
              </div>
              <div className="col-6 mb-2 lg:col-6 lg:mb-0">
                <span className="p-input-icon-left">
                  <i className="pi pi-calendar" />
                  <InputText
                    disabled
                    placeholder="01/03/2566"
                    className="text-kmuttColor-800"
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
