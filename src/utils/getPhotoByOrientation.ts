export const getMediaOrientation = (media: { width: number; height: number }) => {
  if (media.width > media.height) {
    return 'landscape'
  } else {
    return 'portrait'
  }
}
