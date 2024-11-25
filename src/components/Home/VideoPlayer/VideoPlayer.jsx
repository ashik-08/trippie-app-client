const VideoPlayer = () => {
  return (
    <div className="lg:h-[85vh]">
      <div className="relative w-full h-full">
        {/* Video Element */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full lg:object-cover"
        >
          <source
            src="https://res.cloudinary.com/ashikur-rahman/video/upload/v1732545365/cloudyMountain_vzwtb3.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/30"></div>
      </div>
    </div>
  );
};

export default VideoPlayer;
