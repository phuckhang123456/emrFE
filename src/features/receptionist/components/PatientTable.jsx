import { Table, Button, Space } from 'antd';
import { PlusCircleOutlined, HistoryOutlined } from '@ant-design/icons';

const PatientTable = ({ data, onOpenVisitModal, loading }) => {
  const columns = [
    { title: 'Mã BN', dataIndex: 'benh_nhan_id', key: 'benh_nhan_id' },
    { title: 'Họ Tên', dataIndex: 'ho_ten', key: 'ho_ten', render: (text) => <b>{text}</b> },
    { title: 'Ngày Sinh', dataIndex: 'ngay_sinh', key: 'ngay_sinh' },
    { title: 'Giới Tính', dataIndex: 'gioi_tinh', key: 'gioi_tinh' },
    { title: 'SĐT', dataIndex: 'so_dien_thoai', key: 'so_dien_thoai' },
    { title: 'CCCD', dataIndex: 'cccd', key: 'cccd' },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="primary" 
            icon={<PlusCircleOutlined />}
            onClick={() => onOpenVisitModal(record)}
          >
            Tạo Lượt Khám
          </Button>
          <Button icon={<HistoryOutlined />}>
            Lịch sử
          </Button>
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={data} rowKey="benh_nhan_id" loading={loading} pagination={{ pageSize: 8 }} />;
};

export default PatientTable;