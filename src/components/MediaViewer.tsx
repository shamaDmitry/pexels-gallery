export const MediaViewer = ({ type, media }) => {
  if (!media) return null;

  if (type.name === "videos" && "video_files" in media) {
    return (
      <>
        <video
          src={media?.video_files[0].link}
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
        />

        <a
          href={media.user?.url}
          target="_blank"
          className="z-50 absolute bottom-2 right-2 text-white opacity-50 hover:opacity-100 transition-opacity"
        >
          Video by {media.user?.name}
        </a>
      </>
    );
  }
  if (type.name === "photos" && "src" in media) {
    return (
      <>
        <img
          className="w-full h-full object-cover"
          src={media?.src?.landscape}
          alt={media?.alt || ""}
        />

        <a
          href={media?.photographer_url}
          target="_blank"
          className="z-50 absolute bottom-2 right-2 text-white opacity-50 hover:opacity-100 transition-opacity"
        >
          Photo by {media?.photographer}
        </a>
      </>
    );
  }
};
