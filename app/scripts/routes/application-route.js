/*global App, Ember*/
App.ApplicationRoute = Ember.Route.extend({
    model: function() {
        'use strict';
        return this.get('store').find('playlist');
    }
});