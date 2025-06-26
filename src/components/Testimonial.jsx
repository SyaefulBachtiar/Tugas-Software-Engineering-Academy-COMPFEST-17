import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase/config";
import { collection, addDoc, getDocs, Timestamp } from "firebase/firestore";

export default function Testimonial() {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    rating: "5",
  });

  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null); // 🔑 Cek login

  useEffect(() => {
    // Pantau status login
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  // Fetch data testimonial
  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const snapshot = await getDocs(collection(db, "testimonials"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const sorted = data.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);
        setTestimonials(sorted);
      } catch (error) {
        console.error("Gagal memuat testimoni:", error);
        setError("Gagal memuat testimoni. Coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonial();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "testimonials"), {
        ...formData,
        rating: parseInt(formData.rating),
        createdAt: Timestamp.now(),
      });

      const newTesti = {
        id: docRef.id,
        ...formData,
        rating: parseInt(formData.rating),
        createdAt: Timestamp.now(),
      };

      setTestimonials([newTesti, ...testimonials]);
      setFormData({ name: "", message: "", rating: "5" });
    } catch (error) {
      console.error("Gagal mengirim testimoni:", error);
      alert("Terjadi kesalahan saat mengirim testimoni.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-6 text-center">Customer Testimonials</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading testimonials...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : testimonials.length === 0 ? (
        <p className="text-center text-gray-500">Belum ada testimoni.</p>
      ) : (
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          className="mb-12 max-w-xl"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="p-6 border rounded-lg shadow bg-white text-center">
                <p className="text-lg italic mb-2">"{t.message}"</p>
                <p className="font-semibold">{t.name}</p>
                <p className="text-yellow-500">{"⭐".repeat(t.rating)}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Tampilkan form hanya jika login */}
      {user ? (
        <>
          <h3 className="text-2xl font-semibold mb-4 text-center">Submit Your Testimonial</h3>
          <form
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto grid gap-4 bg-gray-50 p-6 rounded shadow"
          >
            <input
              type="text"
              placeholder="Your Name"
              className="border p-2 rounded"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <textarea
              placeholder="Write a Review"
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
              required
            >
              <option value="5">5 - Very good</option>
              <option value="4">4 - Good</option>
              <option value="3">3 - Pretty good</option>
              <option value="2">2 - Not good</option>
              <option value="1">1 - Bad</option>
            </select>
            <button
              type="submit"
              className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Send Your Testimonial
            </button>
          </form>
        </>
      ) : (
        <p className="text-center text-gray-500 mt-6">
          Login terlebih dahulu untuk mengirim testimonial.
        </p>
      )}
    </div>
  );
}

