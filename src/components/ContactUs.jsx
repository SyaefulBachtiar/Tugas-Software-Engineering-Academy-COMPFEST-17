// src/pages/Contact.jsx
export default function ContactUs() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">Hubungi Kami</h2>

      <section className="mb-10">
        <p className="text-lg text-gray-700 mb-4">
          Kami senang mendengar dari Anda! Hubungi kami untuk pertanyaan, saran, atau informasi lebih lanjut mengenai layanan Katering SEA.
        </p>

        <div className="space-y-2 text-gray-800">
          <p><span className="font-semibold">Manajer:</span> Brian</p>
          <p><span className="font-semibold">Telepon:</span> 0812-3456-789</p>
          <p><span className="font-semibold">Email:</span> kateringsea@email.com</p>
          <p><span className="font-semibold">Alamat:</span> Jl. Sehat No. 123, Jakarta, Indonesia</p>
        </div>
      </section>

      <section>
        <h3 className="text-2xl font-semibold mb-4">Kirim Pesan</h3>
        <form className="grid gap-4 max-w-md">
          <input
            type="text"
            placeholder="Nama Anda"
            className="border p-2 rounded"
          />
          <input
            type="email"
            placeholder="Email Anda"
            className="border p-2 rounded"
          />
          <textarea
            placeholder="Tulis pesan Anda..."
            rows="4"
            className="border p-2 rounded"
          ></textarea>
          <button
            type="submit"
            className="bg-[#0099ff] text-white py-2 rounded hover:bg-green-700"
          >
            Kirim
          </button>
        </form>
      </section>
    </div>
  );
}
