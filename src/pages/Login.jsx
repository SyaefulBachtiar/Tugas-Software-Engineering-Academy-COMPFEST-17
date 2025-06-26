import { useState, useEffect } from "react";
import { Eye, EyeOff, Mail, Lock, User, Loader2, CheckCircle, XCircle } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loginStatus, setLoginStatus] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    validateField(name, form[name]);
  };

  const validateField = (name, value) => {
    let error = "";
    
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) error = "Email wajib diisi";
      else if (!emailRegex.test(value)) error = "Format email tidak valid";
    }
    
    if (name === "password") {
      if (!value) error = "Password wajib diisi";
      else if (value.length < 6) error = "Password minimal 6 karakter";
    }
    
    setErrors({ ...errors, [name]: error });
    return !error;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginStatus(null);

    // Validate all fields
    const emailValid = validateField("email", form.email);
    const passwordValid = validateField("password", form.password);
    
    if (!emailValid || !passwordValid) {
      setLoading(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;

      console.log("User logged in:", user);
      setLoginStatus("success");
      setTimeout(() => {
        alert("Login berhasil! Redirecting...");
        navigate('/menu') // redirect manual
      }, 1000);
    } catch (error) {
      setLoginStatus("error");

      let message = "Terjadi kesalahan saat login.";
      if (error.code === "auth/user-not-found") {
        message = "Pengguna tidak ditemukan.";
      } else if (error.code === "auth/wrong-password") {
        message = "Password salah.";
      } else if (error.code === "auth/invalid-email") {
        message = "Email tidak valid.";
      }

      setErrors({ general: message });
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = form.email && form.password && !errors.email && !errors.password;

  return (
    <div className="min-h-screen bg-[#0099ff] flex items-center justify-center p-4">
      <div className="w-full max-w-md font-inter">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">SEA Catering</h1>
          <p className="text-white/70">Sign in to your account</p>
        </div>

        {/* Form Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
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

            {/* Password Field */}
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
                  placeholder="Enter your password"
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
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-indigo-600 bg-white/10 border-white/20 rounded focus:ring-indigo-500"
                />
                <span className="text-white/70 text-sm">Remember me</span>
              </label>
              <a href="#" className="text-indigo-300 hover:text-indigo-200 text-sm transition-colors">
                Forgot password?
              </a>
            </div>

            {/* General Error */}
            {errors.general && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
                <p className="text-red-400 text-sm flex items-center gap-2">
                  <XCircle className="w-4 h-4" />
                  {errors.general}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid || loading}
              className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
                !isFormValid || loading
                  ? 'bg-gray-600 cursor-not-allowed'
                  : loginStatus === 'success'
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] shadow-lg hover:shadow-xl'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing In...
                </>
              ) : loginStatus === 'success' ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Success!
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Divider */}
          {/* <div className="my-6 flex items-center">
            <div className="flex-1 h-px bg-white/20"></div>
            <span className="px-4 text-white/50 text-sm">or</span>
            <div className="flex-1 h-px bg-white/20"></div>
          </div> */}

          {/* Social Login
          <div className="space-y-3">
            <button className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl text-white transition-all duration-300 flex items-center justify-center gap-3">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
            
            <button className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl text-white transition-all duration-300 flex items-center justify-center gap-3">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Continue with Facebook
            </button>
          </div> */}

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-white/70">
              Don't have an account?{' '}
              <a href="#" className="text-indigo-300 hover:text-indigo-200 font-semibold transition-colors">
                Sign up
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-white/50 text-sm">
            By signing in, you agree to our{' '}
            <a href="#" className="text-indigo-300 hover:text-indigo-200">Terms</a> and{' '}
            <a href="#" className="text-indigo-300 hover:text-indigo-200">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}