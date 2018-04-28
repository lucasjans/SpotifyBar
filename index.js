const SpotifyWebHelper = require('spotify-web-helper');
const jsonfile = require('jsonfile');
const helper = SpotifyWebHelper();
const schedule = require('node-schedule');
var scheduledTracks = [];

const app = {
  init: function() {
    helper.player.on('error', err => {
      if (error.message.match(/No user logged in/)) {
        // also fires when Spotify client quits
      } else {
        // other errors: /Cannot start Spotify/ and /Spotify is not installed/
      }
    });
    scheduledTracks = jsonfile.readFileSync('./schedule.json');
  },

  play: function(spotifyTrack) {
    var a = helper.player.play(spotifyTrack);
  },
  pause: function() {
    var a = helper.player.pause();
  }
};

app.init();

scheduledTracks.forEach(function(item) {
  console.log(item);
  if (item.command === 'play') {
    var result = schedule.scheduleJob(item.cronSchedule, () => {
      console.log('play' + item.spotifyPlaylist);
      app.play(item.spotifyPlaylist);
    });
  } else {
    var result = schedule.scheduleJob(item.cronSchedule, () => {
      console.log('pause time');
      app.pause();
    });
  }
});
