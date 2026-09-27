import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout, Button, Typography, Card, Descriptions, Table, Tag, Divider, Modal } from 'antd';
import { ArrowLeftOutlined, FileTextOutlined, MedicineBoxOutlined, ExperimentOutlined, SafetyCertificateOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const VisitDetailScreen = () => {
  const { visitId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // State quản lý Modal xem kết quả CLS
  const [isClsModalVisible, setIsClsModalVisible] = useState(false);
  const [selectedCls, setSelectedCls] = useState(null);

  // --- MOCK DATA --- (Thay bằng API thực tế sau này)
  const visitInfo = {
    hoTen: 'Nguyễn Văn A',
    ngayGioKham: '20/09/2026 – 09:30',
    khoa: 'Khoa Nội',
    bacSi: 'Nguyễn Văn B',
    lyDoKham: 'Đau đầu',
    trangThai: 'Hoàn tất'
  };

  const phieuKham = {
    quaTrinhBenhLy: 'Bệnh nhân đau đầu 2 ngày, đau âm ỉ vùng trán, không sốt, không buồn nôn.',
    sinhHieu: { mach: '78 lần/phút', nhietDo: '37.2 °C', huyetAp: '120/80 mmHg', canNang: '65 kg' },
    khamToanThan: 'Bệnh nhân tỉnh, tiếp xúc tốt. Da niêm hồng. Tuyến giáp không to.',
    khamBoPhan: 'Tim đều, phổi trong, bụng mềm.',
    chanDoan: ['Đau đầu [R51]', 'Căng thẳng quá mức [Z73.3]'],
    huongDieuTri: 'Nghỉ ngơi, dùng thuốc theo đơn. Tái khám sau 3 ngày nếu không giảm.'
  };

  const dsCld = [
    { id: 'CLS1', tenDichVu: 'Xét nghiệm máu', nguoiThucHien: 'BS. Nguyễn C', trangThai: 'Đã có kết quả', loai: 'xet_nghiem', ketQua: [{ chiSo: 'Hồng cầu', giaTri: '4.8 T/L' }, { chiSo: 'Bạch cầu', giaTri: '7.2 G/L' }] },
    { id: 'CLS2', tenDichVu: 'X-quang ngực', nguoiThucHien: 'BS. Trần D', trangThai: 'Đã có kết quả', loai: 'cdha', ketQua: { moTa: 'Không thấy tổn thương khu trú nhu mô phổi hai bên. Bóng tim không to.', ketLuan: 'Hiện tại chưa thấy bất thường trên phim X-quang ngực thẳng.' } },
    { id: 'CLS3', tenDichVu: 'Siêu âm ổ bụng', nguoiThucHien: 'BS. Trần D', trangThai: 'Chờ kết quả', loai: 'cdha', ketQua: null },
  ];

  const donThuoc = [
    { id: 'T1', tenThuoc: 'Paracetamol 500mg', soLuong: '10 viên', cachDung: '1 viên x 2/ngày (Sáng - Tối) sau ăn', capPhat: 'Đã cấp' },
    { id: 'T2', tenThuoc: 'Ginkgo Biloba 80mg', soLuong: '20 viên', cachDung: '1 viên x 2/ngày', capPhat: 'Đã cấp' },
  ];
  // -----------------

  const handleRowClick = (record) => {
    if (record.trangThai === 'Đã có kết quả') {
      setSelectedCls(record);
      setIsClsModalVisible(true);
    }
  };

  // Cột cho bảng CLS
  const clsColumns = [
    { title: 'Dịch vụ', dataIndex: 'tenDichVu', key: 'tenDichVu', fontWeight: 'bold' },
    { title: 'Người thực hiện', dataIndex: 'nguoiThucHien', key: 'nguoiThucHien' },
    { 
      title: 'Trạng thái', 
      dataIndex: 'trangThai', 
      key: 'trangThai',
      render: (status) => <Tag color={status === 'Đã có kết quả' ? 'green' : 'orange'}>{status}</Tag>
    },
  ];

  // Cột cho bảng Đơn thuốc
  const thuocColumns = [
    { title: 'Thuốc', dataIndex: 'tenThuoc', key: 'tenThuoc', render: (t) => <b>{t}</b> },
    { title: 'Số lượng', dataIndex: 'soLuong', key: 'soLuong' },
    { title: 'Cách dùng', dataIndex: 'cachDung', key: 'cachDung' },
    { title: 'Cấp phát', dataIndex: 'capPhat', key: 'capPhat', render: (status) => <Tag color="blue">{status}</Tag> },
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Header style={{ background: '#fff', display: 'flex', alignItems: 'center', padding: '0 24px', position: 'sticky', top: 0, zIndex: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} style={{ marginRight: 16 }}>Quay lại</Button>
        <Title level={4} style={{ margin: 0 }}>Chi tiết lượt khám</Title>
      </Header>

      <Content style={{ padding: 24, maxWidth: 900, margin: '0 auto', width: '100%' }}>
        
        {/* HEADER: THÔNG TIN LƯỢT KHÁM */}
        <Card style={{ marginBottom: 16, borderTop: '4px solid #1677ff' }}>
          <Title level={4} style={{ marginTop: 0 }}>{visitInfo.hoTen}</Title>
          <Descriptions column={{ xs: 1, sm: 2, md: 3 }} size="small">
            <Descriptions.Item label="Thời gian">{visitInfo.ngayGioKham}</Descriptions.Item>
            <Descriptions.Item label="Khoa">{visitInfo.khoa}</Descriptions.Item>
            <Descriptions.Item label="Bác sĩ">{visitInfo.bacSi}</Descriptions.Item>
            <Descriptions.Item label="Lý do khám" span={2}>{visitInfo.lyDoKham}</Descriptions.Item>
            <Descriptions.Item label="Trạng thái"><Tag color="default">{visitInfo.trangThai}</Tag></Descriptions.Item>
          </Descriptions>
        </Card>

        {/* SECTION 1: PHIẾU KHÁM */}
        <Card title={<><FileTextOutlined /> PHIẾU KHÁM</>} style={{ marginBottom: 16 }}>
          <Text strong>Quá trình bệnh lý:</Text>
          <Paragraph>{phieuKham.quaTrinhBenhLy}</Paragraph>
          
          <Text strong>Sinh hiệu:</Text>
          <div style={{ background: '#fafafa', padding: '12px 16px', borderRadius: 6, marginBottom: 16, display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <div><Text type="secondary">Mạch:</Text> <b>{phieuKham.sinhHieu.mach}</b></div>
            <div><Text type="secondary">Nhiệt độ:</Text> <b>{phieuKham.sinhHieu.nhietDo}</b></div>
            <div><Text type="secondary">Huyết áp:</Text> <b>{phieuKham.sinhHieu.huyetAp}</b></div>
            <div><Text type="secondary">Cân nặng:</Text> <b>{phieuKham.sinhHieu.canNang}</b></div>
          </div>

          <Text strong>Khám toàn thân:</Text>
          <Paragraph>{phieuKham.khamToanThan}</Paragraph>

          <Text strong>Khám các bộ phận:</Text>
          <Paragraph>{phieuKham.khamBoPhan}</Paragraph>

          <Divider dashed />

          <Text strong>Chẩn đoán:</Text>
          <ul style={{ marginTop: 8, paddingLeft: 20 }}>
            {phieuKham.chanDoan.map((cd, index) => <li key={index}>{cd}</li>)}
          </ul>

          <Text strong>Hướng điều trị / xử trí:</Text>
          <Paragraph>{phieuKham.huongDieuTri}</Paragraph>
        </Card>

        {/* SECTION 2: CHỈ ĐỊNH CẬN LÂM SÀNG */}
        <Card title={<><ExperimentOutlined /> CHỈ ĐỊNH CẬN LÂM SÀNG</>} style={{ marginBottom: 16 }}>
          <Table 
            columns={clsColumns} 
            dataSource={dsCld} 
            rowKey="id"
            pagination={false}
            size="small"
            rowClassName={(record) => record.trangThai === 'Đã có kết quả' ? 'clickable-row' : ''}
            onRow={(record) => ({
              onClick: () => handleRowClick(record),
            })}
          />
          <div style={{ textAlign: 'center', marginTop: 12 }}>
            <Text type="secondary" style={{ fontSize: 12 }}>[ Nhấn vào dòng đã có kết quả để xem chi tiết ]</Text>
          </div>
        </Card>

        {/* SECTION 3: ĐƠN THUỐC */}
        <Card title={<><MedicineBoxOutlined /> ĐƠN THUỐC</>} style={{ marginBottom: 16 }}>
          <Table 
            columns={thuocColumns} 
            dataSource={donThuoc} 
            rowKey="id"
            pagination={false}
            size="small"
          />
          <div style={{ marginTop: 16 }}>
            <Text strong>Lời dặn của bác sĩ:</Text>
            <Paragraph>Uống nhiều nước, kiêng đồ dầu mỡ.</Paragraph>
          </div>
        </Card>

        {/* SECTION 4: XÁC NHẬN ĐIỆN TỬ */}
        <Card title={<><SafetyCertificateOutlined /> XÁC NHẬN ĐIỆN TỬ</>} style={{ background: '#f6ffed', borderColor: '#b7eb8f' }}>
          <Descriptions column={{ xs: 1, sm: 2 }} size="small">
            <Descriptions.Item label="Người xác nhận"><b>{visitInfo.bacSi}</b></Descriptions.Item>
            <Descriptions.Item label="Thời gian">20/09/2026 10:15</Descriptions.Item>
            <Descriptions.Item label="Hình thức">Chữ ký số nội bộ (Token)</Descriptions.Item>
            <Descriptions.Item label="Trạng thái"><Text type="success" strong>Thành công</Text></Descriptions.Item>
          </Descriptions>
        </Card>

      </Content>

      {/* MODAL HIỂN THỊ KẾT QUẢ CLS */}
      <Modal
        title={selectedCls?.tenDichVu}
        open={isClsModalVisible}
        onCancel={() => setIsClsModalVisible(false)}
        footer={[<Button key="close" onClick={() => setIsClsModalVisible(false)}>Đóng</Button>]}
      >
        {selectedCls?.loai === 'xet_nghiem' && (
          <Table 
            columns={[
              { title: 'Chỉ số', dataIndex: 'chiSo', key: 'chiSo' }, 
              { title: 'Kết quả', dataIndex: 'giaTri', key: 'giaTri', render: (t) => <b>{t}</b> }
            ]} 
            dataSource={selectedCls.ketQua} 
            rowKey="chiSo"
            pagination={false}
            size="small"
            bordered
          />
        )}
        
        {selectedCls?.loai === 'cdha' && (
          <div>
            <Text strong>Mô tả:</Text>
            <Paragraph style={{ background: '#fafafa', padding: 12, borderRadius: 4, marginTop: 8 }}>
              {selectedCls.ketQua.moTa}
            </Paragraph>
            <Text strong>Kết luận:</Text>
            <Paragraph style={{ background: '#e6f4ff', padding: 12, borderRadius: 4, marginTop: 8, color: '#0958d9' }}>
              <b>{selectedCls.ketQua.ketLuan}</b>
            </Paragraph>
          </div>
        )}
      </Modal>

    </Layout>
  );
};

export default VisitDetailScreen;