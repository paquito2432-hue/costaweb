import * as React from "react";
import { cn } from "@/lib/utils";
import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoPlayerProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  className?: string;
  showControls?: boolean;
}

const VideoPlayer = React.forwardRef<HTMLVideoElement, VideoPlayerProps>(
  ({ src, className, showControls = true, ...props }, ref) => {
    const videoRef = React.useRef<HTMLVideoElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [currentTime, setCurrentTime] = React.useState(0);
    const [duration, setDuration] = React.useState(0);
    const [volume, setVolume] = React.useState(1);
    const [isMuted, setIsMuted] = React.useState(false);
    const [showCustomControls, setShowCustomControls] = React.useState(false);

    // Combine refs
    React.useImperativeHandle(ref, () => videoRef.current!);

    React.useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      const updateTime = () => setCurrentTime(video.currentTime);
      const updateDuration = () => setDuration(video.duration);
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleEnded = () => setIsPlaying(false);

      video.addEventListener("timeupdate", updateTime);
      video.addEventListener("loadedmetadata", updateDuration);
      video.addEventListener("play", handlePlay);
      video.addEventListener("pause", handlePause);
      video.addEventListener("ended", handleEnded);

      // Set initial volume
      video.volume = volume;
      video.muted = isMuted;

      return () => {
        video.removeEventListener("timeupdate", updateTime);
        video.removeEventListener("loadedmetadata", updateDuration);
        video.removeEventListener("play", handlePlay);
        video.removeEventListener("pause", handlePause);
        video.removeEventListener("ended", handleEnded);
      };
    }, [volume, isMuted]);

    const togglePlay = () => {
      const video = videoRef.current;
      if (!video) return;

      if (isPlaying) {
        video.pause();
      } else {
        video.play().catch(console.error);
      }
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const video = videoRef.current;
      if (!video) return;

      const newTime = parseFloat(e.target.value);
      video.currentTime = newTime;
      setCurrentTime(newTime);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVolume = parseFloat(e.target.value);
      const video = videoRef.current;
      if (!video) return;

      video.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    };

    const toggleMute = () => {
      const video = videoRef.current;
      if (!video) return;

      const newMuted = !isMuted;
      video.muted = newMuted;
      setIsMuted(newMuted);
      if (newMuted) {
        setVolume(0);
      } else {
        setVolume(video.volume || 0.5);
      }
    };

    const toggleFullscreen = () => {
      const container = containerRef.current;
      if (!container) return;

      if (!document.fullscreenElement) {
        container.requestFullscreen().catch(console.error);
      } else {
        document.exitFullscreen();
      }
    };

    const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    return (
      <div
        ref={containerRef}
        className={cn(
          "relative w-full h-full overflow-hidden group",
          className
        )}
        onMouseEnter={() => setShowCustomControls(true)}
        onMouseLeave={() => setShowCustomControls(false)}
      >
        <video
          ref={videoRef}
          src={src}
          className="absolute inset-0 w-full h-full object-cover"
          playsInline
          preload="metadata"
          {...props}
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/50 via-navy-deep/20 to-transparent pointer-events-none" />

        {/* Custom controls */}
        {showControls && (
          <div
            className={cn(
              "absolute bottom-0 left-0 right-0 p-4 transition-opacity duration-300",
              showCustomControls ? "opacity-100" : "opacity-0"
            )}
            onMouseEnter={() => setShowCustomControls(true)}
            onMouseLeave={() => setShowCustomControls(false)}
          >
            {/* Progress bar */}
            <div className="mb-3">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleTimeChange}
                className="w-full h-1.5 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                style={{
                  background: `linear-gradient(to right, hsl(46 100% 61%) ${(currentTime / duration) * 100 || 0}%, rgba(255,255,255,0.3) ${(currentTime / duration) * 100 || 0}%)`,
                }}
              />
              <div className="flex justify-between text-xs text-white/80 mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Control buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 bg-white/20 hover:bg-white/30 text-white rounded-full"
                  onClick={togglePlay}
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 bg-white/20 hover:bg-white/30 text-white rounded-full"
                    onClick={toggleMute}
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="h-4 w-4" />
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                  </Button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-1.5 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                  />
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 bg-white/20 hover:bg-white/30 text-white rounded-full"
                onClick={toggleFullscreen}
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Play button overlay when paused */}
        {!isPlaying && showControls && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="h-16 w-16 bg-white/30 hover:bg-white/40 text-white rounded-full backdrop-blur-sm"
              onClick={togglePlay}
            >
              <Play className="h-8 w-8" />
            </Button>
          </div>
        )}
      </div>
    );
  }
);

VideoPlayer.displayName = "VideoPlayer";

export { VideoPlayer };