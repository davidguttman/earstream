# Earstream #

Streaming audio reactivity in the browser using WebRTC + Web Audio API

## Example ##

```js
var earstream = require('earstream')

var nBars = 12

var bars = []

for (var i = nBars; i > 0; i--) {
  var bar = document.createElement('div')
  bar.style.height = '20px'
  bar.style.background = 'steelblue'
  bar.style.border = '1px solid white'
  bars.push(bar)
  document.body.appendChild(bar)
};

var es = earstream(nBars)

es.on('data', function(data) {
  data.norm.forEach(function(v, i) {
    bars[i].style.width = v * 100 + '%'
  })
})

```

## License ###

MIT
