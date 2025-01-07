export type VideoFeedType = {
	'video_uuid': string;
	'video_title': string;
	'createdAt': string;
	'user.username': string;
	'video_length': number;
	'rating': number;
	'rating_pool': number;
};

export type VideoCommentType = {
	comment_id: string;
	user_id: string;
	video_id: string;
	comment: string;
	created_at: string;
};

export type VideoDescription = {
	video_title: string;
	createdAt: Date;
	username: string;
	rating_percentage: number;
};

export type Video = {
	url: string;
	video_title: string;
	createdAt: Date;
	username: string;
	rating_percentage: number;
};
