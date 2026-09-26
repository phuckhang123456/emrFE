import { ConfigProvider } from 'antd';
import viVN from 'antd/locale/vi_VN';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ReceptionScreen from './features/receptionist/ReceptionScreen';
import PatientProfileScreen from './features/patient_record/PatientProfileScreen';

const App = () => {
  return (
    <ConfigProvider locale={viVN}>
      <BrowserRouter>
        <Routes>
          {/* Chuyển hướng mặc định vào phân hệ Lễ tân */}
          <Route path="/" element={<Navigate to="/le-tan" />} />
          
          {/* Màn hình làm việc chính của Lễ tân */}
          <Route path="/le-tan" element={<ReceptionScreen />} />
          
          {/* Trang hồ sơ EMR độc lập - Dùng chung cho cả Lễ tân và Bác sĩ sau này */}
          <Route path="/ho-so-benh-nhan/:id" element={<PatientProfileScreen />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;