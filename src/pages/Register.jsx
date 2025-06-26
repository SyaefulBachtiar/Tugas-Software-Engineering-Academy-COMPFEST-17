import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, Loader2, CheckCircle, XCircle, UserPlus } from "lucide-react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/config"; 
import { doc, setDoc } from "firebase/firestore";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [registerStatus, setRegisterStatus] = useState(null);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    validateField(name, form[name]);
  };

  const isPasswordValid = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
  };

  const validateField = (name, value) => {
    let error = "";
    
    if (name === "name") {
      if (!value) error = "Nama lengkap wajib diisi";
      else if (value.length < 2) error = "Nama minimal 2 karakter";
    }
    
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) error = "Email wajib diisi";
      else if (!emailRegex.test(value)) error = "Format email tidak valid";
    }
    
    if (name === "password") {
      if (!value) error = "Password wajib diisi";
      else if (!isPasswordValid(value)) error = "Password harus memiliki huruf besar, kecil, angka, dan karakter khusus (minimal 8 karakter)";
    }
    
    setErrors({ ...errors, [name]: error });
    return !error;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRegisterStatus(null);

    const nameValid = validateField("name", form.name);
    const emailValid = validateField("email", form.email);
    const passwordValid = validateField("password", form.password);
    
    if (!nameValid || !emailValid || !passwordValid || !acceptTerms) {
      setLoading(false);
      if (!acceptTerms) {
        setErrors({ ...errors, terms: "Anda harus menyetujui syarat dan ketentuan" });
      }
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
    const user = userCredential.user;

    // Tambahkan nama ke profil pengguna Firebase
    await updateProfile(user, {
      displayName: form.name,
    });

    // Simpan data tambahan di Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name: form.name,
      email: user.email,
      role: "user", // default role
      createdAt: new Date(),
    });

    setRegisterStatus("success");
    setTimeout(() => {
      alert("Registrasi berhasil! Redirecting to login...");
      window.location.href = "/login"; // redirect manual
    }, 1000);
    } catch (error) {
      setRegisterStatus("error");
    setErrors((prev) => ({
      ...prev,
      general: "Gagal registrasi: " + error.message,
    }));
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = form.name && form.email && form.password && !errors.name && !errors.email && !errors.password && acceptTerms;

  return (
    <div className="min-h-screen bg-[#0099ff] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full mb-4">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-white/70">Join us today and get started</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-white font-medium">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your full name"
                  className={`w-full pl-12 pr-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.name && touched.name
                      ? 'border-red-400 focus:ring-red-400'
                      : 'border-white/20 focus:ring-indigo-400 focus:border-indigo-400'
                  }`}
                />
                {form.name && !errors.name && (
                  <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400" />
                )}
              </div>
              {errors.name && touched.name && (
                <p className="text-red-400 text-sm flex items-center gap-1">
                  <XCircle className="w-4 h-4" />
                  {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-white font-medium">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your email"
                  className={`w-full pl-12 pr-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.email && touched.email
                      ? 'border-red-400 focus:ring-red-400'
                      : 'border-white/20 focus:ring-indigo-400 focus:border-indigo-400'
                  }`}
                />
                {form.email && !errors.email && (
                  <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400" />
                )}
              </div>
              {errors.email && touched.email && (
                <p className="text-red-400 text-sm flex items-center gap-1">
                  <XCircle className="w-4 h-4" />
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-white font-medium">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Create a strong password"
                  className={`w-full pl-12 pr-12 py-3 bg-white/5 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.password && touched.password
                      ? 'border-red-400 focus:ring-red-400'
                      : 'border-white/20 focus:ring-indigo-400 focus:border-indigo-400'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && touched.password && (
                <p className="text-red-400 text-sm flex items-center gap-1">
                  <XCircle className="w-4 h-4" />
                  {errors.password}
                </p>
              )}
              <div className="text-xs text-white/50 space-y-1">
                <p>Password must contain:</p>
                <ul className="list-disc list-inside space-y-0.5 ml-2">
                  <li className={form.password.length >= 8 ? 'text-green-400' : 'text-white/50'}>
                    At least 8 characters
                  </li>
                  <li className={/[a-z]/.test(form.password) ? 'text-green-400' : 'text-white/50'}>
                    One lowercase letter
                  </li>
                  <li className={/[A-Z]/.test(form.password) ? 'text-green-400' : 'text-white/50'}>
                    One uppercase letter
                  </li>
                  <li className={/\d/.test(form.password) ? 'text-green-400' : 'text-white/50'}>
                    One number
                  </li>
                  <li className={/[\W_]/.test(form.password) ? 'text-green-400' : 'text-white/50'}>
                    One special character
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="terms"
                checked={acceptTerms}
                onChange={(e) => {
                  setAcceptTerms(e.target.checked);
                  if (e.target.checked && errors.terms) {
                    setErrors({ ...errors, terms: "" });
                  }
                }}
                className="w-4 h-4 text-indigo-600 bg-white/10 border-white/20 rounded focus:ring-indigo-500 mt-1"
              />
              <label htmlFor="terms" className="text-white/70 text-sm cursor-pointer">
                I agree to the{' '}
                <span className="text-indigo-300 hover:text-indigo-200 transition-colors cursor-pointer">
                  Terms of Service
                </span>{' '}
                and{' '}
                <span className="text-indigo-300 hover:text-indigo-200 transition-colors cursor-pointer">
                  Privacy Policy
                </span>
              </label>
            </div>
            {errors.terms && (
              <p className="text-red-400 text-sm flex items-center gap-1">
                <XCircle className="w-4 h-4" />
                {errors.terms}
              </p>
            )}

            {errors.general && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
                <p className="text-red-400 text-sm flex items-center gap-2">
                  <XCircle className="w-4 h-4" />
                  {errors.general}
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isFormValid || loading}
              className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
                !isFormValid || loading
                  ? 'bg-gray-600 cursor-not-allowed'
                  : registerStatus === 'success'
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] shadow-lg hover:shadow-xl'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Account...
                </>
              ) : registerStatus === 'success' ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Account Created!
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Create Account
                </>
              )}
            </button>
          </div>

          {/* <div className="my-6 flex items-center">
            <div className="flex-1 h-px bg-white/20"></div>
            <span className="px-4 text-white/50 text-sm">or</span>
            <div className="flex-1 h-px bg-white/20"></div>
          </div>

          <div className="space-y-3">
            <button className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl text-white transition-all duration-300 flex items-center justify-center gap-3">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign up with Google
            </button>
            
            <button className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl text-white transition-all duration-300 flex items-center justify-center gap-3">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Sign up with Facebook
            </button>
          </div> */}

          <div className="mt-6 text-center">
            <p className="text-white/70">
              Already have an account?{' '}
              <span className="text-indigo-300 hover:text-indigo-200 font-semibold transition-colors cursor-pointer">
                <a href="/login">Sign in</a>
              </span>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-white/50 text-sm">
            By creating an account, you agree to our{' '}
            <span className="text-indigo-300 hover:text-indigo-200 cursor-pointer">Terms</span> and{' '}
            <span className="text-indigo-300 hover:text-indigo-200 cursor-pointer">Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
}