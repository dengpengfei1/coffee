(function (doc, win) {
  let docEle = doc.documentElement
  let eve = 'orientationchange' in window ? 'orientationchange' : 'resize'
  let recalc = () => {
    let clientWidth = docEle.clientWidth
    if (!clientWidth) return
    docEle.style.fontSize = 20 / 320 * clientWidth + 'px'
  }
  win.addEventListener(eve, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)