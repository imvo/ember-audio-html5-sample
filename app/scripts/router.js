/*globals App*/
App.Router.map(function () {
    'use strict';
    this.resource('playlist', { path: '/playlist/:playlist_id' },function(){
        this.resource('track', { path: '/track/:track_id' });
    });
});
