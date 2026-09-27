import { create } from 'zustand';
import { clsQueue, clsIndicesByService } from '../mockData';

// Hằng số mặc định ổn định — KHÔNG tạo [] / {} mới bên trong getter,
// tránh lặp lại lỗi "Maximum update depth exceeded" đã gặp ở module Bác sĩ.
const emptyArray = [];
const emptyImagingResult = { mo_ta: '', ket_luan: '', duong_dan_file: '' };

export const useClsStore = create((set, get) => ({
  queue: clsQueue,
  clsIndicesByService,

  getOrder: (chiTietId) => get().queue.find((o) => o.chi_tiet_id === Number(chiTietId)),

  // ===== Kết quả xét nghiệm: { [chi_tiet_id]: [{ chi_so_id, ten_chi_so, don_vi_mac_dinh, ket_qua_xet_nghiem }] } =====
  labResultsByOrder: {},
  getLabResults: (chiTietId) => get().labResultsByOrder[chiTietId] || emptyArray,
  updateLabResult: (chiTietId, chiSoId, value) =>
    set((state) => {
      const order = state.queue.find((o) => o.chi_tiet_id === Number(chiTietId));
      const indices = order ? state.clsIndicesByService[order.dich_vu.dich_vu_id] || emptyArray : emptyArray;
      const current = state.labResultsByOrder[chiTietId] || indices.map((i) => ({ ...i, ket_qua_xet_nghiem: '' }));
      return {
        labResultsByOrder: {
          ...state.labResultsByOrder,
          [chiTietId]: current.map((r) => (r.chi_so_id === chiSoId ? { ...r, ket_qua_xet_nghiem: value } : r)),
        },
      };
    }),

  // ===== Kết quả CĐHA: { [chi_tiet_id]: { mo_ta, ket_luan, duong_dan_file } } =====
  imagingResultsByOrder: {},
  getImagingResult: (chiTietId) => get().imagingResultsByOrder[chiTietId] || emptyImagingResult,
  updateImagingResult: (chiTietId, field, value) =>
    set((state) => ({
      imagingResultsByOrder: {
        ...state.imagingResultsByOrder,
        [chiTietId]: { ...(state.imagingResultsByOrder[chiTietId] || emptyImagingResult), [field]: value },
      },
    })),

  // UC-09, bước 4-5: xác nhận kết quả -> chuyển trạng thái sang 'da_thuc_hien'
  confirmResult: (chiTietId) => {
    // TODO (kế hoạch tiếp theo):
    // - Xét nghiệm: axiosClient.post('/ket-qua-xet-nghiem', { chi_tiet_id, ket_qua: labResultsByOrder[chiTietId] })
    // - CĐHA: axiosClient.post('/ket-qua-cdha', { chi_tiet_id, ...imagingResultsByOrder[chiTietId] })
    // - axiosClient.patch(`/chi-tiet-chi-dinh/${chiTietId}/trang-thai`, { trang_thai: 'da_thuc_hien' })
    set((state) => ({
      queue: state.queue.map((o) => (o.chi_tiet_id === Number(chiTietId) ? { ...o, trang_thai: 'da_thuc_hien' } : o)),
    }));
    console.log('[MOCK SAVE] Kết quả CLS:', chiTietId);
  },
}));
