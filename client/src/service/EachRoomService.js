import axios from 'axios';
export const EachRoomService = {
  getAllRoom() {
    return axios.get('/dropdown/room').then((res) => res.data.data);
  },
  getAssetByRoom(room) {
    return axios.get(`/dropdown/room/${room}`).then((res) => res.data.data);
  },
};
