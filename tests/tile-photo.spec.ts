import "mocha";
import { expect } from "chai";
import { computeRegion } from "../utils";

describe("compute region function test", () => {
	it("should be able to compute correct region top", () => {
		expect(computeRegion(10, 10)(256, 256)(256).top).to.equal(2560);
	})

	it("should be able to compute correct region left", () => {

		expect(computeRegion(1, 1)(256, 256)(256).left).to.equal(256);
	});

	it("should be able to compute correct region width when image width is shorter than tile length", () => {

		expect(computeRegion(2, 2)(200, 200)(300).width).to.equal(200);
	});

	it("should be able to compute correct region height when image height is longer than tile length", () => {
		expect(computeRegion(2, 2)(400, 500)(300).height).to.equal(300);
	});
});