import { useNavigate, useParams } from 'react-router-dom';
import { Layout, Typography, Descriptions, Table, Select, Input, Button, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { usePharmacistStore } from './store/usePharmacistStore';

const { Header, Content } = Layout;
const { Title } = Typography;

const dispenseOptions = [
  { value: 'da_cap', label: 'Đã cấp' },
  { value: 'mua_ngoai', label: 'Mua ngoài (không cấp tại cơ sở)' },
];

const DispenseScreen = () => {
  const { donThuocId } = useParams();
  const navigate = useNavigate();
  const prescription = usePharmacistStore((s) => s.getPrescription(donThuocId));
  const setDispenseStatus = usePharmacistStore((s) => s.setDispenseStatus);
  const confirmDispense = usePharmacistStore((s) => s.confirmDispense);

  if (!prescription) {
    return (
      <Content style={{ padding: 24 }}>
        Không tìm thấy đơn thuốc. <a onClick={() => navigate('/duoc-si/hang-doi')}>Quay lại hàng đợi</a>
      </Content>
    );
  }

  const handleConfirm = () => {
    // FR-PHARM: kiểm tra đã xác định tình trạng cho tất cả các thuốc trước khi xác nhận
    const missing = prescription.chi_tiet.some((t) => t.trang_thai_cap_phat === 'chua_cap');
    if (missing) {
      message.error('Vui lòng xác định tình trạng cấp phát cho tất cả các thuốc.');
      return;
    }
    confirmDispense(donThuocId);
    message.success('Đã lưu kết quả cấp phát (dữ liệu mẫu).');
    navigate('/duoc-si/hang-doi');
  };

  const columns = [
    { title: 'Thuốc', dataIndex: 'ten_thuoc' },
    { title: 'Cách dùng', dataIndex: 'chi_dinh_dung_thuoc' },
    { title: 'SL kê', dataIndex: 'so_luong_ke', width: 80 },
    {
      title: 'Tình trạng cấp phát',
      key: 'trang_thai_cap_phat',
      width: 240,
      render: (_, r) => (
        <Select
          style={{ width: '100%' }}
          value={r.trang_thai_cap_phat === 'chua_cap' ? undefined : r.trang_thai_cap_phat}
          placeholder="Chọn tình trạng"
          options={dispenseOptions}
          onChange={(value) => setDispenseStatus(donThuocId, r.chi_tiet_id, value, r.ghi_chu)}
        />
      ),
    },
    {
      title: 'Ghi chú',
      key: 'ghi_chu',
      render: (_, r) => (
        <Input
          value={r.ghi_chu}
          onChange={(e) => setDispenseStatus(donThuocId, r.chi_tiet_id, r.trang_thai_cap_phat, e.target.value)}
        />
      ),
    },
  ];

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
        <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => navigate('/duoc-si/hang-doi')} style={{ marginRight: 12 }}>
          Hàng đợi
        </Button>
        <Title level={4} style={{ margin: 0 }}>
          Cấp phát thuốc
        </Title>
      </Header>

      <Content style={{ padding: 24, maxWidth: 900, margin: '0 auto', width: '100%' }}>
        <Descriptions
          title={prescription.benh_nhan.ho_ten}
          bordered
          size="small"
          column={2}
          style={{ marginBottom: 24, background: '#fff' }}
        >
          <Descriptions.Item label="Giờ kê đơn">{prescription.ngay_ke}</Descriptions.Item>
          <Descriptions.Item label="Lời dặn">{prescription.loi_dan}</Descriptions.Item>
        </Descriptions>

        <Table columns={columns} dataSource={prescription.chi_tiet} rowKey="chi_tiet_id" pagination={false} style={{ marginBottom: 16 }} />

        <Button type="primary" onClick={handleConfirm}>
          Xác nhận cấp phát
        </Button>
      </Content>
    </Layout>
  );
};

export default DispenseScreen;
