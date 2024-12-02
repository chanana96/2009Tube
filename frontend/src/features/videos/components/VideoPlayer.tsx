import * as React from 'react';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';
import 'video.js/dist/video-js.css';

export const VideoJS = ({ url }: { url: string }) => {
	const videoRef = React.useRef<HTMLDivElement>(null);
	const playerRef = React.useRef<Player | null>(null);

	const savedVolume = localStorage.getItem('volume');
	const savedMuted = localStorage.getItem('muted');

	const videoContainerStyle = {
		width: '1230px',
		height: '700px',
	};

	const options = {
		autoplay: true,
		controls: true,
		responsive: true,
		fluid: true,
		sources: [
			{
				src: url,
				type: 'application/x-mpegURL',
			},
		],
	};

	const onReady = (player: Player) => {
		playerRef.current = player;

		player.volume(savedVolume ? parseFloat(savedVolume) : 0.5);
		player.muted(savedMuted === 'true');

		player.on('volumechange', () => {
			const volume = player.volume();
			localStorage.setItem('muted', String(player.muted()));
			localStorage.setItem('volume', String(volume));
		});

		player.on('waiting', () => {});

		player.on('dispose', () => {});
	};

	React.useEffect(() => {
		if (!playerRef.current) {
			const videoElement = document.createElement('video-js');
			videoElement.classList.add('vjs-big-play-centered');

			if (videoRef.current) {
				videoRef.current.appendChild(videoElement);
			}

			const player = (playerRef.current = videojs(videoElement, options, () => {
				videojs.log('player is ready');

				onReady && onReady(player);
			}));
		} else {
			const player = playerRef.current;
			player.autoplay(options.autoplay);
			player.src(options.sources);
		}
	}, [options, videoRef]);

	React.useEffect(() => {
		const player = playerRef.current;

		return () => {
			if (player && !player.isDisposed()) {
				player.dispose();
				playerRef.current = null;
			}
		};
	}, [playerRef]);

	return (
		<div data-vjs-player>
			<div ref={videoRef} style={videoContainerStyle} />
		</div>
	);
};

export default VideoJS;
