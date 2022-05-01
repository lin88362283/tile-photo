interface IRegion {
	top: number
	left: number
	width: number
	height: number
}

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