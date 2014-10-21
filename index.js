var es = require('event-stream')
var getusermedia = require('getusermedia')

var FFTStream = require('./fft-stream')
var FFTHelper = require('./fft-helper')

module.exports = function(nGroups) {
  var outStream = es.pause()

  var opts = { audio: true }

  getusermedia(opts, function(err, stream) {
    if (err) return console.error(err)

    var aCtx = new AudioContext()
    var analyser = aCtx.createAnalyser()
    var microphone = aCtx.createMediaStreamSource(stream)
    var fftStream = FFTStream(microphone, aCtx)
    var fftHelper = FFTHelper(nGroups)

    fftStream.pipe(fftHelper).pipe(outStream)
  })

  return outStream
}
