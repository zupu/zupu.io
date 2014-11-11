sitefolder = _site

help:
	@echo 'make post name=blog-file-name'
	@echo 'make watch'
	@echo 'make build'
	@echo 'make publish'
	@echo 'make drafts'

watch:
	@nico server --watch

build:
	@nico build

publish: clean build
	@ghp-import ${sitefolder}
	@git push origin gh-pages

clean:
	@rm -fr ${sitefolder}
