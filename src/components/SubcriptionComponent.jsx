// src/pages/Subscription.jsx
export default function SubscriptionComponent() {
  return (
    <div className="container mx-auto px-4 py-10 font-inter">
      <h2 className="text-3xl font-bold mb-6">Langganan Paket Makanan</h2>

      <section className="mb-10 border p-5 rounded-lg bg-white shadow-md">
        <p className="text-lg text-gray-700 mb-4">
          Dapatkan makanan sehat secara rutin langsung ke depan pintu Anda! Pilih paket langganan yang sesuai dengan kebutuhan dan gaya hidup Anda.
        </p>
        <ul className="list-disc list-inside text-gray-800 text-base space-y-2">
          <li>Pengiriman harian tanpa repot memasak</li>
          <li>Harga lebih hemat untuk pelanggan tetap</li>
          <li>Dapat disesuaikan berdasarkan preferensi gizi Anda</li>
        </ul>
      </section>

      <section className="mb-10 p-5 border rounded-md shadow-md">
        <h3 className="text-2xl font-semibold mb-4">Pilih Paket Langganan</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-4 shadow">
            <h4 className="font-bold text-lg mb-2">Paket 7 Hari</h4>
            <p className="text-gray-700 mb-2">Rp 300.000</p>
            <p className="text-sm text-gray-600">Termasuk 7 kali pengiriman makanan sehat</p>
          </div>
          <div className="border rounded-lg p-4 shadow">
            <h4 className="font-bold text-lg mb-2">Paket 14 Hari</h4>
            <p className="text-gray-700 mb-2">Rp 580.000</p>
            <p className="text-sm text-gray-600">Lebih hemat! Cocok untuk dua minggu</p>
          </div>
          <div className="border rounded-lg p-4 shadow">
            <h4 className="font-bold text-lg mb-2">Paket 30 Hari</h4>
            <p className="text-gray-700 mb-2">Rp 1.200.000</p>
            <p className="text-sm text-gray-600">Langganan satu bulan penuh</p>
          </div>
        </div>
      </section>

      <section className="p-5 border rounded-md shadow-md">
        <h3 className="text-2xl font-semibold mb-4">Formulir Pendaftaran</h3>
        <form className="grid gap-4 max-w-md">
          <input
            type="text"
            placeholder="Nama Lengkap"
            className="border p-2 rounded"
          />
          <input
            type="tel"
            placeholder="Nomor Telepon"
            className="border p-2 rounded"
          />
          <select className="border p-2 rounded">
            <option value="">Pilih Paket Langganan</option>
            <option value="7">7 Hari</option>
            <option value="14">14 Hari</option>
            <option value="30">30 Hari</option>
          </select>
          <button
            type="submit"
            className="bg-[#0099ff] text-white py-2 rounded hover:bg-green-700"
          >
            Daftar Sekarang
          </button>
        </form>
      </section>
    </div>
  );
}
