import { useNavigate, useParams } from 'react-router-dom';
import { Layout, Typography, Descriptions, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useClsStore } from './store/useClsStore';
import LabResultForm from './components/LabResultForm';
import ImagingResultForm from './components/ImagingResultForm';

const { Header, Content } = Layout;
const { Title } = Typography;

const ClsResultScreen = () => {
  const { chiTietId } = useParams();
  const navigate = useNavigate();
  const order = useClsStore((s) => s.getOrder(chiTietId));

  if (!order) {
    return (
      <Content style={{ padding: 24 }}>
        Không tìm thấy chỉ định. <a onClick={() => navigate('/cls/hang-doi')}>Quay lại hàng đợi</a>
      </Content>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
          borderBottom: '1px solid #f0f0f0',
        }}
      >
        <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => navigate('/cls/hang-doi')} style={{ marginRight: 12 }}>
          Hàng đợi
        </Button>
        <Title level={4} style={{ margin: 0 }}>
          Trả kết quả cận lâm sàng
        </Title>
      </Header>

      <Content style={{ padding: 24, maxWidth: 800, margin: '0 auto', width: '100%' }}>
        <Descriptions
          title={order.dich_vu.ten_dich_vu}
          bordered
          size="small"
          column={2}
          style={{ marginBottom: 24, background: '#fff' }}
        >
          <Descriptions.Item label="Bệnh nhân">{order.benh_nhan.ho_ten}</Descriptions.Item>
          <Descriptions.Item label="Giờ chỉ định">{order.ngay_yeu_cau}</Descriptions.Item>
        </Descriptions>

        {order.dich_vu.loai_dich_vu === 'xet_nghiem' ? (
          <LabResultForm chiTietId={chiTietId} />
        ) : (
          <ImagingResultForm chiTietId={chiTietId} />
        )}
      </Content>
    </Layout>
  );
};

export default ClsResultScreen;
