import { Table, Tag, Button, Popconfirm, Typography } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useReceptionStore } from '../store/useReceptionStore';

const { Title } = Typography;

const DailyQueueTab = () => {
  const { queueList, cancelVisit } = useReceptionStore();

  const getStatusTag = (status) => {
    switch(status) {
      case 'moi_tao': return <Tag color="gold">Chờ khám</Tag>;
      case 'dang_kham': return <Tag color="blue">Đang khám</Tag>;
      case 'cho_cls': return <Tag color="orange">Chờ KQ Cận lâm sàng</Tag>;
      case 'hoan_tat': return <Tag color="default">Hoàn tất</Tag>;
      case 'da_huy': return <Tag color="error">Đã hủy</Tag>;
      default: return <Tag>{status}</Tag>;
    }
  };

  const columns = [
    { title: 'STT', key: 'stt', render: (_, __, index) => index + 1, width: 60 },
    { title: 'Mã Lượt', dataIndex: 'luot_kham_id', width: 100 },
    { title: 'Bệnh nhân', dataIndex: ['benh_nhan', 'ho_ten'], fontWeight: 'bold' },
    { title: 'Khoa', dataIndex: 'khoa' },
    { title: 'Bác sĩ', dataIndex: ['bac_si', 'ho_ten'] },
    { title: 'Trạng thái', dataIndex: 'trang_thai', render: (status) => getStatusTag(status) },
    { 
      title: 'Hành động', 
      key: 'action', 
      align: 'right',
      render: (_, record) => (
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <Button size="small" icon={<EditOutlined />} disabled={record.trang_thai !== 'moi_tao'}>Sửa</Button>
          <Popconfirm title="Chắc chắn hủy lượt khám này?" onConfirm={() => cancelVisit(record.luot_kham_id)}>
            <Button size="small" danger icon={<DeleteOutlined />} disabled={record.trang_thai !== 'moi_tao'}>Hủy</Button>
          </Popconfirm>
        </div>
      )
    },
  ];

  // Đẩy các ca 'hoan_tat' và 'da_huy' xuống cuối danh sách
  const sortedQueue = [...queueList].sort((a, b) => {
    const isADone = a.trang_thai === 'hoan_tat' || a.trang_thai === 'da_huy';
    const isBDone = b.trang_thai === 'hoan_tat' || b.trang_thai === 'da_huy';
    return isADone === isBDone ? 0 : isADone ? 1 : -1;
  });

  return (
    <div>
      <Title level={3} style={{ marginBottom: 20 }}>Hàng đợi hôm nay</Title>
      <Table 
        columns={columns} 
        dataSource={sortedQueue} 
        rowKey="luot_kham_id"
        rowClassName={(record) => (record.trang_thai === 'hoan_tat' ? 'row-completed' : '')}
      />
      {/* CSS làm mờ dòng hoàn tất: Thêm vào file index.css của bạn: .row-completed { opacity: 0.6; background-color: #f5f5f5; } */}
    </div>
  );
};

export default DailyQueueTab;