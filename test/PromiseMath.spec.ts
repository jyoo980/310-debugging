import {expect} from "chai";
import PromiseMath from "../src/PromiseMath";

describe("Math", function () {

    const defaultTimeout: number = 5000;
    this.timeout(defaultTimeout);

    let math: PromiseMath = new PromiseMath();

    it("doNormalMath should compute a simple addition expression", () => {
        const expr = "5 + 9";
        return math.doNormalMath(expr)
            .then((res: number) => expect(res).to.equal(5 + 9))
            .catch((err: any) => expect.fail(`Failed to compute ${expr} with error: ${err}`))
    });

    it("should be able to use the result from doNormalMath in another call to PromiseMath", () => {
        const expr = "sqrt(9) * 4";
        return math.doNormalMath(expr)
            .then((res: number) => {
                const resAsStr = String(res);
                const newExpr = `${resAsStr} / 4`;
                return math.doNormalMath(newExpr);
            })
            .then((res: number) => expect(res).to.equal(3))
            .catch((err: any) => expect.fail(`Failed to use result of PromiseMath with error: ${err}`));
    })

    it("batchProcessMath should be able to compute an array of expressions", () => {
        const exprs = ["2 + 4", "sqrt(9)*11", "5 - 10"];
        return math.batchProcessMath(exprs)
            .then((results: number[]) => expect(results).to.deep.equal([6, 33, -5]))
            .catch((err: any) => expect.fail(`Failed to compute ${exprs} with error: ${err}`));
    });

});
