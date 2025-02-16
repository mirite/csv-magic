/** @filename: lint-staged.config.js */
export default {
	"*": ["prettier --write --cache"],
	"*.{ts,tsx,json}": ["sh -c 'tsc --noEmit'"],
	"*.{js,ts,jsx,tsx,cjs,mjs}": ["eslint --fix --cache"],
};
