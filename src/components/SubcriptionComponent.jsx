import { useState, useEffect } from "react";
import { db, auth } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function SubscriptionComponent() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    package: "",
    meals: [],
    days: [],
    allergy: "",
  });

  const [price, setPrice] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [user, setUser] = useState(null);

  const packageOptions = {
    "Paket Diet": 30000,
    "Paket Protein": 40000,
    "Paket Royal": 60000,
  };

  const mealOptions = ["Sarapan", "Makan Siang", "Makan Malam"];
  const dayOptions = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
    });
    return () => unsubscribe();
  }, []);

  const calculatePrice = (selectedPackage, meals, days) => {
    const basePrice = packageOptions[selectedPackage] || 0;
    return basePrice * meals.length * days.length * 4.3;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (name, value, group) => {
    setForm((prev) => {
      const updated = prev[group].includes(value)
        ? prev[group].filter((item) => item !== value)
        : [...prev[group], value];
      return { ...prev, [group]: updated };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.package || form.meals.length === 0 || form.days.length === 0) {
      alert("Mohon lengkapi semua bidang yang wajib diisi (*)");
      return;
    }

    if (!user) {
      alert("Anda harus login terlebih dahulu.");
      return;
    }

    const total = calculatePrice(form.package, form.meals, form.days);
    setPrice(total);
    setSubmitted(true);

    try {
      await addDoc(collection(db, "subscriptions"), {
        ...form,
        userId: user.uid,
        total,
        createdAt: Timestamp.now(),
      });
      console.log("✅ Data berhasil dikirim ke Firebase.");
    } catch (error) {
      console.error("🔥 Gagal menyimpan ke Firestore:", error.code, error.message);
      alert("Terjadi kesalahan saat menyimpan data: " + error.message);
    }
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-xl">Silakan <strong>login</strong> untuk melanjutkan berlangganan.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 flex flex-col justify-center">
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 rounded shadow space-y-6">
        <h2 className="text-3xl font-bold mb-6">Formulir Langganan Paket Makanan</h2>

        {/* Nama */}
        <div>
          <label className="font-semibold block mb-1">Nama Lengkap*:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Telepon */}
        <div>
          <label className="font-semibold block mb-1">Nomor Telepon Aktif*:</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Paket */}
        <div>
          <label className="font-semibold block mb-1">Pilih Paket*:</label>
          <select
            name="package"
            value={form.package}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">-- Pilih Paket --</option>
            {Object.entries(packageOptions).map(([label, price]) => (
              <option key={label} value={label}>
                {label} – Rp{price.toLocaleString("id-ID")}/makanan
              </option>
            ))}
          </select>
        </div>

        {/* Makanan */}
        <div>
          <label className="font-semibold block mb-1">Jenis Makanan*:</label>
          <div className="flex gap-4 flex-wrap">
            {mealOptions.map((meal) => (
              <label key={meal} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.meals.includes(meal)}
                  onChange={() => handleCheckbox("meals", meal, "meals")}
                />
                {meal}
              </label>
            ))}
          </div>
        </div>

        {/* Hari */}
        <div>
          <label className="font-semibold block mb-1">Hari Pengiriman*:</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {dayOptions.map((day) => (
              <label key={day} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.days.includes(day)}
                  onChange={() => handleCheckbox("days", day, "days")}
                />
                {day}
              </label>
            ))}
          </div>
        </div>

        {/* Alergi */}
        <div>
          <label className="font-semibold block mb-1">Alergi / Batasan Diet:</label>
          <textarea
            name="allergy"
            value={form.allergy}
            onChange={handleChange}
            rows={3}
            className="w-full border p-2 rounded"
            placeholder="Contoh: Kacang, Susu, Gluten"
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Hitung & Kirim
        </button>
      </form>

      {submitted && (
        <div className="mt-8 p-4 bg-green-100 border-l-4 border-green-600 rounded">
          <h3 className="text-xl font-bold mb-2 text-green-700">Total Harga Langganan Anda:</h3>
          <p className="text-lg font-semibold text-green-800">
            Rp{price.toLocaleString("id-ID")}
          </p>
        </div>
      )}
    </div>
  );
}
