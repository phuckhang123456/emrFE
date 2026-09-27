import { create } from 'zustand';
import { pharmacyQueue } from '../mockData';

export const usePharmacistStore = create((set, get) => ({
  queue: pharmacyQueue,

  getPrescription: (donThuocId) => get().queue.find((d) => d.don_thuoc_id === Number(donThuocId)),

  // UC-10, bước 3: dược sĩ xác định tình trạng cấp phát của từng thuốc
  // (bao gồm Alternate Flow A1: 'mua_ngoai' khi bệnh nhân mua thuốc bên ngoài)
  setDispenseStatus: (donThuocId, chiTietId, trangThai, ghiChu = '') =>
    set((state) => ({
      queue: state.queue.map((d) =>
        d.don_thuoc_id === Number(donThuocId)
          ? {
              ...d,
              chi_tiet: d.chi_tiet.map((t) =>
                t.chi_tiet_id === chiTietId ? { ...t, trang_thai_cap_phat: trangThai, ghi_chu: ghiChu } : t
              ),
            }
          : d
      ),
    })),

  // UC-10, bước 4-5: xác nhận kết quả cấp phát cho toàn bộ đơn
  confirmDispense: (donThuocId) => {
    // TODO (kế hoạch tiếp theo): axiosClient.patch(`/don-thuoc/${donThuocId}/cap-phat`, { chi_tiet })
    set((state) => ({
      queue: state.queue.map((d) => (d.don_thuoc_id === Number(donThuocId) ? { ...d, trang_thai: 'da_cap_phat' } : d)),
    }));
    console.log('[MOCK SAVE] Cấp phát đơn thuốc:', donThuocId);
  },
}));
