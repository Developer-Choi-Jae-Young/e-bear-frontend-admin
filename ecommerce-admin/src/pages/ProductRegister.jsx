import { useState, useRef, useEffect } from 'react';
import "./ProductRegister.css";
import Editor from "../components/Editor";
import { CameraIcon, CloseIcon } from "../components/CustomTag";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import api from "../api/axios";

const ProductRegister = () => {
    let titleInfo = {
        title: '상품관리'
    }

    // 이미지 목록 상태 관리 (최대 5개)
    const [images, setImages] = useState([]);
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // 이미지 추가
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        if (images.length + files.length > 5) {
            alert("이미지는 최대 5장까지 등록 가능합니다.");
            return;
        }

        const newImages = files.map((file) => ({
            file: file,
            preview: URL.createObjectURL(file)
        }));
        setImages((prev) => [...prev, ...newImages]);
        e.target.value = '';
    };

    // 이미지 삭제
    const handleRemoveImage = (index) => {
        setImages((prev) => {
            const newImages = [...prev];
            // 메모리 누수 방지
            URL.revokeObjectURL(newImages[index].preview);
            newImages.splice(index, 1);
            return newImages;
        });
    };

    // 카메라 박스 클릭 시 input 창 열기
    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const [categoryList, setCategoryList] = useState([]);
    const [selectedPath, setSelectedPath] = useState([]);
    const [stateList ,setStateList] = useState([]);
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [deliveryPrice, setDeliveryPrice] = useState('');
    const [deliveryDays, setDeliveryDays] = useState('');
    const categoryChange = (event) => {
        setCategory(event.target.value);
    };
    
    const handleCategoryChange = (level, event) => {
        const selectedId = event.target.value;
        const currentList = level === 0 
            ? categoryList : selectedPath[level - 1].childCategory;
    
        const selectedObj = currentList.find(item => item.categoryId === selectedId);
        const newPath = selectedPath.slice(0, level);
        newPath[level] = selectedObj;
        
        setSelectedPath(newPath);
        setCategory(selectedId); 
    };

    const [saleStatus, setSaleStatus] = useState('');
    const saleStatusChange = (event) => {
        setSaleStatus(event.target.value);
    };

    const [optionInputs, setOptionInputs] = useState([
        { id: Date.now(), productOptionName: '', productOptionValue: '', productPrice: 0, quantity: 0 }
    ]);

    // + 버튼 새로운 줄 추가
    const addOptionRow = () => {
        // random으로 키 중복 방지
        setOptionInputs(prev => [...prev, { id: Date.now() + Math.random() }]);
    };

    // - 버튼 마지막 줄 삭제 (최소 1개 유지)
    const removeOptionRow = () => {
        if (optionInputs.length > 1) {
            setOptionInputs(prev => prev.slice(0, -1));
        } else {
            alert("최소 하나의 옵션은 입력해야 합니다.");
        }
    };

    const handleOptionChange = (id, field, value) => {
        setOptionInputs(prev => prev.map(item => 
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    const handleWrite = async () => { 
        const formData = new FormData();

        const productData = {
            productName: title,
            description: "", 
            deliveryPrice: deliveryPrice, 
            deliveryDays: deliveryDays,
            productStatus: saleStatus,
            categoryId: category,
            title: title,
            content: content,
            productOptions: optionInputs.map(opt => ({
                productOptionName: opt.productOptionName,
                productOptionValue: opt.productOptionValue,
                productPrice: opt.productPrice,
                quantity: opt.quantity
            }))
        };

        formData.append("productSaveDto", new Blob([JSON.stringify(productData)], {
            type: "application/json"
        }));
    
        images.forEach((img) => {
            formData.append("files", img.file);
        });

        try {
            const response = await api.post("/product/save", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            alert("등록 성공!");
        } catch (err) {
            console.error("등록 실패", err);
        }
    }

    const fetchCategoryList = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/category/list");
            setCategoryList(response.data);
        } catch (err) {
            console.error("카테고리 목록 조회 실패:", err);
            console.error("status:", err.response?.status);
            console.error("data:", err.response?.data);
            setError("카테고리 목록을 불러오지 못했습니다.");
        } finally {
            setLoading(false);
        }
    };

    const fetchStateList = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/etc/proudct/state/list");
            setStateList(response.data);
        } catch (err) {
            console.error("상태 목록 조회 실패:", err);
            console.error("status:", err.response?.status);
            console.error("data:", err.response?.data);
            setError("상태 목록을 불러오지 못했습니다.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategoryList();
        fetchStateList();
    }, []);

    return (
        <div className='main-section'>
            <span className="notice-main-section-title">{titleInfo.title}</span>
            <hr />

            {/* 이미지 리스트 영역 (가로 배치) */}
            <div className="image-list-container">
                {/* 카메라 등록 버튼 */}
                <div className="image-upload-box" onClick={triggerFileInput}>
                    <CameraIcon />
                    <span className="image-count">{images.length} / 5</span>
                    <input
                        type="file" multiple accept="image/*" id="imageFileInput"
                        ref={fileInputRef} onChange={handleImageChange}
                        style={{ display: 'none' }}
                    />
                </div>
                {/* 썸네일 리스트 */}
                {images.map((image, index) => (
                    <div key={index} className="thumbnail-box">
                        <img src={image.preview} alt={`preview-${index}`} className="thumbnail-img" />
                        {/* 삭제 버튼 */}
                        <button className="remove-btn" onClick={() => handleRemoveImage(index)}>
                            <CloseIcon />
                        </button>
                    </div>
                ))}
            </div>
            <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                <FormControl variant="standard" sx={{ minWidth: 120 }}>
                    <InputLabel>대분류</InputLabel>
                    <Select
                        value={selectedPath[0]?.categoryId || ''}
                        onChange={(e) => handleCategoryChange(0, e)}
                    >
                        {categoryList.map(data => (
                            <MenuItem key={data.categoryId} value={data.categoryId}>
                                {data.categoryName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {selectedPath.map((item, index) => (
                    item.childCategory && item.childCategory.length > 0 && (
                        <FormControl key={`select-${index}`} variant="standard" sx={{ minWidth: 120 }}>
                            <InputLabel>하위 카테고리</InputLabel>
                            <Select
                                value={selectedPath[index + 1]?.categoryId || ''}
                                onChange={(e) => handleCategoryChange(index + 1, e)}
                            >
                                {item.childCategory.map(child => (
                                    <MenuItem key={child.categoryId} value={child.categoryId}>
                                        {child.categoryName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )
                ))}
            </Box>

            <FormControl variant="standard" sx={{ mr: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">판매상태</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={saleStatus}
                    onChange={saleStatusChange}
                    label="판매상태"
                >
                    {stateList.map(data => {
                        return <MenuItem value={data.stateCode}>{data.stateName}</MenuItem>
                    })}
                </Select>
            </FormControl>
            <TextField label="₩ 배송비를 입력해주세요." variant="standard" sx={{ mr: 1, width: 200 }} onChange={(e) => setDeliveryPrice(e.target.value)}/>
            <TextField label="배송일 입력해주세요." variant="standard" sx={{ mr: 1, width: 200 }} onChange={(e) => setDeliveryDays(e.target.value)}/>

            {optionInputs.map((item, index) => (
                <Box
                    key={item.id}
                    sx={{ display: 'flex', alignItems: 'flex-end', gap: 1, flexWrap: 'wrap', mb: 2 }}
                >
                    <TextField label="옵션명을 입력해주세요." variant="standard" sx={{ width: 150 }} onChange={(e) => handleOptionChange(item.id, 'productOptionName', e.target.value)}/>
                    <TextField label="옵션값을 입력해주세요." variant="standard" sx={{ width: 150 }} onChange={(e) => handleOptionChange(item.id, 'productOptionValue', e.target.value)}/>
                    <TextField label="옵션가격을 입력해주세요." variant="standard" sx={{ width: 180 }} onChange={(e) => handleOptionChange(item.id, 'productPrice', parseInt(e.target.value) || 0)}/>
                    <TextField label="재고수량을 입력해주세요." variant="standard" type="number" sx={{ width: 180 }} onChange={(e) => handleOptionChange(item.id, 'quantity', parseInt(e.target.value) || 0)}/>

                    {/* index가 마지막(length - 1)일 때만 버튼 표시 */}
                    {index === optionInputs.length - 1 && (
                        <Box sx={{ display: 'flex', gap: 0.5, ml: 1 }}>
                            <Button
                                variant="contained"
                                onClick={addOptionRow}
                                sx={{
                                    minWidth: 40,
                                    height: 36,
                                    bgcolor: '#e0e0e0',
                                    color: '#333',
                                    fontWeight: 'bold',
                                    mb: 0.5,
                                    '&:hover': { bgcolor: '#d5d5d5' }
                                }}
                            >+
                            </Button>
                            <Button
                                variant="contained"
                                onClick={removeOptionRow}
                                sx={{
                                    minWidth: 40,
                                    height: 36,
                                    bgcolor: '#e0e0e0',
                                    color: '#333',
                                    fontWeight: 'bold',
                                    mb: 0.5,
                                    '&:hover': { bgcolor: '#d5d5d5' }
                                }}
                            >-
                            </Button>
                        </Box>
                    )}
                </Box>
            ))}

            <>
                <div className="editor-container">
                    <div className="editor-wrapper">
                        {/* 제목 입력창 */}
                        <input
                            className="editor-title-input"
                            placeholder="제목을 입력해주세요"
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        {/* 에디터 */}
                        <Editor value={content} onChange={setContent} />

                        {/* 버튼 영역 */}
                        <div className="editor-actions">
                            <button className="btn cancel">취소</button>
                            <button className="btn submit" onClick={handleWrite}>등록</button>
                        </div>
                    </div>
                </div>
            </>
        </div>
    );
};

export default ProductRegister;