<?php

namespace App\Services;

class RestaurantFaker extends \Faker\Provider\Base
{
    protected static $foodNames = [
        'Cheese Pizza', 'Hamburger', 'Cheeseburger', 'Bacon Burger', 'Bacon Cheeseburger',
        'Little Hamburger', 'Little Cheeseburger', 'Little Bacon Burger', 'Little Bacon Cheeseburger',
        'Veggie Sandwich', 'Cheese Veggie Sandwich', 'Grilled Cheese',
        'Pasta'
    ];

    protected static $beverageNames = [
        'Beer', 'Bud Light', 'Budweiser', 'Miller Lite',
        'Milk Shake', 'Tea', 'Sweet Tea', 'Coffee', 'Hot Tea',
        'Champagne', 'Wine', 'Lemonade', 'Coca-Cola', 'Diet Coke',
        'Water', 'Sprite', 'Orange Juice', 'Iced Coffee', 'Iced Tea', 'Milk', 'Chocolate Milk', 'Apple Juice',
        'Cranberry Juice', 'Grape Juice', 'Pineapple Juice', 'Tomato Juice',
    ];

    protected static $dairyNames = [
        'Butter',
        'Egg',
        'Cheese',
        'Sour cream',
        'Mozzarella',
        'Yogurt',
        'Cream',
        'Milk',
        'Custard',
    ];

    protected static $vegetableNames = [
        'Onion',
        'Garlic',
        'Tomato',
        'Potato',
        'Carrot',
        'Bell Pepper',
        'Bell Basil',
        'Parsley',
        'Broccoli',
        'Corn',
        'Spinach',
        'Ginger',
        'Chili',
        'Celery',
        'Rosemary',
        'Cucumber',
        'Pickle',
        'Avocado',
        'Pumpkin',
        'Mint',
        'Eggplant',
        'Yam',
    ];

    protected static $fruitNames = [
        'Lemon',
        'Apple',
        'Banana',
        'Lime',
        'Strawberry',
        'Orange',
        'Pineapple',
        'Blueberry',
        'Raisin',
        'Coconut',
        'Grape',
        'Peach',
        'Raspberry',
        'Cranberry',
        'Mango',
        'Pear',
        'Blackberry',
        'Cherry',
        'Watermelon',
        'Kiwi',
        'Papaya',
        'Guava',
        'Lychee',
    ];

    protected static $meatNames = [
        'Chicken',
        'Bacon',
        'Sausage',
        'Beef',
        'Ham',
        'Hot-dog',
        'Pork',
        'Turkey',
        'Chicken wing',
        'Chicken breast',
        'Lamb',
    ];

    protected static $sauceNames = [
        'Tomato sauce',
        'Tomato paste',
        'Mayonnaise sauce',
        'BBQ sauce',
        'Chili sauce',
        'Garlic sauce',
    ];

    protected static $saladNames = [
        'Caesar salad',
        'Greek salad',
        'Cobb salad',
        'Waldorf salad',
        'Nicoise salad',
        'Caprese salad',
        'Chef salad',
        'Garden salad',
        'Pasta salad',
        'Potato salad',
        'Fruit salad',
        'Bean salad',
        'Taco salad',
        'Coleslaw salad',
        'Broccoli salad',
        'Cucumber salad',
        'Egg salad',
        'Macaroni salad',
        'Spinach salad',
        'Tuna salad',
        'Waldorf salad',
        'Chicken salad',
        'Shrimp salad',
        'Crab salad',
        'Lobster salad',
        'Seafood salad',
        'Avocado salad',
        'Mango salad',
        'Pineapple salad',
        'Strawberry salad',
        'Watermelon salad',
        'Cantaloupe salad',
        'Honeydew salad',
        'Blueberry salad',
        'Raspberry salad',
        'Blackberry salad',
        'Cherry salad',
        'Peach salad',
        'Plum salad',
        'Grape salad',
        'Kiwi salad',
        'Papaya salad',
        'Guava salad',
        'Lychee salad',
        'Orange salad',
        'Lemon salad',
        'Lime salad',
        'Coconut salad',
        'Raisin salad',
        'Cranberry salad',
        'Pineapple salad',
        'Blueberry salad',
        'Raisin salad',
        'Coconut salad',
        'Grape salad',
        'Peach salad',
        'Raspberry salad',
        'Cranberry salad',
        'Mango salad',
        'Pear salad',
        'Blackberry salad',
        'Cherry salad',
        'Watermelon salad',
        'Kiwi salad',
        'Papaya salad',
        'Guava salad',
        'Lychee salad',
    ];

