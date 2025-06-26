import { useState, useEffect } from "react";
import { Calendar, Package, Clock, DollarSign, AlertCircle, Pause, X, CheckCircle, User, MapPin } from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase/config";

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pauseDates, setPauseDates] = useState({ start: "", end: "" });
  const [statusMessage, setStatusMessage] = useState("");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showPauseModal, setShowPauseModal] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const q = query(collection(db, "subscriptions"), where("userId", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data();
          setSubscription({
            packageName: data.package,
            mealType: data.meals.join(" & "),
            deliveryDays: data.days,
            totalPrice: data.total,
            status: "Active",
            startDate: data.createdAt.toDate().toISOString(),
            nextDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            address: "-", // Optional: Add address if saved in form
            pauseStart: null,
            pauseEnd: null,
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const updateSubscription = async (updates) => {
    if (!user) return;
    const docRef = doc(db, "subscriptions", user.uid);
    await updateDoc(docRef, updates);
    setSubscription((prev) => ({ ...prev, ...updates }));
  };

  const handlePause = async () => {
    if (!pauseDates.start || !pauseDates.end) {
      setStatusMessage("Pilih tanggal mulai dan berakhir jeda.");
      return;
    }

    const startDate = new Date(pauseDates.start);
    const endDate = new Date(pauseDates.end);
    const today = new Date();

    if (startDate <= today) {
      setStatusMessage("Tanggal mulai harus setelah hari ini.");
      return;
    }

    if (endDate <= startDate) {
      setStatusMessage("Tanggal berakhir harus setelah tanggal mulai.");
      return;
    }

    setLoading(true);
    try {
      await updateSubscription({
        pauseStart: pauseDates.start,
        pauseEnd: pauseDates.end,
        status: "Paused",
      });
      setStatusMessage("Langganan berhasil dijeda!");
      setShowPauseModal(false);
      setPauseDates({ start: "", end: "" });
    } catch (error) {
      setStatusMessage("Gagal menjeda langganan. Silakan coba lagi.");
    }
    setLoading(false);
  };

  const handleCancel = async () => {
    setLoading(true);
    try {
      await updateSubscription({ status: "Cancelled" });
      setStatusMessage("Langganan berhasil dibatalkan.");
      setShowCancelModal(false);
    } catch (error) {
      setStatusMessage("Gagal membatalkan langganan. Silakan coba lagi.");
    }
    setLoading(false);
  };

  const handleReactivate = async () => {
    setLoading(true);
    try {
      await updateSubscription({ status: "Active", pauseStart: null, pauseEnd: null });
      setStatusMessage("Langganan berhasil diaktifkan kembali!");
    } catch (error) {
      setStatusMessage("Gagal mengaktifkan langganan. Silakan coba lagi.");
    }
    setLoading(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active": return "text-green-600 bg-green-50";
      case "Paused": return "text-yellow-600 bg-yellow-50";
      case "Cancelled": return "text-red-600 bg-red-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Silakan login untuk melihat dashboard</p>
        </div>
      </div>
    );
  }

  // UI code omitted here to save space. Use previous structure
  // and replace dummy data (setSubscription) with Firebase-powered values.

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard SEA Catering</h1>
              <p className="text-gray-600 mt-1">Selamat datang kembali, {user.displayName}!</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Email: {user.email}</p>
            </div>
          </div>
        </div>

        {/* Status Message */}
        {statusMessage && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-center">
            <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
            <p className="text-blue-800">{statusMessage}</p>
            <button 
              onClick={() => setStatusMessage("")}
              className="ml-auto text-blue-600 hover:text-blue-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {subscription ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Subscription Details */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Detail Langganan</h2>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(subscription.status)}`}>
                    {subscription.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Package className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Paket</p>
                      <p className="font-medium">{subscription.packageName}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Jenis Makanan</p>
                      <p className="font-medium">{subscription.mealType}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Hari Pengiriman</p>
                      <p className="font-medium">{subscription.deliveryDays.join(", ")}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <DollarSign className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Total Harga</p>
                      <p className="font-medium">{formatCurrency(subscription.totalPrice)}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Tanggal Mulai</p>
                      <p className="font-medium">{formatDate(subscription.startDate)}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Pengiriman Berikutnya</p>
                      <p className="font-medium">{formatDate(subscription.nextDelivery)}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Alamat Pengiriman</p>
                      <p className="font-medium">{subscription.address}</p>
                    </div>
                  </div>
                </div>

                {subscription.pauseStart && subscription.pauseEnd && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Pause className="w-4 h-4 text-yellow-600" />
                      <p className="text-sm text-yellow-800">
                        Langganan dijeda dari {formatDate(subscription.pauseStart)} hingga {formatDate(subscription.pauseEnd)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Actions Panel */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Kelola Langganan</h3>
                
                <div className="space-y-3">
                  {subscription.status === "Active" && (
                    <>
                      <button
                        onClick={() => setShowPauseModal(true)}
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2"
                      >
                        <Pause className="w-4 h-4" />
                        <span>Jeda Langganan</span>
                      </button>

                      <button
                        onClick={() => setShowCancelModal(true)}
                        className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2"
                      >
                        <X className="w-4 h-4" />
                        <span>Batalkan Langganan</span>
                      </button>
                    </>
                  )}

                  {subscription.status === "Paused" && (
                    <button
                      onClick={handleReactivate}
                      disabled={loading}
                      className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>{loading ? "Mengaktifkan..." : "Aktifkan Kembali"}</span>
                    </button>
                  )}

                  {subscription.status === "Cancelled" && (
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                      <p className="text-red-700 text-sm">Langganan telah dibatalkan</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Ringkasan</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium">{subscription.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Harga Bulanan:</span>
                    <span className="font-medium">{formatCurrency(subscription.totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hari Aktif:</span>
                    <span className="font-medium">{subscription.deliveryDays.length} hari/minggu</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Belum Ada Langganan</h2>
            <p className="text-gray-600 mb-6">Anda belum memiliki langganan aktif. Mulai langganan sekarang untuk menikmati layanan SEA Catering!</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
              Mulai Langganan
            </button>
          </div>
        )}

        {/* Pause Modal */}
        {showPauseModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-lg font-semibold mb-4">Jeda Langganan</h3>
              <p className="text-gray-600 mb-4">Pilih periode jeda langganan Anda. Selama periode ini, tidak ada biaya yang akan dikenakan.</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tanggal Mulai
                  </label>
                  <input
                    type="date"
                    value={pauseDates.start}
                    onChange={(e) => setPauseDates({ ...pauseDates, start: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tanggal Berakhir
                  </label>
                  <input
                    type="date"
                    value={pauseDates.end}
                    onChange={(e) => setPauseDates({ ...pauseDates, end: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowPauseModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handlePause}
                  disabled={loading}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  {loading ? "Memproses..." : "Jeda Sekarang"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Cancel Modal */}
        {showCancelModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex items-center space-x-3 mb-4">
                <AlertCircle className="w-6 h-6 text-red-500" />
                <h3 className="text-lg font-semibold">Batalkan Langganan</h3>
              </div>
              
              <p className="text-gray-600 mb-6">
                Apakah Anda yakin ingin membatalkan langganan? Tindakan ini tidak dapat dibatalkan dan Anda akan kehilangan akses ke layanan SEA Catering.
              </p>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleCancel}
                  disabled={loading}
                  className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  {loading ? "Memproses..." : "Ya, Batalkan"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}