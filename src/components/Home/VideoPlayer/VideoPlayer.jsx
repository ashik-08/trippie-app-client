const VideoPlayer = () => {
  return (
    <div className="relative">
      {/* Video Element */}
      <video autoPlay loop muted playsInline>
        <source
          src="https://res.cloudinary.com/ashikur-rahman/video/upload/v1732535435/foggyMorningNarrowRoad_rzslnt.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/30"></div>
    </div>
  );
};

export default VideoPlayer;
