document.addEventListener('DOMContentLoaded', () => {
  // console.log('dom content loaded');
  //grab save buttons and add event listeners to them

  document.querySelectorAll('.recipe-save').forEach(async (button) => {
    button.addEventListener('click', async (event) => {
      //grab the recipe id from the target id (we set this up in index.pug for the save button to have the recipe id)
      const ids = event.target.id.split('.');
      // [recipe:1, user:1]
      // 'recipe:1'
      // ['recipe', '1'][1] = '1'
      const recipeId = parseInt(ids[0].split(':')[1], 10);
      const cupboardId = parseInt(ids[1].split(':')[1], 10);
      //save or unsave to the cupboard if it's already saved or not
      if(event.target.innerText==='Unsave Recipe'){
        const res = await unsaveRecipe(cupboardId, recipeId);
        if(res){
          event.target.innerText = "Save Recipe"
        } else {
          alert('Something went wrong. Please try again.');
        }
      } else {
        const res = await saveRecipe(cupboardId, recipeId);
        if (res) {
          event.target.innerText = "Unsave Recipe"
        } else {
          alert('Something went wrong. Please try again.');
        }
      }
    });
  });
});

const saveRecipe = async (cupboardId, recipeId) => {
  try {
    console.log('inside save recipe')
    const res = await fetch(`/api/recipes/saveRecipe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({cupboardId, recipeId}),
    });
    if (!res.ok) {
      throw res;
    }
    const data = await res.json();
    return data;
  } catch(err) {
    console.log('in the catch block')
    console.error('error', err);
  }
};

const unsaveRecipe = async (cupboardId, recipeId) => {
  try {
    console.log('inside save recipe')
    const res = await fetch(`/api/recipes/unsaveRecipe`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({cupboardId, recipeId}),
    });
    if (!res.ok) {
      throw res;
    }
    const data = await res.json();
    return data;
  } catch(err) {
    console.log('in the catch block')
    console.error('error', err);
  }
};
