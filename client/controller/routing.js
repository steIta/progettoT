var app = angular.module("pathfinder", ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/404");

  // Now set up the states
  $stateProvider 
     .state('link1', {
      url: "/profile",
      templateUrl: "/views/partials/profile.html",
      controller: "profileCtrl"
    })   
    .state('404', {
      url: "/404",
      templateUrl: "/views/partials/404.html",
      controller: "errorCtrl"
    })
    .state('link2', {
      url: "/dashboard",
      templateUrl: "/views/partials/dashboard.html",
      controller: "dashboardCtrl"
    })
    .state('link3', {
      url: "/admin",
      templateUrl: "/views/partials/admin.html",
      controller: "adminCtrl"
    })
    .state('link4', {
      url: "/user",
      templateUrl: "/views/partials/profile.html",
      controller: "profileCtrl"
    })
    .state('link5', {
      url: "/ticket",
      templateUrl: "/views/partials/home.html",
      controller: "homeCtrl"

    }).state('link6', {
      url: "/richiesta",
      templateUrl: "/views/partials/ticket.html",
      controller: "ticketCtrl"

    
    })
    .state('link7',{
       url: "/form",
       templateUrl: "/views/partials/form.html",
       controller: "richiestaCtrl"
    })
  
    .state('link8',{
      url:"/assistenza",
      templateUrl:"/views/partials/tabella.html",
      controller:"tabellaCtrl"
    })

    .state('link9',{
      url:"/risposta/:_id",
      templateUrl:"/views/partials/risposta.html",
      controller:"rispostaCtrl"
    })
  /*  .state('link10',{
      url:'/modal',
      templateUrl:"/views/partials/modal.html",
      controller:"modalCtrl"
    })*/

  
});

