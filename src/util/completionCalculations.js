/* 
 * Deduces if the provincia is complete or not 
 * @param {object} an element that includes a completed count for the cimero and a total
 * @return {boolean}
*/

export const isComplete = function (el) {
	if (el.completed >= el.total) return true
	return false
}

/* 
 * Returns most logical completed total
 * @param {array} users logros in the province
 * @param {array} active cimas in the province
 * @param {boolean} only count the active logros (filters the logros and returns the total)
 * @return {boolean}
*/

export const completedTtl = function (logros,active,activeOnly = false) {
	if (activeOnly) return logros.filter(l => l.cima_estado === 1).length
	return logros.length > active.length ? active.length : logros.length;
}

/* 
 * Returns most logical to complete number 
 * @param {array} users logros in the province
 * @param {array} active cimas in the province
 * @param {boolean} count against only the users active cimas. Defaults to false
 * @return {boolean}
*/

export const toComplete = function (logros,active,activeOnly = false) {
	if (activeOnly) logros = logros.filter(l => l.cima_estado === 1)
	if (logros.length >= active.length) return 0;
	return active.length - logros.length
}

/* 
 * Returns a logical completion text bar. Example 11/14
 * @param {object} element with completed and total number. 
 						Total is the active cimas in the element
 						Completed is the number of user logros in the element
 * @param {boolean} include the element name in the final text bar. Defaults to true
 * @return {string}
*/

export const textBar = function (el, name = true) {
	const total = el.completed > el.total ? el.total : el.completed;
	const stats = total + " / " + el.total;
	return name ? el.nombre + " " + stats : stats;
}
