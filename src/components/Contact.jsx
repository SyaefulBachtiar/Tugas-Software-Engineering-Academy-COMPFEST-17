import { useState } from 'react';
import { User, Phone, Mail, MapPin, Send, MessageCircle } from 'lucide-react';

export default function Contact() {
  const [isHovered, setIsHovered] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    message: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = () => {
    if (formData.name && formData.message) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setFormData({ name: '', message: '' });
    }
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center py-20 bg-gradient-to-br from-[#ffd194] via-[#ffb347] to-[#ff9933] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-white opacity-10 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-white opacity-5 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-white opacity-20 rounded-full animate-ping"></div>
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4 animate-fade-in">
              Let's <span className="text-yellow-200">Connect</span>
            </h1>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Info Card */}
            <div 
              className={`bg-white rounded-3xl shadow-2xl p-8 transform transition-all duration-500 ${
                isHovered ? 'scale-105 rotate-1' : ''
              }`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-[#ff9933] to-[#ffd194] rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Contact Detail</h2>
                <p className="text-gray-600">Ready to serve you 24/7</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gradient-to-r hover:from-[#ffd194] hover:to-[#ffb347] hover:text-white transition-all duration-300 group">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-blue-500 transition-all duration-300">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold">Manager</p>
                    <p className="text-lg">Brian</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gradient-to-r hover:from-[#ffd194] hover:to-[#ffb347] hover:text-white transition-all duration-300 group">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-green-500 transition-all duration-300">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold">WhatsApp</p>
                    <a 
                      href="https://wa.me/08123456789" 
                      className="text-lg hover:underline flex items-center gap-2"
                    >
                      08123456789
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gradient-to-r hover:from-[#ffd194] hover:to-[#ffb347] hover:text-white transition-all duration-300 group">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-red-500 transition-all duration-300">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-lg">info@restaurant.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gradient-to-r hover:from-[#ffd194] hover:to-[#ffb347] hover:text-white transition-all duration-300 group">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-purple-500 transition-all duration-300">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold">Location</p>
                    <p className="text-lg">Center of Jakarta</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Message Form */}
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Send Quick Messages
              </h3>
              
              {showSuccess && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl mb-6 animate-bounce">
                  ✨ Message sent successfully! We will contact you soon.
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <div className="block text-gray-700 font-semibold mb-2">
                    Your Name
                  </div>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#ff9933] focus:outline-none transition-colors"
                    placeholder="Enter your name..."
                  />
                </div>
                
                <div>
                  <div className="block text-gray-700 font-semibold mb-2">
                    Pesan
                  </div>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows="4"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#ff9933] focus:outline-none transition-colors resize-none"
                    placeholder="Type your message..."
                  ></textarea>
                </div>
                
                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-[#ff9933] to-[#ffd194] text-white font-bold py-4 px-6 rounded-xl hover:from-[#e68a2e] hover:to-[#ffb347] transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-gray-600 mb-4">Or contact directly via:</p>
                <div className="flex justify-center gap-4">
                  <a
                    href="https://wa.me/08123456789"
                    className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transform hover:scale-110 transition-all duration-300 flex items-center gap-2 shadow-lg"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp
                  </a>
                  <a
                    href="tel:08123456789"
                    className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transform hover:scale-110 transition-all duration-300 flex items-center gap-2 shadow-lg"
                  >
                    <Phone className="w-5 h-5" />
                    Telepon
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-delay {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fade-in-delay 1s ease-out 0.3s both;
        }
      `}</style>
    </section>
  );
}