import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, message as antdMessage, Modal } from 'antd';
import { ReloadOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';

const { confirm } = Modal;

const ManageNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/notifications/all');
      setNotifications(response.data.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      antdMessage.error('Failed to fetch notifications');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/notifications/${id}`);
      antdMessage.success('Notification deleted successfully');
      fetchNotifications();
    } catch (error) {
      console.error('Error deleting notification:', error);
      antdMessage.error('Failed to delete notification');
    }
  };

  const showDeleteConfirm = (id) => {
    confirm({
      title: 'Are you sure you want to delete this notification?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => handleDelete(id),
    });
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const columns = [
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Recipient', dataIndex: 'recipient', key: 'recipient' },
    { title: 'Subject', dataIndex: 'subject', key: 'subject' },
    { title: 'Message', dataIndex: 'message', key: 'message' },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Button
          type="danger"
          icon={<DeleteOutlined />}
          onClick={() => showDeleteConfirm(record._id)}
          style={{ borderRadius: '5px', color: 'red', borderColor: 'red' }}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: '0px' }}>
      <h2
        style={{
          textAlign: 'center',
          fontSize: '40px',
          fontWeight: 'bold',
          marginBottom: '20px',
          color: '#010e30',
          fontFamily: 'Playfair Display',
        }}
      >
        Manage Notifications
      </h2>
      <div style={{ padding: '0 2vw' }}>
        <Button
          type="primary"
          icon={<ReloadOutlined />}
          onClick={fetchNotifications}
          style={{
            marginBottom: '20px',
            borderRadius: '5px',
          }}
        >
          Reload Notifications
        </Button>
        <Table
          dataSource={notifications}
          columns={columns}
          rowKey="_id"
          loading={loading}
          style={{ borderRadius: '10px', overflow: 'hidden' }}
        />
      </div>
    </div>
  );
};

export default ManageNotifications;
