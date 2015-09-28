/*global Ember*/
App.Playlist = DS.Model.extend({
    name: DS.attr( 'string' ),
    tracks: DS.hasMany('track',{ async: true }),
    sortedTracks: Ember.computed.sort('tracks','trackSorting'),
    trackSorting: ['id']
});
App.Playlist.reopenClass({
    FIXTURES: [
        { id: 1, name: 'Some playlist', tracks: [1,2,3] },
        { id: 2, name: 'My favorite songs' , tracks: [2,3]}
    ]
});