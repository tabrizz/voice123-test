export const fetchVoiceActors = async ({ page, keywords }) => {
  const headers = new Headers({
    "Content-Type": "text/json",
  })
  const queryParams = new URLSearchParams({ page, service: "voice_over" })
  if (keywords) queryParams.append("keywords", keywords)

  const response = await fetch(
    `https://api.sandbox.voice123.com/providers/search/?${queryParams.toString()}`,
    {
      headers,
    }
  )

  const pageSize = response.headers.get("x-list-page-size")
  const currentPage = response.headers.get("x-list-current-page")
  const totalPages = response.headers.get("x-list-total-pages")
  const totalRows = response.headers.get("x-list-total-rows")
  const data = await response.json()

  return { data, pageSize, currentPage, totalPages, totalRows }
}