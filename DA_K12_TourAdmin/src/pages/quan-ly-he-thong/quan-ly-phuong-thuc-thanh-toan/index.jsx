import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchComponent from "@components/search-component";
import { Spin, Button, Popconfirm, message } from "antd";
import TableComponent from "@components/table-component";
import ButtonsComponent from "@components/button-component";
import { ReloadOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { formatDateDisplay } from "@utils/dateFormat";
import { useNavigate } from "react-router-dom";
import { createPaymentMethod, deletePaymentMethod, fetchPaymentMethods, updatePaymentMethod } from '@redux/features/system/paymentMethodSlice';
import PaymentMethodForm from "./components/PaymentMethodForm";


const PaymentMethodManagement = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [searchKey, setSearchKey] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editData, setEditData] = useState(null);
    const [searchParams, setSearchParams] = useState({
        searchName: "",
        searchCode: ""
    });

    const { paymentMethods } = useSelector((state) => state.paymentMethods);

    const getListMethods = async () => {
        await dispatch(fetchPaymentMethods({
            ...searchParams
        })).unwrap();
    };



    useEffect(() => {
        getListMethods()
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
        const editItem = paymentMethods.find((item) => item.id === selectedRowKeys[0]);
        setIsModalVisible(true);
        setEditData(editItem);
    };

    //Xoá
    const handleDelete = async (id) => {
        setIsLoading(true);
        try {
            await dispatch(deletePaymentMethod(id)).unwrap();
            message.success("Xoá thành công");
            setSelectedRowKeys([]);
            getListMethods()
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
                await dispatch(updatePaymentMethod({ id: editData.id, ...values })).unwrap();
                getListMethods()
                message.success("Cập nhật thành công");
            } else {
                await dispatch(createPaymentMethod(values)).unwrap();
                resetSearch();
                message.success("Thêm mới thành công");
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



    const dataSource = paymentMethods.map((item, index) => ({
        key: item.id,
        id: item.id,
        methodId: item.methodId,
        methodName: item.methodName,
        description: item.description,
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
            title: "Mã phương thức",
            dataIndex: "methodId",
            width: 200,
        },
        {
            title: "Tên phương thức",
            dataIndex: "methodName",
            width: 200,
            sorter: (a, b) => (a.methodName || "").localeCompare(b.methodName || ""),
        },
        {
            title: "Mô tả",
            dataIndex: "description",
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
                        { key: "searchCode", placeholder: "Mã phương thức", value: searchParams.searchCode },
                        { key: "searchName", placeholder: "Tên phương thức", value: searchParams.searchName },
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
            <PaymentMethodForm
                visible={isModalVisible}
                onCancel={handleCancel}
                onSave={handleSubmit}
                editData={editData}
                confirmLoading={isLoading}
            />

        </div>
    )
}

export default PaymentMethodManagement