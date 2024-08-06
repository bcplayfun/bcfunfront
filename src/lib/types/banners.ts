export type Image = {
	id: string;
	url: string;
	type: string;
};

export type Banner = {
	title: string;
	subtitle: string;
	url: string;
	desktop_image: Image;
	mobile_image: Image;
};

export const EMPTY_IMAGE: Image = {
	url: '',
	id: '0',
	type: ''
};

export const EMPTY_BANNER: Banner = {
	title: '',
	subtitle: '',
	url: '',
	desktop_image: EMPTY_IMAGE,
	mobile_image: EMPTY_IMAGE
};
