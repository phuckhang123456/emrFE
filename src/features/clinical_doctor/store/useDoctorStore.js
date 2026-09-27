import { create } from 'zustand';
import { icd10List, clsServiceList, medicineList, doctorQueue } from '../mockData';

const emptyExamination = {
  qua_trinh_benh_ly: '',
  kham_toan_than: '',
  kham_cac_bo_phan: '',
  huong_dieu_tri: '',
};

const emptyVitals = {
  mach: null,
  nhiet_do: null,
  huyet_ap_tam_thu: null,
  huyet_ap_tam_truong: null,
  nhip_tho: null,
  can_nang: null,
  chieu_cao: null,
};

// QUAN TRỌNG: dùng chung 1 reference cho "mảng rỗng mặc định" thay vì trả về `[]` mới
// mỗi lần gọi getter. Nếu không, mỗi lần component re-render sẽ nhận một mảng có
// reference khác -> React 18 (useSyncExternalStore) coi là state đổi -> vòng lặp vô hạn
// ("Maximum update depth exceeded" / "getSnapshot should be cached").
const emptyArray = [];

// Store lưu state theo TỪNG luot_kham_id, vì hàng đợi có nhiều bệnh nhân cùng lúc
// (khác với bản trước đây chỉ xử lý 1 lượt khám global).
export const useDoctorStore = create((set, get) => ({
  // ===== Danh mục dùng chung (mock) =====
  icd10List,
  clsServiceList,
  medicineList,

  // ===== Hàng đợi khám của bác sĩ (mock — thay cho GET /luot-kham?bac_si_id=&trang_thai=) =====
  queue: doctorQueue,

  getVisit: (luotKhamId) => get().queue.find((v) => v.luot_kham_id === Number(luotKhamId)),

  // Bắt đầu ca khám: moi_tao -> dang_kham
  startExam: (luotKhamId) =>
    set((state) => ({
      queue: state.queue.map((v) =>
        v.luot_kham_id === Number(luotKhamId) && v.trang_thai === 'moi_tao'
          ? { ...v, trang_thai: 'dang_kham' }
          : v
      ),
    })),

  // Hoàn tất lượt khám: -> hoan_tat
  completeVisit: (luotKhamId) => {
    // TODO (kế hoạch tiếp theo): axiosClient.patch(`/luot-kham/${luotKhamId}/trang-thai`, { trang_thai: 'hoan_tat' })
    set((state) => ({
      queue: state.queue.map((v) => (v.luot_kham_id === Number(luotKhamId) ? { ...v, trang_thai: 'hoan_tat' } : v)),
    }));
    console.log('[MOCK SAVE] Hoàn tất lượt khám', luotKhamId);
  },

  // Chuyển sang chờ CLS (gọi tự động khi bác sĩ lưu phiếu chỉ định)
  markWaitingForCls: (luotKhamId) =>
    set((state) => ({
      queue: state.queue.map((v) => (v.luot_kham_id === Number(luotKhamId) ? { ...v, trang_thai: 'cho_cls' } : v)),
    })),

  // ===== Sinh hiệu (bảng SinhHieu) =====
  vitalsByVisit: {},
  getVitals: (luotKhamId) => get().vitalsByVisit[luotKhamId] || emptyVitals,
  updateVitals: (luotKhamId, field, value) =>
    set((state) => ({
      vitalsByVisit: {
        ...state.vitalsByVisit,
        [luotKhamId]: { ...(state.vitalsByVisit[luotKhamId] || emptyVitals), [field]: value },
      },
    })),
  saveVitals: (luotKhamId) => {
    // TODO (kế hoạch tiếp theo): axiosClient.post('/sinh-hieu', { luot_kham_id, ...get().vitalsByVisit[luotKhamId] })
    console.log('[MOCK SAVE] Sinh hiệu:', luotKhamId, get().vitalsByVisit[luotKhamId]);
  },

  // ===== UC-05: Ghi nhận thông tin khám và chẩn đoán =====
  examinationByVisit: {},
  diagnosesByVisit: {},
  getExamination: (luotKhamId) => get().examinationByVisit[luotKhamId] || emptyExamination,
  getDiagnoses: (luotKhamId) => get().diagnosesByVisit[luotKhamId] || emptyArray,
  updateExaminationDraft: (luotKhamId, field, value) =>
    set((state) => ({
      examinationByVisit: {
        ...state.examinationByVisit,
        [luotKhamId]: { ...(state.examinationByVisit[luotKhamId] || emptyExamination), [field]: value },
      },
    })),
  addDiagnosis: (luotKhamId, chan_doan_id, loai) => {
    const item = get().icd10List.find((d) => d.chan_doan_id === chan_doan_id);
    if (!item) return;
    set((state) => ({
      diagnosesByVisit: {
        ...state.diagnosesByVisit,
        [luotKhamId]: [...(state.diagnosesByVisit[luotKhamId] || []), { ...item, loai }],
      },
    }));
  },
  removeDiagnosis: (luotKhamId, chan_doan_id) =>
    set((state) => ({
      diagnosesByVisit: {
        ...state.diagnosesByVisit,
        [luotKhamId]: (state.diagnosesByVisit[luotKhamId] || []).filter((d) => d.chan_doan_id !== chan_doan_id),
      },
    })),
  saveExamination: (luotKhamId) => {
    // TODO (kế hoạch tiếp theo): axiosClient.post('/kham-benh', { luot_kham_id, ...examination, diagnoses })
    console.log(
      '[MOCK SAVE] Khám & chẩn đoán:',
      luotKhamId,
      get().examinationByVisit[luotKhamId],
      get().diagnosesByVisit[luotKhamId]
    );
  },

  // ===== UC-06: Lập phiếu chỉ định cận lâm sàng =====
  clsOrdersByVisit: {},
  getClsOrders: (luotKhamId) => get().clsOrdersByVisit[luotKhamId] || emptyArray,
  addClsOrder: (luotKhamId, dich_vu_id, so_luong = 1) => {
    const service = get().clsServiceList.find((s) => s.dich_vu_id === dich_vu_id);
    if (!service) return;
    set((state) => ({
      clsOrdersByVisit: {
        ...state.clsOrdersByVisit,
        [luotKhamId]: [...(state.clsOrdersByVisit[luotKhamId] || []), { ...service, so_luong }],
      },
    }));
  },
  removeClsOrder: (luotKhamId, dich_vu_id) =>
    set((state) => ({
      clsOrdersByVisit: {
        ...state.clsOrdersByVisit,
        [luotKhamId]: (state.clsOrdersByVisit[luotKhamId] || []).filter((o) => o.dich_vu_id !== dich_vu_id),
      },
    })),
  saveClsOrders: (luotKhamId) => {
    // TODO (kế hoạch tiếp theo): axiosClient.post('/phieu-chi-dinh', { luot_kham_id, chi_tiet: clsOrders })
    console.log('[MOCK SAVE] Phiếu chỉ định CLS:', luotKhamId, get().clsOrdersByVisit[luotKhamId]);
    get().markWaitingForCls(luotKhamId);
  },

  // ===== UC-07: Lập đơn thuốc =====
  prescriptionByVisit: {},
  getPrescriptionItems: (luotKhamId) => get().prescriptionByVisit[luotKhamId] || emptyArray,
  addPrescriptionItem: (luotKhamId, item) =>
    set((state) => ({
      prescriptionByVisit: {
        ...state.prescriptionByVisit,
        [luotKhamId]: [...(state.prescriptionByVisit[luotKhamId] || []), item],
      },
    })),
  removePrescriptionItem: (luotKhamId, thuoc_id) =>
    set((state) => ({
      prescriptionByVisit: {
        ...state.prescriptionByVisit,
        [luotKhamId]: (state.prescriptionByVisit[luotKhamId] || []).filter((i) => i.thuoc_id !== thuoc_id),
      },
    })),
  savePrescription: (luotKhamId) => {
    // TODO (kế hoạch tiếp theo): axiosClient.post('/don-thuoc', { luot_kham_id, chi_tiet: prescriptionItems })
    console.log('[MOCK SAVE] Đơn thuốc:', luotKhamId, get().prescriptionByVisit[luotKhamId]);
  },
}));