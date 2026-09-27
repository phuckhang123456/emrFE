import { Form, Input, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useClsStore } from '../store/useClsStore';

const { TextArea } = Input;

const ImagingResultForm = ({ chiTietId }) => {
  const result = useClsStore((s) => s.getImagingResult(chiTietId));
  const updateImagingResult = useClsStore((s) => s.updateImagingResult);
  const confirmResult = useClsStore((s) => s.confirmResult);
  const navigate = useNavigate();

  const handleConfirm = () => {
    // FR-CLS-09 / Exception E1
    if (!result.mo_ta || !result.ket_luan) {
      message.error('Vui lòng nhập đầy đủ Mô tả và Kết luận trước khi xác nhận.');
      return;
    }
    confirmResult(chiTietId);
    message.success('Đã lưu kết quả CĐHA (dữ liệu mẫu).');
    navigate('/cls/hang-doi');
  };

  return (
    <Form layout="vertical">
      <Form.Item label="Mô tả">
        <TextArea rows={4} value={result.mo_ta} onChange={(e) => updateImagingResult(chiTietId, 'mo_ta', e.target.value)} />
      </Form.Item>
      <Form.Item label="Kết luận">
        <TextArea rows={2} value={result.ket_luan} onChange={(e) => updateImagingResult(chiTietId, 'ket_luan', e.target.value)} />
      </Form.Item>
      <Form.Item label="Tệp hình ảnh (mock — chưa upload lên storage thật)">
        <Upload
          beforeUpload={(file) => {
            updateImagingResult(chiTietId, 'duong_dan_file', file.name);
            return false; // ngăn Upload tự động gửi request
          }}
        >
          <Button icon={<UploadOutlined />}>Chọn tệp</Button>
        </Upload>
        {result.duong_dan_file && <div style={{ marginTop: 8 }}>Đã chọn: {result.duong_dan_file}</div>}
      </Form.Item>
      <Button type="primary" onClick={handleConfirm}>
        Xác nhận kết quả
      </Button>
    </Form>
  );
};

export default ImagingResultForm;
