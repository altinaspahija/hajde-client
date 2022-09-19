import React from "react";
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native";

const Restaurant = (props) => (
  <ContentLoader
    {...props}
    speed={2}
    width={"100%"}
    height={120}
    viewBox="0 0 100% 100"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <Rect x="0" y="0" rx="10" ry="10" width="100%" height="80%" />

    <Circle cx="5%" cy="90%" r="8" />
    <Rect x="10%" y="85%" rx="0" ry="0" width="90" height="7" />
    <Rect x="80%" y="85%" rx="0" ry="0" width="50" height="7" />
  </ContentLoader>
);

export default Restaurant;
