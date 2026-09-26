import axiosClient from '../config/axiosClient';

const receptionistService = {
  getAllPatients: () => axiosClient.get('/benh-nhan'),
  createPatient: (patientData) => axiosClient.post('/benh-nhan', patientData),
  
  // Nghiệp vụ Lượt khám
  getDoctors: () => axiosClient.get('/bac-si'),
  createVisit: (visitData) => axiosClient.post('/luot-kham', visitData),
  getDailyQueue: () => axiosClient.get('/luot-kham/hom-nay'),
  updateVisitStatus: (visitId, status) => axiosClient.patch(`/luot-kham/${visitId}/trang-thai`, { trang_thai: status }),
  updateVisitDetails: (visitId, data) => axiosClient.patch(`/luot-kham/${visitId}`, data),
};

export default receptionistService;