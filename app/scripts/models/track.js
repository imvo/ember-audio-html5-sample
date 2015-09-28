/*global Ember*/
App.Track = DS.Model.extend({
    url: DS.attr( 'string' ),
    playlists: DS.hasMany('playlist'),
    artist:DS.attr( 'string' ),
    title:DS.attr( 'string' )
});
App.Track.reopenClass({
    FIXTURES: [
        { id: 1, url: '../media/1.mp3',artist:'Трансмиссия',title:'Марс 500',playlists:[1] },
        { id: 2, url: '../media/2.mp3',artist:'Double Digit',title:'Shades of gray',playlists:[1,2] },
        { id: 3, url: '../media/3.mp3',artist:'Till West ft Delicious',title:'Same Man (MEXX BEAT REMIX)',playlists:[1,2] }
    ]
});