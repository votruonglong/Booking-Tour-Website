import React, { useEffect, useState } from "react";
import SearchComponent from "@components/search-component";
import TableComponent from "@components/table-component";
import ButtonsComponent from "@components/button-component";
import { Button, message, Popconfirm, Spin } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  KeyOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  deleteUser,
  setPage,
  setPageSize,
  updateUser,
  createUser,
  changePassword,
} from "@redux/features/user/userSlice";
import UserForm from "./components/UserForm";
import ChangePassword from "./components/ChangePassword";
import { formatDateDisplay } from "@utils/dateFormat";

const UserManagement = () => {
  const dispatch = useDispatch();

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isChangePasswordModalVisible, setIsChangePasswordModalVisible] = useState(false);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [searchParams, setSearchParams] = useState({
    usernameSearch: "",
    fullnameSearch: "",
    phoneNumberSearch: "",
  });

  const { users, currentPage, pageSize, totalItems } = useSelector(
    (state) => state.users
  );

  // Lấy danh sách người dùng
  const getListUsers = async () => {
    setLoading(true);
    try {
      await dispatch(
        fetchUsers({
          ...searchParams,
        })
      );
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getListUsers();
  }, [searchParams]);

  // Mở modal để thêm người dùng mới
  const handleAdd = () => {
    setIsModalVisible(true);
    setEditData(null);
  };

  // Chọn một hàng để sửa
  const handleEdit = () => {
    if (selectedRowKeys.length !== 1) {
      message.warning("Vui lòng chọn một hàng cần sửa");
      return;
    }
    const editItem = users.find((item) => item.id === selectedRowKeys[0]);
    setIsModalVisible(true);
    setEditData(editItem);
  };

  // Xóa người dùng
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await dispatch(deleteUser(id)).unwrap();
      message.success("Xoá thành công");
      setSelectedRowKeys([]);
      resetSearch();
      getListUsers();
    } catch (error) {
      console.error("Xóa thất bại:", error);
    } finally {
      setLoading(false);
    }
  };

  // Thêm hoặc cập nhật người dùng
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      if (editData) {
        const updateData = { ...values };
        if (!values.password) {
          delete updateData.password;
        }
        await dispatch(
          updateUser({ id: editData.id, data: updateData })
        ).unwrap();
        message.success("Cập nhật thành công");
        resetSearch();
        getListUsers();
      } else {
        // Đối với tạo mới, mật khẩu là bắt buộc
        if (!values.password) {
          message.warning("Vui lòng nhập mật khẩu");
          setLoading(false);
          return;
        }

        await dispatch(createUser(values)).unwrap();
        message.success("Thêm mới thành công");
        resetSearch();
        getListUsers();
      }
      setIsModalVisible(false);
      setEditData(null);
      setSelectedRowKeys([]);
    } catch (error) {
      console.error("Thêm/Cập nhật thất bại:", error);
    } finally {
      setLoading(false);
    }
  };

  // Đóng modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedRowKeys([]);
  };

  // Mở modal đổi mật khẩu
  const handleChangePassword = () => {
    if (selectedRowKeys.length !== 1) {
      message.warning("Vui lòng chọn một hàng để đổi mật khẩu");
      return;
    }
    setSelectedUserId(selectedRowKeys[0]);
    setIsChangePasswordModalVisible(true);
  };

  // Đóng modal đổi mật khẩu
  const handlePasswordCancel = () => {
    setIsChangePasswordModalVisible(false);
    setSelectedUserId(null);
  };

  // Phân trang
  const handlePaginateChange = (page, pageSize) => {
    dispatch(setPage(page));
    dispatch(setPageSize(pageSize));
  };

  // Tìm kiếm
  const handleSearch = (searchValues) => {
    setSearchParams(searchValues);
    dispatch(setPage(1));
  };

  // Đặt lại bảng
  const handleResetTable = () => {
    getListUsers();
    setSelectedRowKeys([]);
  };

  // Đặt lại tìm kiếm
  const resetSearch = () => {
    setSearchParams({
      usernameSearch: "",
      fullnameSearch: "",
      phoneNumberSearch: "",
    });
  };

  const dataSource = users.map((item, index) => ({
    key: item.id,
    id: item.id,
    userName: item.userName,
    email: item.email || "-",
    password: item.password || "-",
    phoneNumber: item.phoneNumber || "-",
    fullName: item.fullName,
    role: item.role,
    createdTime: item.createdTime,
    stt: index + 1,
  }));

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      width: "50px",
      align: "center",
    },
    {
      title: "Tên người dùng",
      dataIndex: "userName",
      width: "150px",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Họ và tên",
      dataIndex: "fullName",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdTime",
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
            loading={loading}
            disabled={selectedRowKeys.length !== 1 || loading}
          >
            Xóa
          </Button>
        </Popconfirm>
      ),
    },
    {
      label: "Đổi mật khẩu",
      icon: <KeyOutlined />,
      onClick: handleChangePassword,
      style: { background: "orange", color: "white" },
      disabled: selectedRowKeys.length !== 1,
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <SearchComponent
          onSearch={handleSearch}
          searchFields={[
            { key: "usernameSearch", placeholder: "Tên người dùng", value: searchParams.usernameSearch },
            { key: "fullnameSearch", placeholder: "Họ và tên", value: searchParams.fullnameSearch },
            { key: "phoneNumberSearch", placeholder: "Số điện thoại", value: searchParams.phoneNumberSearch },
          ]}
        />
      </div>
      <Spin spinning={loading}>
        <TableComponent
          dataSource={dataSource}
          columns={columns}
          rowKey={(record) => record.id}
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
      <UserForm
        visible={isModalVisible}
        onCancel={handleCancel}
        onSave={handleSubmit}
        editData={editData}
        confirmLoading={loading}
      />
      <ChangePassword
        visible={isChangePasswordModalVisible}
        onCancel={handlePasswordCancel}
        userId={selectedUserId}
        confirmLoading={loading}
      />
    </div>
  );
};

export default UserManagement;