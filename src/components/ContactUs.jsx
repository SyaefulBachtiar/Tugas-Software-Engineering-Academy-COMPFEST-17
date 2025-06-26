import { useState } from 'react';
import { Phone, Mail, MapPin, User, Send, Clock, Star, MessageCircle } from 'lucide-react';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.message) {
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
      setFormData({ name: '', email: '', message: '' });
    }
  };

  const contactCards = [
    {
      icon: Phone,
      title: "Telepon",
      info: "0812-3456-789",
      description: "Hubungi kami langsung untuk konsultasi",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Mail,
      title: "Email",
      info: "kateringsea@email.com",
      description: "Kirim email untuk pertanyaan detail",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: MapPin,
      title: "Alamat",
      info: "Jl. Sehat No. 123, Jakarta",
      description: "Kunjungi kantor kami",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const workingHours = [
    { day: "Senin - Jumat", hours: "08:00 - 17:00" },
    { day: "Sabtu", hours: "09:00 - 15:00" },
    { day: "Minggu", hours: "Tutup" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in">
            Contact us
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Ready to serve the best catering needs for your special event
          </p>
          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
              <Star className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-medium">Manager: Brian - Ready to Help You</span>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-white/10 rounded-full animate-bounce delay-300"></div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {contactCards.map((card, index) => (
            <div
              key={index}
              className={`relative group cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                hoveredCard === index ? 'z-10' : ''
              }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <div className="p-8 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${card.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <card.icon className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{card.title}</h3>
                  <p className="text-lg font-semibold text-gray-700 mb-2">{card.info}</p>
                  <p className="text-gray-500 text-sm">{card.description}</p>
                  
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <button className={`px-4 py-2 rounded-full bg-gradient-to-r ${card.color} text-white text-sm font-medium hover:shadow-lg transition-shadow`}>
                      Contact Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full -translate-y-16 translate-x-16"></div>
            
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <MessageCircle className="w-8 h-8 text-blue-600" />
                <h3 className="text-3xl font-bold text-gray-800">Send Message</h3>
              </div>
              
              <p className="text-gray-600 mb-8">
                Tell us your catering needs, and we will provide the best solution!
              </p>

              {isSubmitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-center gap-2 text-green-800">
                    <Send className="w-5 h-5" />
                    <span className="font-medium">Message sent successfully! We will contact you soon.</span>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Nama Lengkap"
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-gray-50 focus:bg-white"
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Anda"
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-gray-50 focus:bg-white"
                  />
                </div>

                <div className="relative">
                  <MessageCircle className="absolute left-3 top-4 text-gray-400 w-5 h-5" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Ceritakan kebutuhan katering Anda..."
                    rows="5"
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-gray-50 focus:bg-white resize-none"
                  ></textarea>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-cyan-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Kirim Pesan
                </button>
              </div>
            </div>
          </div>

          {/* Business Info */}
          <div className="space-y-8">
            {/* Working Hours */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-8 h-8 text-green-600" />
                <h3 className="text-2xl font-bold text-gray-800">Operating Hours</h3>
              </div>
              
              <div className="space-y-4">
                {workingHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <span className="font-medium text-gray-700">{schedule.day}</span>
                    <span className={`font-semibold ${schedule.hours === 'Closed' ? 'text-red-500' : 'text-green-600'}`}>
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 border border-blue-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Why Choose SEA Catering?</h3>
              
              <div className="space-y-4">
                {[
                  { icon: "🍽️", text: "High quality menu with fresh ingredients" },
                  { icon: "⚡", text: "Fast and professional service" },
                  { icon: "💰", text: "Affordable price with premium quality" },
                  { icon: "🎯", text: "Customize the menu according to your needs" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-white/70 rounded-xl hover:bg-white transition-colors">
                    <span className="text-2xl">{feature.icon}</span>
                    <span className="text-gray-700">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative">
            <h3 className="text-3xl font-bold mb-4">Ready to order?</h3>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Contact us now and get the best deals for your catering needs!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" />
                Call now!
              </button>
              <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition-colors flex items-center justify-center gap-2">
                <Mail className="w-5 h-5" />
                Send Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}