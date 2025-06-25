import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { db } from "../firebase/config";
import { collection, addDoc, getDocs, Timestamp } from "firebase/firestore";

export default function Testimonial() {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    rating: "5",
  });

  const [testimonials, setTestimonials] = useState([]);

  // Fetch data dari Firestore
  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const snapshot = await getDocs(collection(db, "testimonials")); // koleksi disarankan plural
        const data = snapshot.docs.map((doc) => doc.data());
        setTestimonials(data.reverse()); // menampilkan yang terbaru di atas
      } catch (error) {
        console.error("Gagal memuat testimoni:", error);
      }
    };

    fetchTestimonial();
  }, []);

  // Submit ke Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "testimonials"), {
        ...formData,
        rating: parseInt(formData.rating),
        createdAt: Timestamp.now(),
      });

      const newTesti = {
        name: formData.name,
        message: formData.message,
        rating: parseInt(formData.rating),
      };

      setTestimonials([newTesti, ...testimonials]);
      setFormData({ name: "", message: "", rating: "5" });
    } catch (error) {
      console.error("Gagal mengirim testimoni:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-6 text-center">Testimoni Pelanggan</h2>

      {/* Slider Testimoni */}
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        className="mb-12 max-w-xl"
      >
        {testimonials.map((t, index) => (
          <SwiperSlide key={index}>
            <div className="p-6 border rounded-lg shadow bg-white text-center">
              <p className="text-lg italic mb-2">"{t.message}"</p>
              <p className="font-semibold">{t.name}</p>
              <p className="text-yellow-500">{"⭐".repeat(t.rating)}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Form Testimoni */}
      <h3 className="text-2xl font-semibold mb-4 text-center">Kirim Testimoni Anda</h3>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto grid gap-4 bg-gray-50 p-6 rounded shadow"
      >
        <input
          type="text"
          placeholder="Nama Anda"
          className="border p-2 rounded"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <textarea
          placeholder="Pesan Ulasan"
          rows={3}
          className="border p-2 rounded"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
        ></textarea>
        <select
          className="border p-2 rounded"
          value={formData.rating}
          onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
        >
          <option value="5">5 - Sangat Baik</option>
          <option value="4">4 - Baik</option>
          <option value="3">3 - Cukup</option>
          <option value="2">2 - Kurang</option>
          <option value="1">1 - Buruk</option>
        </select>
        <button
          type="submit"
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Kirim Testimoni
        </button>
      </form>
    </div>
  );
}
