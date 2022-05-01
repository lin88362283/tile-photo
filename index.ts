import tilePhoto from "./tilePhoto";
import { TILELENGTH } from './constants';

const tileLength = process.argv[3] === undefined ? TILELENGTH : parseInt(process.argv[3])
tilePhoto(process.argv[2], tileLength)