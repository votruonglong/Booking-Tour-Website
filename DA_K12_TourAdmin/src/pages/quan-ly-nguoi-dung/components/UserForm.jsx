import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Modal, Select, message } from "antd";
import { useDispatch, useSelector } from "react-redux";

const UserForm = ({
    visible,
    onCancel,
    onSave,
    editData,
    confirmLoading,
    roles,
}) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    useEffect(() => {
        if (visible) {
            form.resetFields();
            if (editData) {
                form.setFieldsValue(editData);
            }
        }
    }, [visible, editData, form]);

    // Xử lý khi nhấn nút OK
    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            await onSave(values);
        } catch (errorInfo) {
            console.log("Failed:", errorInfo);
        }
    };

    // Xử lý khi nhấn nút Cancel
    const handleCancel = () => {
        form.resetFields();
        onCancel();
    };

    // Xử lý khi thay đổi lựa chọn vai trò
    const onChange = (value) => {
        console.log(`selected ${value}`);
    };

    // Xử lý khi tìm kiếm vai trò
    const onSearch = (value) => {
        console.log("search:", value);
    };

    // Lọc các tùy chọn cho input chọn vai trò
    const filterOption = (input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

    const phoneFormatter = (value) => {
        if (!value) return value;

        // Xóa tất cả khoảng trống trong chuỗi đầu vào
        const noSpaces = value.replace(/\s+/g, "");

        // Chỉ giữ lại các chữ số
        const onlyNums = noSpaces.replace(/[^\d]/g, "");

        if (onlyNums.length <= 4) return onlyNums;
        if (onlyNums.length <= 7)
            return `${onlyNums.slice(0, 4)} ${onlyNums.slice(4)}`;
        return `${onlyNums.slice(0, 4)} ${onlyNums.slice(4, 7)} ${onlyNums.slice(
            7
        )}`;
    };

    const handlePhoneChange = (e) => {
        const { value } = e.target;
        const formattedValue = phoneFormatter(value);
        form.setFieldsValue({ phoneNumber: formattedValue });
    };

    const validatePhoneNumber = (_, value) => {
        const phoneNumber = value.replace(/\s/g, "");
        if (phoneNumber.length < 10 || phoneNumber.length > 11) {
            return Promise.reject("Số điện thoại phải có 10 hoặc 11 chữ số");
        }
        if (!/^0\d{9,10}$/.test(phoneNumber)) {
            return Promise.reject(
                "Số điện thoại không hợp lệ. Vui lòng nhập 10 hoặc 11 chữ số bắt đầu bằng số 0"
            );
        }
        return Promise.resolve();
    };

    return (
        <Modal
            title={editData ? "Cập nhật người dùng" : "Thêm mới người dùng"}
            open={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText={editData ? "Cập nhật" : "Tạo"}
            cancelText="Huỷ"
            centered
            width={800}
            confirmLoading={confirmLoading}
        >
            <Form
                form={form}
                layout="horizontal"
                wrapperCol={{ span: "16" }}
                labelCol={{ span: "8" }}
                labelAlign="right"
            >
                {!editData && (
                    <Form.Item
                        name="username"
                        label="Tên người dùng"
                        rules={[
                            { required: true, message: "Vui lòng nhập tên người dùng" },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                )}
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ required: true, message: "Vui lòng nhập email" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="phoneNumber"
                    label="Số điện thoại"
                    rules={[
                        { required: true, message: "Vui lòng nhập số điện thoại" },
                        { validator: validatePhoneNumber },
                    ]}
                >
                    <Input
                        onChange={handlePhoneChange}
                        maxLength={13} // 11 digits + 2 spaces
                    />
                </Form.Item>
                <Form.Item
                    name="fullName"
                    label="Họ và tên"
                    rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Mật khẩu"
                    rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="role"
                    label="Vai trò"
                    rules={[{ message: "Vui lòng chọn vai trò" }]}
                >
                    {/* <Select
                        placeholder="Chọn vai trò"
                        options={roles.map((role) => ({
                            value: role.normalizedName,
                            label: role.name,
                        }))}
                        onChange={onChange}
                        onSearch={onSearch}
                        filterOption={filterOption}
                        showSearch
                        allowClear
                    /> */}
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UserForm;
