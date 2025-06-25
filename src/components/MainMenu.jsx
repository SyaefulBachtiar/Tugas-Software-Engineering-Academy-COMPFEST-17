// src/pages/Menu.jsx
export default function MainMenu() {
  const packages = [
    {
      id: 1,
      name: "Paket Sehat Harian",
      description: "Makanan seimbang untuk kebutuhan harian Anda.",
      price: "Rp 50.000",
      nutrition: "450 kalori, 25g protein, 30g karbo",
    },
    {
      id: 2,
      name: "Paket Keto",
      description: "Rendah karbohidrat, tinggi lemak sehat.",
      price: "Rp 60.000",
      nutrition: "400 kalori, 20g protein, 15g karbo",
    },
    {
      id: 3,
      name: "Paket Vegetarian",
      description: "Penuh sayuran dan protein nabati.",
      price: "Rp 55.000",
      nutrition: "420 kalori, 18g protein, 35g karbo",
    },
    {
      id: 4,
      name: "Paket Weight Loss",
      description: "Rendah kalori, tinggi serat.",
      price: "Rp 48.000",
      nutrition: "350 kalori, 22g protein, 20g karbo",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">Paket Makanan Kami</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {packages.map((item) => (
          <div key={item.id} className="border rounded-xl p-6 shadow hover:shadow-lg transition-all">
            <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
            <p className="mb-2 text-gray-700">{item.description}</p>
            <p className="mb-1 font-semibold text-green-600">{item.price}</p>
            <p className="text-sm text-gray-600">{item.nutrition}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
