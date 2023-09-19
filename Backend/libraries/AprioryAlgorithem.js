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
            candidate1Itemsets.filter((item) => candidate1ItemsetCounts[item] >= this.minSupport)
        );

        // Generate the candidate k-item sets for k > 1.
        for (let k = 2; k <= Infinity; k++) {
            const candidateKItemsets = this.generateCandidateKItemsets(k);

            // Count the support of the candidate k-item sets.
            const candidateKItemsetCounts = candidateKItemsets.reduce((acc, itemset) => {
                acc[itemset] = (acc[itemset] || 0) + transactions.filter((transaction) => transaction.includes(...itemset)).length;
                return acc;
            }, {});

            // Add the frequent k-item sets to the frequent itemsets list.
            this.frequentItemsets = this.frequentItemsets.concat(
                candidateKItemsets.filter((itemset) => candidateKItemsetCounts[itemset] >= this.minSupport)
            );

            // If there are no more frequent k-item sets, then stop.
            if (this.frequentItemsets.length === 0) {
                break;
            }
        }

        return this.frequentItemsets;
    }

    generateCandidateKItemsets(k) {
        const candidateKItemsets = [];

        for (const itemset of this.frequentItemsets[k - 1]) {
            for (const item of this.frequentItemsets[k - 1]) {
                if (item > itemset[itemset.length - 1]) {
                    const newCandidateItemset = [...itemset, item];
                    candidateKItemsets.push(newCandidateItemset);
                }
            }
        }

        return candidateKItemsets;
    }
}
