import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error("Failed to send message");
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "تم إرسال الرسالة بنجاح",
        description: "سنقوم بالرد عليك في أقرب وقت ممكن",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    },
    onError: () => {
      toast({
        title: "خطأ في إرسال الرسالة",
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      {/* Hidden Inputs */}
      <input type="hidden" id="page_app" value="contactus" className="not-empty" />
      
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" style={{ backgroundColor: '#1c1c20' }}>
        <div className="container py-3">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item"><a href="/" className="text-white"><i className="icon-home ml-2"></i> الرئيسية</a></li>
            <li className="breadcrumb-item active text-orange" aria-current="page">اتصل بنا</li>
          </ol>
        </div>
      </nav>

      {/* Page Content */}
      <div className="container py-5">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="font-size-32 font-weight-bold mb-3 text-white">اتصل بنا</h1>
          <p className="text-muted font-size-16">
            نرحب بتواصلكم معنا، سنكون سعداء للإجابة على استفساراتكم ومساعدتكم
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            {/* Contact Form Widget */}
            <div className="widget widget-style-1 mb-4">
              <header className="widget-header mb-4 d-flex align-items-center">
                <h2 className="header-title font-size-18 font-weight-bold mb-0">
                  <span className="header-link text-white">إرسال رسالة</span>
                </h2>
                <img src="/style/assets/images/icn-w-header.png" className="header-img" alt="icn-w-header" />
              </header>
              <div className="widget-body">
                <form onSubmit={handleSubmit} className="row">
                  <div className="col-md-6 mb-3">
                    <div className="form-group">
                      <label className="form-label text-white">الاسم الكامل</label>
                      <input 
                        type="text" 
                        name="name" 
                        className="form-control bg-dark text-white border-secondary"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="أدخل اسمك الكامل"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="form-group">
                      <label className="form-label text-white">البريد الإلكتروني</label>
                      <input 
                        type="email" 
                        name="email" 
                        className="form-control bg-dark text-white border-secondary"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="أدخل بريدك الإلكتروني"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12 mb-3">
                    <div className="form-group">
                      <label className="form-label text-white">الموضوع</label>
                      <input 
                        type="text" 
                        name="subject" 
                        className="form-control bg-dark text-white border-secondary"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="موضوع الرسالة"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12 mb-3">
                    <div className="form-group">
                      <label className="form-label text-white">الرسالة</label>
                      <textarea 
                        name="message" 
                        className="form-control bg-dark text-white border-secondary" 
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="اكتب رسالتك هنا..."
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-12">
                    <button 
                      type="submit" 
                      className="btn btn-orange btn-pill px-5"
                      disabled={contactMutation.isPending}
                    >
                      {contactMutation.isPending ? "جاري الإرسال..." : (
                        <>
                          <i className="icon-send mr-2"></i>
                          إرسال الرسالة
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="widget widget-style-1">
              <header className="widget-header mb-4 d-flex align-items-center">
                <h2 className="header-title font-size-18 font-weight-bold mb-0">
                  <span className="header-link text-white">معلومات التواصل</span>
                </h2>
                <img src="/style/assets/images/icn-w-header.png" className="header-img" alt="icn-w-header" />
              </header>
              <div className="widget-body">
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div className="d-flex align-items-center">
                      <div className="contact-icon bg-orange text-white rounded-circle d-flex align-items-center justify-content-center ml-3" style={{width: '50px', height: '50px'}}>
                        <i className="icon-email font-size-20"></i>
                      </div>
                      <div>
                        <h6 className="text-white mb-1">البريد الإلكتروني</h6>
                        <p className="text-muted mb-0">contact@yemenflix.com</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="d-flex align-items-center">
                      <div className="contact-icon bg-orange text-white rounded-circle d-flex align-items-center justify-content-center ml-3" style={{width: '50px', height: '50px'}}>
                        <i className="icon-phone font-size-20"></i>
                      </div>
                      <div>
                        <h6 className="text-white mb-1">الهاتف</h6>
                        <p className="text-muted mb-0">+967 123 456 789</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="d-flex align-items-center">
                      <div className="contact-icon bg-orange text-white rounded-circle d-flex align-items-center justify-content-center ml-3" style={{width: '50px', height: '50px'}}>
                        <i className="icon-clock font-size-20"></i>
                      </div>
                      <div>
                        <h6 className="text-white mb-1">ساعات العمل</h6>
                        <p className="text-muted mb-0">24/7 دعم متواصل</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="d-flex align-items-center">
                      <div className="contact-icon bg-orange text-white rounded-circle d-flex align-items-center justify-content-center ml-3" style={{width: '50px', height: '50px'}}>
                        <i className="icon-location font-size-20"></i>
                      </div>
                      <div>
                        <h6 className="text-white mb-1">الموقع</h6>
                        <p className="text-muted mb-0">اليمن - صنعاء</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}