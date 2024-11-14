import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Modal, Radio, Select, Upload, Button, message } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { Editor } from "@tinymce/tinymce-react";

const ScheduleForm = ({
    visible,
    onCancel,
    onSave,
    editData,
    confirmLoading,
    tours
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
            const values = await form.validateFields();  // Validate form fields first

            // Extract description from TinyMCE editor
            const description = tinymce.get('description').getContent();

            // Include the description content in the form values
            values.description = description;

            // Save the values by calling onSave
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
                    name="scheduleId"
                    label="Mã lịch trình"
                    rules={[{ required: true, message: "Vui lòng nhập mã lịch trình" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="tourId"
                    label="Danh mục tour"
                    rules={[{ required: true, message: "Vui lòng chọn tour" }]}
                >
                    <Select
                        placeholder="Chọn tour"
                        allowClear
                        showSearch
                    >
                        {tours.map((item) => (
                            <Select.Option key={item.id} value={item.id}>
                                {item.tourName}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="title"
                    label="Mô tả"
                    rules={[{ required: true, message: "Vui lòng nhập ngày" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Chi tiết"
                    rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
                >
                    <Editor
                        apiKey="xwfxdoiv13dh781lthed0whkx3ko81sor8ieshqx01du9hkf" // Optional, can be found on TinyMCE website
                        init={{
                            height: 300,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount',
                                'textcolor' // Add textcolor plugin for font color
                            ],
                            toolbar: 'fontsize | fontselect fontsizeselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',

                        }}
                    />
                </Form.Item >
            </Form>
        </Modal>
    );
}

export default ScheduleForm;
