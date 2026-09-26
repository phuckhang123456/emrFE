import { useState, useEffect } from 'react';
import ReceptionistLayout from '../../components/layout/ReceptionistLayout';
import FastCheckInTab from './components/FastCheckInTab';
import DailyQueueTab from './components/DailyQueueTab';
import SearchRecordTab from './components/SearchRecordTab';
import { useReceptionStore } from './store/useReceptionStore';

const ReceptionScreen = () => {
  const [activeMenu, setActiveMenu] = useState('fast-checkin');
  const fetchPatients = useReceptionStore(state => state.fetchPatients);
  const fetchDailyQueue = useReceptionStore(state => state.fetchDailyQueue);

  // Tải trước dữ liệu khi vào màn hình lễ tân
  useEffect(() => {
    fetchPatients();
    fetchDailyQueue();
  }, [fetchPatients, fetchDailyQueue]);

  // Render Component tương ứng với Menu
  const renderContent = () => {
    switch (activeMenu) {
      case 'fast-checkin':
        return <FastCheckInTab />;
      case 'daily-queue':
        return <DailyQueueTab />;
      case 'search-record':
        return <SearchRecordTab />;
      default:
        return <FastCheckInTab />;
    }
  };

  return (
    <ReceptionistLayout activeKey={activeMenu} onMenuClick={setActiveMenu}>
      {renderContent()}
    </ReceptionistLayout>
  );
};

export default ReceptionScreen;