import axios from 'axios';
export const AdminService = {
  getAllAdamin() {
    return axios.get('/admin').then((res) => res.data.data);
  },

  getAdminByID(id) {
    return axios.get(`/admin/${id}`).then((res) => res.data.data);
  },
  
  createAdmin(adminData) {
    return axios.post('/admin/create', adminData).then((res) => {
    console.log(res.data);
    fetch("http://localhost:5000/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ admin_email: adminData.admin_email}),
      }).then(() => true)
      ;
     
      
  });
  },
};
