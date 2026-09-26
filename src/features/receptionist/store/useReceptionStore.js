import { create } from 'zustand';
import receptionistService from '../../../services/receptionist.service';

export const useReceptionStore = create((set, get) => ({
  patients: [],
  searchResults: [],
  queueList: [], // Danh sách hàng đợi hôm nay
  isLoading: false,
  error: null,

fetchPatients: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await receptionistService.getAllPatients();
      // SỬA Ở ĐÂY: Để searchResults là [] thay vì gán bằng data
      set({ patients: data, searchResults: [], isLoading: false });
    } catch (error) {
      set({ 
        error: 'Lỗi khi tải danh sách bệnh nhân', 
        isLoading: false 
      });
    }
  },

  searchPatients: (keyword) => {
    if (!keyword) {
      set({ searchResults: [] }); // Để trống nếu không gõ gì (Clean UI)
      return;
    }
    const lowerKey = keyword.toLowerCase();
    const results = get().patients.filter(p => 
      p.ho_ten?.toLowerCase().includes(lowerKey) || 
      p.so_dien_thoai?.includes(lowerKey) || 
      p.cccd?.includes(lowerKey)
    );
    set({ searchResults: results });
  },

  addPatient: async (patientData) => {
    const newPatient = await receptionistService.createPatient(patientData);
    set((state) => ({ patients: [newPatient, ...state.patients] }));
    return newPatient; 
  },

  createVisit: async (visitData) => {
    await receptionistService.createVisit(visitData);
    get().fetchDailyQueue(); // Cập nhật lại hàng đợi ngay lập tức
  },

  fetchDailyQueue: async () => {
    try {
      const data = await receptionistService.getDailyQueue();
      set({ queueList: data });
    } catch (error) {
      console.error("Lỗi lấy danh sách hàng đợi", error);
    }
  },

  cancelVisit: async (visitId) => {
    await receptionistService.updateVisitStatus(visitId, 'da_huy');
    get().fetchDailyQueue(); 
  }
}));