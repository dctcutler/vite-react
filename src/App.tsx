import React, { useState, useEffect } from 'react';
import { Wine, Heart, Utensils, Sparkles, Filter, RotateCcw } from 'lucide-react';

const WineConfigurator = () => {
  const [selectedWords, setSelectedWords] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [filteredWines, setFilteredWines] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const wines = [
    {
      id: 1,
      name: "Cabernet Sauvignon",
      collection: "The Classics",
      description: "Full-bodied with rich berry flavors and hints of oak",
      words: ["bold", "rich", "sophisticated", "intense", "classic"],
      foods: ["red meat", "grilled steak", "dark chocolate", "aged cheese", "lamb"],
      moods: ["romantic", "confident", "sophisticated", "evening", "celebratory"],
      color: "#722F37",
      calories: "Regular"
    },
    {
      id: 2,
      name: "Pinot Grigio",
      collection: "The Classics",
      description: "Crisp and refreshing with citrus and green apple notes",
      words: ["crisp", "light", "fresh", "clean", "bright"],
      foods: ["seafood", "salads", "chicken", "pasta", "light appetizers"],
      moods: ["casual", "refreshing", "social", "daytime", "relaxed"],
      color: "#F5F5DC",
      calories: "Regular"
    },
    {
      id: 3,
      name: "Sauvignon Blanc (80 Calories)",
      collection: "80 Calories",
      description: "Crisp, vibrant, and full of citrus and tropical notes",
      words: ["vibrant", "tropical", "zesty", "energetic", "healthy"],
      foods: ["sushi", "goat cheese", "herb dishes", "citrus salads", "oysters"],
      moods: ["energetic", "health-conscious", "bright", "active", "uplifting"],
      color: "#FFFACD",
      calories: "80"
    },
    {
      id: 4,
      name: "Chardonnay (Lower Calorie)",
      collection: "Lower Calorie",
      description: "Smooth and buttery with apple and vanilla undertones",
      words: ["smooth", "buttery", "elegant", "balanced", "refined"],
      foods: ["lobster", "creamy pasta", "roasted chicken", "brie cheese", "risotto"],
      moods: ["elegant", "refined", "comfortable", "sophisticated", "balanced"],
      color: "#F7E7CE",
      calories: "Lower"
    },
    {
      id: 5,
      name: "Pinot Grigio (Lower Calorie)",
      collection: "Lower Calorie",
      description: "Light and refreshing with a clean, crisp finish",
      words: ["light", "crisp", "clean", "delicate", "pure"],
      foods: ["fish", "summer salads", "vegetables", "light cheese", "fruit"],
      moods: ["light", "refreshing", "casual", "healthy", "carefree"],
      color: "#F0F8FF",
      calories: "Lower"
    },
    {
      id: 6,
      name: "Cabernet Sauvignon (Lower Calorie)",
      collection: "Lower Calorie",
      description: "Bold red with reduced calories but full flavor",
      words: ["bold", "satisfying", "robust", "full-flavored", "balanced"],
      foods: ["lean meats", "vegetables", "mushrooms", "herbs", "grilled foods"],
      moods: ["satisfied", "balanced", "health-conscious", "robust", "evening"],
      color: "#8B0000",
      calories: "Lower"
    }
  ];

  const wordOptions = ["bold", "crisp", "light", "rich", "fresh", "vibrant", "smooth", "elegant", "zesty", "tropical", "sophisticated", "balanced", "intense", "clean", "bright", "buttery", "robust", "delicate", "energetic", "refined"];
  
  const foodOptions = ["red meat", "seafood", "chicken", "pasta", "salads", "cheese", "chocolate", "sushi", "grilled foods", "vegetables", "fruit", "fish", "herbs", "mushrooms", "lobster", "oysters", "lamb", "steak"];
  
  const moodOptions = ["romantic", "casual", "sophisticated", "energetic", "relaxed", "confident", "social", "elegant", "healthy", "celebratory", "refreshing", "balanced", "uplifting", "comfortable", "carefree", "evening", "daytime"];

  const toggleSelection = (item, selectedArray, setSelectedArray) => {
    if (selectedArray.includes(item)) {
      setSelectedArray(selectedArray.filter(selected => selected !== item));
    } else {
      setSelectedArray([...selectedArray, item]);
    }
  };

  const calculateMatch = (wine) => {
    const wordMatches = selectedWords.filter(word => wine.words.includes(word)).length;
    const foodMatches = selectedFoods.filter(food => wine.foods.includes(food)).length;
    const moodMatches = selectedMoods.filter(mood => wine.moods.includes(mood)).length;
    
    const totalSelected = selectedWords.length + selectedFoods.length + selectedMoods.length;
    const totalMatches = wordMatches + foodMatches + moodMatches;
    
    return totalSelected > 0 ? (totalMatches / totalSelected) * 100 : 0;
  };

  const getRecommendations = () => {
    if (selectedWords.length === 0 && selectedFoods.length === 0 && selectedMoods.length === 0) {
      setFilteredWines([]);
      setShowResults(false);
      return;
    }

    const winesWithScores = wines.map(wine => ({
      ...wine,
      matchScore: calculateMatch(wine)
    }));

    const sortedWines = winesWithScores
      .filter(wine => wine.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore);

    setFilteredWines(sortedWines);
    setShowResults(true);
  };

  const resetAll = () => {
    setSelectedWords([]);
    setSelectedFoods([]);
    setSelectedMoods([]);
    setFilteredWines([]);
    setShowResults(false);
  };

  useEffect(() => {
    getRecommendations();
  }, [selectedWords, selectedFoods, selectedMoods]);

  const SelectionButton = ({ item, isSelected, onClick, category }) => {
    const bgColor = isSelected ? 'bg-purple-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700';
    const icon = category === 'words' ? <Sparkles className="w-4 h-4" /> : 
                category === 'foods' ? <Utensils className="w-4 h-4" /> : 
                <Heart className="w-4 h-4" />;
    
    return (
      <button
        onClick={onClick}
        className={`${bgColor} px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 hover:scale-105 hover:shadow-md`}
      >
        {icon}
        {item}
      </button>
    );
  };

  const WineCard = ({ wine }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      <div className="flex items-center gap-3 mb-4">
        <div 
          className="w-6 h-6 rounded-full border-2 border-gray-300"
          style={{ backgroundColor: wine.color }}
        />
        <div>
          <h3 className="font-bold text-lg text-gray-800">{wine.name}</h3>
          <p className="text-sm text-purple-600 font-medium">{wine.collection}</p>
        </div>
      </div>
      
      <p className="text-gray-600 mb-4">{wine.description}</p>
      
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-500">Match Score:</span>
        <div className="flex items-center gap-2">
          <div className="w-20 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${wine.matchScore}%` }}
            />
          </div>
          <span className="text-sm font-bold text-purple-600">{Math.round(wine.matchScore)}%</span>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
          {wine.calories} Calories
        </span>
        <Wine className="w-5 h-5 text-purple-500" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
            <Wine className="w-10 h-10 text-purple-600" />
            Black Box Wine Configurator
          </h1>
          <p className="text-lg text-gray-600">Find your perfect wine match by selecting your preferences</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Words Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                Describe Your Taste
              </h2>
              <div className="flex flex-wrap gap-2">
                {wordOptions.map(word => (
                  <SelectionButton
                    key={word}
                    item={word}
                    isSelected={selectedWords.includes(word)}
                    onClick={() => toggleSelection(word, selectedWords, setSelectedWords)}
                    category="words"
                  />
                ))}
              </div>
            </div>

            {/* Foods Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Utensils className="w-5 h-5 text-purple-600" />
                What Are You Eating?
              </h2>
              <div className="flex flex-wrap gap-2">
                {foodOptions.map(food => (
                  <SelectionButton
                    key={food}
                    item={food}
                    isSelected={selectedFoods.includes(food)}
                    onClick={() => toggleSelection(food, selectedFoods, setSelectedFoods)}
                    category="foods"
                  />
                ))}
              </div>
            </div>

            {/* Moods Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-purple-600" />
                What's Your Mood?
              </h2>
              <div className="flex flex-wrap gap-2">
                {moodOptions.map(mood => (
                  <SelectionButton
                    key={mood}
                    item={mood}
                    isSelected={selectedMoods.includes(mood)}
                    onClick={() => toggleSelection(mood, selectedMoods, setSelectedMoods)}
                    category="moods"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={resetAll}
              className="flex items-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-all duration-200"
            >
              <RotateCcw className="w-4 h-4" />
              Reset All
            </button>
          </div>
        </div>

        {/* Results Section */}
        {showResults && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Filter className="w-6 h-6 text-purple-600" />
              Your Perfect Wine Matches
            </h2>
            
            {filteredWines.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWines.map(wine => (
                  <WineCard key={wine.id} wine={wine} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Wine className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-xl text-gray-600 mb-2">No matches found</p>
                <p className="text-gray-500">Try selecting different preferences to find your perfect wine!</p>
              </div>
            )}
          </div>
        )}

        {!showResults && (
          <div className="text-center py-12">
            <Wine className="w-20 h-20 text-purple-400 mx-auto mb-4 animate-pulse" />
            <p className="text-xl text-gray-600 mb-2">Select your preferences above</p>
            <p className="text-gray-500">We'll find the perfect Black Box wine for you!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WineConfigurator;
