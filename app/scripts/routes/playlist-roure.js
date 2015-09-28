App.PlaylistRoute = Ember.Route.extend({
    afterModel: function(playlist, transition) {
            this.transitionTo('track', playlist.get('tracks').get('firstObject'));
    }
});