export default build =>
  build.mutation({
    query: (id) => ({
        url: `/client/profile/remove-address/${id}`,
        method: 'DELETE'
    })
  })
