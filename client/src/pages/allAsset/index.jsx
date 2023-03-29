import React, { useMemo, useState, useReducer, useRef } from 'react';
// import MaterialReactTable from 'material-react-table';
import MaterialReactTable, {
  MRT_FullScreenToggleButton,
  MRT_GlobalFilterTextField,
  MRT_ShowHideColumnsButton,
  MRT_TablePagination,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFiltersButton,
  MRT_ToolbarAlertBanner,
} from 'material-react-table';
import {
  alpha,
  Box,
  Button,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { Delete, Edit } from '@mui/icons-material';
import { dataTable } from '../../assets/dummy';

const AllAsset = () => {
  //we need a table instance ref to pass as a prop to the MRT Toolbar buttons
  const tableInstanceRef = useRef(null);

  //we will also need some weird re-render hacks to force the MRT_ components to re-render since ref changes do not trigger a re-render
  const rerender = useReducer(() => ({}), {})[1];

  //we need to manage the state that should trigger the MRT_ components in our custom toolbar to re-render
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [showColumnFilters, setShowColumnFilters] = useState(false);
  const columns = useMemo(
    () => [
      {
        accessorKey: 'order',
        header: 'ลำดับที่',
        size: 40,
      },
      {
        accessorKey: 'asset_id',
        header: 'หมายเลขครุภัณฑ์',
      },
      {
        accessorKey: 'name',
        header: 'ชื่อรายการ',
        size: 250,
      },
      {
        accessorKey: 'year',
        header: 'ปี',
        size: 120,
      },
      {
        accessorKey: 'status',
        header: 'สภาพ',
        size: 120,
      },
      {
        accessorKey: 'useable',
        header: 'การใช้',
        size: 120,
      },
      {
        accessorKey: 'room_id',
        header: 'ประจำที่',
        size: 120,
      },
    ],
    []
  );

  return (
    <div className="mt-12">
      <div className=" pb-10">
        <span className="pl-32 font-bold  text-4xl text-gray-600 items-start">
          All Asset
        </span>
        <span className="text-gray-400  pl-2">ครุภัณฑ์ทั้งหมด</span>
        <div className="flex justify-center h-full ">
          <div className=" bg-white h-5/6 rounded-xl w-9/12  px-8 pt-8 m-3 ">
            {tableInstanceRef.current && (
              <Toolbar
                sx={(theme) => ({
                  //   backgroundColor: 'white',
                  borderRadius: '4px',
                  display: 'flex',
                  flexDirection: {
                    xs: 'column',
                    lg: 'row',
                  },
                  gap: '1rem',
                  justifyContent: 'space-between',
                  p: '1.5rem 0',
                })}
              >
                <MRT_GlobalFilterTextField table={tableInstanceRef.current} />
              </Toolbar>
            )}
            <>
              <MaterialReactTable
                columns={columns}
                data={dataTable}
                enableRowActions
                positionActionsColumn="last"
                enableBottomToolbar={false}
                enableTopToolbar={false}
                enableColumnActions={false}
                initialState={{
                  showGlobalFilter: true,
                }}
                muiTablePaginationProps={{
                  rowsPerPageOptions: false,
                }}
                muiTableContainerProps={{
                  sx: { maxHeight: '650px', minHeight: '650px' },
                }}
                onPaginationChange={(updater) => {
                  setPagination((prev) =>
                    updater instanceof Function ? updater(prev) : updater
                  );
                  queueMicrotask(rerender); //hack to rerender after state update
                }}
                onShowFiltersChange={(updater) => {
                  setShowColumnFilters((prev) =>
                    updater instanceof Function ? updater(prev) : updater
                  );
                  queueMicrotask(rerender); //hack to rerender after state update
                }}
                state={{
                  pagination,
                  showColumnFilters,
                }}
                tableInstanceRef={tableInstanceRef}
                renderRowActions={({ row, table }) => (
                  <Box
                    sx={{
                      display: 'flex',
                      //   gap: '8px',
                    }}
                  >
                    <div className="flex pr-2">
                      {/* <IconButton>
                        <Edit />
                    </IconButton> */}
                      <button className="bg-kmuttColor-borrowBt text-white rounded-full w-10">
                        ยืม
                      </button>
                    </div>
                    <div className="flex pr-2">
                      {/* <IconButton color="success"> */}
                      <button className="bg-kmuttColor-editBt text-white rounded-full w-10">
                        แก้ไข
                      </button>
                      {/* </IconButton> */}
                    </div>
                  </Box>
                )}
              />
            </>
            {/* Our Custom Bottom Toolbar */}
            {tableInstanceRef.current && (
              <Toolbar
                sx={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  flexDirection: 'column',
                }}
              >
                <MRT_TablePagination table={tableInstanceRef.current} />
                <Box
                  sx={{
                    display: 'grid',
                    width: '100%',
                    backgroundColor: 'red',
                  }}
                >
                  <MRT_ToolbarAlertBanner
                    stackAlertBanner
                    table={tableInstanceRef.current}
                  />
                </Box>
                {/* <Pagination count={5} shape="rounded" /> */}
              </Toolbar>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllAsset;
