import React from "react";
import ContentLoader from "react-content-loader";

const MovieBlockPreloader = (props) => (
  <ContentLoader
    speed={2}
    width={300}
    height={400}
    viewBox="0 0 300 400"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="9" y="172" rx="3" ry="3" width="150" height="10" />
    <rect x="425" y="134" rx="3" ry="3" width="73" height="12" />
    <rect x="416" y="72" rx="3" ry="3" width="410" height="6" />
    <rect x="-314" y="534" rx="3" ry="3" width="251" height="4" />
    <rect x="571" y="609" rx="3" ry="3" width="178" height="6" />
    <circle cx="705" cy="594" r="117" />
    <rect x="-128" y="610" rx="0" ry="0" width="49" height="12" />
    <circle cx="613" cy="553" r="24" />
    <rect x="382" y="188" rx="24" ry="24" width="116" height="26" />
    <rect x="5" y="263" rx="0" ry="0" width="157" height="18" />
    <rect x="131" y="292" rx="0" ry="0" width="30" height="22" />
    <circle cx="542" cy="526" r="47" />
    <rect x="2" y="291" rx="24" ry="24" width="68" height="26" />
    <rect x="447" y="83" rx="3" ry="3" width="61" height="10" />
    <rect x="466" y="144" rx="3" ry="3" width="73" height="12" />
    <rect x="5" y="6" rx="0" ry="0" width="157" height="245" />
    <rect x="282" y="127" rx="0" ry="0" width="0" height="9" />
    <rect x="273" y="139" rx="0" ry="0" width="1" height="0" />
  </ContentLoader>
);

export default MovieBlockPreloader;
