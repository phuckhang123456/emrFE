import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'antd/dist/reset.css'; // Đặt lại CSS mặc định của trình duyệt để chuẩn với Ant Design
import './index.css'; // CSS tùy chỉnh nếu có

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);