export function search(listData) {
  let related = listData.filter(
    (post) =>
      post.title.toLowerCase().indexOf(filters.s.toLowerCase()) >= 0 ||
      post.description.toLowerCase().indexOf(filters.s.toLowerCase()) >= 0
  )
  return listData
}

export function sort(listData, type) {
  listData.sort((a, b) => {
    const aDate = new Date(a.date)
    const bDate = new Date(b.date)
    const diff = aDate - bDate

    if (diff === 0) return 0

    const sign = Math.abs(diff) / diff

    return type === 'asc' ? sign : -sign
  })
  return listData
}
