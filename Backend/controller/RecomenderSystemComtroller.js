const Apriori = require('../libraries/AprioryAlgorithem');

// Create an Apriori object with a minimum support threshold of 2%.
const apriori = new Apriori(0.02);

// Load the transaction database.
const transactions = [
    [1, 3, 4],
    [2, 3, 5],
    [1, 2, 3, 5],
    [2, 5],
    [1, 2, 3, 5],
];

// Execute the Apriori algorithm.
const frequentItemsets = apriori.exec(transactions);
console.log(frequentItemsets)


