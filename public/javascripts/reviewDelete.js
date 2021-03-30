document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.review__delete').forEach((button) => {
        button.addEventListener('click', async (event) => {
          const recipeId = event.target.id.split(':')[1];
          const res = await deleteRateRecipe(recipeId);

          if (res) {
            window.location.reload();
          } else {
            alert('Something went wrong. Please try again');
          }
        });
      });
})

const deleteRateRecipe = async (recipeId) => {
  try {
    const res = await fetch('/api/recipes/deleteRateRecipe', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recipeId }),
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
