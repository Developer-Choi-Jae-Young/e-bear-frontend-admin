import * as React from 'react';
import "./SearchHeader.css";
import Box from '@mui/material/Box';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



const SearchHeader = ({
    searchConfig, // 어떤 필드를 보여줄지 결정하는 객체
    startDate, setStartDate,
    endDate, setEndDate,
    searchCondition, handleSearchConditionChange,
    searchText, handleSearchTextChange,
    searchOptions,
    statusOptions,
    statusLabel,
    searchLabel,
    handleSearch,
    onWriteClick,
    onDeleteClick
}) => {
    return (
        <Box sx={{ p: 2, borderBottom: '1px solid #eee', display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>

            {/* 날짜 */}
            {searchConfig.showDate && (
                <>
                    <DatePicker
                        label="시작일" value={startDate}
                        onChange={(newValue) => setStartDate(newValue)}
                        slotProps={{ textField: { size: 'small', sx: { width: 150 } } }}
                    />
                    <Typography variant="body1">~</Typography>
                    <DatePicker
                        label="종료일" value={endDate}
                        onChange={(newValue) => setEndDate(newValue)}
                        slotProps={{ textField: { size: 'small', sx: { width: 150 } } }}
                    />
                </>
            )}

            {/* 검색 조건 드롭다운1 */}
            {searchConfig.showCondition && statusOptions && statusOptions.length > 0 && (
                <FormControl sx={{ minWidth: 100 }} size="small">
                    <InputLabel>{statusLabel}</InputLabel>
                    <Select value={searchCondition} label="상태" onChange={handleSearchConditionChange}>
                        {statusOptions.map(([key, label]) => (
                            <MenuItem key={key} value={key}>{label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}

            {/* 검색 조건 드롭다운2 */}
            {searchConfig.showCondition && searchOptions && searchOptions.length > 0 && (
                <FormControl sx={{ minWidth: 100 }} size="small">
                    <InputLabel>{searchLabel}</InputLabel>
                    <Select value={searchCondition} label="조건" onChange={handleSearchConditionChange}>
                        {searchOptions.map(([key, label]) => (
                            <MenuItem key={key} value={key}>{label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}

            {/* 검색어 입력창 */}
            {searchConfig.showText && (
                <TextField
                    size="small" label="내용" placeholder='검색어 입력'
                    value={searchText} onChange={handleSearchTextChange}
                />
            )}

            <Button variant="outlined" onClick={handleSearch} sx={{ backgroundColor: '#000', color: 'white' }}>검색</Button>

            <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
                {searchConfig.showDelete &&
                    <Button variant="outlined" color="black" onClick={onDeleteClick}>
                        선택 삭제
                    </Button>}
                {searchConfig.showWrite && <Button variant="outlined" onClick={onWriteClick}>글쓰기</Button>}
                {searchConfig.showDownload && <Button variant="outlined" color="success" >다운로드</Button>}
            </Box>
        </Box>
    );
}

export default SearchHeader;