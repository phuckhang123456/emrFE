import { Modal, Form, Input, Select, DatePicker, message } from 'antd';
import { useReceptionStore } from '../store/useReceptionStore';

const AddPatientModal = ({ isOpen, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const addPatient = useReceptionStore(state => state.addPatient);

  const handleSubmit = async (values) => {
    try {
      const formattedData = {
        ...values,
        ngay_sinh: values.ngay_sinh ? values.ngay_sinh.format('YYYY-MM-DD') : null
      };
      
      const newPatient = await addPatient(formattedData);
      message.success('Thêm hồ sơ bệnh nhân thành công!');
      form.resetFields();
      onSuccess(newPatient); 
    } catch (error) {
      message.error(error.response?.data?.error || 'Có lỗi xảy ra khi lưu bệnh nhân');
    }
  };

  return (
    <Modal
      title="Thêm Bệnh Nhân Mới"
      open={isOpen}
      onCancel={onClose}
      onOk={() => form.submit()}
      okText="Lưu & Đăng ký khám"
      cancelText="Hủy"
      mask={{ closable: false }}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="ho_ten" label="Họ và tên" rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}>
          <Input autoFocus placeholder="VD: Nguyễn Văn A" />
        </Form.Item>

        <Form.Item name="ngay_sinh" label="Ngày sinh" rules={[{ required: true, message: 'Chọn ngày sinh!' }]}>
          <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
        </Form.Item>

        <Form.Item name="gioi_tinh" label="Giới tính" rules={[{ required: true, message: 'Chọn giới tính!' }]}>
          <Select placeholder="Chọn giới tính">
            <Select.Option value="Nam">Nam</Select.Option>
            <Select.Option value="Nu">Nữ</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="so_dien_thoai" label="Số điện thoại">
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>

        <Form.Item name="cccd" label="CCCD (12 số)" rules={[{ pattern: /^[0-9]{12}$/, message: 'CCCD phải đủ 12 chữ số!' }]}>
          <Input placeholder="Nhập 12 số CCCD" maxLength={12} />
        </Form.Item>

        <Form.Item name="dia_chi" label="Địa chỉ">
          <Input.TextArea rows={2} placeholder="Nhập địa chỉ cư trú" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddPatientModal;