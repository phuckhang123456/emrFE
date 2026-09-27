// Dữ liệu mẫu (thay cho GET /chi-tiet-chi-dinh?trang_thai=cho_thuc_hien) — UI mockup
// cho module Bác sĩ cận lâm sàng (UC-09: Trả kết quả cận lâm sàng).

export const CURRENT_CLS_USER_ID = 5; // mock: kỹ thuật viên/BS CLS đang đăng nhập

// trang_thai: 'cho_thuc_hien' (chờ thực hiện) | 'da_thuc_hien' (đã có kết quả -> ẩn khỏi hàng đợi)
export const clsQueue = [
  {
    chi_tiet_id: 501,
    phieu_id: 201,
    luot_kham_id: 101,
    benh_nhan: { benh_nhan_id: 1, ho_ten: 'Nguyễn Văn A' },
    dich_vu: { dich_vu_id: 1, ten_dich_vu: 'Công thức máu toàn phần', loai_dich_vu: 'xet_nghiem' },
    so_luong: 1,
    trang_thai: 'cho_thuc_hien',
    ngay_yeu_cau: '2026-09-27 09:15',
  },
  {
    chi_tiet_id: 502,
    phieu_id: 201,
    luot_kham_id: 101,
    benh_nhan: { benh_nhan_id: 1, ho_ten: 'Nguyễn Văn A' },
    dich_vu: { dich_vu_id: 2, ten_dich_vu: 'Đường huyết đói', loai_dich_vu: 'xet_nghiem' },
    so_luong: 1,
    trang_thai: 'cho_thuc_hien',
    ngay_yeu_cau: '2026-09-27 09:15',
  },
  {
    chi_tiet_id: 503,
    phieu_id: 202,
    luot_kham_id: 103,
    benh_nhan: { benh_nhan_id: 3, ho_ten: 'Lê Minh Cường' },
    dich_vu: { dich_vu_id: 3, ten_dich_vu: 'X-quang ngực thẳng', loai_dich_vu: 'cdha' },
    so_luong: 1,
    trang_thai: 'cho_thuc_hien',
    ngay_yeu_cau: '2026-09-27 09:20',
  },
  {
    chi_tiet_id: 504,
    phieu_id: 202,
    luot_kham_id: 103,
    benh_nhan: { benh_nhan_id: 3, ho_ten: 'Lê Minh Cường' },
    dich_vu: { dich_vu_id: 4, ten_dich_vu: 'Siêu âm bụng tổng quát', loai_dich_vu: 'cdha' },
    so_luong: 1,
    trang_thai: 'da_thuc_hien', // đã có kết quả -> không hiện trong hàng đợi
  },
];

// Danh mục chỉ số ứng với từng dịch vụ xét nghiệm (mock — thay cho bảng CauHinhDichVuChiSo)
export const clsIndicesByService = {
  1: [
    { chi_so_id: 1, ten_chi_so: 'Hồng cầu (RBC)', don_vi_mac_dinh: 'T/L' },
    { chi_so_id: 2, ten_chi_so: 'Bạch cầu (WBC)', don_vi_mac_dinh: 'G/L' },
    { chi_so_id: 3, ten_chi_so: 'Tiểu cầu (PLT)', don_vi_mac_dinh: 'G/L' },
  ],
  2: [{ chi_so_id: 4, ten_chi_so: 'Glucose', don_vi_mac_dinh: 'mmol/L' }],
};
