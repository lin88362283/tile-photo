import { expect } from "chai";
// import { computeRegion } from '../utilities';

// tilePhoto(process.argv[2])

// interface IRegion {
// 	top: number
// 	left: number
// 	width: number
// 	height: number
// }

export const computeRegion = (column, row) => (height, width) => (tileLength) => {
	const xCoordinate = column * tileLength
	const yCoordinate = row * tileLength
	// use image length instead of tile length if image length is shorter than tile length.
	return {
		top: yCoordinate,
		left: xCoordinate,
		width: Math.min(tileLength, width),
		height: Math.min(tileLength, height)
	}
}



describe("tile photo test", () => {
	// let farm;

	// beforeEach(() => {
	// 	farm = new Farm(20);
	// });

	it("should be able to compute correct region top", () => {
		expect(computeRegion(10,10)(256,256)(256).top).to.equal(2560);
	})

	it("should be able to compute correct region left", () => {

		expect(computeRegion(1,1)(256,256)(256).left).to.equal(256);
	});

	it("should be able to compute correct region width when image width is shorter than tile length", () => {

		expect(computeRegion(2,2)(200,200)(300).width).to.equal(200);
	});

	it("should be able to compute correct region height when image height is longer than tile length", () => {
		expect(computeRegion(2,2)(400,500)(300).height).to.equal(300);
	});


});