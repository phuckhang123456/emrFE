import { useState } from 'react';
import { Input, Card, Button, Typography, Empty } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useReceptionStore } from '../store/useReceptionStore';
import MiniPatientTable from './MiniPatientTable';

const { Title } = Typography;
const { Search } = Input;

const SearchRecordTab = () => {
  const navigate = useNavigate();
  const { searchResults, searchPatients } = useReceptionStore();
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (value) => {
    setHasSearched(true);
    searchPatients(value);
  };

  return (
    <div>
      <Title level={3} style={{ marginBottom: 20 }}>Tra cứu Hồ sơ bệnh án (EMR)</Title>
      <Card>
        <Search 
          size="large"
          placeholder="Nhập CCCD, Số điện thoại hoặc Họ tên cần xem lại hồ sơ..."
          enterButton="Tìm kiếm hồ sơ"
          onSearch={handleSearch}
          allowClear
          style={{ marginBottom: 20 }}
        />

        {searchResults.length > 0 ? (
          <MiniPatientTable 
            data={searchResults} 
            actionRender={(record) => (
              <Button 
                type="default" 
                icon={<EyeOutlined />} 
                onClick={() => navigate(`/ho-so-benh-nhan/${record.benh_nhan_id}`)}
              >
                Xem hồ sơ
              </Button>
            )}
          />
        ) : hasSearched ? (
          <Empty description="Không tìm thấy hồ sơ nào khớp với từ khóa của bạn" />
        ) : (
          <Empty description="Vui lòng nhập thông tin để bắt đầu tra cứu" image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </Card>
    </div>
  );
};

export default SearchRecordTab;