import axios from 'axios';
export const AdminService = {
  getAllAdamin() {
    return axios.get('/admin').then((res) => res.data.data);
  },
  createAdmin(adminData) {
    return axios.post('/admin/create', adminData).then((res) => res.data);
  },
};
