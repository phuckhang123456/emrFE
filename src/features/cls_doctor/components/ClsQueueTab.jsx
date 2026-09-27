import { Table, Tag, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useClsStore } from '../store/useClsStore';

const ClsQueueTab = () => {
  const queue = useClsStore((s) => s.queue);
  const navigate = useNavigate();

  // Chỉ hiển thị các chỉ định chưa thực hiện — tương ứng
  // GET /chi-tiet-chi-dinh?trang_thai=cho_thuc_hien
  const pending = queue.filter((o) => o.trang_thai === 'cho_thuc_hien');

  const columns = [
    { title: 'Giờ chỉ định', dataIndex: 'ngay_yeu_cau', width: 150 },
    { title: 'Bệnh nhân', dataIndex: ['benh_nhan', 'ho_ten'] },
    { title: 'Dịch vụ', dataIndex: ['dich_vu', 'ten_dich_vu'] },
    {
      title: 'Loại',
      dataIndex: ['dich_vu', 'loai_dich_vu'],
      width: 120,
      render: (t) => (
        <Tag color={t === 'xet_nghiem' ? 'geekblue' : 'volcano'}>{t === 'xet_nghiem' ? 'Xét nghiệm' : 'CĐHA'}</Tag>
      ),
    },
    {
      title: '',
      key: 'action',
      width: 140,
      render: (_, record) => (
        <Button type="primary" size="small" onClick={() => navigate(`/cls/tra-ket-qua/${record.chi_tiet_id}`)}>
          Trả kết quả
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Table columns={columns} dataSource={pending} rowKey="chi_tiet_id" pagination={false} />
    </div>
  );
};

export default ClsQueueTab;
