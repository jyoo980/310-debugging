import IPromiseMath from "./IPromiseMath";

const request = require('request');
const rp = require("request-promise-native");

export default class PromiseMath implements IPromiseMath {

    public doNormalMath(expression: string): Promise<number> {
        return this.mathFromString(expression)
            .then((resStr: string) => {
                return Number(resStr);
            });
    }

    public batchProcessMath(expressions: string[]): Promise<number[]> {
        const futureExprs = [];
        for (const expr in expressions) {
            futureExprs.push(this.doNormalMath(expr));
        }
        return Promise.all(futureExprs);
    }

    public doWeirdMath(expression): Promise<number> {
        return this.mathFromString(expression)
            .then((res: string) => {
                return this.mathFromString(`${res}/2`);
            })
            .then((res: string) => {
                return this.mathFromString(`${res}^2`);
            })
            .then((res: string) => Number(res));
    }

    public doMathWithCallback(expression: string): Promise<number> {
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
    private makeMathUrl = (expression: string): string =>
        `http://api.mathjs.org/v4/?expr=${encodeURIComponent(expression)}`;

    // Returns a promise, resolved with the string result of the expression
    private mathFromString(expression: string): Promise<string> {
        // This one is done for you, and this is actually all you need!
        // This is already a promise object which resolves with the string we want
        return rp(this.makeMathUrl(expression));
    }
}
