import { Table, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { usePharmacistStore } from '../store/usePharmacistStore';

const PharmacyQueueTab = () => {
  const queue = usePharmacistStore((s) => s.queue);
  const navigate = useNavigate();

  // Chỉ hiển thị đơn thuốc chưa cấp — tương ứng GET /don-thuoc?trang_thai=cho_cap_phat
  const pending = queue.filter((d) => d.trang_thai === 'cho_cap_phat');

  const columns = [
    { title: 'Giờ kê đơn', dataIndex: 'ngay_ke', width: 150 },
    { title: 'Bệnh nhân', dataIndex: ['benh_nhan', 'ho_ten'] },
    { title: 'Số loại thuốc', key: 'so_thuoc', width: 120, render: (_, r) => r.chi_tiet.length },
    {
      title: '',
      key: 'action',
      width: 140,
      render: (_, record) => (
        <Button type="primary" size="small" onClick={() => navigate(`/duoc-si/cap-phat/${record.don_thuoc_id}`)}>
          Cấp phát
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Table columns={columns} dataSource={pending} rowKey="don_thuoc_id" pagination={false} />
    </div>
  );
};

export default PharmacyQueueTab;
