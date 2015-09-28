App.TrackView = Ember.View.extend({
    loadTrack: false,

    playAudio: function () {
        'use strict';
        var self = this;
        Ember.run.schedule('afterRender', function () {
            var audioEl = self.$('audio')[0];
            audioEl.load();
            audioEl.play();
        });
    }.observes('controller.model.url', 'loadTrack'),

    didInsertElement: function () {
        'use strict';
        var self = this;
        var player = this.$('audio')[0];
        window.player1 = player;
        player.addEventListener('ended', function (event) {
            self.get('controller').send('nextSong');
        });
        this.toggleProperty('loadTrack');
    },

    willDestroyElement: function () {
        'use strict';
        var player = this.$('audio')[0];
        player.removeEventListener('ended');
    }
});