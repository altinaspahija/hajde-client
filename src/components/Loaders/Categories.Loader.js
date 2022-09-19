import React from 'react'
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native"

const Categories = props => (
  <ContentLoader
    speed={2}
    width={500}
    height={100}
    viewBox="0 0 500 100"
    backgroundColor="#f0f0f0"
    foregroundColor="#dedede"
    {...props}
  >
    <Circle cx="46" cy="38" r="30" />
    <Rect x="25" y="75" rx="5" ry="5" width="45" height="10" />
    <Circle cx="137" cy="38" r="30" />
    <Rect x="115" y="75" rx="5" ry="5" width="45" height="10" />
    <Circle cx="228" cy="38" r="30" />
    <Rect x="205" y="75" rx="5" ry="5" width="45" height="10" />
    <Circle cx="320" cy="38" r="30" />
    <Rect x="295" y="75" rx="5" ry="5" width="45" height="10" />
    <Circle cx="410" cy="38" r="30" />
    <Rect x="385" y="75" rx="5" ry="5" width="45" height="10" />
  </ContentLoader>
)

export default Categories