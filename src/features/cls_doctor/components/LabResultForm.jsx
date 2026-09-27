import { Table, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useClsStore } from '../store/useClsStore';

const LabResultForm = ({ chiTietId }) => {
  const order = useClsStore((s) => s.getOrder(chiTietId));
  const results = useClsStore((s) => s.getLabResults(chiTietId));
  const clsIndicesByService = useClsStore((s) => s.clsIndicesByService);
  const updateLabResult = useClsStore((s) => s.updateLabResult);
  const confirmResult = useClsStore((s) => s.confirmResult);
  const navigate = useNavigate();

  const indices = clsIndicesByService[order.dich_vu.dich_vu_id] || [];
  const rows = indices.map((i) => {
    const found = results.find((r) => r.chi_so_id === i.chi_so_id);
    return { ...i, ket_qua_xet_nghiem: found?.ket_qua_xet_nghiem ?? '' };
  });

  const handleConfirm = () => {
    // FR-CLS-09 / Exception E1: kiểm tra đủ thông tin bắt buộc trước khi xác nhận
    const missing = rows.some((r) => !r.ket_qua_xet_nghiem);
    if (missing) {
      message.error('Vui lòng nhập đầy đủ kết quả cho tất cả chỉ số.');
      return;
    }
    confirmResult(chiTietId);
    message.success('Đã lưu kết quả xét nghiệm (dữ liệu mẫu).');
    navigate('/cls/hang-doi');
  };

  const columns = [
    { title: 'Chỉ số', dataIndex: 'ten_chi_so' },
    {
      title: 'Kết quả',
      key: 'ket_qua',
      render: (_, r) => (
        <Input
          value={r.ket_qua_xet_nghiem}
          onChange={(e) => updateLabResult(chiTietId, r.chi_so_id, e.target.value)}
          addonAfter={r.don_vi_mac_dinh}
        />
      ),
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={rows} rowKey="chi_so_id" pagination={false} style={{ marginBottom: 16 }} />
      <Button type="primary" onClick={handleConfirm}>
        Xác nhận kết quả
      </Button>
    </div>
  );
};

export default LabResultForm;
