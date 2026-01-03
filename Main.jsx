import React, { useRef, useEffect } from "react"
import QwenRecipe from "./components/QwenRecipe.jsx"
import IngredientsList from "./components/IngredientsList.jsx"
import { getRecipeFromQwenAI } from "./ai.js"



export default function Main() {


    const [ingredients, setIngredients] = React.useState(
        []
    )
    const [recipeShown, setRecipeShown] = React.useState(false)
    const [generatedRecipe, setGeneratedRecipe] = React.useState(null)
    const scrollRef = useRef(null);

    
    function toggleRecipeShown() {
        setRecipeShown(prevRecipeShown => {
            const newValue = !prevRecipeShown;
            if (newValue && generatedRecipe == null) {
                getRecipeFromQwenAI(ingredients).then(response => {
                    setGeneratedRecipe(response);
                    console.log("Recipe generated!")
                })
            }
            return newValue;
        });
    }

    useEffect(() => {
        if (recipeShown && generatedRecipe) {
            handleScroll();
        }
    }, [generatedRecipe, recipeShown]);

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        newIngredient != "" && setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    function handleScroll() {
        if (scrollRef.current != null) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
                {/* <button>Clear List</button> */}
            </form>
            
            <IngredientsList ref={scrollRef} ingredients={ingredients} toggleRecipeShown={toggleRecipeShown}/>
            <div >
                <QwenRecipe   generatedRecipe={generatedRecipe} recipeShown={recipeShown} />
            </div>
        </main>
    )
}