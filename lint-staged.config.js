export default {
	"*": ["prettier --write --cache"],
	"*.{js,ts,jsx,tsx,cjs,mjs}": ["eslint --fix --cache"],
	"*.{ts,tsx,json}": ["sh -c 'tsc --noEmit'"],
};
