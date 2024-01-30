import React from "react";

// Component for a single video preview and paragraph
const VideoPreview = ({ videoLink, description }) => (
  <div style={{ margin: "10px", textAlign: "center", }}>
    <iframe
      width="300"
      height="200"
      src={videoLink}
      title="YouTube Video Preview"
      frameBorder="1"
      allowFullScreen
      
    ></iframe>
    <p>{description}</p>
  </div>
);

function Youtube() {
  // Sample data for video previews
  const videoData = [
    {
      videoLink: "https://www.youtube.com/embed/VIDEO_ID_1",
      description: "Description for Video 1",
    },
    {
      videoLink: "https://www.youtube.com/embed/VIDEO_ID_2",
      description: "Description for Video 2",
    },
    {
      videoLink: "https://www.youtube.com/embed/VIDEO_ID_2",
      description: "Description for Video 3",
    },
    {
      videoLink: "https://www.youtube.com/embed/VIDEO_ID_2",
      description: "Description for Video 4",
    },
    // Add more video data as needed
  ];

  return (
    <div
      style={{
        marginTop: "5em",
        textAlign: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap",padding:"0 5em", }}>
        {/* Map through the video data and render VideoPreview component */}
        {videoData.map((data, index) => (
          <VideoPreview
            key={index}
            videoLink={data.videoLink}
            description={data.description}
          />
        ))}
      </div>
    </div>
  );
}

export default Youtube;
