import React from "react";
import ContentLoader from "react-content-loader";

const BigMovieLoader = (props) => (
  <ContentLoader
    speed={2}
    width={600}
    height={300}
    viewBox="0 0 600 300"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="9" y="172" rx="3" ry="3" width="150" height="10" />
    <rect x="-1" y="256" rx="3" ry="3" width="73" height="12" />
    <rect x="-173" y="156" rx="3" ry="3" width="410" height="6" />
    <rect x="-314" y="534" rx="3" ry="3" width="251" height="4" />
    <rect x="571" y="609" rx="3" ry="3" width="178" height="6" />
    <circle cx="705" cy="594" r="117" />
    <rect x="-128" y="610" rx="0" ry="0" width="49" height="12" />
    <circle cx="613" cy="553" r="24" />
    <rect x="-2" y="211" rx="24" ry="24" width="116" height="26" />
    <rect x="5" y="49" rx="0" ry="0" width="229" height="82" />
    <rect x="169" y="170" rx="0" ry="0" width="58" height="18" />
    <circle cx="542" cy="526" r="47" />
    <rect x="124" y="211" rx="24" ry="24" width="119" height="26" />
    <rect x="87" y="258" rx="3" ry="3" width="61" height="10" />
    <rect x="162" y="258" rx="3" ry="3" width="73" height="12" />
    <rect x="255" y="80" rx="0" ry="0" width="360" height="175" />
  </ContentLoader>
);

export default BigMovieLoader;
