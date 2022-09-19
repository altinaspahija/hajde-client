export default build =>
  build.query({
    query: () => `/locations/get-cities`,
  })
