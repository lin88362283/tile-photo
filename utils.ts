interface IRegion {
	top: number
	left: number
	width: number
	height: number
}

/**
 * compute region of a tile
 * @param column column number of the region.
 * @param row column number of the region.
 * @param height height of the image.
 * @param width width of the image.
 * @param tileLength length of tile.
 * @returns {IRegion} A region object that can be used to crop a tile from the image.
 */
export const computeRegion = (column: number, row: number) => (height: number, width: number) => (tileLength: number): IRegion => {
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