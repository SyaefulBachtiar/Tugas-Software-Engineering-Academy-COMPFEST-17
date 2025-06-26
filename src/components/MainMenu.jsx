import { useState } from "react";
import { Star, Clock, Users, ChefHat, X, Plus, Heart } from "lucide-react";

export default function MainMenu() {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [hoveredCard, setHoveredCard] = useState(null);

  const packages = [
    {
      id: 1,
      name: "Daily Healthy Package",
      price: "Rp 50.000",
      originalPrice: "Rp 65.000",
      description: "Balanced meals for your daily needs.",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
      details: "This package is suitable for active workers with a balanced calorie intake. Includes vegetables, protein, complex carbohydrates, and fruit.",
      rating: 4.8,
      prepTime: "15 min",
      servings: "2-3 people",
      calories: "450 kcal",
      tags: ["Balanced", "High Protein", "Fresh"],
      popular: true,
    },
    {
      id: 2,
      name: "Keto Package",
      price: "Rp 60.000",
      originalPrice: "Rp 75.000",
      description: "Low-carb, high-healthy fat.",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop",
      details: "The Keto Package is designed for those on a low-carb diet. Contains quality meat, avocado, and healthy oils.",
      rating: 4.9,
      prepTime: "20 min",
      servings: "2 people",
      calories: "380 kcal",
      tags: ["Keto", "Low Carb", "Premium"],
      popular: false,
    },
    {
      id: 3,
      name: "Vegetarian Package",
      price: "Rp 55.000",
      originalPrice: "Rp 70.000",
      description: "Full of vegetables and plant-based protein.",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
      details: "Made with selected organic ingredients. Suitable for those who do not consume meat.",
      rating: 4.7,
      prepTime: "12 min",
      servings: "2-3 people",
      calories: "320 kcal",
      tags: ["Vegetarian", "Organic", "Healthy"],
      popular: true,
    },
  ];

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent h-[140px] sm:h-[70px]">
            Our Meal Packages
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover delicious, healthy meals crafted by our expert chefs. Each package is designed to nourish your body and delight your taste buds.
          </p>
        </div>

        {/* Package Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {packages.map((item) => (
            <div
              key={item.id}
              className={`group relative bg-white rounded-3xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                hoveredCard === item.id ? 'ring-4 ring-blue-200' : ''
              }`}
              onMouseEnter={() => setHoveredCard(item.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Popular Badge */}
              {item.popular && (
                <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                  🔥 Popular
                </div>
              )}

              {/* Favorite Button */}
              <button
                onClick={() => toggleFavorite(item.id)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300"
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    favorites.has(item.id) ? 'fill-blue-500 text-cyan-500' : 'text-gray-400'
                  }`}
                />
              </button>

              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Rating & Info */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-700">{item.rating}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{item.prepTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>{item.servings}</span>
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {item.name}
                </h3>

                {/* Price */}
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-2xl font-bold text-blue-600">{item.price}</span>
                  <span className="text-sm text-gray-400 line-through">{item.originalPrice}</span>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{item.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gradient-to-r from-blue-100 to-green-100 text-green-700 text-xs rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Calories */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <ChefHat className="w-4 h-4" />
                    <span>{item.calories}</span>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => setSelectedPackage(item)}
                  className="w-full bg-gradient-to-r from-blue-700 to-blue-300 hover:from-blue-200 hover:to-blue-100 text-white font-semibold py-3 px-6 rounded-xl transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <span>View Details</span>
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Modal */}
      {selectedPackage && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPackage(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl transform transition-all duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative">
              <img
                src={selectedPackage.image}
                alt={selectedPackage.name}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedPackage(null)}
                className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300 group"
              >
                <X className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
              </button>

              {/* Popular Badge in Modal */}
              {selectedPackage.popular && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                  🔥 Popular Choice
                </div>
              )}
            </div>

            {/* Modal Content */}
            <div className="p-8">
              {/* Title and Rating */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">{selectedPackage.name}</h3>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium text-gray-700">{selectedPackage.rating}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{selectedPackage.prepTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{selectedPackage.servings}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => toggleFavorite(selectedPackage.id)}
                  className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-all duration-300"
                >
                  <Heart
                    className={`w-6 h-6 transition-colors ${
                      favorites.has(selectedPackage.id) ? 'fill-blue-500 text-cyan-500' : 'text-gray-400'
                    }`}
                  />
                </button>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-3xl font-bold text-green-600">{selectedPackage.price}</span>
                <span className="text-lg text-gray-400 line-through">{selectedPackage.originalPrice}</span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                  Save {Math.round(((parseInt(selectedPackage.originalPrice.replace(/\D/g, '')) - parseInt(selectedPackage.price.replace(/\D/g, ''))) / parseInt(selectedPackage.originalPrice.replace(/\D/g, ''))) * 100)}%
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedPackage.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-blue-100 to-green-100 text-green-700 text-sm rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-6 text-lg">{selectedPackage.details}</p>

              {/* Nutrition Info */}
              <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-6 mb-6">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <ChefHat className="w-5 h-5 mr-2" />
                  Nutrition Information
                </h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">{selectedPackage.calories}</div>
                    <div className="text-sm text-gray-600">Calories</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{selectedPackage.prepTime}</div>
                    <div className="text-sm text-gray-600">Prep Time</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{selectedPackage.servings}</div>
                    <div className="text-sm text-gray-600">Servings</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={() => setSelectedPackage(null)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 px-6 rounded-xl transition-all duration-300"
                >
                  Continue Browsing
                </button>
                <button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-4 px-6 rounded-xl transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                  Order Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}