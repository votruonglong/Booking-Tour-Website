import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Modal, Radio, Select, Upload, Button, message } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { Editor } from "@tinymce/tinymce-react";

const BookingForm = ({
    visible,
    onCancel,
    onSave,
    editData,
    confirmLoading,
    tours
}) => {
    const [form] = Form.useForm();

    const bookingStatusOptions = [
        { label: "Đã nhận", value: 1 },
        { label: "Đã hủy", value: -1 },
        { label: "Đã thanh toán", value: 2 },
    ];

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
            title={editData ? "Cập nhật tour" : "Thêm mới tour"}
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
                    name="status"
                    label="Trạng thái đơn hàng"
                    rules={[{ required: true, message: "Vui lòng chọn trạng thái đơn hàng" }]}
                >
                    <Select placeholder="Chọn trạng thái đơn hàng">
                        {bookingStatusOptions.map(status => (
                            <Select.Option key={status.value} value={status.value}>
                                {status.label}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default BookingForm;
