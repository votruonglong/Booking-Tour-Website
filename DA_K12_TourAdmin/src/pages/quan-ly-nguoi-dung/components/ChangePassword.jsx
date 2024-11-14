import React from "react";
import { Form, Input, Modal, message } from "antd";
import { useDispatch } from "react-redux";
import { changePassword } from "@redux/features/user/userSlice";

const ChangePassword = ({ visible, onCancel, userId, confirmLoading }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            const response = await dispatch(changePassword({ id: userId, newPassword: values.newPassword })).unwrap();
            message.success(response.message);
            form.resetFields();
            onCancel();
        } catch (errorInfo) {
            console.log("Failed:", errorInfo);
            message.error("Đổi mật khẩu thất bại");
        }
    };

    const handleCancel = () => {
        form.resetFields();
        onCancel();
    };

    return (
        <Modal
            title="Đổi mật khẩu"
            open={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Đổi mật khẩu"
            cancelText="Huỷ"
            confirmLoading={confirmLoading}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="newPassword"
                    label="Mật khẩu mới"
                    rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới" }]}
                >
                    <Input.Password />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ChangePassword;