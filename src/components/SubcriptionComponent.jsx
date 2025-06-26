import { useState, useEffect } from "react";
import { User, Phone, Package, Utensils, Calendar, AlertTriangle, CheckCircle, Calculator, CreditCard, ArrowRight, Sparkles, MapPin } from "lucide-react";
import { db, auth } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function SubscriptionComponent() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    package: "",
    meals: [],
    days: [],
    allergy: "",
    status: "Active",
  });

  const [price, setPrice] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const newPrice = calculatePrice(form.package, form.meals, form.days);
    setPrice(newPrice);
  }, [form.package, form.meals, form.days]);

  const packageOptions = {
    "Diet Plan": { price: 30000, description: "Healthy low calorie menu", icon: "🥗", color: "green" },
    "Protein Pack": { price: 40000, description: "High protein for fitness", icon: "💪", color: "blue" },
    "Royal Package": { price: 60000, description: "High quality premium menu", icon: "👑", color: "purple" },
  };

  const mealOptions = [
    { id: "Sarapan", label: "Breakfast", icon: "🌅", time: "06:00 - 09:00" },
    { id: "Makan Siang", label: "Lunch", icon: "☀️", time: "11:00 - 14:00" },
    { id: "Makan Malam", label: "Dinner", icon: "🌙", time: "18:00 - 21:00" }
  ];

  const dayOptions = [
    { id: "Senin", label: "Mon", full: "Monday" },
    { id: "Selasa", label: "Tue", full: "Tuesday" },
    { id: "Rabu", label: "Wed", full: "Wednesday" },
    { id: "Kamis", label: "Thu", full: "Thursday" },
    { id: "Jumat", label: "Fri", full: "Friday" },
    { id: "Sabtu", label: "Sat", full: "Saturday" },
    { id: "Minggu", label: "Sun", full: "Sunday" }
  ];

  const calculatePrice = (selectedPackage, meals, days) => {
    if (!selectedPackage || meals.length === 0 || days.length === 0) return 0;
    const basePrice = packageOptions[selectedPackage]?.price || 0;
    return Math.round(basePrice * meals.length * days.length * 4.3);
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!form.name.trim()) newErrors.name = "Full name is required";
        if (!form.phone.trim()) newErrors.phone = "Phone number is required";
        else if (!/^[0-9+\-\s()]{10,15}$/.test(form.phone)) {
          newErrors.phone = "Invalid phone number format";
        }
        if (!form.address.trim()) newErrors.address = "Delivery address is required";
        break;
      case 2:
        if (!form.package) newErrors.package = "Please select a package";
        break;
      case 3:
        if (form.meals.length === 0) newErrors.meals = "Please select at least one meal type";
        break;
      case 4:
        if (form.days.length === 0) newErrors.days = "Please select at least one delivery day";
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCheckbox = (value, group) => {
    setForm((prev) => {
      const updated = prev[group].includes(value)
        ? prev[group].filter((item) => item !== value)
        : [...prev[group], value];
      return { ...prev, [group]: updated };
    });

    if (errors[group]) {
      setErrors((prev) => ({ ...prev, [group]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to subscribe.");
      return;
    }

    if (!validateStep(1) || !validateStep(2) || !validateStep(3) || !validateStep(4)) {
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "subscriptions"), {
        ...form,
        userId: user.uid,
        userEmail: user.email,
        userName: user.displayName || user.email,
        totalPrice: price,
        createdAt: serverTimestamp(),
      });

      console.log("✅ Data successfully sent to Firebase!");
      setSubmitted(true);
      setCurrentStep(6);
    } catch (error) {
      console.error("🔥 Failed to save data to Firebase:", error);
      alert("An error occurred while saving subscription data. Make sure you are logged in and have permissions.");
    } finally {
      setLoading(false);
    }
  };

  const getPackageColor = (packageName) => {
    const colors = {
      green: "from-green-400 to-green-600",
      blue: "from-blue-400 to-blue-600",
      purple: "from-purple-400 to-purple-600",
    };
    return packageOptions[packageName]?.color ? colors[packageOptions[packageName].color] : "from-gray-400 to-gray-600";
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-xl text-gray-700">Loading user information...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-xl text-gray-700">Please <strong className="text-blue-600">log in</strong> to continue your subscription.</p>
        </div>
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <User className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
              <p className="text-gray-600">Start with your personal details</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="flex items-center font-semibold text-gray-700 mb-2">
                  <User className="w-4 h-4 mr-2" />
                  Full Name*
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className={`w-full border-2 p-3 rounded-xl transition-all duration-300 focus:ring-4 focus:ring-blue-100 ${
                    errors.name ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-blue-500"
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="flex items-center font-semibold text-gray-700 mb-2">
                  <Phone className="w-4 h-4 mr-2" />
                  Phone Number*
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className={`w-full border-2 p-3 rounded-xl transition-all duration-300 focus:ring-4 focus:ring-blue-100 ${
                    errors.phone ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-blue-500"
                  }`}
                  placeholder="Example: 081234567890"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label className="flex items-center font-semibold text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  Delivery Address*
                </label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  rows={3}
                  className={`w-full border-2 p-3 rounded-xl transition-all duration-300 focus:ring-4 focus:ring-blue-100 ${
                    errors.address ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-blue-500"
                  }`}
                  placeholder="Enter your full delivery address"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    {errors.address}
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Package className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Choose Your Package</h2>
              <p className="text-gray-600">Select the package that suits your needs</p>
            </div>

            <div className="grid gap-4 md:gap-6">
              {Object.entries(packageOptions).map(([name, details]) => (
                <div
                  key={name}
                  onClick={() => {
                    setForm((prev) => ({ ...prev, package: name }));
                    setErrors((prev) => ({ ...prev, package: "" }));
                  }}
                  className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    form.package === name
                      ? "border-blue-500 bg-blue-50 shadow-lg"
                      : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getPackageColor(name)} flex items-center justify-center text-white text-xl`}>
                        {details.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{name}</h3>
                        <p className="text-gray-600 text-sm">{details.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-xl text-gray-900">{formatCurrency(details.price)}</p>
                      <p className="text-gray-500 text-sm">per meal</p>
                    </div>
                  </div>

                  {form.package === name && (
                    <div className="absolute top-4 right-4">
                      <CheckCircle className="w-6 h-6 text-blue-600" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {errors.package && (
              <p className="text-red-500 text-sm flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 mr-1" />
                {errors.package}
              </p>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Utensils className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Meal Types</h2>
              <p className="text-gray-600">Select your desired meal times</p>
            </div>

            <div className="grid gap-4">
              {mealOptions.map((meal) => (
                <div
                  key={meal.id}
                  onClick={() => handleCheckbox(meal.id, "meals")}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    form.meals.includes(meal.id)
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{meal.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{meal.label}</h3>
                      <p className="text-gray-600 text-sm">{meal.time}</p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        form.meals.includes(meal.id) ? "bg-blue-600 border-blue-600" : "border-gray-300"
                      }`}
                    >
                      {form.meals.includes(meal.id) && (
                        <CheckCircle className="w-3 h-3 text-white fill-current" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {errors.meals && (
              <p className="text-red-500 text-sm flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 mr-1" />
                {errors.meals}
              </p>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Calendar className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Delivery Days</h2>
              <p className="text-gray-600">Set your meal delivery schedule</p>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-7 gap-3">
              {dayOptions.map((day) => (
                <div
                  key={day.id}
                  onClick={() => handleCheckbox(day.id, "days")}
                  className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 text-center ${
                    form.days.includes(day.id)
                      ? "border-blue-500 bg-blue-600 text-white"
                      : "border-gray-200 hover:border-gray-300 text-gray-700"
                  }`}
                >
                  <div className="font-semibold">{day.label}</div>
                  <div className="text-xs mt-1">{day.full}</div>

                  {form.days.includes(day.id) && (
                    <div className="absolute -top-2 -right-2">
                      <CheckCircle className="w-5 h-5 text-green-500 bg-white rounded-full" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => setForm((prev) => ({ ...prev, days: dayOptions.map((d) => d.id) }))}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Select All Days
              </button>
              <span className="mx-2 text-gray-400">|</span>
              <button
                onClick={() => setForm((prev) => ({ ...prev, days: [] }))}
                className="text-gray-600 hover:text-gray-800 text-sm font-medium"
              >
                Clear All
              </button>
            </div>

            {errors.days && (
              <p className="text-red-500 text-sm flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 mr-1" />
                {errors.days}
              </p>
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Calculator className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Confirmation & Details</h2>
              <p className="text-gray-600">Review your order</p>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-700">Full Name:</span>
                <span className="font-semibold">{form.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-700">Phone Number:</span>
                <span className="font-semibold">{form.phone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-700">Delivery Address:</span>
                <span className="font-semibold truncate max-w-[60%] text-right">{form.address}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-700">Package:</span>
                <span className="font-semibold">{form.package}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-700">Meal Types:</span>
                <span className="font-semibold">{form.meals.join(", ")}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-700">Delivery Days:</span>
                <span className="font-semibold">{form.days.length} days/week</span>
              </div>

              {form.allergy && (
                <div className="flex items-start justify-between">
                  <span className="font-medium text-gray-700">Allergies / Diet Restrictions:</span>
                  <span className="font-semibold text-right max-w-[60%]">{form.allergy}</span>
                </div>
              )}

              <div className="border-t pt-4">
                <div className="flex items-center justify-between text-lg">
                  <span className="font-bold text-gray-900">Total per Month:</span>
                  <span className="font-bold text-blue-600">{formatCurrency(price)}</span>
                </div>
              </div>

              <button
                onClick={() => setShowPriceBreakdown(!showPriceBreakdown)}
                className="text-blue-600 text-sm hover:text-blue-800 transition-colors"
              >
                {showPriceBreakdown ? "Hide" : "View"} price breakdown
              </button>

              {showPriceBreakdown && (
                <div className="mt-4 p-4 bg-white rounded-lg border text-sm space-y-2">
                  <div className="flex justify-between">
                    <span>Price per meal:</span>
                    <span>{formatCurrency(packageOptions[form.package]?.price || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Meals per day:</span>
                    <span>{form.meals.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery days per week:</span>
                    <span>{form.days.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average weeks per month:</span>
                    <span>4.3</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-medium">
                    <span>Total:</span>
                    <span>{formatCurrency(price)}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Allergy/Diet Information */}
            <div>
              <label className="flex items-center font-semibold text-gray-700 mb-2">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Allergies / Diet Restrictions (Optional)
              </label>
              <textarea
                name="allergy"
                value={form.allergy}
                onChange={handleChange}
                rows={3}
                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                placeholder="Example: Peanut allergy, vegetarian, halal, etc."
              />
            </div>
          </div>
        );

      case 6:
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Success!</h2>
              <p className="text-gray-600">Your subscription has been successfully created</p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
              <h3 className="font-bold text-green-800 mb-2">Total Monthly Subscription</h3>
              <p className="text-3xl font-bold text-green-600">{formatCurrency(price)}</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 text-left">
              <h4 className="font-semibold text-gray-900 mb-3">Next Steps:</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  Our team will contact you within 24 hours
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  Confirm delivery address and schedule
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  First delivery within 2-3 business days
                </li>
              </ul>
            </div>

            <button
              onClick={() => {
                setCurrentStep(1);
                setForm({
                  name: "",
                  phone: "",
                  address: "",
                  package: "",
                  meals: [],
                  days: [],
                  allergy: "",
                  status: "pending",
                });
                setSubmitted(false);
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
            >
              Create New Subscription
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-blue-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-900">SEA Catering</h1>
          </div>
          <p className="text-gray-600">Interactive Subscription Form</p>
        </div>

        {currentStep < 6 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">
                Step {currentStep} of 5
              </span>
              <span className="text-sm font-medium text-gray-600">
                {Math.round((currentStep / 5) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(currentStep / 5) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
          {renderStep()}
        </div>

        {currentStep < 6 && (
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              Back
            </button>

            {currentStep < 5 ? (
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading || !user}
                className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:bg-gray-400 transition-colors flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>Confirm Order</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}

        {price > 0 && currentStep > 2 && currentStep < 6 && (
          <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg">
            <div className="flex items-center space-x-2">
              <Calculator className="w-4 h-4" />
              <span className="font-semibold">{formatCurrency(price)}/month</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}