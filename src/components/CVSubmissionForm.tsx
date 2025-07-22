'use client';

import { useState } from 'react';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, User, Mail, Phone, Briefcase, MessageSquare, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { strapiApi } from '../lib/api/strapi';
import { JobDetail } from '../types/api/strapi';

interface CVSubmissionFormProps {
  isOpen: boolean;
  onClose: () => void;
  position?: string;
}

const CVSubmissionForm: React.FC<CVSubmissionFormProps> = ({ isOpen, onClose, position }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: position || '',
    message: ''
  });
  const [cvFile, setCVFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
  const [positions, setPositions] = useState<string[]>([]);
  const [loadingPositions, setLoadingPositions] = useState(true);
  // Thông báo ngoài form
  const [showNotification, setShowNotification] = useState<null | 'success' | 'error'>(null);
  const [notificationTimeout, setNotificationTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setErrorMessage('Chỉ chấp nhận file PDF');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage('File không được vượt quá 5MB');
        return;
      }
      setCVFile(file);
      setErrorMessage('');
      // Clear validation error for CV file
      if (validationErrors.cvFile) {
        setValidationErrors(prev => ({
          ...prev,
          cvFile: ''
        }));
      }
    }
  };

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.fullName.trim()) {
      errors.fullName = 'Vui lòng nhập họ và tên';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Vui lòng nhập email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email không hợp lệ';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^[0-9+\-\s()]{10,}$/.test(formData.phone)) {
      errors.phone = 'Số điện thoại không hợp lệ';
    }
    
    if (!formData.position) {
      errors.position = 'Vui lòng chọn vị trí ứng tuyển';
    }
    
    if (!cvFile) {
      errors.cvFile = 'Vui lòng tải lên file CV';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Check if form is complete (all required fields filled)
  const isFormComplete = () => {
    return formData.fullName.trim() && 
           formData.email.trim() && 
           formData.phone.trim() && 
           formData.position && 
           cvFile;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form before submitting
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('position', formData.position);
      formDataToSend.append('message', formData.message);
      if (cvFile) {
        formDataToSend.append('cvFile', cvFile);
      }
      const response = await fetch('/api/submit-cv', {
        method: 'POST',
        body: formDataToSend,
      });
      const result = await response.json();
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          position: '',
          message: ''
        });
        setCVFile(null);
        onClose();
        // Hiện notification ngoài form
        setTimeout(() => {
          setShowNotification('success');
        }, 300); // delay nhỏ để form đóng xong mới hiện
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || 'Có lỗi xảy ra');
        onClose();
        setTimeout(() => {
          setShowNotification('error');
        }, 300);
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Có lỗi xảy ra khi gửi CV. Vui lòng kiểm tra kết nối mạng và thử lại.');
      onClose();
      setTimeout(() => {
        setShowNotification('error');
      }, 300);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Load positions from API
  useEffect(() => {
    async function loadPositions() {
      try {
        setLoadingPositions(true);
        const response = await strapiApi.fetchJobDetails();
        const uniquePositions = [...new Set(response.data.map((job: JobDetail) => job.job_title))].filter(Boolean) as string[];
        setPositions(uniquePositions);
      } catch (error) {
        console.error('Failed to load positions:', error);
        // Fallback to default positions if API fails
        setPositions(['Frontend Developer', 'Backend Developer', 'UI/UX Designer', 'Marketing Specialist', 'Khác']);
      } finally {
        setLoadingPositions(false);
      }
    }
    
    loadPositions();
  }, []);

  // Tự động đóng notification sau 10s
  useEffect(() => {
    if (showNotification) {
      if (notificationTimeout) clearTimeout(notificationTimeout);
      const timeout = setTimeout(() => {
        setShowNotification(null);
      }, 10000);
      setNotificationTimeout(timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showNotification]);

  return (
    <>
      {/* Notification ngoài form */}
      <AnimatePresence>
        {showNotification === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-[9999] bg-gradient-to-r from-blue-50 to-blue-50 border-2 border-blue-200 rounded-xl flex items-center gap-4 shadow-lg px-8 py-5 min-w-[340px] max-w-[90vw]"
          >
            <CheckCircle className="w-8 h-8 text-blue-600" />
            <div className="flex-1">
              <p className="text-blue-800 font-bold text-[16px]">🎉 CV đã được nộp thành công!</p>
              <p className="text-blue-700 font-bold text-[16px] mt-1">Cảm ơn bạn đã quan tâm đến Ethan! Chúng tôi sẽ liên hệ với bạn sớm.</p>
              <p className="text-blue-600 font-bold text-[14px] mt-2">📧 Email xác nhận đã được gửi đến: {formData.email}</p>
            </div>
            <button onClick={() => setShowNotification(null)} className="ml-4 text-blue-700 hover:text-blue-900 font-bold text-[20px]">×</button>
          </motion.div>
        )}
        {showNotification === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-[9999] bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-xl flex items-center gap-4 shadow-lg px-8 py-5 min-w-[340px] max-w-[90vw]"
          >
            <AlertCircle className="w-8 h-8 text-red-600" />
            <div className="flex-1">
              <p className="text-red-800 font-bold text-[16px]">Oops! Có lỗi xảy ra</p>
              <p className="text-red-700 font-bold text-[16px] mt-1">{errorMessage}</p>
              <p className="text-red-600 font-bold text-[14px] mt-2">Vui lòng thử lại hoặc liên hệ với chúng tôi nếu vấn đề vẫn tiếp tục.</p>
            </div>
            <button onClick={() => setShowNotification(null)} className="ml-4 text-red-700 hover:text-red-900 font-bold text-[20px]">×</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-blue-600"> Nộp hồ sơ ứng tuyển</h2>
                    <p className="text-gray-600 mt-1 font-bold text-[16px]">Gửi CV của bạn đến Ethan</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Thông tin cá nhân */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[16px] text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors font-bold text-[16px] ${
                        validationErrors.fullName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Nhập họ và tên"
                    />
                    {validationErrors.fullName && (
                      <p className="text-red-500 text-sm mt-1 font-medium">{validationErrors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block font-bold text-[16px] text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors font-bold text-[16px] ${
                        validationErrors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="example@email.com"
                    />
                    {validationErrors.email && (
                      <p className="text-red-500 text-sm mt-1 font-medium">{validationErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block font-bold text-[16px] text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors font-bold text-[16px] ${
                        validationErrors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="0123456789"
                    />
                    {validationErrors.phone && (
                      <p className="text-red-500 text-sm mt-1 font-medium">{validationErrors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block font-bold text-[16px] text-gray-700 mb-2">
                      <Briefcase className="w-4 h-4 inline mr-2" />
                      Vị trí ứng tuyển *
                    </label>
                    <select
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors font-bold text-[16px] ${
                        validationErrors.position ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">{loadingPositions ? 'Đang tải...' : 'Chọn vị trí'}</option>
                      {positions.map(pos => (
                        <option key={pos} value={pos}>{pos}</option>
                      ))}
                      <option value="Khác">Khác</option>
                    </select>
                    {validationErrors.position && (
                      <p className="text-red-500 text-sm mt-1 font-medium">{validationErrors.position}</p>
                    )}
                  </div>
                </div>

                {/* CV Upload */}
                <div>
                  <label className="block font-bold text-[16px] text-gray-700 mb-2">
                    <Upload className="w-4 h-4 inline mr-2" />
                    CV (PDF) *
                  </label>
                  <div className={`border-2 border-dashed rounded-lg p-6 text-center hover:border-blue-500 transition-colors ${
                    validationErrors.cvFile ? 'border-red-500' : 'border-gray-300'
                  }`}>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      required
                      className="hidden"
                      id="cv-upload"
                    />
                    <label htmlFor="cv-upload" className="cursor-pointer">
                      {cvFile ? (
                        <div className="text-blue-500 font-bold text-[16px]">
                          <Upload className="w-8 h-8 mx-auto mb-2" />
                          <p className="font-bold text-[16px]">{cvFile.name}</p>
                          <p className="text-[14px] text-gray-500">{(cvFile.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      ) : (
                        <div className="text-gray-500 font-bold text-[16px]">
                          <Upload className="w-8 h-8 mx-auto mb-2" />
                          <p>Nhấp để chọn file PDF</p>
                          <p className="text-[14px]">Tối đa 5MB</p>
                        </div>
                      )}
                    </label>
                  </div>
                  {validationErrors.cvFile && (
                    <p className="text-red-500 text-sm mt-1 font-medium">{validationErrors.cvFile}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block font-bold text-[16px] text-gray-700 mb-2">
                    <MessageSquare className="w-4 h-4 inline mr-2" />
                    Thông điệp (Tùy chọn)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none font-bold text-[16px]"
                    placeholder="Giới thiệu ngắn gọn về bản thân hoặc lý do ứng tuyển..."
                  />
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-bold text-[16px]"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !isFormComplete()}
                    className={`flex-1 px-6 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 relative overflow-hidden font-bold text-[16px] ${
                      isSubmitting || !isFormComplete()
                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed opacity-50'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span className="animate-pulse">Đang gửi CV...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>{isFormComplete() ? 'Gửi CV ngay' : 'Gửi CV ngay'}</span>
                      </>
                    )}
                    {/* Loading overlay */}
                    {isSubmitting && (
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        className="absolute bottom-0 left-0 h-1 bg-white/30 rounded-full"
                      />
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CVSubmissionForm;
