import { useState, useEffect } from 'react';

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
  };

  useEffect(() => {
    // Add Arabic font and RTL support
    document.documentElement.lang = 'ar';
    document.documentElement.dir = 'rtl';
    document.body.className = 'header-fixed';
  }, []);

  return (
    <>
      {/* Hidden inputs for page identification */}
      <input type="hidden" id="page_app" value="login" className="not-empty" />
      <input type="hidden" id="page_id" value="0" className="not-empty" />

      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-5" style={{ backgroundColor: '#1c1c20' }}>
        <div className="container py-3">
          <h2 className="font-size-28 font-weight-bold text-white text-center">تسجيل الدخول</h2>
        </div>
      </nav>

      {/* Login Form */}
      <div className="page page-login page-form">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-8 col-10 mx-auto">
              <form onSubmit={handleSubmit} className="validate">
                <input type="hidden" name="_token" value="dummy_token" className="not-empty" />
                
                <div className="form-group mb-4">
                  <input 
                    type="email" 
                    className="form-control" 
                    id="loginInputEmail" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    autoFocus
                    required
                  />
                  <label className="font-size-12 m-0" htmlFor="loginInputEmail">البريد الإلكتروني</label>
                  <span className="line"></span>
                </div>
                
                <div className="form-group mb-4">
                  <input 
                    type="password" 
                    className="form-control" 
                    id="loginInputPassword" 
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    minLength={6}
                    required
                  />
                  <label className="font-size-12 m-0" htmlFor="loginInputPassword">كلمة المرور</label>
                  <span className="line"></span>
                </div>
                
                <div className="form-group text-left my-5">
                  <button type="submit" className="btn btn-dark btn-pill px-5">دخول</button>
                </div>
                
                <ul className="links list-unstyled p-0">
                  <li><a href="/password/reset" className="text-muted">نسيت كلمة المرور؟</a></li>
                  <li className="text-muted">اذا لم يكن لديك حساب قم <a href="/register" className="text-orange">بانشاء حساب جديد</a></li>
                </ul>
                
                <div>
                  <a href="/fb-login" className="btn btn-facebook btn-pill font-weight-medium d-inline-flex align-items-center">
                    <i className="icon-facebook ml-3"></i>
                    <span>متابعة بحساب فيس بوك</span>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}