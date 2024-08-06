export { default } from './BalanceSelect.svelte';

export function getPrecisedAmount(amount: number, precision = 8) {
	const a = parseFloat(
		(Math.floor(amount * Math.pow(10, precision)) / Math.pow(10, precision)).toString(),
	).toFixed(precision);

	if (a !== 'NaN') {
		return a;
	} else {
		return '';
	}
}
