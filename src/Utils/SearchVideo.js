export const SearchVideo = (video, searchKey) =>
  searchKey.length > 0
    ? video?.filter(({ title }) =>
        title.toLowerCase().includes(searchKey.toLowerCase())
      )
    : video;
