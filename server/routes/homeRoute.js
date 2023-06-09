import express from 'express';
import controller from '../controllers/homeController.js';

const router = express.Router();

router.get(
  '/number/notebook',
  controller.numberStatusController.getNumberNotebookList
);
router.get(
  '/status/a/notebook',
  controller.numberStatusController.getStatusNotebookAList
);
router.get(
  '/status/b/notebook',
  controller.numberStatusController.getStatusNotebookBList
);
router.get(
  '/status/c/notebook',
  controller.numberStatusController.getStatusNotebookCList
);

router.get(
  '/number/tablet',
  controller.numberStatusController.getNumberTabletList
);
router.get(
  '/status/a/tablet',
  controller.numberStatusController.getStatusTabletAList
);
router.get(
  '/status/b/tablet',
  controller.numberStatusController.getStatusTabletBList
);
router.get(
  '/status/c/tablet',
  controller.numberStatusController.getStatusTabletCList
);

export default router;
