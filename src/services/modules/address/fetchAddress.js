export default build =>
  build.query({
    query: () => `/client/profile/get-addresses`,
  })
