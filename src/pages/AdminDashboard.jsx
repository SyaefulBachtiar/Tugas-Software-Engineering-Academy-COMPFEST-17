import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";

export default function AdminDashboard() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchSubscriptions = async () => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start > end) {
      alert("Tanggal mulai tidak boleh setelah tanggal akhir.");
      return;
    }

    setLoading(true);

    try {
      const endWithTime = new Date(end);
      endWithTime.setHours(23, 59, 59, 999);

      const q = query(
        collection(db, "subscriptions"),
        where("createdAt", ">=", Timestamp.fromDate(start)),
        where("createdAt", "<=", Timestamp.fromDate(endWithTime))
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setSubscriptions(data);
    } catch (error) {
      console.error("❌ Gagal mengambil data:", error.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (startDate && endDate) {
      fetchSubscriptions();
    }
  }, [startDate, endDate]);

  const newSubs = subscriptions.length;
  const mrr = subscriptions
    .filter((s) => s.status === "Active")
    .reduce((sum, s) => sum + (s.totalPrice || 0), 0);
  const reactivations = subscriptions.filter(
    (s) => s.status === "Active" && s.reactivatedAt
  ).length;
  const activeSubs = subscriptions.filter((s) => s.status === "Active").length;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Dasbor Admin SEA Catering</h1>
        <nav className="mt-4">
          {/* Add navigation links here if needed */}
        </nav>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block font-medium">Tanggal Mulai:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>
        <div>
          <label className="block font-medium">Tanggal Akhir:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="mx-auto w-full max-w-sm rounded-md border border-blue-300 p-4">
        <div class="flex animate-pulse space-x-4">
            <div class="size-10 rounded-full bg-gray-200"></div>
            <div class="flex-1 space-y-6 py-1">
            <div class="h-2 rounded bg-gray-200"></div>
            <div class="space-y-3">
                <div class="grid grid-cols-3 gap-4">
                <div class="col-span-2 h-2 rounded bg-gray-200"></div>
                <div class="col-span-1 h-2 rounded bg-gray-200"></div>
                </div>
                <div class="h-2 rounded bg-gray-200"></div>
            </div>
            </div>
        </div>
        </div>
        <div class="mx-auto w-full max-w-sm rounded-md border border-blue-300 p-4">
        <div class="flex animate-pulse space-x-4">
            <div class="size-10 rounded-full bg-gray-200"></div>
            <div class="flex-1 space-y-6 py-1">
            <div class="h-2 rounded bg-gray-200"></div>
            <div class="space-y-3">
                <div class="grid grid-cols-3 gap-4">
                <div class="col-span-2 h-2 rounded bg-gray-200"></div>
                <div class="col-span-1 h-2 rounded bg-gray-200"></div>
                </div>
                <div class="h-2 rounded bg-gray-200"></div>
            </div>
            </div>
        </div>
        </div>
        <div class="mx-auto w-full max-w-sm rounded-md border border-blue-300 p-4">
        <div class="flex animate-pulse space-x-4">
            <div class="size-10 rounded-full bg-gray-200"></div>
            <div class="flex-1 space-y-6 py-1">
            <div class="h-2 rounded bg-gray-200"></div>
            <div class="space-y-3">
                <div class="grid grid-cols-3 gap-4">
                <div class="col-span-2 h-2 rounded bg-gray-200"></div>
                <div class="col-span-1 h-2 rounded bg-gray-200"></div>
                </div>
                <div class="h-2 rounded bg-gray-200"></div>
            </div>
            </div>
        </div>
        </div>
        <div class="mx-auto w-full max-w-sm rounded-md border border-blue-300 p-4">
        <div class="flex animate-pulse space-x-4">
            <div class="size-10 rounded-full bg-gray-200"></div>
            <div class="flex-1 space-y-6 py-1">
            <div class="h-2 rounded bg-gray-200"></div>
            <div class="space-y-3">
                <div class="grid grid-cols-3 gap-4">
                <div class="col-span-2 h-2 rounded bg-gray-200"></div>
                <div class="col-span-1 h-2 rounded bg-gray-200"></div>
                </div>
                <div class="h-2 rounded bg-gray-200"></div>
            </div>
            </div>
        </div>
        </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatBox title="Langganan Baru" value={newSubs} />
          <StatBox title="MRR (Rp)" value={`Rp ${mrr.toLocaleString("id-ID")}`} />
          <StatBox title="Reaktivasi" value={reactivations} />
          <StatBox title="Langganan Aktif" value={activeSubs} />
        </div>
      )}
    </div>
  );
}

function StatBox({ title, value }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 text-center transition-transform transform hover:scale-105">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-semibold text-blue-600 mt-1">{value}</p>
    </div>
  );
}
