// import Image from '../models/imgAssetModel.js';

// const imgController = {
//   async uploadImage(req, res) {
//     try {
//       const { file } = req;
//       const result = await Image.upload(file);

//       res.status(200).json(result);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Error uploading image' });
//     }
//   },

//   async getImage(req, res) {
//     try {
//       const { fileName } = req.params;
//       const downloadUrl = await Image.getDownloadUrl(fileName);

//       res.status(200).json({ downloadUrl });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Error getting image' });
//     }
//   },
// };

// export default imgController;
