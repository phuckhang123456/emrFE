import { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Space, Typography, theme } from 'antd';
import { UserAddOutlined, UnorderedListOutlined, SearchOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const ReceptionistLayout = ({ children, activeKey, onMenuClick }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { token } = theme.useToken();

  const menuItems = [
    { key: 'fast-checkin', icon: <UserAddOutlined />, label: 'Tiếp nhận người bệnh' },
    { key: 'daily-queue', icon: <UnorderedListOutlined />, label: 'Danh sách hàng đợi' },
    { key: 'search-record', icon: <SearchOutlined />, label: 'Tra cứu hồ sơ' },
  ];

  const userMenu = {
    items: [
      { key: 'profile', icon: <UserOutlined />, label: 'Thông tin cá nhân' },
      { key: 'logout', icon: <LogoutOutlined />, label: 'Đăng xuất', danger: true },
    ]
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} theme="light">
        <div style={{ height: 32, margin: 16, background: '#1677ff', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
          {!collapsed ? 'EMR SYSTEM' : 'EMR'}
        </div>
        <Menu 
          theme="light" 
          selectedKeys={[activeKey]} 
          mode="inline" 
          items={menuItems}
          onClick={({ key }) => onMenuClick(key)} 
        />
      </Sider>
      
      <Layout>
        <Header style={{ padding: '0 24px', background: token.colorBgContainer, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', boxShadow: '0 1px 4px rgba(0,21,41,.08)' }}>
          <Dropdown menu={userMenu} placement="bottomRight">
            <Space style={{ cursor: 'pointer' }}>
              <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#1677ff' }} />
              <Text strong>Lễ Tân</Text>
            </Space>
          </Dropdown>
        </Header>
        
        <Content style={{ margin: '16px' }}>
          <div style={{ padding: 24, minHeight: 'calc(100vh - 100px)', background: token.colorBgContainer, borderRadius: 8 }}>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ReceptionistLayout;