import { Form, Input, Select, Button, Table, Tag, Space, message } from 'antd';
import { useDoctorStore } from '../store/useDoctorStore';

const { TextArea } = Input;

const ExaminationTab = ({ luotKhamId }) => {
  const icd10List = useDoctorStore((s) => s.icd10List);
  const examinationDraft = useDoctorStore((s) => s.getExamination(luotKhamId));
  const diagnoses = useDoctorStore((s) => s.getDiagnoses(luotKhamId));
  const updateExaminationDraft = useDoctorStore((s) => s.updateExaminationDraft);
  const addDiagnosis = useDoctorStore((s) => s.addDiagnosis);
  const removeDiagnosis = useDoctorStore((s) => s.removeDiagnosis);
  const saveExamination = useDoctorStore((s) => s.saveExamination);

  const handleAddDiagnosis = (chan_doan_id) => {
    if (diagnoses.some((d) => d.chan_doan_id === chan_doan_id)) return;
    addDiagnosis(luotKhamId, chan_doan_id, diagnoses.length === 0 ? 'chinh' : 'phu');
  };

  const handleSave = () => {
    if (diagnoses.length === 0) {
      message.warning('Cần ít nhất một chẩn đoán trước khi lưu.');
      return;
    }
    saveExamination(luotKhamId);
    message.success('Đã lưu thông tin khám và chẩn đoán (dữ liệu mẫu).');
  };

  const columns = [
    { title: 'Mã ICD-10', dataIndex: 'ma_icd10', width: 100 },
    { title: 'Tên chẩn đoán', dataIndex: 'ten_chan_doan' },
    {
      title: 'Loại',
      dataIndex: 'loai',
      width: 100,
      render: (loai) => <Tag color={loai === 'chinh' ? 'blue' : 'default'}>{loai === 'chinh' ? 'Chính' : 'Phụ'}</Tag>,
    },
    {
      title: '',
      key: 'action',
      width: 80,
      render: (_, r) => <a onClick={() => removeDiagnosis(luotKhamId, r.chan_doan_id)}>Xóa</a>,
    },
  ];

  return (
    <div>
      <Form layout="vertical">
        <Form.Item label="Quá trình bệnh lý">
          <TextArea
            rows={2}
            value={examinationDraft.qua_trinh_benh_ly}
            onChange={(e) => updateExaminationDraft(luotKhamId, 'qua_trinh_benh_ly', e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Khám toàn thân">
          <TextArea
            rows={2}
            value={examinationDraft.kham_toan_than}
            onChange={(e) => updateExaminationDraft(luotKhamId, 'kham_toan_than', e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Khám các bộ phận">
          <TextArea
            rows={2}
            value={examinationDraft.kham_cac_bo_phan}
            onChange={(e) => updateExaminationDraft(luotKhamId, 'kham_cac_bo_phan', e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Hướng điều trị">
          <TextArea
            rows={2}
            value={examinationDraft.huong_dieu_tri}
            onChange={(e) => updateExaminationDraft(luotKhamId, 'huong_dieu_tri', e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Tìm và thêm chẩn đoán (ICD-10)">
          <Select
            showSearch
            placeholder="Nhập mã hoặc tên bệnh để tìm..."
            optionFilterProp="label"
            style={{ width: '100%' }}
            onSelect={handleAddDiagnosis}
            options={icd10List.map((d) => ({ value: d.chan_doan_id, label: `${d.ma_icd10} — ${d.ten_chan_doan}` }))}
          />
        </Form.Item>
      </Form>

      <Table columns={columns} dataSource={diagnoses} rowKey="chan_doan_id" pagination={false} size="small" style={{ marginBottom: 16 }} />

      <Space>
        <Button type="primary" onClick={handleSave}>
          Lưu khám & chẩn đoán
        </Button>
      </Space>
    </div>
  );
};

export default ExaminationTab;
