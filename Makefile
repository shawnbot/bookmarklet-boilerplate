COMPRESSOR = java -jar tools/yuicompressor-2.4.2.jar

all: bookmarklet.min.js

%.min.js: %.js
	$(COMPRESSOR) $< > $@

clean:
	rm -f js/*.min.js
