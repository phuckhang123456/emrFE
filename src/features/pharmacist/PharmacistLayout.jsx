import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { MedicineBoxOutlined, FileSearchOutlined } from '@ant-design/icons';

const { Sider, Content } = Layout;

const menuItems = [
  { key: '/duoc-si/hang-doi', icon: <MedicineBoxOutlined />, label: 'Cấp phát thuốc' },
  { key: '/duoc-si/tra-cuu-ho-so', icon: <FileSearchOutlined />, label: 'Tra cứu hồ sơ' },
];

const PharmacistLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedKey = menuItems.find((m) => location.pathname.startsWith(m.key))?.key ?? menuItems[0].key;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={220} theme="light" style={{ borderRight: '1px solid #f0f0f0' }}>
        <div style={{ padding: '16px', fontWeight: 600, fontSize: 16 }}>EMR — Dược sĩ</div>
        <Menu mode="inline" selectedKeys={[selectedKey]} items={menuItems} onClick={({ key }) => navigate(key)} />
      </Sider>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default PharmacistLayout;
