import React, { useState, useEffect } from 'react';
import { Card, Input, Button, List, Typography, Form, Avatar, Dropdown, Menu } from 'antd';
import { useDispatch } from 'react-redux';
import { createComment } from '../../redux/features/system/commentSlice';
import { EllipsisOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Title } = Typography;

const CommentComponent = ({ comments, userId, tourId, fetchCommentByTourId }) => {
    const dispatch = useDispatch()
    const [commentText, setCommentText] = useState('');


    const handleCommentChange = (e) => {
        setCommentText(e.target.value);
    };

    const handleCommentSubmit = async () => {
        try {
            await dispatch(createComment({ content: commentText, userId, tourId })).unwrap();
            setCommentText(''); // Clear comment box after submission
            fetchCommentByTourId()
        } catch (error) {
            console.log(error);

        }
    };


    return (
        <div>
            <Card style={{ margin: '20px 0' }} >
                <Title level={4}>Bình luận</Title>
                {userId ? <Form>
                    <Form.Item>
                        <TextArea
                            rows={2}
                            value={commentText}
                            onChange={handleCommentChange}
                            placeholder="Write your comment here..."
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={handleCommentSubmit}>
                            Đăng bình luận
                        </Button>
                    </Form.Item>
                </Form> : <Title level={5} style={{ textAlign: 'center' }}>Đăng nhập để bình luận</Title>}

                <List
                    bordered
                    dataSource={comments}
                    renderItem={item => (
                        <List.Item key={item.id} style={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar src='/user-icon-svgrepo-com.svg' alt='user' style={{ marginRight: '10px' }} />
                            <div style={{ flex: 1 }}>
                                <Typography.Text strong>{item.user}</Typography.Text>
                                <Typography.Text type="secondary" style={{ marginLeft: '8px' }}>
                                    {item.createdDate}
                                </Typography.Text>
                                <Typography.Text style={{ display: 'block', marginTop: '4px' }}>
                                    {item.content}
                                </Typography.Text>
                            </div>
                            <Button >
                                <EllipsisOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />
                            </Button>
                        </List.Item>
                    )}
                />
            </Card >
        </div>
    );
};

export default CommentComponent;
