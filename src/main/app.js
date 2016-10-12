/**
 * Creates the application root for an angular application at uri (/)
 *
 * @module app
 * 
 * @requires config/config
 * @requires ngRoute
 * @requires ngResource
 * @requires LocalStorageModule
 *
 * @param angular RequireJS inclusion of AngularJS library
 * @param config RequireJS inclusion of config/config
 *
 * @author Barry Skidmore <bskidmore@alertlogic.com>
 *
 * @returns instance of the app
 *
 * @copyright Alert Logic, Inc 2014
 */

define([ 'angular',
         'config/config',
         'ngRoute', 'ngResource', 'LocalStorageModule',
         'tmdb/services/TMDBAPIService',
         'tmdb/services/AppStateService',
         'tmdb/partials/search/SearchController',
         'tmdb/partials/home/HomeController',
         'tmdb/partials/movie/MovieController',
         'tmdb/partials/person/PersonController',
         'tmdb/partials/awesomeSearch/AwesomeSearchController',
         'tmdb/partials/awesomeSearch/AwesomeSearchResultsController',
         'tmdb/partials/remoteImageLoader/RemoteImageLoader',
         'tmdb/directives/search',
         'tmdb/directives/popularMovies',
         'tmdb/directives/personDetail',
         'tmdb/directives/personCrew',
         'tmdb/directives/personCast',
         'tmdb/directives/movieDetail',
         'tmdb/directives/similarMovies',
         'tmdb/directives/movieCast',
         'tmdb/directives/movieCrew',
         'tmdb/directives/awesomeSearch',
         'tmdb/directives/awesomeSearchResults'], 
    function( angular, config, $resource, $location, LocalStorageModule, 
              TMDBAPIService, AppStateService, SearchController, HomeController, MovieController, 
              PersonController, AwesomeSearchController, AwesomeSearchResultsController,
              RemoteImageLoader, searchDirective, popularMoviesDirective, 
              personDetailDirective, personCrewDirective, personCastDirective,
              movieDetailDirective, similarMoviesDirective, movieCastDirective,
              movieCrewDirective, awesomeSearchDirective, awesomeSearchResultsDirective ) {
    	"use strict";

        /** @constructs app */
        var angularModules = config.standardAngularModules.concat( 'LocalStorageModule' );

        /** @constructs app */
        var app = angular.module("app", angularModules );

        //  Configure $locationProvider and $routeProvider to allow top-level navigation within this route
    	app.config(['$locationProvider', function($locationProvider) {
                            
            $locationProvider.html5Mode(false);
            
    	}]);

        app.service( "TMDBAPIService", TMDBAPIService);
        app.service( "AppStateService", AppStateService );

        app.controller( "AwesomeSearchResultsController", AwesomeSearchResultsController );
        app.directive( "awesomeSearchResults", awesomeSearchResultsDirective );

        app.controller( "AwesomeSearchController", AwesomeSearchController );
        app.directive( "awesomeSearch", awesomeSearchDirective );

        app.controller( "SearchController", SearchController);
        app.directive( "search", searchDirective );

        app.controller( "HomeController", HomeController );
        app.controller( "MovieController", MovieController );
        app.controller( "PersonController", PersonController);
        app.controller( "RemoteImageLoader", RemoteImageLoader );

        app.directive( "popularMovies", popularMoviesDirective );
        app.directive( "personDetail", personDetailDirective );
        app.directive( "personCrew", personCrewDirective );
        app.directive( "personCast", personCastDirective );
        app.directive( "movieDetail", movieDetailDirective );
        app.directive( "similarMovies", similarMoviesDirective );
        app.directive( "movieCast", movieCastDirective );
        app.directive( "movieCrew", movieCrewDirective );

        app.config(['$routeProvider', function($routeProvider) {
            $routeProvider.when( '/', { templateUrl: '/tmdb/partials/home/home.html', controller: 'HomeController' } );
            $routeProvider.when( '/movie/:id', { templateUrl: '/tmdb/partials/movie/movie.html', controller: 'MovieController' } );
            $routeProvider.when( '/person/:id', { templateUrl: '/tmdb/partials/person/person.html', controller: 'PersonController' } );
            $routeProvider.when( '/tv/:id', { templateUrl: '/tmdb/partials/tv/tv.html' } );
            $routeProvider.otherwise( {
                template: function() {
                    throw 'An internal error occurred because the given path does not resolve to a known route.';
                }
            });
        }]);

    	return app;
    }
);
