// Cache the label for later use.
var label = document.getElementById('label');
var start = document.getElementById('start');

// Setup the sounds to be used.
var sound1 = new Howl({
  src: 'https://a.files.bbci.co.uk/ms6/live/3441A116-B12E-4D2F-ACA8-C1984642FA4B/audio/simulcast/dash/nonuk/pc_hd_abr_v2/cfsgc/bbc_radio_fourfm.mpd',
  html5: true,
  streaming: true,
  streamingFormat: 'dash'
});

// Enable the start button when the sounds have loaded.
// sound1.once('load', function() {
//   start.removeAttribute('disabled');
//   start.innerHTML = 'BEGIN CORE TESTS';
// });

// Define the tests to run.
var id;
var tests = [
   function(fn) {
    id = sound1.play();

    label.innerHTML = 'PLAYING';
    setTimeout(fn, 10000);
  },

  function(fn) {
    sound1.pause(id);

    label.innerHTML = 'PAUSED';
    setTimeout(fn, 2000);
  },

  function(fn) {
    sound1.play(id);

    label.innerHTML = 'RESUMING';
    setTimeout(fn, 10000);
  },

  function(fn) {
    sound1.stop(id);

    label.innerHTML = 'STOPPED';
    setTimeout(fn, 2000);
  },

  function(fn) {
    sound1.mute(true, id);

    label.innerHTML = 'MUTE';
    setTimeout(fn, 1500);
  },

  function(fn) {
    sound1.mute(false, id);

    label.innerHTML = 'UNMUTE';
    setTimeout(fn, 2000);
  },

  function(fn) {
    sound1.volume(0.5, id);

    label.innerHTML = 'HALF VOLUME';
    setTimeout(fn, 2000);
  },

  function(fn) {
    sound1.volume(1, id);

    label.innerHTML = 'FULL VOLUME';
    setTimeout(fn, 2000);
  },
];

// Create a method that will call the next in the series.
var chain = function(i) {
  return function() {
    if (tests[i]) {
      tests[i](chain(++i));
    } else {
      document.getElementById('logo').style.display = 'none';
      label.innerHTML = 'COMPLETE!';
      label.style.color = '#74b074';

      // Wait for 5 seconds and then go back to the tests index.
      setTimeout(function() {
        window.location = './';
      }, 5000);
    }
  };
};

// Listen to a click on the button to being the tests.
start.addEventListener('click', function() {
  tests[0](chain(1));
  start.style.display = 'none';
}, false);