.PHONY: dev build preview install

node_modules: package.json
	npm install
	@touch node_modules

install: node_modules

dev: node_modules
	npm run dev

build: node_modules
	npm run build

preview: node_modules
	npm run preview
