currentDir ?= $(shell pwd)

generateTiles:
	docker run -v $(currentDir):/tile-photo/output tile-photo $(imagePath) $(tileLength)
	