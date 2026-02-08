import * as React from 'react';
import SearchHeader from "./SearchHeader";
import { Box, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Checkbox, Pagination, Stack } from '@mui/material';
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import { visuallyHidden } from '@mui/utils';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';




function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function DataTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headCells } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" sx={{ width: 30, minWidth: 30 }}>
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='center'
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              width: headCell.width,
              minWidth: headCell.width,
              maxWidth: headCell.width,
            }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function DataTableTable({ pageInfo, headCells, rows, searchConfig, labelConfig, writeFunc }) {
  const [order, setOrder] = React.useState('asc'); //정렬방향
  const [orderBy, setOrderBy] = React.useState('num'); //정렬기준
  const [selected, setSelected] = React.useState([]); //체크박스 선택값
  const [page, setPage] = React.useState(0); //현재 페이지 번호
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10); //페이지당 표시 갯수

  //검색 상태 정의
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [searchCondition, setSearchCondition] = React.useState('all');
  const [searchText, setSearchText] = React.useState('');

  //검색란 버튼 관리
  const [write, setWrite] = React.useState(false);

  const searchOptions = pageInfo?.searchList
    ? Object.entries(pageInfo.searchList)
    : [];

  const statusOptions = pageInfo?.statusList
    ? Object.entries(pageInfo.statusList)
    : [];

  const handleSearchConditionChange = (event) => {
    setSearchCondition(event.target.value);
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearch = () => {
    // 실제 검색 로직 (API 호출 등)이 들어갈 위치
    console.log('검색 실행:', {
      startDate,
      endDate,
      searchCondition,
      searchText
    });
    setPage(0); // 검색 시 첫 페이지로 이동
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.num);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage - 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  // 데이터 가공 및 렌더링
  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), //현재페이지에 해당하는 데이터만 잘라냄
    [order, orderBy, page, rowsPerPage, rows],
  );
  const pageCount = Math.ceil(rows.length / rowsPerPage);

  const renderCellValue = (value) => { if (value === null || value === undefined || value === "") { return "-"; } return value; };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          dateFormats={{ keyboardDate: 'YYYY-MM-DD' }}
        >
          <SearchHeader
            searchConfig={searchConfig} // 설정값 전달
            startDate={startDate} setStartDate={setStartDate}
            endDate={endDate} setEndDate={setEndDate}
            searchCondition={searchCondition}
            // handleSearchConditionChange={handleSearchConditionChange}
            handleSearchConditionChange={(e) => setSearchCondition(e.target.value)}
            searchText={searchText}
            handleSearchTextChange={handleSearchTextChange}
            searchOptions={searchOptions}
            statusOptions={statusOptions}
            statusLabel={labelConfig.statusLabel}
            searchLabel={labelConfig.searchLabel}
            handleSearch={handleSearch}
            onWriteClick={() => writeFunc()}
          />
        </LocalizationProvider>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <DataTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={headCells}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row.num);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.num}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        onChange={(event) => handleClick(event, row.num)}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    {headCells.map((headCell, cellIndex) => (
                      <TableCell
                        key={headCell.id}
                        // 첫 번째 셀 (번호)에만 scope="row"와 component="th"를 적용
                        component={cellIndex === 0 ? "th" : "td"}
                        scope={cellIndex === 0 ? "row" : undefined}
                        id={cellIndex === 0 ? labelId : undefined}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        align={headCell.align || 'left'}
                        sx={{
                          width: headCell.width,
                          minWidth: headCell.width,
                          maxWidth: headCell.width,
                        }}
                      >
                        {renderCellValue(row[headCell.id])}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={headCells.length + 1} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack spacing={2} sx={{
          mt: 2,
          p: 2,
          alignItems: 'center'
        }}>
          <Pagination
            count={pageCount}
            page={page + 1}
            onChange={handleChangePage}
            showFirstButton
            showLastButton
          />
        </Stack>
      </Paper>
    </Box>
  );
}

