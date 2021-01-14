const request = require('request');
const rp = require("request-promise-native");

/*
 * The first method here is done for you
 * Evaluate all expressions using a call to mathjs.org (send a request to the URL made by makeMathUrl, bottom of file)
 * Note that mathjs gives you a string. You can turn strings into numbers with Number(someString)

 * Methods are vaguely in order of difficulty.
 * Feel free to use earlier methods to help with the later methods!

 * These methods will probably end up being fairly small, don't think you have to do a lot.

 * This starter code begins with most tests passing, that's normal.
 * Here's the math.js API, if you're curious though you likely won't need it https://api.mathjs.org/
 */

export default class PromiseMath {

    // Returns a promise, resolved with the result of the expression, but as a number
    // Hint: You'll need to use a .then()
    public doNormalMath(expression: string): Promise<number> {
        return this.mathFromString(expression).then((resStr: string) => Number(resStr));
    }

    // Returns a promise, resolved with an array of expression results (that have been cast to numbers)
    // Hint: You'll need to use a Promise.all
    public batchProcessMath(expressions: string[]): Promise<number[]> {
        const futureExprs = [];
        for (const expr of expressions) {
            futureExprs.push(this.doNormalMath(expr));
        }
        return Promise.all(futureExprs);
    }

    // Evaluate the expression. Then (still using math.js) multiply the result by 2. Then square the result.
    // E.g. if expression = 1+1, this should evaluate to 2, then submit a new expression of 2*2
    // Finally submit a new expression of 4 ^ 2 to get the final result
    // Hint: Use promise chaining
    public doWeirdMath(expression): Promise<number> {
        return this.mathFromString(expression)
            .then((res: string) => {
                return this.mathFromString(`${res}*2`);
            })
            .then((res: string) => {
                return this.mathFromString(`${res}^2`);
            })
            .then((res: string) => Number(res));
    }

    // Hard mode of doNormalMath. Don't use request-promise-native or doStringyMath this time.
    // You'll need to use the request library (which does not use promises) and the Promise constructor.
    public doHarderMath(expression: string): Promise<number> {
        const requestUri: string = this.makeMathUrl(expression);
        return new Promise(((resolve, reject) => {
            request(requestUri, (err, res) => {
                if (err) {
                    reject(err);
                } else if (res.statusCode !== 200) {
                    reject(`Non 2xx status code response`);
                } else {
                    resolve(Number(res.body));
                }
            });
        }));
    }

    // Already implemented helper, this should be the URL you use in your request
    private makeMathUrl(expression: string): string {
        return `http://api.mathjs.org/v4/?expr=${encodeURIComponent(expression)}`;
    }

    // Returns a promise, resolved with the string result of the expression
    private mathFromString(expression: string): Promise<string> {
        // This one is done for you, and this is actually all you need!
        // This is already a promise object which resolves with the string we want
        return rp(this.makeMathUrl(expression));
    }
}
