import { useState } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  FileText,
} from "lucide-react";

const MediaViewer = ({
  type = "article",
  src,
  poster,
  title,
  content,
  caption,
  className = "",
  controls = true,
  autoPlay = false,
  muted = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);

  const handleVideoPlay = () => {
    setIsPlaying(true);
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
  };

  /*
   * Article / text content
   */
  if (type === "article") {
    return (
      <article
        className={`rounded-xl bg-white ${className}`}
      >
        {title && (
          <h1 className="mb-4 text-2xl font-bold leading-tight text-gray-900">
            {title}
          </h1>
        )}

        <div className="prose max-w-none text-gray-700">
          {typeof content === "string" ? (
            <p className="whitespace-pre-wrap leading-7">
              {content}
            </p>
          ) : (
            content
          )}
        </div>
      </article>
    );
  }

  /*
   * Image content
   */
  if (type === "image") {
    return (
      <figure className={`overflow-hidden rounded-xl ${className}`}>
        <img
          src={src}
          alt={title || caption || "Content image"}
          className="h-auto max-h-[600px] w-full object-contain"
        />

        {caption && (
          <figcaption className="mt-2 text-center text-sm text-gray-500">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }

  /*
   * Video content
   */
  if (type === "video") {
    return (
      <div
        className={`relative overflow-hidden rounded-xl bg-black ${className}`}
      >
        <video
          src={src}
          poster={poster}
          controls={controls}
          autoPlay={autoPlay}
          muted={isMuted}
          onPlay={handleVideoPlay}
          onPause={handleVideoPause}
          className="h-auto max-h-[600px] w-full"
        />

        {!controls && (
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <button
              type="button"
              onClick={(event) => {
                const video = event.currentTarget
                  .closest("div")
                  ?.previousElementSibling;

                if (!video) return;

                if (video.paused) {
                  video.play();
                } else {
                  video.pause();
                }
              }}
              className="rounded-full bg-black/70 p-3 text-white transition hover:bg-black/90"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? (
                <Pause size={20} />
              ) : (
                <Play size={20} />
              )}
            </button>

            <button
              type="button"
              onClick={() => setIsMuted((previous) => !previous)}
              className="rounded-full bg-black/70 p-3 text-white transition hover:bg-black/90"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? (
                <VolumeX size={20} />
              ) : (
                <Volume2 size={20} />
              )}
            </button>
          </div>
        )}
      </div>
    );
  }

  /*
   * Audio content
   */
  if (type === "audio") {
    return (
      <div
        className={`rounded-xl border border-gray-200 bg-gray-50 p-4 ${className}`}
      >
        {title && (
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <Volume2 size={20} />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-gray-900">
                {title}
              </h2>

              {caption && (
                <p className="text-xs text-gray-500">
                  {caption}
                </p>
              )}
            </div>
          </div>
        )}

        <audio
          src={src}
          controls={controls}
          autoPlay={autoPlay}
          muted={isMuted}
          className="w-full"
        />
      </div>
    );
  }

  /*
   * Fallback
   */
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-gray-50 p-8 text-center ${className}`}
    >
      <FileText
        size={32}
        className="mb-2 text-gray-400"
      />

      <p className="text-sm text-gray-500">
        Unsupported content type.
      </p>
    </div>
  );
};

export default MediaViewer;