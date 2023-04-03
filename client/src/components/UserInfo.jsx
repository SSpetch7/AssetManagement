import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { TabView, TabPanel } from "primereact/tabview";
import { Image } from "primereact/image";
import { InputText } from "primereact/inputtext";



export default function UserInfo() {
  const [visible, setVisible] = useState(false);
  const footerContent = (
    <div>
        <Button label="บันทึก" className="p-Testbutton" icon="pi pi-check" onClick={() => setVisible(false)} autoFocus />
    </div>
);

  return (
    <div className="card flex justify-content-center">
      <Button
        label="ข้อมูลผู้ใช้"
        icon="pi pi-info"
        onClick={() => setVisible(true)}
      />
      <Dialog
        header="ข้อมูลผู้ใช้"
        visible={visible}
        style={{ width: "40vw" }}
        onHide={() => setVisible(false)} footer={footerContent}
      >
        
        <TabView>
            <TabPanel header="ข้อมูลผู้ใช้">
              <div className="flex flex-col pt-6">
              <div className="flex justify-center">
                <div className="">
                  <Image
                    src="https://media.discordapp.net/attachments/949160978145214484/1085121002641563669/IMG_20230314_154307.jpg?width=482&height=482"
                    alt="Image"
                    width="150"
                    preview
                  />
                </div>
            
              </div>
              
             
                <div className="content-evenly mt-4 ">
                  <div className="flex justify-evenly py-4">
                    <div className="mb-2 lg:col-6 lg:mb-0">
                      <span className="p-input-icon-left">
                        <i className="pi pi-user" />
                        <InputText placeholder="เจ" />
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
                        <i className="pi pi-book" />
                        <InputText placeholder="สาขาวิชา" />
                      </span>
                    </div>
                    <div className="col-6 mb-2 lg:col-6 lg:mb-0">
                      <span className="p-input-icon-left">
                        <i className="pi pi-building" />
                        <InputText placeholder="ประจำห้องที่" />
                      </span>
                    </div>
                  </div>
</div>
 
              </div>
            </TabPanel>
            <TabPanel header="บันทึกการยืม">
              <p>Table</p>
            </TabPanel>
          </TabView>
        
  
      </Dialog>
    </div>
  );
}

