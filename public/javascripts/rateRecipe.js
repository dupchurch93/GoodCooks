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

  const fillStars = (res, recipeId, starRating) => {
    if (res) {
      for (let i = 1; i <= 5; i++) {
        const star = document.getElementById(`recipe:${recipeId}.star:${i}`);
        if (i <= starRating) {
          star.classList.add('checked');
        } else {
          star.classList.remove('checked');
        }
      }
    } else {
      alert('Something went wrong. Please try again');
    }
  };

  document.querySelectorAll('.rating__button').forEach((button) => {
    button.addEventListener('click', async (event) => {
      const { recipeId, starRating } = getRecipeIdAndStarRating(event.target);
      if (event.target.classList.contains('checked') || anyIsChecked(recipeId, starRating)) {
        const res = await updateRateRecipe(recipeId, starRating);
        fillStars(res, recipeId, starRating);
      } else {
        const res = await rateRecipe(recipeId, starRating);
        fillStars(res, recipeId, starRating);
      }
    });
  });
});

const handleResponse = async (res) => {
  if (!res.ok) {
    throw res;
  }
  const data = await res.json();
  return data;
};

const rateRecipe = async (recipeId, starRating, content = null) => {
  try {
    const res = await fetch('/api/recipes/rateRecipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recipeId, starRating, content }),
    });
    return await handleResponse(res);
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
    return await handleResponse(res);
  } catch (err) {
    console.error('error', err);
  }
};
