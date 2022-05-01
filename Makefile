currentDir ?= $(shell pwd)
imageUrl ?= Cat.jpg

generateTiles:
	docker run -v $(currentDir):/tile-photo/output tile-photo $(imageUrl)
	