    protected static $dessertNames = [
        'Ice cream',
        'Cake',
        'Cupcake',
        'Cookie',
        'Brownie',
        'Pie',
        'Pudding',
        'Candy',
        'Chocolate',
        'Donut',
        'Muffin',
        'Cheesecake',
        'Tart',
        'Cobbler',
        'Crisp',
        'Crumble',
        'Fudge',
        'Gelatin',
        'Parfait',
        'Sherbet',
        'Sorbet',
        'Tiramisu',
        'Trifle',
        'Baklava',
        'Cannoli',
        'Churro',
        'Eclair',
        'Macaron',
        'Meringue',
        'Mousse',
        'Praline',
        'Souffle',
        'Strudel',
        'Torte',
        'Biscotti',
        'Clafoutis',
        'Compote',
        'Crepes',
        'Flan',
        'Fritter',
        'Galette',
        'Granita',
        'Halva',
        'Kulfi',
        'Lassi',
        'Mochi',
        'Panna cotta',
        'Pavlova',
        'Praline',
        'Semifreddo',
        'Sundae',
        'Tapioca',
        'Tartufo',
        'Zabaglione',
        'Zuccotto',
    ];

    protected static $fastFoodNames = [
        'Hamburger',
        'Cheeseburger',
        'Bacon Burger',
        'Bacon Cheeseburger',
        'Little Hamburger',
        'Little Cheeseburger',
        'Little Bacon Burger',
        'Little Bacon Cheeseburger',
        'Veggie Sandwich',
        'Cheese Veggie Sandwich',
        'Grilled Cheese',
        'Shawarma',
        'Doner',
    ];

    protected static $plovNames = [
        'Osh',
        'Palov for Wedding Party',
        'Samarqand Palov',
        'Bukhara Palov',
        'Fergana Palov',
        'Tashkent Palov',
        'Kashgar Palov',
        'Kabuli Palov',
        'Khorezm Palov',
    ];

    protected static $shashlikNames = [
        'Lamb Shashlik',
        'Chicken Shashlik',
        'Beef Shashlik',
        'Pork Shashlik',
        'Salmon Shashlik',
        'Vegetable Shashlik',
        'Mushroom Shashlik',
        'Tofu Shashlik',
        'Kashkadarya Shashlik',
        'Khorezm Shashlik',
    ];

    protected static $pizzaNames = [
        'Margherita pizza', 'Marinara pizza', 'Quattro Stagioni pizza', 'Carbonara pizza', 'Frutti di Mare pizza', 'Quattro Formaggi pizza',
        'Crudo pizza', 'Napoletana pizza', 'Pugliese pizza', 'Montanara pizza', 'Emiliana pizza', 'Romana pizza', 'Schiacciata pizza',
        'Calzone pizza', 'Rustica pizza', 'Tonno pizza', 'Capricciosa pizza', 'Prosciutto pizza', 'Salsiccia pizza', 'Diavola pizza', 'Fiori di zucca pizza',
    ];

    protected static $kebabNames = [
        'Lamb Kebab', 'Chicken Kebab', 'Beef Kebab', 'Pork Kebab', 'Salmon Kebab', 'Vegetable Kebab',
        'Mushroom Kebab', 'Tofu Kebab', 'Kashkadarya Kebab', 'Khorezm Kebab', 'Kebab for Wedding Party',
    ];

    /**
     * A random Food Name.
     * @return string
     */
    public function foodName()
    {
        return static::randomElement(static::$foodNames);
    }

    /**
     * A random Beverage Name.
     * @return string
     */
    public function beverageName()
    {
        return static::randomElement(static::$beverageNames);
    }

    /**
     * A random Dairy Name.
     * @return string
     */
    public function dairyName()
    {
        return static::randomElement(static::$dairyNames);
    }

    /**
     * A random Vegetable Name.
     * @return string
     */
    public function vegetableName(): string
    {
        return static::randomElement(static::$vegetableNames);
    }

    /**
     * A random Fruit Name.
     * @return string
     */
    public function fruitName()
    {
        return static::randomElement(static::$fruitNames);
    }

    /**
     * A random Meat Name.
     * @return string
     */
    public function meatName()
    {
        return static::randomElement(static::$meatNames);
    }

    /**
     * A random Sauce Name.
     * @return string
     */
    public function sauceName(): string
    {
        return static::randomElement(static::$sauceNames);
    }

    /**
     * A random Salad Name.
     * @return string
     */
    public function saladName(): string
    {
        return static::randomElement(static::$saladNames);
    }

    /**
     * A random Dessert Name.
     * @return string
     */
    public function dessertName(): string
    {
        return static::randomElement(static::$dessertNames);
    }

    /**
     * A random Fast Food Name.
     * @return string
     */
    public function fastFoodName(): string
    {
        return static::randomElement(static::$fastFoodNames);
    }

    /**
     * A random Palov Name.
     * @return string
     */
    public function palovName(): string
    {
        return static::randomElement(static::$plovNames);
    }

    /**
     * A random Shashlik Name.
     * @return string
     */
    public function shashlikName(): string
    {
        return static::randomElement(static::$shashlikNames);
    }

    /**
     * A random Pizza Name.
     * @return string
     */
    public function pizzaName(): string
    {
        return static::randomElement(static::$pizzaNames);
    }

    /**
     * A random Kebab Name.
     * @return string
     */
    public function kebabName(): string
    {
        return static::randomElement(static::$kebabNames);
    }
}
