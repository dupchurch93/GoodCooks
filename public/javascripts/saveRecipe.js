const { User, Cupboard, Cupboard_Recipe } = require('../../db/models');

document.addEventListener('DOMContentLoaded', () => {
  console.log('dom content loaded');
  //grab save buttons and add event listeners to them
  const saveButtons = document.querySelectorAll('.recipe-save');

  saveButtons.forEach(async (button) => {
    button.addEventListener('click', async (event) => {
      //grab the recipe id from the target id (we set this up in index.pug for the save button to have the recipe id)
      const ids = event.target.id.split('.');
      // [recipe:1, user:1]
      // 'recipe:1'
      // ['recipe', '1'][1] = '1'
      const recipeId = parseInt(ids[0].split(':')[1], 10);
      const userId = parseInt(ids[1].split(':')[1], 10);
      //get the cupboardId for the current User
      const cupboard = await Cupboard.findOne({ where: { userId: userId } });
      const cupboardId = cupboard.id;
      //save to the cupboard
      const res = saveRecipe(cupboardId, recipeId);
      if (res) {
        event.target.innerText = 'Unsave';
      } else {
        alert('Something went wrong. Please try again.');
      }
    });
  });
});

const saveRecipe = async (cupboardId, recipeId) => {
  try {
    const res = await fetch(`/api/recipes/${recipeId}/cupboards/${cupboardId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application.json',
      },
      body: JSON.stringify({}),
    });
    if (!res.ok) {
      throw res;
    }
    const data = await res.json();
    return data;
  } catch {
    console.error(err);
  }
};
