'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Recipes',
      [
        {
          name: 'The Best Broccoli-Cheddar Soup',
          description:
            'This outstanding broccoli-cheddar soup is rich, cheesy and packed with flavor. We decided to puree just over half the soup which makes it extra thick and creamy, and left the remainder chunky so there are broccoli bits in every bite. Gild the lily with more shredded cheese on top to satisfy your comfort food craving.',
          ingredients: `4 tablespoons unsalted butter, 1 medium yellow onion, diced,
        1 large carrot, diced, 2 cloves garlic, minced, 1/4 cup all-purpose flour, 2 cups half and half,
        4 cups low-sodium chicken broth, 4 cups broccoli florets from about 1 head,
        2 bay leaves, 1/4 teaspoon freshly grated nutmeg, Kosher salt and freshly ground pepper,
        1 large russet potato about 8 ounces, 8 ounces mild yellow Cheddar, shredded about 2 cups, plus more for serving`,
          instructions: `1. Melt the butter in a large saucepan or Dutch oven over medium-high heat.
          2. Add the onion, carrot and garlic and cook, stirring occasionally, until just tender, about 5 minutes.
          3. Whisk in the flour and cook until golden, 3 to 4 minutes, then gradually whisk in the half-and-half until smooth.
          4. Add the chicken broth, broccoli, bay leaves, nutmeg, 1/2 teaspoon salt and few grinds of black pepper Bring to a boil, then reduce to medium-low and simmer, uncovered and stirring occasionally, until the broth has thickened and the broccoli is very tender, about 15 minutes
          5. Prick the potato all over with a fork and put on a microwave-safe plate. Microwave on high until tender, flipping halfway through, about 6 minutes. Let cool, then peel. Use a fork or potato masher to mash until crumbly.
          6. Reserve 2 cups of the soup in a liquid measuring cup and discard the bay leaves. Let the remaining hot soup cool for 5 minutes or so, then transfer it to a blender, filling no more than halfway.
          7. Add the mashed potato. Remove the center cap from the lid and place it on the blender. Cover the lid with a folded kitchen towel to catch splatters, and pulse until very smooth.
          8. Stir the pureed soup and reserved 2 cups of soup back into the pot. Whisk in the cheese until melted and smooth. Season with salt and pepper. Ladle into serving bowls and top with more shredded Cheddar.`,
          author: 'Kelly Senyei',
          createdAt: new Date('2016-11-13'),
          updatedAt: new Date('2016-11-13'),
          link:
            'https://media01.stockfood.com/largepreviews/MzgyOTg2Nzcy/12354412-Cheddar-cheese-soup-with-broccoli.jpg',
        },
        {
          name: 'Burger of the Gods',
          description:
            'Great simple burger recipe. Use fresh, good quality grass-fed ground beef for best results.',
          ingredients: `8 ounces chuck, trimmed, cut into 1 1/2-inch cubes, 8 ounces sirloin, trimmed, cut into 1 1/2-inch cubes, 1/2 teaspoon kosher salt`,
          instructions: `1. In separate batches, pulse the chuck and the sirloin in a food processor 10 times.
          2. Combine the chuck, sirloin, and kosher salt in a large bowl. Form the meat into 5-ounce patties.
          3. Heat a cast iron skillet or griddle over medium-high heat for 2 to 3 minutes. Place the hamburger patties in the pan. For medium-rare burgers, cook the patties for 4 minutes on each side. For medium burgers, cook the patties for 5 minutes on each side. Flip the burgers only once during cooking.`,
          author: 'Alton Brown',
          createdAt: new Date('2014-09-03'),
          updatedAt: new Date('2014-09-03'),
          link:
            'https://media01.stockfood.com/largepreviews/MzgyOTg2NDYy/12354402-A-burger-with-avocado.jpg',
        },
        {
          name: 'Air Fryer Mozzarella Sticks',
          description:
            'Delicious and fried til golden, this is a savory treat best served hot and with a side of marinara.',
          ingredients: `1 large egg, 1 teaspoon Italian seasoning, 1/2 teaspoon salt, 1 cup panko breadcrumbs, 8 whole milk or low-fat mozzarella sticks`,
          instructions: `1. Line a rimmed baking sheet with wax paper. Lightly beat the egg in a wide, shallow bowl. Combine the Italian seasoning, salt, and breadcrumbs in a second wide, shallow bowl.
                        2. Coat the mozzarella sticks and freeze them: Dip a mozzarella stick into the beaten egg and coat it completely. Dip the stick into the bowl with the breadcrumbs and coat completely. This will be messy. It’s okay.
                        3. Coat the mozzarella sticks again, and freeze them, again. Pull the mozzarella sticks out of the freezer, dip them into the egg and then the breadcrumb mix, and then freeze them for another 1/2 hour minimum, 1 hour maximum.
                        4. Air fry the mozzarella sticks: Set your air fryer to 390°F. Spray the air fryer basket and the mozzarella sticks with a nonstick cooking spray. Air fry the mozzarella sticks in batches if desired or necessary, as space permits for 6 to 8 minutes until the exterior is golden and crispy.`,
          author: 'Carrie Havranek',
          createdAt: new Date('2014-09-03'),
          updatedAt: new Date('2014-09-03'),
          link:
            'https://media02.stockfood.com/largepreviews/Mjg4MDg3MDM=/00929313-Mozzarella-sticks-with-marinara-sauce.jpg',
        },
        {
          name: 'Microwave mug cake',
          description: 'Great simple treat that can be ready to eat in just 5 minutes',
          ingredients: `1/4 cup flour 30 g,1/4 cup sugar 50 g,2 tablespoons 13 g cocoa natural, unsweetened,
          Pinch of salt,Tiny pinch of cinnamon,1/4 cup water 60 ml,
          2 tablespoons 30 ml melted butter, or neutral oil,1/8 teaspoon vanilla extract,
          1 small scoop of ice cream or 1 or 2 teaspoons heavy whipping cream to serve`,
          instructions: `1. Add the dry ingredients to the mug and stir: Place flour, sugar, cocoa, salt, and cinnamon in a microwave safe ceramic mug. Stir with a fork or spoon to mix well and break up any clumps.
         2. Add the wet ingredients and stir: Add the butter or oil, water, and vanilla to the cup and stir until the mixture is smooth and there are no lumps.
         3. Zap in microwave: Place in microwave and heat on high until the mixture is cooked through, about a 1 minute and 40 seconds for a 1000 watt microwave, or 1 minute 10 seconds on a 1650 watt microwave.
         You may have to experiment and adjust the time for less or more powerful microwaves. If you don't know the power level on your microwave, start with 60 seconds and increase until the brownie is done. It should still be moist when cooked through, not dry.
         4. Top with ice cream! Let cool for a minute and serve with a scoop of vanilla ice cream or a teaspoon or two of whipping cream poured over.`,
          author: 'Elsie Bauer',
          createdAt: new Date('2014-09-03'),
          updatedAt: new Date('2014-09-03'),
          link:
            'https://media01.stockfood.com/largepreviews/MzgyNTg1ODE4/12341478-Super-quick-chocolate-mug-cake.jpg',
        },
        {
          name: 'Best Scrambled Eggs',
          description:
            'These eggs look as good piled high on a piece of toast as they do alongside sausage and hash browns or sautéed spinach and avocado.',
          ingredients: `2 large eggs, 1 tablespoon whole milk, 1/2 tablespoon butter, 1/8 teaspoon salt, Fresh cracked pepper`,
          instructions: `1. Melt butter in a small skillet over medium heat.
         2. Whisk the eggs: Crack two eggs into a small mixing bowl. Add milk and salt. Aggressively whisk the mixture until it is uniform in color, texture, and slightly foamy. You want the whites and yolks fully combined.
         3. Scramble the eggs: Add the eggs to hot skillet and immediately reduce the heat to medium low. Use a rubber spatula to push the eggs from one end of the skillet to the other.
         4. Serve immediately: Remove eggs from pan when the eggs are set but still glisten with moisture, and transfer to a plate. Finish with freshly cracked pepper. Garnish with fresh herbs, if using.`,
          author: 'Summer Miller',
          createdAt: new Date('2014-09-03'),
          updatedAt: new Date('2014-09-03'),
          link:
            'https://media02.stockfood.com/largepreviews/Mzg2ODA3MzY3/12477657-Preparing-scrambled-eggs-in-a-pan.jpg',
        },
        {
          name: 'Grilled cheese',
          description: 'Great simple grilled cheese recipe that is ready to eat in 10 minutes',
          ingredients: `3 ounces about 2/3 to 1 cup shredded cheddar, swiss, jack, or fontina cheese,
         2 slices sandwich bread, preferably 1/2-inch thick,
         2 teaspoons mayonnaise or butter`,
          instructions: `1. Preheat the Pan and grate the cheese
        2.Butter the bread evenly
        3. Add the cheese and let it melt: Distribute the cheese evenly over both slices of bread. If you have a lid for your skillet, put it on; this will help the cheese melt more evenly.
        4. After 2-3 minutes close the sandwhich and finish grilling`,
          author: 'Sara Bir',
          createdAt: new Date('2014-09-03'),
          updatedAt: new Date('2014-09-03'),
          link:
            'https://media02.stockfood.com/largepreviews/MzgyOTExNTM1/12351985-A-grilled-cheese-sandwich.jpg',
        },
        {
          name: 'Peanut butter and jelly',
          description: 'Great simple PB&J recipe that is ready to eat in 5 minutes',
          ingredients: '2 pieces of the bread of your choosing, Peanut butter, Jelly',
          instructions:
            '1. Spread jelly on one of the pieces of bread and peanut butter on the other 2. Put the pieces of bread together and cut the sandwich into halves',
          author: 'Ronald Jones',
          createdAt: new Date('2014-09-03'),
          updatedAt: new Date('2014-09-03'),
          link:
            'https://media01.stockfood.com/largepreviews/Mzk4MDk1OA==/00128418-Peanut-Butter-and-Jelly-Sandwich-Citrus-Rinds.jpg',
        },
        {
          name: 'Hot Chocolate',
          description: 'Sweet chocolate drink that will keep you warm in the winter',
          ingredients: `4 cups whole milk or another nondairy milk,
         8 ounces dark, semi-sweet, or bittersweet chocolate 60% cacao, preferably,
         3 teaspoons powdered sugar,
         1 teaspoon vanilla extract,
         1/8 teaspoon salt`,
          instructions: `1. Chop the chocolate: Finely chop the chocolate into small pieces. The pieces have to be able to dissolve easily in the liquid.
         2. Warm the milk: Place the milk into a small, thick-bottomed pot on low heat and bring to a low simmer. Whisk once in a while to ensure that the milk doesn't stick to the bottom of the pan.
         If you plan to steep herbs or spices, add the herbs or spices to the milk, bring to a simmer then take off heat and allow to steep for 10 minutes. Strain the liquid then place back into the pot and return to a simmer.
         3. Add the chocolate: Add the vanilla, powdered sugar, salt, and chocolate and whisk vigorously until the chocolate has melted.
         4. Melt the chocolate: Heat for another 4 minutes, constantly stirring, until the chocolate is completely melted.`,
          author: 'Garrett McCord',
          createdAt: new Date('2014-09-03'),
          updatedAt: new Date('2014-09-03'),
          link:
            'https://media02.stockfood.com/largepreviews/Mzc5NDEyMTMx/12239101-Hot-chocolate-with-cinnamon-sticks-anise-nuts-and-cocoa-powder-on-rustic-wooden-background.jpg',
        },
        {
          name: 'French Toast',
          description:
            'Thick slices of bread, soaked in a mixture of beaten eggs with milk and cinnamon, toasted in a frying pan, and served with butter and maple syrup',
          ingredients: `4 eggs, 2/3 cup milk, 2 teaspoons of cinnamon,
         8 thick slices of 2-day-old bread better if slightly stale,
         Butter can sub vegetable oil, Maple syrup`,
          instructions: `1. Make the egg mixture: In a medium bowl, whisk together the eggs, milk, and cinnamon. Stir in the orange zest and/or Triple Sec if using. Whisk the mixture until well blended and pour into a shallow bowl, wide enough to place a slice of the bread you will be using.
         2. Soak bread slices in egg mixture: Place each slice of bread into the milk egg mixture, allowing the bread to soak in some of it.
         3. Fry the french toast: Melt some butter in a large skillet over medium high heat. Shake off the excess egg mixture from the bread, and place the bread slices onto the hot skillet. Fry the French toast until browned on one side, then flip and brown the other side.
         4. Serve hot with butter, maple syrup, and if available, fresh berries.`,
          author: 'Ellie Barty',
          createdAt: new Date('2019-07-09'),
          updatedAt: new Date('2019-07-09'),
          link:
            'https://media01.stockfood.com/largepreviews/MzUxMDcyNzY4/11324928-French-toast-with-berries-and-maple-syrup.jpg',
        },
        {
          name: 'Chocolate covered pretzels',
          description: 'Sweet and salty snack that everyone will love',
          ingredients: `12 ounces semi-sweet chocolate chips,
         12 ounces white chocolate chips see headnote above,
         4 ounces 72 individual mini pretzel twists`,
          instructions: `1. Melt the white chocolate and the semi-sweet chocolate in seperate bowls and stir until smooth,
         2. Dip the pretzels in the semi-sweet chocolate until they are fully coated.
         3. Drizzle the white chocolate over the pretzels to your liking.
         4. Refrigerate pretzels until the chocolate hardens and then enjoy.`,
          author: 'Irvin Lin',
          createdAt: new Date('2017-04-23'),
          updatedAt: new Date('2017-04-23'),
          link:
            'https://media02.stockfood.com/largepreviews/MTAyMjQwMTc=/00329807-Chocolate-coated-pretzels-in-a-Christmassy-box.jpg',
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Recipes', null, {});
  },
};
