import sharp from "sharp";
import { TILELENGTH } from "./constants";
import fs from 'fs';

/**
 * compress a photo and crop it into a bunch of tiles.
 * @param imageUrl url of a photo.
 * @param tileLength length of tile(optional, default 256).
 * @throws {Error}
 */
const tilePhoto = async (imageUrl: string, tileLength: number = TILELENGTH): Promise<void> => {
	const image = sharp(imageUrl);
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
		// init directory for tiles
		const dir = `./output/${imageUrl}_${l}`;
		if (fs.existsSync(dir)) {
			fs.rmSync(dir, { recursive: true, force: true });
		}
		fs.mkdirSync(dir);
		//crop the image as a couple of tiles and output them
		for (let r = 0; r < rowNumber; r++) {
			for (let c = 0; c < columnNumber; c++) {
				const xCoordinate = c * tileLength
				const yCoordinate = r * tileLength
				// use image length instead of tile length if image length is shorter than tile length.
				const region = {
					top: yCoordinate,
					left: xCoordinate,
					width: Math.min(tileLength, compressedWidth),
					height: Math.min(tileLength, compressedHeight)
				}
				//TODO: README requires file name as "L/x_y.jpg", while "/" is strongly not recommended in a file name. Here use \uFF0F.
				compressedImage.extract(region)
					.toFile(`${dir}/${l}\uFF0F${xCoordinate}_${yCoordinate}.jpg`)
					.catch(err => { console.error(err) });
			}
		}

	}
}



export default tilePhoto;

