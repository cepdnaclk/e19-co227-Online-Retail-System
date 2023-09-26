class Apriori {
    constructor(minSupport) {
        this.minSupport = minSupport;
        this.frequentItemsets = [];
    }

    exec(transactions) {
        // Generate the candidate 1-item sets.
        const candidate1Itemsets = transactions.reduce((acc, transaction) => {
            acc = acc.concat(transaction);
            return acc;
        }, []);

        // Count the support of the candidate 1-item sets.
        const candidate1ItemsetCounts = candidate1Itemsets.reduce((acc, item) => {
            acc[item] = (acc[item] || 0) + 1;
            return acc;
        }, {});

        // Add the frequent 1-item sets to the frequent itemsets list.
        this.frequentItemsets = this.frequentItemsets.concat(
            Object.keys(candidate1ItemsetCounts).filter((item) => candidate1ItemsetCounts[item] >= this.minSupport).map(item => [parseInt(item)])
        );

        // Generate the candidate k-item sets for k > 1.
        for (let k = 2; ; k++) {
            const candidateKItemsets = this.generateCandidateKItemsets(k);

            // If there are no more candidate k-item sets, then stop.
            if (candidateKItemsets.length === 0) {
                break;
            }

            // Count the support of the candidate k-item sets.
            const candidateKItemsetCounts = {};
            for (const transaction of transactions) {
                for (const itemset of candidateKItemsets) {
                    if (itemset.every(item => transaction.includes(item))) {
                        const key = itemset.join(',');
                        candidateKItemsetCounts[key] = (candidateKItemsetCounts[key] || 0) + 1;
                    }
                }
            }

            // Add the frequent k-item sets to the frequent itemsets list.
            const frequentKItemsets = Object.keys(candidateKItemsetCounts)
                .filter((itemset) => candidateKItemsetCounts[itemset] >= this.minSupport)
                .map(itemset => itemset.split(',').map(item => parseInt(item)));

            // If no frequent k-item sets were found, break out of the loop.
            if (frequentKItemsets.length === 0) {
                break;
            }

            this.frequentItemsets = this.frequentItemsets.concat(frequentKItemsets);
        }

        return this.frequentItemsets;
    }

    generateCandidateKItemsets(k) {
        const candidateKItemsets = [];

        for (const itemset1 of this.frequentItemsets) {
            for (const itemset2 of this.frequentItemsets) {
                if (itemset1 < itemset2) {
                    const newCandidateItemset = [...itemset1, ...itemset2].sort();
                    if (newCandidateItemset.length === k) {
                        candidateKItemsets.push(newCandidateItemset);
                    }
                }
            }
        }

        return [...new Set(candidateKItemsets)]; // Remove duplicates
    }
}

module.exports = Apriori;