import { useState } from "react";

export default function MainMenu() {
  const [selectedPackage, setSelectedPackage] = useState(null);

  const packages = [
    {
      id: 1,
      name: "Paket Sehat Harian",
      price: "Rp 50.000",
      description: "Makanan seimbang untuk kebutuhan harian Anda.",
      image: "/Images/image1.png",
      details: "Paket ini cocok untuk pekerja aktif dengan asupan kalori seimbang. Termasuk sayur, protein, karbohidrat kompleks, dan buah.",
    },
    {
      id: 2,
      name: "Paket Keto",
      price: "Rp 60.000",
      description: "Rendah karbohidrat, tinggi lemak sehat.",
      image: "/Images/image2.png",
      details: "Paket Keto dirancang untuk Anda yang menjalankan diet rendah karbo. Mengandung daging berkualitas, alpukat, dan minyak sehat.",
    },
    {
      id: 3,
      name: "Paket Vegetarian",
      price: "Rp 55.000",
      description: "Penuh sayuran dan protein nabati.",
      image: "/Images/image3.png",
      details: "Dibuat dengan bahan organik pilihan. Cocok untuk Anda yang tidak mengonsumsi daging.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">Paket Makanan Kami</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {packages.map((item) => (
          <div
            key={item.id}
            className="bg-white border rounded-lg shadow hover:shadow-lg transition duration-300 w-[90%]"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p className="text-green-600 font-bold">{item.price}</p>
              <p className="text-gray-700 mb-4">{item.description}</p>
              <button
                onClick={() => setSelectedPackage(item)}
                className="bg-[#0099ff] text-white px-4 py-2 rounded hover:bg-blue-800 transition"
              >
                Lihat Detail Selengkapnya
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedPackage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedPackage(null)}
        >
          <div
            className="bg-white rounded-lg max-w-md p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={selectedPackage.image} alt={selectedPackage.name} className="w-full h-[300px]" />
            <h3 className="text-2xl font-bold mb-2">{selectedPackage.name}</h3>
            <p className="text-green-600 font-semibold mb-2">
              {selectedPackage.price}
            </p>
            <p className="mb-4">{selectedPackage.details}</p>
            <button
              onClick={() => setSelectedPackage(null)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
