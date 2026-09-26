import { useParams, useNavigate } from 'react-router-dom';
import { Layout, Button, Typography, Tabs, Tag, Card, Descriptions } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title } = Typography;

const PatientProfileScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Tại đây bạn sẽ gọi API lấy thông tin chi tiết BN dựa vào "id"
  // ...

  const tabItems = [
    { key: '1', label: 'Lịch sử khám bệnh', children: <p>Nội dung các lần khám trước...</p> },
    { key: '2', label: 'Kết quả Cận lâm sàng', children: <p>Phiếu xét nghiệm, X-Quang...</p> },
    { key: '3', label: 'Lịch sử Đơn thuốc', children: <p>Danh sách các loại thuốc đã cấp...</p> },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', display: 'flex', alignItems: 'center', padding: '0 24px', borderBottom: '1px solid #f0f0f0' }}>
        <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} style={{ marginRight: 16 }}>
          Quay lại
        </Button>
        <Title level={4} style={{ margin: 0 }}>Hồ Sơ Điện Tử (EMR)</Title>
      </Header>
      
      <Content style={{ padding: 24, maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        {/* Phần Header ghim thông tin chung */}
        <Card style={{ marginBottom: 24, borderLeft: '4px solid #1677ff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Descriptions title="Nguyễn Văn A" column={4}>
              <Descriptions.Item label="Mã BN">{id}</Descriptions.Item>
              <Descriptions.Item label="Tuổi">35</Descriptions.Item>
              <Descriptions.Item label="Giới tính">Nam</Descriptions.Item>
              <Descriptions.Item label="SĐT">0909123456</Descriptions.Item>
            </Descriptions>
            <div>
              <Tag color="red">Dị ứng Penicillin</Tag>
              <Tag color="orange">Cao huyết áp</Tag>
            </div>
          </div>
        </Card>

        {/* Phần Body các Tabs */}
        <Card>
          <Tabs defaultActiveKey="1" items={tabItems} />
        </Card>
      </Content>
    </Layout>
  );
};

export default PatientProfileScreen;