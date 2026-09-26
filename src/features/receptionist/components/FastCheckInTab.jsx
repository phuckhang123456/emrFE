import { useState } from 'react';
import { Input, Button, Card, Empty, Typography } from 'antd';
import { UserAddOutlined, PlusCircleOutlined } from '@ant-design/icons'; // Bỏ SearchOutlined vì Input.Search đã có sẵn
import { useReceptionStore } from '../store/useReceptionStore';
import MiniPatientTable from './MiniPatientTable';
import AddPatientModal from './AddPatientModal';
import CreateVisitModal from './CreateVisitModal';

const { Title } = Typography;
const { Search } = Input; // Sử dụng Input Search chuyên dụng

const FastCheckInTab = () => {
  const { searchResults, isLoading, searchPatients } = useReceptionStore();
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const [visitModalConfig, setVisitModalConfig] = useState({ isOpen: false, patient: null });
  const [hasSearched, setHasSearched] = useState(false); // State để theo dõi xem người dùng đã bấm tìm chưa

  const handleSearch = (value) => {
    setHasSearched(true);
    searchPatients(value);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <Title level={3}>Tiếp nhận nhanh</Title>
        <Button type="primary" icon={<UserAddOutlined />} onClick={() => setIsAddPatientOpen(true)}>
          Thêm bệnh nhân mới
        </Button>
      </div>

      <Card>
        {/* Đổi Input thường thành Input.Search */}
        <Search 
          size="large"
          placeholder="Nhập CCCD, Số điện thoại hoặc Họ tên để tìm kiếm..."
          enterButton="Tìm kiếm" // Hiển thị nút bấm rõ ràng
          onSearch={handleSearch} // Chạy tìm kiếm khi bấm nút hoặc Enter (thay vì onChange)
          allowClear
          style={{ marginBottom: 20 }}
          autoFocus
        />

        {/* Xử lý UI hiển thị theo logic: Có kết quả / Không có kết quả / Chưa tìm kiếm */}
        {searchResults.length > 0 ? (
          <MiniPatientTable 
            data={searchResults} 
            loading={isLoading}
            actionRender={(record) => (
              <Button type="primary" ghost icon={<PlusCircleOutlined />} onClick={() => setVisitModalConfig({ isOpen: true, patient: record })}>
                Tạo lượt khám
              </Button>
            )}
          />
        ) : hasSearched ? (
          <Empty description="Không tìm thấy dữ liệu tương ứng. Vui lòng kiểm tra lại hoặc tạo hồ sơ mới." />
        ) : (
          <Empty description="Gõ từ khóa và bấm Tìm kiếm để tra cứu thông tin bệnh nhân" image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </Card>

      <AddPatientModal 
        isOpen={isAddPatientOpen} 
        onClose={() => setIsAddPatientOpen(false)}
        onSuccess={(newPatient) => {
            setIsAddPatientOpen(false);
            setVisitModalConfig({ isOpen: true, patient: newPatient });
        }}
      />

      <CreateVisitModal
        isOpen={visitModalConfig.isOpen}
        patient={visitModalConfig.patient}
        onClose={() => setVisitModalConfig({ isOpen: false, patient: null })}
      />
    </div>
  );
};

export default FastCheckInTab;