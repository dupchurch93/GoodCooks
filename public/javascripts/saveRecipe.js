const { Cupboard_Recipe } = require('../../db/models')

document.addEventListener('DOMContentLoaded', () => {
    //grab save buttons and add event listeners to them
    const saveButtons = document.querySelectorAll('.recipe-save');

    saveButtons.forEach(async (button) => {
        button.addEventListener('click', async (event) => {
            //grab the recipe id from the target id (we set this up in index.pug for the save button to have the recipe id)
            const recipeId = event.target.id;
            //get the cupboardId for the current User
            // const cupboardId = ???
            //to do, don't save if the recipe is already in the cupboard

            //save to the cupboard
            await Cupboard_Recipe.create(cupboardId, recipeId);
        });
    });
});
