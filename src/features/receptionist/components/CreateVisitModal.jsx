import { useState, useEffect } from 'react';
import { Modal, Form, Select, Input, Descriptions, message } from 'antd';
import receptionistService from '../../../services/receptionist.service';
import { useReceptionStore } from '../store/useReceptionStore';

const CreateVisitModal = ({ isOpen, onClose, patient, mode = 'create', initialData = null }) => {
  const [form] = Form.useForm();
  const { createVisit, updateVisit } = useReceptionStore();
  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(false);

  // Xử lý load Bác sĩ và điền dữ liệu cũ (nếu là Sửa) khi mở Modal
  useEffect(() => {
    if (isOpen) {
      const fetchDoctors = async () => {
        setLoadingDoctors(true);
        try {
          const data = await receptionistService.getDoctors();
          setDoctors(data);
        } catch (error) {
          message.error('Không thể tải danh sách bác sĩ');
        } finally {
          setLoadingDoctors(false);
        }
      };
      
      fetchDoctors();

      // Nếu là chế độ sửa, đổ dữ liệu cũ vào Form
      if (mode === 'edit' && initialData) {
        form.setFieldsValue({
          khoa: initialData.khoa,
          bac_si_id: initialData.bac_si_id,
          ly_do_kham: initialData.ly_do_kham,
        });
      } else {
        form.resetFields();
      }
    }
  }, [isOpen, mode, initialData, form]);

  const handleSubmit = async (values) => {
    try {
      if (mode === 'create') {
        const visitData = {
          benh_nhan_id: patient.benh_nhan_id,
          bac_si_id: values.bac_si_id,
          khoa: values.khoa,
          ly_do_kham: values.ly_do_kham
        };
        await createVisit(visitData);
        message.success(`Đã đăng ký lượt khám cho ${patient?.ho_ten}.`);
      } 
      else if (mode === 'edit') {
        await updateVisit(initialData.luot_kham_id, values);
        message.success('Đã cập nhật thông tin lượt khám.');
      }
      onClose();
    } catch (error) {
      message.error(error.response?.data?.error || 'Lỗi khi xử lý thao tác');
    }
  };

  return (
    <Modal
      title={mode === 'create' ? "Đăng Ký Lượt Khám" : "Chỉnh Sửa Lượt Khám"}
      open={isOpen}
      onCancel={onClose}
      onOk={() => form.submit()}
      okText={mode === 'create' ? "Xác nhận đăng ký" : "Lưu thay đổi"}
      cancelText="Hủy"
      mask={{ closable: false }}
    >
      {patient && (
        <Descriptions size="small" column={1} bordered style={{ marginBottom: 16 }}>
          <Descriptions.Item label="Mã BN">{patient.benh_nhan_id}</Descriptions.Item>
          <Descriptions.Item label="Họ tên"><b>{patient.ho_ten}</b></Descriptions.Item>
          <Descriptions.Item label="SĐT">{patient.so_dien_thoai || 'Chưa có'}</Descriptions.Item>
        </Descriptions>
      )}

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="khoa" label="Khoa khám" rules={[{ required: true, message: 'Vui lòng chọn khoa phòng!' }]}>
          <Select placeholder="Chọn khoa phòng">
            <Select.Option value="Noi">Khoa Nội</Select.Option>
            <Select.Option value="Ngoai">Khoa Ngoại</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="bac_si_id" label="Bác sĩ khám" rules={[{ required: true, message: 'Vui lòng chọn bác sĩ!' }]}>
          <Select placeholder="Chọn bác sĩ phụ trách" loading={loadingDoctors}>
            {doctors.map(doc => (
              <Select.Option key={doc.nguoi_dung_id} value={doc.nguoi_dung_id}>
                {doc.ho_ten}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="ly_do_kham" label="Lý do khám">
          <Input.TextArea rows={3} placeholder="VD: Sốt cao, đau đầu..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateVisitModal;