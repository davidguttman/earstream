var through = require('event-stream').through

var boosts = [1, 1.070921985815603, 1.2479338842975207, 1.3482142857142856, 1.411214953271028, 1.451923076923077, 1.4803921568627452, 1.5099999999999998, 1.556701030927835, 1.5894736842105264, 1.6063829787234043, 1.6236559139784945, 1.641304347826087, 1.6593406593406594, 1.696629213483146, 1.715909090909091, 1.7356321839080462, 1.7356321839080462, 1.755813953488372, 1.7764705882352942, 1.7976190476190477, 1.8414634146341464, 1.8641975308641976, 1.8875, 1.9113924050632911, 1.935897435897436, 2.0684931506849313, 2.253731343283582, 2.559322033898305, 3.431818181818182, 3.431818181818182, 3.431818181818182]

module.exports = function(nGroups) {
  if (nGroups == null) nGroups = 3

  return through(function(data) {
    var freqs = data.freqs
    var boosted = boostFreqs(freqs)
    var grouped = groupFreqs(nGroups, boosted)
    var normalized = normalizeFreqs(grouped)

    this.queue({
      raw: data.freqs,
      norm: normalized
    })
  })
}

function boostFreqs (freqs) {
  return boosts.map(function(boost, i) {
    return boost * freqs[i]
  })
}

function groupFreqs (nGroups, freqs) {
  var nFreqs = freqs.length

  var groups = []
  for (var i = nGroups; i > 0; i--) {
    groups.push([])
  }

  freqs.forEach(function(amp, i) {
    var iGroup = Math.floor((i / nFreqs) * nGroups)
    groups[iGroup].push(amp)
  })

  var freqGroups = groups.map(mean)
  return freqGroups
}

function normalizeFreqs (freqs) {
  return freqs.map(function(freq) {
    var norm = freq / 256
    if (norm > 1) norm = 1
    return norm
  })
}

function sum (array) {
  var total = 0
  array.forEach(function(item) {total += item})
  return total
}

function mean (array) {
  return (sum(array)) / array.length
}
