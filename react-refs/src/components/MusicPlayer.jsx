import { useCallback, useEffect, useRef, useState } from "react"
import track from "../assets/demo-track.wav"

function formatTime(seconds) {
	if (!Number.isFinite(seconds)) return "0:00"
	const m = Math.floor(seconds / 60)
	const s = Math.floor(seconds % 60)
	return `${m}:${String(s).padStart(2, "0")}`
}

export function MusicPlayer() {
	const audioRef = useRef(null)
	const intervalRef = useRef(null)
	const [isPlaying, setIsPlaying] = useState(false)
	const [currentTime, setCurrentTime] = useState(0)
	const [duration, setDuration] = useState(0)

	const startTimer = useCallback(() => {
		if (intervalRef.current) return
		intervalRef.current = setInterval(() => {
			setCurrentTime(audioRef.current.currentTime)
		}, 1000)
	}, [])

	const stopTimer = useCallback(() => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current)
			intervalRef.current = null
		}
	}, [])

	useEffect(() => {
		const audio = audioRef.current

		const handleEnded = () => {
			audio.currentTime = 0
			setCurrentTime(0)
			setIsPlaying(false)
			stopTimer()
		}

		const handleLoadedMetadata = () => {
			setDuration(audio.duration)
		}

		audio.addEventListener("ended", handleEnded)
		audio.addEventListener("loadedmetadata", handleLoadedMetadata)

		return () => {
			audio.removeEventListener("ended", handleEnded)
			audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
			stopTimer()
		}
	}, [stopTimer])

	const handlePlay = () => {
		audioRef.current.play()
		setIsPlaying(true)
		startTimer()
	}

	const handlePause = () => {
		audioRef.current.pause()
		setIsPlaying(false)
		stopTimer()
	}

	const handleStop = () => {
		const audio = audioRef.current
		audio.pause()
		audio.currentTime = 0
		setIsPlaying(false)
		stopTimer()
		setCurrentTime(0)
	}

	const handleRewind = () => {
		const audio = audioRef.current
		audio.currentTime = Math.max(0, audio.currentTime - 10)
		setCurrentTime(audio.currentTime)
	}

	const progressPercent = duration ? Math.min(100, (currentTime / duration) * 100) : 0

	return (
		<div className="app-player">
			<audio ref={audioRef} src={track} preload="metadata" />

			<p className="app-player__time">
				Время: {formatTime(currentTime)} / {formatTime(duration)}
			</p>

			<div className="app-player__progress" aria-hidden="true">
				<div className="app-player__progress-bar" style={{ width: `${progressPercent}%` }} />
			</div>

			<div className="app-player__controls">
				<button className="app-player__button" type="button" onClick={handlePlay} disabled={isPlaying}>
					▶️ Воспроизвести
				</button>
				<button className="app-player__button" type="button" onClick={handlePause} disabled={!isPlaying}>
					⏸️ Пауза
				</button>
				<button className="app-player__button" type="button" onClick={handleStop}>
					⏹️ Остановить
				</button>
				<button className="app-player__button" type="button" onClick={handleRewind}>
					⏪ −10 секунд
				</button>
			</div>

			<p className="app-player__hint">
				Когда трек закончится, он автоматически перемотается на начало.
			</p>
		</div>
	)
}
