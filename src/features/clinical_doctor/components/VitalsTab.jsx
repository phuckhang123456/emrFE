import { Form, InputNumber, Button, message } from 'antd';
import { useDoctorStore } from '../store/useDoctorStore';

const VitalsTab = ({ luotKhamId }) => {
  const vitals = useDoctorStore((s) => s.getVitals(luotKhamId));
  const updateVitals = useDoctorStore((s) => s.updateVitals);
  const saveVitals = useDoctorStore((s) => s.saveVitals);

  const handleChange = (field) => (value) => updateVitals(luotKhamId, field, value);

  const handleSave = () => {
    saveVitals(luotKhamId);
    message.success('Đã lưu sinh hiệu (dữ liệu mẫu).');
  };

  return (
    <Form layout="vertical" style={{ maxWidth: 480 }}>
      <Form.Item label="Mạch (lần/phút)">
        <InputNumber style={{ width: '100%' }} value={vitals.mach} onChange={handleChange('mach')} />
      </Form.Item>
      <Form.Item label="Nhiệt độ (°C)">
        <InputNumber style={{ width: '100%' }} step={0.1} value={vitals.nhiet_do} onChange={handleChange('nhiet_do')} />
      </Form.Item>
      <Form.Item label="Huyết áp tâm thu (mmHg)">
        <InputNumber style={{ width: '100%' }} value={vitals.huyet_ap_tam_thu} onChange={handleChange('huyet_ap_tam_thu')} />
      </Form.Item>
      <Form.Item label="Huyết áp tâm trương (mmHg)">
        <InputNumber
          style={{ width: '100%' }}
          value={vitals.huyet_ap_tam_truong}
          onChange={handleChange('huyet_ap_tam_truong')}
        />
      </Form.Item>
      <Form.Item label="Nhịp thở (lần/phút)">
        <InputNumber style={{ width: '100%' }} value={vitals.nhip_tho} onChange={handleChange('nhip_tho')} />
      </Form.Item>
      <Form.Item label="Cân nặng (kg)">
        <InputNumber style={{ width: '100%' }} step={0.1} value={vitals.can_nang} onChange={handleChange('can_nang')} />
      </Form.Item>
      <Form.Item label="Chiều cao (cm)">
        <InputNumber style={{ width: '100%' }} step={0.1} value={vitals.chieu_cao} onChange={handleChange('chieu_cao')} />
      </Form.Item>
      <Button type="primary" onClick={handleSave}>
        Lưu sinh hiệu
      </Button>
    </Form>
  );
};

export default VitalsTab;
