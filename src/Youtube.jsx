import React from "react";

// Component for a single video preview and paragraph
const VideoPreview = ({ videoLink, description }) => (
  <div
    style={{
      margin: "10px",
      textAlign: "center",
      borderRadius: "1em",
      marginTop: "5em",
    }}
  >
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
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          padding: "0 5em",
        }}
      >
        {/* Map through the video data and render VideoPreview component */}
        {videoData.map((data, index) => (
          <VideoPreview
            key={index}
            videoLink={data.videoLink}
            description={data.description}
          />
        ))}
      </div>
      <div style={{ marginTop: "2em" }}>
        <div style={{ textAlign: "left" }}>
          <h1
            style={{
              fontFamily: "Monsterat, sans-serif",
              fontWeight: "bold",
              padding: "0 2em",
            }}
          >
            Understanding Food Wastage: A Call to Action
          </h1>
        </div>
        <div style={{ textAlign: "left" }}>
          <p style={{ fontFamily: "Monsterat, sans-serif", padding: "0 6em" }}>
            A Call to Action for Sustainable Change. Considering approximately
            nine million people die from hunger and hunger-related diseases
            every year, the staggering 1.3 billion tonnes of food that doesn't
            get eaten every year could potentially feed the world's hungry
            several times over.
          </p>
        </div>
        <div style={{ textAlign: "left" }}>
          <p style={{ fontFamily: "Monsterat, sans-serif", padding: "0 6em" }}>
            This accounts for roughly a third of all the food produced globally,
            this level of waste is unsustainable – environmentally,
            economically, and morally. The stark reality of these figures calls
            for a united front in combatting the issue of food waste, a critical
            lever in addressing the intertwined challenges of hunger,
            environmental degradation and climate change.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Youtube;
