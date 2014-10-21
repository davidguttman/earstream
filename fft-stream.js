var raf = require('raf')
var pause = require('event-stream').pause

module.exports = function(source, audioContext) {
  var analyser = audioContext.createAnalyser()
  analyser.fftSize = 128
  source.connect(analyser)

  var freqData = new Uint8Array(analyser.frequencyBinCount)

  var fftStream = pause()
  fftStream.source = source

  var gain = audioContext.createGain()
  fftStream.gain = gain

  function read () {
    analyser.getByteFrequencyData(freqData)

    var freqs = []
    for (var i = freqData.length - 1; i >= 0; i--) {
      freqs[i] = freqData[i]
    }

    fftStream.write({freqs: freqs})
  }

  function tick () {
    raf(tick)
    return read()
  }

  tick()

  return fftStream
}
