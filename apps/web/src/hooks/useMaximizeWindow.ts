import { useEffect } from 'react'

const toggleFullscreen = () => {
  const doc = window.document as any
  const docEl = doc.documentElement

  const requestFullScreen =
    docEl.requestFullscreen ||
    docEl.mozRequestFullScreen ||
    docEl.webkitRequestFullScreen ||
    docEl.msRequestFullscreen
  var cancelFullScreen =
    doc.exitFullscreen ||
    doc.mozCancelFullScreen ||
    doc.webkitExitFullscreen ||
    doc.msExitFullscreen

  if (
    !doc.fullscreenElement &&
    !doc.mozFullScreenElement &&
    !doc.webkitFullscreenElement &&
    !doc.msFullscreenElement
  ) {
    requestFullScreen.call(docEl)
  } else {
    cancelFullScreen.call(doc)
  }
}

const useMazimizeWindow = () => {
  useEffect(() => {
    try {
      toggleFullscreen()
    } catch (e) {}
  }, [])
}

export default useMazimizeWindow
