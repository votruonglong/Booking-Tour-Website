import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchComponent from "@components/search-component";
import { Spin, Button, Popconfirm, message } from "antd";
import TableComponent from "@components/table-component";
import ButtonsComponent from "@components/button-component";
import { ReloadOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { fetchTour } from "@redux/features/system/tourSlice";
import { fetchBooking, updateBooking } from "@redux/features/system/bookingSlice";
import BookingForm from "./components/BookingForm";

const BookingsManagement = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [searchKey, setSearchKey] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [editData, setEditData] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchParams, setSearchParams] = useState({
        searchName: "",
        searchCode: ""
    });

    const { tours } = useSelector((state) => state.tours);
    const { bookings } = useSelector((state) => state.bookings);


    const getListBookings = async () => {

        await dispatch(fetchBooking({ ...searchParams })).unwrap();
    };

    const getListTour = () => {
        dispatch(fetchTour({ searchName: "", searchCode: "" }));
    };

    useEffect(() => {
        getListBookings()
        getListTour()
    }, [dispatch, searchParams]);


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
        const editItem = bookings.find((item) => item.id === selectedRowKeys[0]);
        setIsModalVisible(true);
        setEditData(editItem);
    };

    //Xoá
    // const handleDelete = async (id) => {
    //     setIsLoading(true);
    //     try {
    //         await dispatch(deleteCategory(id)).unwrap();
    //         message.success("Xoá thành công");
    //         setSelectedRowKeys([]);
    //         getListCategories()
    //         resetSearch();
    //     } catch (error) {
    //         if (error.response && (error.response.status === 401 || error.response.status === 403)) {
    //             navigate('/login');
    //         }
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    //thêm sửa
    const handleSubmit = async (values) => {
        setIsLoading(true);
        try {
            if (editData) {
                await dispatch(updateBooking({ id: editData.id, ...values })).unwrap();
                getListBookings()
                message.success("Cập nhật thành công");
            }
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
        getListCategories()
        setSelectedRowKeys([]);
    };



    const dataSource = bookings.map((item, index) => ({
        key: item.id,
        id: item.id,
        bookingId: item.bookingId,
        userName: item.userName,
        description: item.description,
        numberOfChild: item.numberOfChild,
        numberOfAdult: item.numberOfAdult,
        name: item.name,
        email: item.email,
        totalAmount: item.totalAmount,
        bookingDate: item.bookingDate,
        status: item.status,
        stt: index + 1,
    }));

    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            width: 50,
            align: "center",
        },
        {
            title: "Mã đơn đặt",
            dataIndex: "bookingId",
            width: 200,
        },
        {
            title: "Tên khách hàng",
            dataIndex: "name",
            width: 200,
            sorter: (a, b) => (a.name || "").localeCompare(b.name || ""),
        },
        {
            title: "Email khách hàng",
            dataIndex: "email",
            width: 200
        },
        {
            title: "Số người lớn",
            dataIndex: "numberOfAdult",
            width: 200
        },
        {
            title: "Số trẻ em",
            dataIndex: "numberOfChild",
            width: 200
        },
        {
            title: "Tổng giá trị",
            dataIndex: "totalAmount",
            width: 200
        },
        {
            title: "Ngày đặt",
            dataIndex: "bookingDate",
            width: 200
        },
        {
            title: "Chi tiết",
            dataIndex: "description",
            width: 200,
            render: (text) => {
                const maxLength = 100; // Set your desired max length here
                if (!text) return "Không có";

                return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
            },
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            width: 200,
            render: (text, record) => (
                <Button
                    style={{
                        backgroundColor: record.status === 1 ? 'green' :
                            record.status === -1 ? 'gray' :
                                record.status === 2 ? 'blue' : 'gray',
                        color: 'white',
                    }}
                    disabled
                >
                    {record.status === 1 ? 'Đã nhận' :
                        record.status === -1 ? 'Đã hủy' :
                            record.status === 2 ? 'Đã thanh toán' : 'Không xác định'}
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
            label: "Sửa",
            icon: <EditOutlined />,
            onClick: handleEdit,
            disabled: selectedRowKeys.length !== 1,
        },
    ];

    return (
        <div>
            <div style={{ marginBottom: "20px" }}>
                <SearchComponent
                    key={searchKey}
                    onSearch={handleSearch}
                    searchFields={[
                        { key: "searchCode", placeholder: "Mã lịch trình", value: searchParams.searchCode },
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
            <BookingForm
                visible={isModalVisible}
                onCancel={handleCancel}
                onSave={handleSubmit}
                editData={editData}
                confirmLoading={isLoading}
                tours={tours}
            />
        </div>
    )
}

export default BookingsManagement