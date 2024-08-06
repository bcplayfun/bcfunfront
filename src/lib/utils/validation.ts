import type { Failure } from 'superstruct';

// export function getMyError(arr: Failure[], key: string): Failure {
// 	return arr.filter((item: Failure) => item.key == key)[0];
// }

export function mapErrors(arr: Failure[]): Record<string, Failure> {
	return arr.reduce((acc, curr) => ({ ...acc, [curr.key]: curr }), {} as Record<string, Failure>);
}

//is-email
const matcher =
	/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
export function isEmail(string: any) {
	if (string.length > 320) return false;
	return matcher.test(string);
}
