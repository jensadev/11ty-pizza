const ingredients = ['Tomat', 'Ost', 'Skinka', 'Champinjoner'];

const toppings = {
    base: `${ingredients[0]}, ${ingredients[1]}`
};

const prices = {
    basic: 75,
    extra: 85,
    premium: 100
};

module.exports = () => {
    return {
        items: [
            {
                number: 2,
                name: 'Cappriciosa',
                price: prices.basic,
                toppings: `${toppings.base}, ${ingredients[2]}, ${ingredients[3]}`
            },
            {
                number: 1,
                name: 'Margherita',
                price: prices.basic,
                toppings: toppings.base
            }
        ]
    };
};
