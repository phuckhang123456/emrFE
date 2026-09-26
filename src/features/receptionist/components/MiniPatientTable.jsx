import { Table } from 'antd';

const MiniPatientTable = ({ data, loading, actionRender }) => {
  const columns = [
    { title: 'Mã BN', dataIndex: 'benh_nhan_id', key: 'benh_nhan_id', width: 100 },
    { title: 'Họ tên', dataIndex: 'ho_ten', key: 'ho_ten', fontWeight: 'bold' },
    { title: 'Năm sinh', dataIndex: 'ngay_sinh', key: 'ngay_sinh', render: (text) => text ? text.substring(0,4) : 'N/A' },
    { title: 'Giới tính', dataIndex: 'gioi_tinh', key: 'gioi_tinh' },
    { title: 'SĐT', dataIndex: 'so_dien_thoai', key: 'so_dien_thoai' },
    { 
      title: 'Hành động', 
      key: 'action', 
      align: 'right',
      render: (_, record) => actionRender(record) // Render động nút bấm tùy theo Context
    },
  ];

  return (
    <Table 
      columns={columns} 
      dataSource={data} 
      rowKey="benh_nhan_id" 
      loading={loading}
      pagination={{ pageSize: 5 }}
      size="small"
    />
  );
};

export default MiniPatientTable;