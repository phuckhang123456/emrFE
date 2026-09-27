// Dữ liệu mẫu (thay cho GET /don-thuoc?trang_thai=cho_cap_phat) — UI mockup
// cho module Dược sĩ (UC-10: Xác nhận cấp phát thuốc).

export const CURRENT_PHARMACIST_ID = 6; // mock: dược sĩ đang đăng nhập

// trang_thai (đơn thuốc): 'cho_cap_phat' | 'da_cap_phat'
// trang_thai_cap_phat (từng thuốc): 'chua_cap' | 'da_cap' | 'mua_ngoai'
export const pharmacyQueue = [
  {
    don_thuoc_id: 301,
    luot_kham_id: 101,
    benh_nhan: { benh_nhan_id: 1, ho_ten: 'Nguyễn Văn A' },
    loi_dan: 'Uống nhiều nước, kiêng đồ dầu mỡ.',
    ngay_ke: '2026-09-27 09:10',
    trang_thai: 'cho_cap_phat',
    chi_tiet: [
      {
        chi_tiet_id: 4001,
        thuoc_id: 1,
        ten_thuoc: 'Paracetamol 500mg',
        don_vi_tinh: 'Viên',
        chi_dinh_dung_thuoc: 'Sáng 1 viên, tối 1 viên sau ăn',
        so_luong_ke: 10,
        trang_thai_cap_phat: 'chua_cap',
        ghi_chu: '',
      },
      {
        chi_tiet_id: 4002,
        thuoc_id: 2,
        ten_thuoc: 'Amoxicillin 500mg',
        don_vi_tinh: 'Viên',
        chi_dinh_dung_thuoc: 'Ngày 3 lần, mỗi lần 1 viên',
        so_luong_ke: 15,
        trang_thai_cap_phat: 'chua_cap',
        ghi_chu: '',
      },
    ],
  },
  {
    don_thuoc_id: 302,
    luot_kham_id: 102,
    benh_nhan: { benh_nhan_id: 2, ho_ten: 'Trần Thị Bích' },
    loi_dan: 'Tái khám sau 1 tuần nếu còn đau.',
    ngay_ke: '2026-09-27 09:25',
    trang_thai: 'cho_cap_phat',
    chi_tiet: [
      {
        chi_tiet_id: 4003,
        thuoc_id: 3,
        ten_thuoc: 'Omeprazole 20mg',
        don_vi_tinh: 'Viên',
        chi_dinh_dung_thuoc: 'Sáng 1 viên trước ăn 30 phút',
        so_luong_ke: 14,
        trang_thai_cap_phat: 'chua_cap',
        ghi_chu: '',
      },
    ],
  },
];
