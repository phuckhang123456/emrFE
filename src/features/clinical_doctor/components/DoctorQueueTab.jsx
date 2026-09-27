import { Table, Tag, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDoctorStore } from '../store/useDoctorStore';

const statusMeta = {
  moi_tao: { label: 'Chờ khám', color: 'gold', action: 'Bắt đầu khám' },
  dang_kham: { label: 'Đang khám', color: 'blue', action: 'Tiếp tục khám' },
  cho_cls: { label: 'Chờ kết quả CLS', color: 'purple', action: 'Xem & tiếp tục' },
};

const DoctorQueueTab = () => {
  const queue = useDoctorStore((s) => s.queue);
  const startExam = useDoctorStore((s) => s.startExam);
  const navigate = useNavigate();

  // Chỉ hiển thị các lượt khám chưa hoàn tất/hủy — tương ứng
  // GET /luot-kham?bac_si_id=...&trang_thai=moi_tao,dang_kham,cho_cls
  const pending = queue.filter((v) => ['moi_tao', 'dang_kham', 'cho_cls'].includes(v.trang_thai));

  const handleOpen = (visit) => {
    if (visit.trang_thai === 'moi_tao') startExam(visit.luot_kham_id);
    navigate(`/bac-si/kham-benh/${visit.luot_kham_id}`);
  };

  const columns = [
    { title: 'Giờ khám', dataIndex: 'ngay_gio_kham', width: 150 },
    { title: 'Bệnh nhân', dataIndex: ['benh_nhan', 'ho_ten'] },
    { title: 'Lý do khám', dataIndex: 'ly_do_kham' },
    {
      title: 'Trạng thái',
      dataIndex: 'trang_thai',
      width: 160,
      render: (t) => <Tag color={statusMeta[t]?.color}>{statusMeta[t]?.label ?? t}</Tag>,
    },
    {
      title: '',
      key: 'action',
      width: 160,
      render: (_, record) => (
        <Button type="primary" size="small" onClick={() => handleOpen(record)}>
          {statusMeta[record.trang_thai]?.action ?? 'Mở'}
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Table columns={columns} dataSource={pending} rowKey="luot_kham_id" pagination={false} />
    </div>
  );
};

export default DoctorQueueTab;
