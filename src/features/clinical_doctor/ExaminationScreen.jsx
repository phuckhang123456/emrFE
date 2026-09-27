import { useNavigate, useParams } from 'react-router-dom';
import { Layout, Typography, Descriptions, Tag, Tabs, Button, Popconfirm, message } from 'antd';
import { ArrowLeftOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useDoctorStore } from './store/useDoctorStore';
import VitalsTab from './components/VitalsTab';
import ExaminationTab from './components/ExaminationTab';
import ClsOrderTab from './components/ClsOrderTab';
import PrescriptionTab from './components/PrescriptionTab';

const { Header, Content } = Layout;
const { Title } = Typography;

const ExaminationScreen = () => {
  const { luotKhamId } = useParams();
  const navigate = useNavigate();
  const visit = useDoctorStore((s) => s.getVisit(luotKhamId));
  const completeVisit = useDoctorStore((s) => s.completeVisit);

  if (!visit) {
    return (
      <Content style={{ padding: 24 }}>
        Không tìm thấy lượt khám. <a onClick={() => navigate('/bac-si/kham-benh')}>Quay lại hàng đợi</a>
      </Content>
    );
  }

  const { benh_nhan, khoa, ly_do_kham, trang_thai } = visit;

  const handleComplete = () => {
    completeVisit(luotKhamId);
    message.success('Đã hoàn tất lượt khám (dữ liệu mẫu — chưa ghi vào CSDL thật).');
    navigate('/bac-si/kham-benh');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          borderBottom: '1px solid #f0f0f0',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/bac-si/kham-benh')}
            style={{ marginRight: 12 }}
          >
            Hàng đợi
          </Button>
          <Title level={4} style={{ margin: 0 }}>
            Khám bệnh — Bác sĩ lâm sàng
          </Title>
        </div>
        <Popconfirm
          title="Hoàn tất lượt khám? Sau khi hoàn tất sẽ không thể sửa trực tiếp."
          onConfirm={handleComplete}
          disabled={trang_thai === 'hoan_tat'}
        >
          <Button type="primary" icon={<CheckCircleOutlined />} disabled={trang_thai === 'hoan_tat'}>
            {trang_thai === 'hoan_tat' ? 'Đã hoàn tất' : 'Hoàn tất lượt khám'}
          </Button>
        </Popconfirm>
      </Header>

      <Content style={{ padding: 24, maxWidth: 1100, margin: '0 auto', width: '100%' }}>
        <Descriptions
          title={benh_nhan.ho_ten}
          bordered
          size="small"
          column={3}
          style={{ marginBottom: 24, background: '#fff' }}
        >
          <Descriptions.Item label="Mã BN">{benh_nhan.benh_nhan_id}</Descriptions.Item>
          <Descriptions.Item label="Giới tính">{benh_nhan.gioi_tinh}</Descriptions.Item>
          <Descriptions.Item label="Năm sinh">{benh_nhan.ngay_sinh?.substring(0, 4)}</Descriptions.Item>
          <Descriptions.Item label="Khoa">{khoa === 'Noi' ? 'Khoa Nội' : 'Khoa Ngoại'}</Descriptions.Item>
          <Descriptions.Item label="Lý do khám" span={2}>
            {ly_do_kham}
          </Descriptions.Item>
          <Descriptions.Item label="Trạng thái" span={3}>
            <Tag color="blue">{trang_thai}</Tag>
          </Descriptions.Item>
        </Descriptions>

        <Tabs
          defaultActiveKey="sinhhieu"
          items={[
            { key: 'sinhhieu', label: 'Sinh hiệu', children: <VitalsTab luotKhamId={luotKhamId} /> },
            { key: 'kham', label: 'Khám & Chẩn đoán', children: <ExaminationTab luotKhamId={luotKhamId} /> },
            { key: 'cls', label: 'Chỉ định Cận lâm sàng', children: <ClsOrderTab luotKhamId={luotKhamId} /> },
            { key: 'donthuoc', label: 'Đơn thuốc', children: <PrescriptionTab luotKhamId={luotKhamId} /> },
          ]}
        />
      </Content>
    </Layout>
  );
};

export default ExaminationScreen;
