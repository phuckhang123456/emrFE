import { useState } from 'react';
import { Select, Input, InputNumber, Button, Table, Space, message } from 'antd';
import { useDoctorStore } from '../store/useDoctorStore';

const PrescriptionTab = ({ luotKhamId }) => {
  const medicineList = useDoctorStore((s) => s.medicineList);
  const prescriptionItems = useDoctorStore((s) => s.getPrescriptionItems(luotKhamId));
  const addPrescriptionItem = useDoctorStore((s) => s.addPrescriptionItem);
  const removePrescriptionItem = useDoctorStore((s) => s.removePrescriptionItem);
  const savePrescription = useDoctorStore((s) => s.savePrescription);

  const [thuocId, setThuocId] = useState(null);
  const [chiDinh, setChiDinh] = useState('');
  const [soLuong, setSoLuong] = useState(1);

  const handleAdd = () => {
    const medicine = medicineList.find((m) => m.thuoc_id === thuocId);
    if (!medicine || !chiDinh) {
      message.warning('Chọn thuốc và nhập chỉ định dùng thuốc.');
      return;
    }
    addPrescriptionItem(luotKhamId, { ...medicine, chi_dinh_dung_thuoc: chiDinh, so_luong_ke: soLuong });
    setThuocId(null);
    setChiDinh('');
    setSoLuong(1);
  };

  const handleSave = () => {
    if (prescriptionItems.length === 0) {
      message.warning('Đơn thuốc cần ít nhất một loại thuốc.');
      return;
    }
    savePrescription(luotKhamId);
    message.success('Đã lưu đơn thuốc (dữ liệu mẫu).');
  };

  const columns = [
    { title: 'Thuốc', dataIndex: 'ten_thuoc' },
    { title: 'Chỉ định dùng thuốc', dataIndex: 'chi_dinh_dung_thuoc' },
    { title: 'SL kê', dataIndex: 'so_luong_ke', width: 90 },
    { title: 'Đơn vị', dataIndex: 'don_vi_tinh', width: 90 },
    { title: '', key: 'action', width: 80, render: (_, r) => <a onClick={() => removePrescriptionItem(luotKhamId, r.thuoc_id)}>Xóa</a> },
  ];

  return (
    <div>
      <Space direction="vertical" style={{ width: '100%', marginBottom: 16 }}>
        <Space wrap>
          <Select
            showSearch
            placeholder="Chọn thuốc"
            style={{ width: 240 }}
            value={thuocId}
            onChange={setThuocId}
            optionFilterProp="label"
            options={medicineList.map((m) => ({ value: m.thuoc_id, label: m.ten_thuoc }))}
          />
          <Input
            placeholder="Chỉ định dùng (VD: Sáng 1 viên, tối 1 viên sau ăn)"
            style={{ width: 320 }}
            value={chiDinh}
            onChange={(e) => setChiDinh(e.target.value)}
          />
          <InputNumber min={1} value={soLuong} onChange={setSoLuong} addonBefore="SL" />
          <Button onClick={handleAdd}>Thêm vào đơn</Button>
        </Space>
      </Space>

      <Table columns={columns} dataSource={prescriptionItems} rowKey="thuoc_id" pagination={false} size="small" style={{ marginBottom: 16 }} />

      <Button type="primary" onClick={handleSave}>
        Lưu đơn thuốc
      </Button>
    </div>
  );
};

export default PrescriptionTab;
