currentDir ?= $(shell pwd)

tilePhoto:
	docker run -v $(currentDir):/tile-photo/output tile-photo $(imagePath) $(tileLength)
	