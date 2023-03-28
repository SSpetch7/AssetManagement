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

const data = [
  {
    name: {
      firstName: 'John',
      lastName: 'Doe',
    },
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
  },
  {
    name: {
      firstName: 'John',
      lastName: 'Doe',
    },
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
  },
  {
    name: {
      firstName: 'John',
      lastName: 'Doe',
    },
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
  },
  {
    name: {
      firstName: 'John',
      lastName: 'Doe',
    },
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
  },
  {
    name: {
      firstName: 'John',
      lastName: 'Doe',
    },
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
  },
  {
    name: {
      firstName: 'John',
      lastName: 'Doe',
    },
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
  },
  {
    name: {
      firstName: 'John',
      lastName: 'Doe',
    },
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
  },

  {
    name: {
      firstName: 'Jane',
      lastName: 'Doe',
    },
    address: '769 Dominic Grove',
    city: 'Columbus',
    state: 'Ohio',
  },
  {
    name: {
      firstName: 'Joe',
      lastName: 'Doe',
    },
    address: '566 Brakus Inlet',
    city: 'South Linda',
    state: 'West Virginia',
  },
  {
    name: {
      firstName: 'Kevin',
      lastName: 'Vandy',
    },
    address: '722 Emie Stream',
    city: 'Lincoln',
    state: 'Nebraska',
  },
  {
    name: {
      firstName: 'Joshua',
      lastName: 'Rolluffs',
    },
    address: '32188 Larkin Turnpike',
    city: 'Charleston',
    state: 'South Carolina',
  },
];

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
        accessorKey: 'name.firstName', //access nested data with dot notation
        header: 'First Name',
      },
      {
        accessorKey: 'name.lastName',
        header: 'Last Name',
      },
      {
        accessorKey: 'address', //normal accessorKey
        header: 'Address',
      },
      {
        accessorKey: 'city',
        header: 'City',
      },
      {
        accessorKey: 'state',
        header: 'State',
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
            <MaterialReactTable
              columns={columns}
              data={data}
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
                sx: { maxHeight: '600px', minHeight: '600px' },
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
              tableInstanceRef={tableInstanceRef} //get access to the underlying table instance ref
            />
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
                <Box sx={{ display: 'grid', width: '100%' }}>
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
