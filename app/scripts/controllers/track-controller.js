/*globals App, Ember*/
App.TrackController = Ember.Controller.extend({
    needs: ['playlist'],

    nextTrack: function () {
        'use strict';
        var tracks = this.get('tracks'),
            index = tracks.indexOf(this.get('model'));
        return tracks.objectAt(index + 1) || tracks.get('firstObject');
    }.property('model.id'),

    previousTrack: function () {
        'use strict';
        var tracks = this.get('tracks');
        var index = tracks.indexOf(this.get('model'));
        return tracks.objectAt(index - 1) || tracks.get('lastObject');
    }.property('model.id'),

    tracks: function () {
        'use strict';
        return this.get('controllers.playlist.model.sortedTracks');
    }.property('controllers.playlist.model.id'),

    actions: {
        nextSong: function () {
            'use strict';
            this.transitionToRoute('track', this.get('nextTrack'));
        }
    }
});
