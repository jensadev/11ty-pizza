const words = require('an-array-of-italian-words');
const Cache = require('@11ty/eleventy-cache-assets');

const ingredients = [
    'skinka',
    'champinjoner',
    'annanas',
    'lök',
    'vitlök',
    'bacon',
    'basilika'
];

const getImage = async (
    url = 'https://foodish-api.herokuapp.com/api/images/pizza'
) => {
    try {
        /* This returns a promise */
        return Cache(url, {
            duration: '1d',
            type: 'json'
        });
    } catch (e) {
        return {
            // my failure fallback data
        };
    }
};

const createPizza = async (numberOfToppings, number) => {
    const pizza = {
        number: number
    };

    const imgUrl = await getImage();

    pizza.image = imgUrl.image;

    const pizzaWords = words.filter(function (w) {
        return !!w.match(/^\w{5,}/i);
    });
    pizza.name = pizzaWords[getRandomIntInclusive(0, pizzaWords.length)];
    pizza.toppings = 'tomat, ost, ';
    for (let i = 0; i < numberOfToppings; i += 1) {
        const num = getRandomIntInclusive(0, ingredients.length - 1);
        pizza.toppings += `${ingredients[num]}, `;
    }
    pizza.price = 75 + getRandomIntInclusive(0, 25);
    return pizza;
};

const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
};

module.exports = async () => {
    const menu = {
        items: []
    };

    for (let i = 0; i < 25; i += 1) {
        menu.items.push(await createPizza(getRandomIntInclusive(2, 5), i + 1));
    }

    return menu;
};
