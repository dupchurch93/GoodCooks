document.addEventListener('DOMContentLoaded', () => {
    const getRecipeIdAndStarRating = (element) => {
        const ids = element.id.split('.');
        const recipeId = parseInt(ids[0].split(':')[1], 10);
        const starRating = parseInt(ids[1].split(':')[1], 10);

        return { recipeId, starRating };
    };

    document.querySelectorAll('.rating__button').forEach((button) => {
        button.addEventListener('click', async (event) => {
            const { recipeId, starRating } = getRecipeIdAndStarRating(event.target);
            const res = await rateRecipe( recipeId, starRating);
            if(res){
                //fill in corresponding star
                console.log(res)
            } else {
                alert('Something went wrong. Please try again');
            }
        });
    });
});

const rateRecipe = async (recipeId, starRating, content = null) => {
    try {
        const res = await fetch('/api/recipes/rateRecipe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ recipeId, starRating, content }),
        });
        if (!res.ok) {
            throw res;
        }
        const data = await res.json();
        return data;
    } catch (err) {
        console.error("error", err)
    }
}
