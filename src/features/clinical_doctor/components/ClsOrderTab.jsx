import { useState } from 'react';
import { Select, InputNumber, Button, Table, Space, message } from 'antd';
import { useDoctorStore } from '../store/useDoctorStore';

const ClsOrderTab = ({ luotKhamId }) => {
  const clsServiceList = useDoctorStore((s) => s.clsServiceList);
  const clsOrders = useDoctorStore((s) => s.getClsOrders(luotKhamId));
  const addClsOrder = useDoctorStore((s) => s.addClsOrder);
  const removeClsOrder = useDoctorStore((s) => s.removeClsOrder);
  const saveClsOrders = useDoctorStore((s) => s.saveClsOrders);

  const [selectedService, setSelectedService] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    if (!selectedService) return;
    addClsOrder(luotKhamId, selectedService, quantity);
    setSelectedService(null);
    setQuantity(1);
  };

  const handleSave = () => {
    if (clsOrders.length === 0) {
      message.warning('Phiếu chỉ định cần ít nhất một dịch vụ.');
      return;
    }
    saveClsOrders(luotKhamId);
    message.success('Đã lưu phiếu chỉ định — lượt khám chuyển sang "Chờ kết quả CLS".');
  };

  const columns = [
    { title: 'Dịch vụ', dataIndex: 'ten_dich_vu' },
    { title: 'Loại', dataIndex: 'loai_dich_vu', render: (t) => (t === 'xet_nghiem' ? 'Xét nghiệm' : 'CĐHA') },
    { title: 'Số lượng', dataIndex: 'so_luong', width: 100 },
    { title: '', key: 'action', width: 80, render: (_, r) => <a onClick={() => removeClsOrder(luotKhamId, r.dich_vu_id)}>Xóa</a> },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Select
          showSearch
          placeholder="Chọn dịch vụ cận lâm sàng"
          style={{ width: 320 }}
          value={selectedService}
          onChange={setSelectedService}
          optionFilterProp="label"
          options={clsServiceList.map((s) => ({ value: s.dich_vu_id, label: s.ten_dich_vu }))}
        />
        <InputNumber min={1} value={quantity} onChange={setQuantity} />
        <Button onClick={handleAdd}>Thêm vào phiếu</Button>
      </Space>

      <Table columns={columns} dataSource={clsOrders} rowKey="dich_vu_id" pagination={false} size="small" style={{ marginBottom: 16 }} />

      <Button type="primary" onClick={handleSave}>
        Lưu phiếu chỉ định
      </Button>
    </div>
  );
};

export default ClsOrderTab;
