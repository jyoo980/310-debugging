import {expect} from "chai";
import PromiseMath from "../src/PromiseMath";

describe("MathPromise", function () {

    const defaultTimeout: number = 5000;
    this.timeout(defaultTimeout);

    let math: PromiseMath = new PromiseMath();

    it("doNormalMath should compute a simple addition expression", () => {
        const expr = "5 + 9";
        return math.doNormalMath(expr)
            .then((res: number) => {
                return expect(res).to.equal(5 + 9);
            })
            .catch((err: any) => {
                expect.fail(`Failed to compute ${expr} with error: ${err}`);
            });
    });

    it("batchProcessMath should be able to compute an array of expressions", () => {
        const exprs = ["2 + 4", "sqrt(9)*11", "5 - 10"];
        return math.batchProcessMath(exprs)
            .then((results: number[]) => {
                return expect(results).to.deep.equal([6, 33, -5])
            })
            .catch((err: any) => {
                expect.fail(`Failed to compute ${exprs} with error: ${err}`)
            });
    });

    it("should be able to correctly execute doWeirdMath", () => {
        const expr = "4 * 3";
        return math.doWeirdMath(expr)
            .then((res: number) => {
                // remember, doWeirdMath takes the expression, multiplies it by two, and raises it to the power of 2
                return expect(res).to.equal(576);
            })
            .catch((err: any) => {
                expect.fail(`Failed to compute doWeirdMath(${expr}) with error: ${err}`);
            })
    });

});
