import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Modal, Radio, Select, Upload, Button, message } from "antd";
import { UploadOutlined } from '@ant-design/icons';

const TourForm = ({
    visible,
    onCancel,
    onSave,
    editData,
    confirmLoading,
    category
}) => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [base64Images, setBase64Images] = useState([]); // Store new images as base64

    useEffect(() => {
        if (visible) {
            form.resetFields();
            setFileList([]);
            setBase64Images([]);
            if (editData) {
                form.setFieldsValue(editData);
                const formattedFileList = editData.images.map((url, index) => ({
                    uid: `-${index}`,
                    name: `Image ${index + 1}`,
                    status: 'done',
                    url: url.image_url,
                }));
                setFileList(formattedFileList);
            }
        }
    }, [visible, editData, form]);

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            values.ImageUrls = base64Images; // Use base64 for new images

            await onSave(values);
        } catch (errorInfo) {
            console.log("Failed:", errorInfo);
        }
    };

    const handleCancel = () => {
        form.resetFields();
        setFileList([]);
        setBase64Images([]);
        onCancel();
    };

    const handleChange = async ({ fileList }) => {
        setFileList(fileList);

        const newBase64Images = [];

        const readFiles = fileList.map((file) => {
            return new Promise((resolve, reject) => {
                if (file.originFileObj) { // Only process new files
                    const reader = new FileReader();
                    reader.onload = () => {
                        newBase64Images.push(reader.result);
                        resolve();
                    };
                    reader.onerror = () => {
                        message.error('Failed to convert image to base64.');
                        reject();
                    };
                    reader.readAsDataURL(file.originFileObj);
                } else {
                    resolve();
                }
            });
        });

        await Promise.all(readFiles);
        setBase64Images(newBase64Images);
    };

    const uploadProps = {
        beforeUpload: () => false,
        accept: "image/*",
        fileList,
        onChange: handleChange,
        listType: "picture",
        multiple: true,
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
                    name="tourId"
                    label="Mã tour"
                    rules={[{ required: true, message: "Vui lòng nhập mã tour" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="categoryId"
                    label="Danh mục tour"
                    rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
                >
                    <Select
                        placeholder="Chọn danh mục"
                        allowClear
                        showSearch
                    >
                        {category.map((item) => (
                            <Select.Option key={item.id} value={item.id}>
                                {item.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="tourName"
                    label="Tên tour"
                    rules={[{ required: true, message: "Vui lòng nhập tên tour" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="maxParticipant"
                    label="Số lượng tối đa"
                    rules={[{ required: true, message: "Vui lòng nhập số lượng tối đa" }]}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    name="adultPrice"
                    label="Giá người lớn"
                    rules={[{ required: true, message: "Vui lòng nhập giá" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="childPrice"
                    label="Giá trẻ em"
                    rules={[{ required: true, message: "Vui lòng nhập giá" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Mô tả"
                    rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="ImageUrls"
                    label="Ảnh"
                    rules={[{ required: true, message: "Vui lòng chọn ảnh" }]}
                >
                    <Upload
                        {...uploadProps}
                    >
                        <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                    </Upload>
                </Form.Item>
                <Form.Item
                    name="isActive"
                    label="Trạng thái"
                    rules={[{ required: true, message: "Vui lòng nhập trạng thái" }]}
                >
                    <Radio.Group>
                        <Radio value={true}>Đang hoạt động</Radio>
                        <Radio value={false}>Dừng hoạt động</Radio>
                    </Radio.Group>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default TourForm;