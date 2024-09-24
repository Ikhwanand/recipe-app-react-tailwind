import { Search, Soup, Heart, HeartPulse } from "lucide-react";
import { useEffect, useState } from "react";
import { getRandomColor } from "../lib/utils";



const APP_ID = import.meta.env.VITE_APP_ID;
const API_KEY = import.meta.env.VITE_API_KEY;

const HomePage = () => {

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = async (searchQuery) => {
    setLoading(true);
    setRecipes([]);
    try {
      const res = await fetch(`https://api.edamam.com/api/recipes/v2/?app_id=${APP_ID}&app_key=${API_KEY}&q=${searchQuery}&type=public`);
      const data = await res.json();
      setRecipes(data.hits);
    } catch (error) {
      console.log(error.message)

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRecipes("chicken");
  }, []);

  const handleSearchRecipe = (e) => {
    e.preventDefault();
    fetchRecipes(e.target[0].value)
  }

  return (
    <div className="bg-[#faf9fb] p-10 flex-1">
      <div className="max-w-screen-lg mx-auto">
        <form onSubmit={handleSearchRecipe}>
          <label className="input shadow-md flex items-center gap-2">
            <Search size={"24"} />
            <input
              type="text"
              className="text-sm md:text-md grow"
              placeholder="What do you want to cook today?"
            />
          </label>
        </form>
        <p className="font-bold text-3xl md:text-5xl mt-4">
          Recommended Recipes
        </p>
        <p className="text-slate-500 font-semibold ml-1 my-2 text-sm tracking-tight">
          Popular Choices
        </p>

        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* Recipe Card */}

          {!loading && recipes.map(({recipe}, index) => (
            <RecipeCard key={index} recipe={recipe}
              {...getRandomColor()}
            />
          ))}

          {loading &&
            [...Array(9)].map((_, index) => (
              <div key={index} className="flex flex-col gap-4 w-full">
                <div className="skeleton h-32 w-full">
                  <div className="flex justify-between">
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-4 w-24"></div>
                  </div>
                </div>
                <div className="skeleton h-4 w-1/2"></div>
              </div>
            )) 
          }
  
        </div>
      </div>
    </div>
  );
};




const getTwoValuesFromArray = (arr) => {
  return [arr[0], arr[1]];
}




export const RecipeCard = ({recipe, bg, badge}) => {
  const healthLabels = getTwoValuesFromArray(recipe.healthLabels);
  const [isFavorite, setIsFavorite] = useState(localStorage.getItem('favorites')?.includes(recipe.label));


  const addRecipeToFavorites = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isRecipeAlreadyInFavorites = favorites.some((fav) => fav.label === recipe.label);
    
    if (isRecipeAlreadyInFavorites) {
      favorites = favorites.filter((fav) => fav.label !== recipe.label);
      setIsFavorite(false);
    } else {
      favorites.push(recipe);
      setIsFavorite(true);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  return (
    <div className={`flex flex-col rounded-md ${bg} overflow-hidden p-3 relative`}>
    <a 
      href={`https://www.youtube.com/results?search_query=${recipe.label} recipe`} 
      target="_blank"
      className='relative h-32'>
      <div className="skeleton absolute inset-0" />
      <img src={recipe.image} alt="recipe img" 
      className='rounded-md w-full h-full object-cover cursor-pointer opacity-0 transition-opacity duration-500' 
      onLoad={(e) => {
        e.currentTarget.style.opacity = 1;
        e.currentTarget.previousElementSibling.style.display = "none";
      }}/>

      <div className="absolute bottom-2 left-2 bg-white rounded-full p-1 cursor-pointer flex items-center 
      gap-1 text-sm">
        <Soup size={"16"}/> {recipe.yield} Servings
      </div>

      <div className="absolute top-1 right-2 bg-white rounded-full p-1 cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          addRecipeToFavorites();
        }}
      >
        {!isFavorite && <Heart size={"20"} className="hover:fill-red-500 hover:text-red-500"/>}
        {isFavorite && <Heart size={"20"} className="fill-red-500 text-red-500"/>}
      </div>
    </a>

    <div className="flex mt-1">
      <p className='font-bold tracking-wide'>{recipe.label}</p>
    </div>
    <p className="my-2">{recipe.cuisineType} Kitchen</p>

    <div className="flex gap-2 mt-auto">
      {
        healthLabels.map((label, idx) => (
          <div key={idx} className={`flex gap-1 ${badge} items-center p-1 rounded-md`}>
            <HeartPulse size={"16"}/>
            <span className="text-sm tracking-tighter font-semibold">{label}</span>
          </div>
        ))
      }
    </div>
  </div>
  )
}


export default HomePage;