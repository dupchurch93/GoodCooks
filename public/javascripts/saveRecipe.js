document.addEventListener('DOMContentLoaded', () => {
  // console.log('dom content loaded');
  //grab save buttons and add event listeners to them

  const getId = (element) => {
    //grab the recipe id from the target id (we set this up in index.pug for the save button to have the recipe id)
    const ids = element.id.split('.');
    // [recipe:1, user:1]
    // 'recipe:1'
    // ['recipe', '1'][1] = '1'
    const recipeId = parseInt(ids[0].split(':')[1], 10);
    const cupboardId = parseInt(ids[1].split(':')[1], 10);

    return {recipeId, cupboardId}
  }

  //Save event listeners
  document.querySelectorAll('.recipe-save').forEach(async (button) => {
    button.addEventListener('click', async (event) => {
      const { recipeId, cupboardId } = getId(event.target)
      //save or unsave to the cupboard if it's already saved or not
      if (event.target.innerText === 'Unsave Recipe') {
        const res = await unsaveRecipe(cupboardId, recipeId);
        if (res) {
          event.target.innerText = 'Save Recipe';
          document.getElementById(`cookedrecipe:${recipeId}.cupboard:${cupboardId}`).innerText = 'Add to Cooked';
          document.getElementById(`favoriterecipe:${recipeId}.cupboard:${cupboardId}`).innerText = 'Favorite';
        } else {
          alert('Something went wrong. Please try again.');
        }
      } else {
        const res = await saveRecipe(cupboardId, recipeId);
        if (res) {
          event.target.innerText = 'Unsave Recipe';
        } else {
          alert('Something went wrong. Please try again.');
        }
      }
    });
  });

  //Add to Cooked event listeners
  document.querySelectorAll('.recipe-cooked').forEach(async (button) => {
    button.addEventListener('click', async (event) => {
      const { recipeId, cupboardId } = getId(event.target)
      //save or unsave to the cupboard if it's already saved or not
      const saveButton = document.getElementById(`recipe:${recipeId}.cupboard:${cupboardId}`);
      if (saveButton.innerText === 'Save Recipe') {
        const res = await saveRecipe(cupboardId, recipeId, true);
        if (res) {
          event.target.innerText = 'Remove from Cooked';
          saveButton.innerText = 'Unsave Recipe';
        }
      } else if (event.target.innerText === 'Remove from Cooked') {
        const res = await uncookRecipe(cupboardId, recipeId);
        if (res) {
          event.target.innerText = 'Add to Cooked';
        } else {
          alert('Something went wrong. Please try again.');
        }
      } else {
        const res = await cookRecipe(cupboardId, recipeId);
        if (res) {
          event.target.innerText = 'Remove from Cooked';
        } else {
          alert('Something went wrong. Please try again.');
        }
      }
    });
  });

  //Favorite event listeners
  document.querySelectorAll('.recipe-favorited').forEach(async (button) => {
    button.addEventListener('click', async (event) => {
      const { recipeId, cupboardId } = getId(event.target)
      //save or unsave to the cupboard if it's already saved or not
      const saveButton = document.getElementById(`recipe:${recipeId}.cupboard:${cupboardId}`);
      if (saveButton.innerText === 'Save Recipe') {
        const res = await saveRecipe(cupboardId, recipeId, false, true);
        if (res) {
          event.target.innerText = 'Unfavorite';
          saveButton.innerText = 'Unsave Recipe';
        }
      } else if (event.target.innerText === 'Unfavorite') {
        const res = await unfavoriteRecipe(cupboardId, recipeId);
        if (res) {
          event.target.innerText = 'Favorite';
        } else {
          alert('Something went wrong. Please try again.');
        }
      } else {
        const res = await favoriteRecipe(cupboardId, recipeId);
        if (res) {
          event.target.innerText = 'Unfavorite';
        } else {
          alert('Something went wrong. Please try again.');
        }
      }
    });
  });
});

const saveRecipe = async (cupboardId, recipeId, cooked = false, favorited = false) => {
  try {
    console.log('inside save recipe');
    const res = await fetch(`/api/recipes/saveRecipe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cupboardId, recipeId, cooked, favorited }),
    });
    if (!res.ok) {
      throw res;
    }
    const data = await res.json();
    return data;
  } catch (err) {
    // console.log('in the catch block');
    console.error('error', err);
  }
};

const unsaveRecipe = async (cupboardId, recipeId) => {
  try {
    console.log('inside save recipe');
    const res = await fetch(`/api/recipes/unsaveRecipe`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cupboardId, recipeId }),
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

const cookRecipe = async (cupboardId, recipeId) => {
  try {
    const res = await fetch(`/api/recipes/cookRecipe`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cupboardId, recipeId }),
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
const uncookRecipe = async (cupboardId, recipeId) => {
  try {
    const res = await fetch(`/api/recipes/uncookRecipe`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cupboardId, recipeId }),
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

const favoriteRecipe = async (cupboardId, recipeId) => {
  try {
    const res = await fetch(`/api/recipes/favoriteRecipe`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cupboardId, recipeId }),
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

const unfavoriteRecipe = async (cupboardId, recipeId) => {
  try {
    const res = await fetch(`/api/recipes/unfavoriteRecipe`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cupboardId, recipeId }),
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
