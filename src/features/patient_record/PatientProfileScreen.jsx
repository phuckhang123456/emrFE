import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout, Button, Typography, Card, Descriptions, Table, Tag, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
// import { useReceptionStore } from '../store/useReceptionStore'; // Bật dòng này khi bạn gọi API thực tế

const { Header, Content } = Layout;
const { Title } = Typography;

const PatientProfileScreen = () => {
  const { id } = useParams(); // Lấy mã bệnh nhân từ URL
  const navigate = useNavigate();
  
  const [patient, setPatient] = useState({});
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock Data (Thay thế bằng API thực tế lấy từ DB dựa vào id)
  useEffect(() => {
    setLoading(true);
    // Tạm thời set data mẫu. Thực tế: gọi API GET /api/benh-nhan/:id và GET /api/luot-kham?benh_nhan_id=:id
    setTimeout(() => {
      setPatient({
        benhNhanId: id,
        hoTen: 'Nguyễn Văn A',
        ngaySinh: '1985-05-20',
        gioiTinh: 'Nam',
        soDinhDanh: '079085001234',
        soDienThoai: '0909123456',
        diaChi: 'Quận 1, TP.HCM'
      });
      setVisits([
        { luotKhamId: 'LK1001', ngayGioKham: '2026-09-20 08:30', khoa: 'Khoa Nội', bacSi: 'BS. Trần B', lyDoKham: 'Đau dạ dày', trangThai: 'hoan_tat' },
        { luotKhamId: 'LK1002', ngayGioKham: '2026-08-15 09:15', khoa: 'Khoa Ngoại', bacSi: 'BS. Lê C', lyDoKham: 'Chấn thương phần mềm', trangThai: 'hoan_tat' },
      ]);
      setLoading(false);
    }, 500);
  }, [id]);

  const getStatusTag = (status) => {
    switch(status) {
      case 'hoan_tat': return <Tag color="green">Đã hoàn tất</Tag>;
      case 'dang_kham': return <Tag color="blue">Đang khám</Tag>;
      case 'da_huy': return <Tag color="error">Đã hủy</Tag>;
      default: return <Tag>{status}</Tag>;
    }
  };

  const columns = [
    { title: 'Ngày giờ khám', dataIndex: 'ngayGioKham', key: 'ngayGioKham', width: 150 },
    { title: 'Khoa', dataIndex: 'khoa', key: 'khoa' },
    { title: 'Bác sĩ', dataIndex: 'bacSi', key: 'bacSi' },
    { title: 'Lý do khám', dataIndex: 'lyDoKham', key: 'lyDoKham' },
    { title: 'Trạng thái', dataIndex: 'trangThai', key: 'trangThai', render: getStatusTag },
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <Header style={{ background: '#fff', display: 'flex', alignItems: 'center', padding: '0 24px', boxShadow: '0 1px 4px rgba(0,21,41,.08)' }}>
        <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} style={{ marginRight: 16 }}>
          Quay lại
        </Button>
        <Title level={4} style={{ margin: 0 }}>Hồ sơ bệnh án</Title>
      </Header>
      
      <Content style={{ padding: 24, maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        {/* Phần 1: Thông tin bệnh nhân */}
        <Card title={patient.hoTen} loading={loading} style={{ marginBottom: 24, borderLeft: '4px solid #1677ff' }}>
          <Descriptions column={{ xxl: 4, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}>
            <Descriptions.Item label="Mã bệnh nhân"><b>{patient.benhNhanId}</b></Descriptions.Item>
            <Descriptions.Item label="Ngày sinh">{patient.ngaySinh}</Descriptions.Item>
            <Descriptions.Item label="Giới tính">{patient.gioiTinh}</Descriptions.Item>
            <Descriptions.Item label="Số định danh">{patient.soDinhDanh}</Descriptions.Item>
            <Descriptions.Item label="Số điện thoại">{patient.soDienThoai}</Descriptions.Item>
            <Descriptions.Item label="Địa chỉ">{patient.diaChi}</Descriptions.Item>
          </Descriptions>
        </Card>

        {/* Phần 2: Lịch sử khám bệnh */}
        <Card title="Lịch sử lượt khám" loading={loading}>
          <Table 
            columns={columns} 
            dataSource={visits} 
            rowKey="luotKhamId"
            pagination={{ pageSize: 10 }}
            rowClassName={() => 'clickable-row'} // Thêm CSS để hiện con trỏ chuột dạng pointer
            onRow={(record) => ({
              onClick: () => {
                // Điều hướng sang trang chi tiết của lượt khám đó
                navigate(`/chi-tiet-luot-kham/${record.luotKhamId}`);
              },
            })}
          />
        </Card>
      </Content>
    </Layout>
  );
};

export default PatientProfileScreen;