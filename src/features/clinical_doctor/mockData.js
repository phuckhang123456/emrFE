// Dữ liệu mẫu (thay cho GET /danh-muc/*, GET /luot-kham?bac_si_id=...) — dùng để dựng UI mockup
// cho module Bác sĩ lâm sàng khi chưa kết nối API/DB thật.

export const CURRENT_DOCTOR_ID = 1; // mock: bác sĩ đang đăng nhập

export const icd10List = [
  { chan_doan_id: 1, ma_icd10: 'J06.9', ten_chan_doan: 'Nhiễm khuẩn hô hấp trên cấp, không xác định' },
  { chan_doan_id: 2, ma_icd10: 'I10', ten_chan_doan: 'Tăng huyết áp vô căn (nguyên phát)' },
  { chan_doan_id: 3, ma_icd10: 'E11.9', ten_chan_doan: 'Đái tháo đường type 2, không có biến chứng' },
  { chan_doan_id: 4, ma_icd10: 'K29.7', ten_chan_doan: 'Viêm dạ dày, không xác định' },
  { chan_doan_id: 5, ma_icd10: 'A09', ten_chan_doan: 'Tiêu chảy và viêm dạ dày ruột do nhiễm trùng' },
];

export const clsServiceList = [
  { dich_vu_id: 1, ten_dich_vu: 'Công thức máu toàn phần', loai_dich_vu: 'xet_nghiem' },
  { dich_vu_id: 2, ten_dich_vu: 'Đường huyết đói', loai_dich_vu: 'xet_nghiem' },
  { dich_vu_id: 3, ten_dich_vu: 'X-quang ngực thẳng', loai_dich_vu: 'cdha' },
  { dich_vu_id: 4, ten_dich_vu: 'Siêu âm bụng tổng quát', loai_dich_vu: 'cdha' },
];

export const medicineList = [
  { thuoc_id: 1, ten_thuoc: 'Paracetamol 500mg', don_vi_tinh: 'Viên' },
  { thuoc_id: 2, ten_thuoc: 'Amoxicillin 500mg', don_vi_tinh: 'Viên' },
  { thuoc_id: 3, ten_thuoc: 'Omeprazole 20mg', don_vi_tinh: 'Viên' },
  { thuoc_id: 4, ten_thuoc: 'Losartan 50mg', don_vi_tinh: 'Viên' },
];

// Hàng đợi khám của bác sĩ hiện tại (mock — thay cho GET /luot-kham?bac_si_id=&trang_thai=)
// trang_thai: 'moi_tao' (chờ khám) | 'dang_kham' (đang khám dở) | 'cho_cls' (chờ kết quả CLS)
//             | 'hoan_tat' | 'da_huy' (2 trạng thái sau KHÔNG hiển thị trong hàng đợi)
export const doctorQueue = [
  {
    luot_kham_id: 101,
    bac_si_id: CURRENT_DOCTOR_ID,
    benh_nhan: { benh_nhan_id: 1, ho_ten: 'Nguyễn Văn A', ngay_sinh: '1990-05-10', gioi_tinh: 'Nam' },
    khoa: 'Noi',
    ly_do_kham: 'Sốt, ho, đau họng 2 ngày',
    ngay_gio_kham: '2026-09-27 08:30',
    trang_thai: 'moi_tao',
  },
  {
    luot_kham_id: 102,
    bac_si_id: CURRENT_DOCTOR_ID,
    benh_nhan: { benh_nhan_id: 2, ho_ten: 'Trần Thị Bích', ngay_sinh: '1985-07-25', gioi_tinh: 'Nữ' },
    khoa: 'Noi',
    ly_do_kham: 'Đau thượng vị, ợ chua',
    ngay_gio_kham: '2026-09-27 08:45',
    trang_thai: 'dang_kham',
  },
  {
    luot_kham_id: 103,
    bac_si_id: CURRENT_DOCTOR_ID,
    benh_nhan: { benh_nhan_id: 3, ho_ten: 'Lê Minh Cường', ngay_sinh: '2001-11-02', gioi_tinh: 'Nam' },
    khoa: 'Noi',
    ly_do_kham: 'Đau đầu, chóng mặt',
    ngay_gio_kham: '2026-09-27 09:00',
    trang_thai: 'cho_cls',
  },
  {
    luot_kham_id: 104,
    bac_si_id: CURRENT_DOCTOR_ID,
    benh_nhan: { benh_nhan_id: 4, ho_ten: 'Phạm Thị Dung', ngay_sinh: '1975-01-18', gioi_tinh: 'Nữ' },
    khoa: 'Noi',
    ly_do_kham: 'Tái khám tăng huyết áp',
    ngay_gio_kham: '2026-09-27 07:50',
    trang_thai: 'hoan_tat', // đã xong -> không hiện trong hàng đợi, chỉ xem lại qua Tra cứu hồ sơ
  },
];
