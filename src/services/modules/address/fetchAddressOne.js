export default build =>
  build.query({
    query: id => `/client/profile/get-addresses?_id=${id}`,
  })
