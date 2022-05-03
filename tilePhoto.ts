import sharp from "sharp";
import fs from "fs";
import { computeRegion } from "./utils";

/**
 * compress a photo and crop it into a bunch of tiles.
 * @param imagePath path of a image.
 * @param tileLength length of tile(optional, default 256).
 * @throws {Error} Invalid parameters
 */
const tilePhoto = async (imagePath: string, tileLength: number): Promise<void> => {
	if (!(tileLength > 0)) {
		console.error("Please input correct tile length! By default it is 256")
		return
	}
	const image = sharp(imagePath);
	const { height, width } = await image.metadata();
	const levelNumber = 1 + Math.log2(Math.max(height, width))
	for (let l = 0; l < levelNumber; l++) {
		// compressed resolution of the image, keep at least 1 pixel for each dimension.
		const compressedHeight = Math.floor(height / (2 ** (levelNumber - l - 1))) || 1;
		const compressedWidth = Math.floor(width / (2 ** (levelNumber - l - 1))) || 1;
		// number of tiles on each dimension,trim the edge which is shorter than tileLength, keep at least one tile.
		const rowNumber = Math.floor(compressedHeight / tileLength) || 1;
		const columnNumber = Math.floor(compressedWidth / tileLength) || 1;
		// compress the image
		const compressedImage = image.resize({ width: compressedWidth, height: compressedHeight })
		// init directory for generated images
		const dir = `./output/${imagePath}_${l}`;
		if (fs.existsSync(dir)) {
			fs.rmSync(dir, { recursive: true, force: true });
		}
		fs.mkdirSync(dir);
		//crop the image as a couple of tiles and output them
		for (let r = 0; r < rowNumber; r++) {
			for (let c = 0; c < columnNumber; c++) {
				const region = computeRegion(c, r)(compressedHeight, compressedWidth)(tileLength)
				// README requires file name as "L/x_y.jpg", while "/" is strongly not recommended in a file name. Here use \uFF0F.
				compressedImage.extract(region)
					.toFile(`${dir}/${l}\uFF0F${region.left}_${region.top}.jpg`)
					.catch((err: Error) => { console.error(err) });
			}
		}
	}
}

export default tilePhoto;