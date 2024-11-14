import React, { useEffect } from "react";
import { Form, Input, Modal, Select, Spin } from "antd";
const CategoryForm = ({
    visible,
    onCancel,
    onSave,
    editData,
    confirmLoading,
}) => {
    const [form] = Form.useForm();



    useEffect(() => {
        if (visible) {
            form.resetFields();
            if (editData) {
                form.setFieldsValue(editData);
            }
        }
    }, [visible, editData, form]);

    const handleOk = async () => {
        try {
            const values = await form.validateFields();

            await onSave(values);
        } catch (errorInfo) {
            console.log("Failed:", errorInfo);
        }
    };

    const handleCancel = () => {
        form.resetFields();
        onCancel();
    };
    return (
        <Modal
            title={editData ? "Cập nhật danh mục" : "Thêm mới danh mục"}
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
                <Form.Item
                    name="categoryId"
                    label="Mã danh mục"
                    rules={[{ required: true, message: "Vui lòng nhập mã danh mục" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="name"
                    label="Tên danh mục"
                    rules={[{ required: true, message: "Vui lòng nhập tên danh mục" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Mô tả"
                    rules={[{ message: "Vui lòng nhập mô tả" }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CategoryForm;
