import { ConfigProvider } from 'antd';
import viVN from 'antd/locale/vi_VN';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ReceptionScreen from './features/receptionist/ReceptionScreen';
import PatientProfileScreen from './features/patient_record/PatientProfileScreen';
import VisitDetailScreen from './features/receptionist/components/VisitDetailScreen';
import DoctorLayout from './features/clinical_doctor/DoctorLayout';
import DoctorQueueTab from './features/clinical_doctor/components/DoctorQueueTab';
import ExaminationScreen from './features/clinical_doctor/ExaminationScreen';
import SearchRecordTab from './features/receptionist/components/SearchRecordTab'; // tái sử dụng, không viết lại
import ClsLayout from './features/cls_doctor/ClsLayout';
import ClsQueueTab from './features/cls_doctor/components/ClsQueueTab';
import ClsResultScreen from './features/cls_doctor/ClsResultScreen';

import PharmacistLayout from './features/pharmacist/PharmacistLayout';
import PharmacyQueueTab from './features/pharmacist/components/PharmacyQueueTab';
import DispenseScreen from './features/pharmacist/DispenseScreen';

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
          <Route path="/bac-si" element={<DoctorLayout />}>
            <Route index element={<Navigate to="kham-benh" replace />} />
            <Route path="kham-benh" element={<DoctorQueueTab />} />
            <Route path="kham-benh/:luotKhamId" element={<ExaminationScreen />} />
            <Route path="tra-cuu-ho-so" element={<SearchRecordTab />} />
          </Route>
          <Route path="/chi-tiet-luot-kham/:visitId" element={<VisitDetailScreen />} />
          <Route path="/cls" element={<ClsLayout />}>
            <Route index element={<Navigate to="hang-doi" replace />} />
            <Route path="hang-doi" element={<ClsQueueTab />} />
            <Route path="tra-ket-qua/:chiTietId" element={<ClsResultScreen />} />
            <Route path="tra-cuu-ho-so" element={<SearchRecordTab />} />
          </Route>

          <Route path="/duoc-si" element={<PharmacistLayout />}>
            <Route index element={<Navigate to="hang-doi" replace />} />
            <Route path="hang-doi" element={<PharmacyQueueTab />} />
            <Route path="cap-phat/:donThuocId" element={<DispenseScreen />} />
            <Route path="tra-cuu-ho-so" element={<SearchRecordTab />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;