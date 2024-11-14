import { fetchCategories } from "@redux/features/system/categoriesSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchComponent from "@components/search-component";
import { Spin, Button, Popconfirm, message } from "antd";
import TableComponent from "@components/table-component";
import ButtonsComponent from "@components/button-component";
import { ReloadOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { formatDateDisplay } from "@utils/dateFormat";
import { useNavigate } from "react-router-dom";
import { createTour, deleteTour, fetchTour, updateTour } from "@redux/features/system/tourSlice";
import TourForm from "./components/TourForm";

const ToursManagerment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [searchKey, setSearchKey] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editData, setEditData] = useState(null);
    const [searchParams, setSearchParams] = useState({
        searchName: "",
        searchCode: "",
        categoriesSearch: ""
    });

    const { categories } = useSelector((state) => state.category);
    const { tours } = useSelector((state) => state.tours)

    const getListCategories = async () => {
        try {
            await dispatch(fetchCategories({ searchName: "", searchCode: "" })).unwrap();
        } catch (error) {
            setIsLoading(false);
        }

    };

    const getListTours = async () => {

        await dispatch(fetchTour({ ...searchParams })).unwrap();
    };

    useEffect(() => {
        getListCategories();
        getListTours()
    }, [dispatch, searchParams]);

    useEffect(() => {
        getListTours()
    }, [searchParams, dispatch]);


    //mở modal thêm mới
    const handleAdd = () => {
        setIsModalVisible(true);
        setEditData(null);
    };


    // //chọn 1 hàng chỉnh sửa
    const handleEdit = () => {
        if (selectedRowKeys.length !== 1) {
            message.warning("Vui lòng chọn một hàng cần sửa");
            return;
        }
        const editItem = tours.find((item) => item.id === selectedRowKeys[0]);
        setIsModalVisible(true);
        setEditData(editItem);
    };

    //Xoá
    const handleDelete = async (id) => {
        setIsLoading(true);
        try {
            await dispatch(deleteTour(id)).unwrap();
            message.success("Xoá thành công");
            setSelectedRowKeys([]);
            getListTours()
            resetSearch();
        } catch (error) {
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                navigate('/login');
            }
        } finally {
            setIsLoading(false);
        }
    };

    //thêm sửa
    const handleSubmit = async (values) => {

        setIsLoading(true);
        try {
            if (editData) {
                await dispatch(updateTour({ id: editData.id, ...values })).unwrap();
                getListTours()
                message.success("Cập nhật thành công");
            } else {
                await dispatch(createTour(values)).unwrap();
                resetSearch();
                message.success("Thêm mới thành công");
            }
            getListTours()
            setIsModalVisible(false)
            setEditData(null);
            setSelectedRowKeys([]);
        } catch (error) {
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                navigate('/login');
            }
        } finally {
            setIsLoading(false);
        }
    };
    //đóng modal
    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedRowKeys([]);
    };

    // Tìm kiếm
    const handleSearch = (searchValues) => {
        setSearchParams((prevParams) => ({
            ...prevParams,
            ...searchValues,
        }));
    };


    // Reset tìm kiếm
    const resetSearch = () => {
        setSearchParams({
            searchCode: "",
            searchName: "",
        });
        setSearchKey((prevKey) => prevKey + 1);
    };

    // Reset bảng
    const handleResetTable = () => {
        getListTours()
        setSelectedRowKeys([]);
    };




    const dataSource = tours.map((item, index) => ({
        key: item.id,
        id: item.id,
        tourId: item.tourId,
        categoryId: item.categoryId,
        name: item.tourName,
        description: item.description,
        maxParticipant: item.maxParticipant,
        childPrice: item.childPrice,
        adultPrice: item.adultPrice,
        isActive: item.isActive,
        categoryName: item.categoryName,
        imageUrls: item?.images?.map(image => image.image_url),
        stt: index + 1,
    }));

    const categoriesOptions = categories.map((item) => {
        return {
            label: item.name,
            value: item.id,
        };
    });

    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            width: 50,
            align: "center",
        },
        {
            title: "Mã tour",
            dataIndex: "tourId",
            width: 100,
            sorter: (a, b) => (a.name || "").localeCompare(b.name || ""),
        },
        {
            title: "Ảnh tour",
            dataIndex: "imageUrls",
            width: 200,
            render: (imageUrls) => (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {imageUrls?.length > 0 ? (
                        imageUrls?.map((url, index) => (
                            <img
                                key={index}
                                src={url} // Đảm bảo đường dẫn hình ảnh là hợp lệ
                                alt={`Tour Image ${url + 1}`}
                                style={{ width: '70px', height: '50px', objectFit: 'cover' }} // Điều chỉnh kích thước hình ảnh
                            />
                        ))
                    ) : (
                        <span>Không có ảnh</span>
                    )}
                </div>
            ),
        },
        {
            title: "Danh mục",
            dataIndex: "categoryName",
            width: 120,
            sorter: (a, b) => (a.name || "").localeCompare(b.name || ""),
        },
        {
            title: "Tên tour",
            dataIndex: "name",
            width: 200,
            sorter: (a, b) => (a.name || "").localeCompare(b.name || ""),
        },
        {
            title: "Số lượng tối đa",
            dataIndex: "maxParticipant",
            width: 200,
        },
        {
            title: "Giá trẻ em",
            dataIndex: "childPrice",
            width: 200,
        },
        {
            title: "Giá người lớn",
            dataIndex: "adultPrice",
            width: 200,
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            width: 300,
            render: (text) => {
                const maxLength = 100; // Set your desired max length here
                if (!text) return '';

                return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
            },
        },
        {
            title: "Trạng thái",
            dataIndex: "isActive",
            width: 200,
            render: (text, record) => (
                <Button
                    style={{
                        backgroundColor: record.isActive ? 'green' : 'gray',
                        color: 'white'
                    }}
                    disabled
                >
                    {record.isActive ? 'Đang hoạt động' : 'Không hoạt động'}
                </Button>
            ),
        },

    ];

    const buttons = [
        {
            label: "Làm Mới",
            type: "primary",
            icon: <ReloadOutlined />,
            style: { background: "green", color: "white" },
            onClick: handleResetTable,
        },
        {
            label: "Thêm mới",
            type: "primary",
            icon: <PlusOutlined />,
            onClick: handleAdd,
        },
        {
            label: "Sửa",
            icon: <EditOutlined />,
            onClick: handleEdit,
            disabled: selectedRowKeys.length !== 1,
        },
        {
            render: () => (
                <Popconfirm
                    title="Bạn có chắc chắn muốn xóa không?"
                    onConfirm={() => handleDelete(selectedRowKeys[0])}
                    okText="Xóa"
                    cancelText="Hủy"
                >
                    <Button
                        key="delete"
                        type="default"
                        danger
                        icon={<DeleteOutlined />}
                        loading={isLoading}
                        disabled={selectedRowKeys.length !== 1 || isLoading}
                    >
                        Xóa
                    </Button>
                </Popconfirm>
            ),
        },
    ];

    return (
        <div>
            <div style={{ marginBottom: "20px" }}>
                <SearchComponent
                    key={searchKey}
                    onSearch={handleSearch}
                    searchFields={[
                        { key: "searchCode", placeholder: "Mã tour", value: searchParams.searchCode },
                        { key: "searchName", placeholder: "Tên tour", value: searchParams.searchName },
                        {
                            key: "categoriesSearch",
                            placeholder: "Tìm kiếm theo danh mục",
                            type: "select",
                            options: categoriesOptions,
                            value: searchParams.categoriesSearch
                        },
                    ]}

                />
            </div>
            <Spin spinning={isLoading}>
                <TableComponent
                    rowKey="id"
                    dataSource={dataSource}
                    columns={columns}
                    selectedRowKeys={selectedRowKeys}
                    setSelectedRowKeys={setSelectedRowKeys}

                />
            </Spin>

            <div
                style={{
                    position: "fixed",
                    bottom: 50,
                    zIndex: 1000,
                }}
            >
                <ButtonsComponent buttons={buttons} />
            </div>
            <TourForm
                visible={isModalVisible}
                onCancel={handleCancel}
                onSave={handleSubmit}
                editData={editData}
                confirmLoading={isLoading}
                category={categories}
            />
        </div>
    )
}

export default ToursManagerment