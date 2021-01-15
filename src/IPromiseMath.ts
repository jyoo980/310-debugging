export default interface IPromiseMath {

    /**
     * Given a string representing a mathematical expression, return the
     * result of computing it as a number.
     *
     * @param expression a string representing a math expression.
     *
     * e.g. doNormalMath("2 + 2")       -> 4
     *      doNormalMath("sqrt(9) * 2") -> 6
     */
    doNormalMath(expression: string): Promise<number>;

    /**
     * Given an array of strings which represent mathematical expressions,
     * return the result of computing all of them.
     *
     * @param expressions a list of strings representing math expressions.
     */
    batchProcessMath(expressions: string[]): Promise<number[]>;

    /**
     * Evaluate the initial expression represented by the string, then
     * multiply the result by two (using a call to the API), then raise
     * the result to the power of two.
     *
     * @param expression the string representing the initial expression.
     *
     * e.g. doWeirdMath("4 / 2") -> 4 -> 16
     */
    doWeirdMath(expression: string): Promise<number>;

    /**
     * Implement the same functionality as doNormalMath, but without using
     * any libraries other than request: https://www.npmjs.com/package/request.
     * You'll need to convert the callback-based code to a Promise.
     *
     * @param expression a string representing a math expression.
     */
    doMathWithCallback(expression: string): Promise<number>;
}
