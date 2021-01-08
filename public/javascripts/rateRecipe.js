document.addEventListener('DOMContentLoaded', () => {
  const getRecipeIdAndStarRating = (element) => {
    const ids = element.id.split('.');
    const recipeId = parseInt(ids[0].split(':')[1], 10);
    const starRating = parseInt(ids[1].split(':')[1], 10);

    return { recipeId, starRating };
  };

  const anyIsChecked = (recipeId, num) => {
    for (let i = 1; i < num; i++) {
      const star = document.getElementById(`recipe:${recipeId}.star:${i}`);
      if (star.classList.contains('checked')) {
        return true;
      }
    }
    return false;
  };

  const fillStars = (recipeId, starRating) => {
    for (let i = 1; i <= starRating; i++) {
      const star = document.getElementById(`recipe:${recipeId}.star:${i}`);
      star.classList.add('checked');
    }
    for (let i = starRating + 1; i <= 5; i++) {
      const star = document.getElementById(`recipe:${recipeId}.star:${i}`);
      star.classList.remove('checked');
    }
  };

  document.querySelectorAll('.rating__button').forEach((button) => {
    button.addEventListener('click', async (event) => {
      const { recipeId, starRating } = getRecipeIdAndStarRating(event.target);
      if (event.target.classList.contains('checked') || anyIsChecked(recipeId, starRating)) {
        const res = await updateRateRecipe(recipeId, starRating);
        if (res) {
          fillStars(recipeId, starRating);
        } else {
          alert('Something went wrong. Please try again');
        }
      } else {
        const res = await rateRecipe(recipeId, starRating);
        if (res) {
          //fill in corresponding star
          fillStars(recipeId, starRating);
        } else {
          alert('Something went wrong. Please try again');
        }
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
    console.error('error', err);
  }
};

const updateRateRecipe = async (recipeId, starRating) => {
  try {
    const res = await fetch('/api/recipes/updateRateRecipe', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recipeId, starRating }),
    });
    if (!res.ok) {
      throw res;
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('error', err);
  }
};
