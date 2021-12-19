import { ITable } from "../components/Table";

function setSort(sorts:Array<[string, boolean]>, key: string) {
	const match = sorts.find(e => e[0] === key)
	if (match) {
		if (match[1]) match[1] = false;
		else {
			sorts = sorts.filter(e => e[0] !== key);
		}
	} else {
		sorts.push([key, true]);
	}
	
	return sorts;
}

function applySorting(data: ITable, sorts: Array<[string, boolean]>) {

	sorts.forEach(sort => {
		const [key, ascending] = sort;
		data = data.sort((row1, row2) => {
			if (String(row1[key]).toUpperCase() > String(row2[key]).toUpperCase()) return ascending ? 1 : -1;
			if (String(row1[key]).toUpperCase() < String(row2[key]).toUpperCase()) return ascending ? -1 : 1;
			return 0;
		})
	});

	return data;
}

export default {
	setSort,
	applySorting
}