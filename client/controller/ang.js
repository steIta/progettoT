
app.controller('dashboardCtrl', function ($scope) {
  //la logica va dentro al controllore ogni javascript
  var areaChartCanvas = $("#areaChart").get(0).getContext("2d");
  // This will get the first returned node in the jQuery collection.
  var areaChart = new Chart(areaChartCanvas);

  var areaChartData = {
    labels: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio"],
    datasets: [
      {
        label: "Hardware",
        fillColor: "rgba(160, 200, 222, 1)",
        strokeColor: "rgba(210, 214, 222, 1)",
        pointColor: "rgba(210, 214, 222, 1)",
        pointStrokeColor: "#c1c366",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "#rgba(220,220,220,1)",
        data: [65, 59, 80, 81, 56, 55, 40]
      },
      {
        label: "Software",
        fillColor: "rgba(60,141,188,0.9)",
        strokeColor: "rgba(60,120,130,0.8)",
        pointColor: "#3b8eea",
        pointStrokeColor: "rgba(60,141,188,1)",
        pointHighlightFill: "#ggg",
        pointHighlightStroke: "rgba(60,141,188,1)",
        data: [28, 48, 40, 19, 86, 27, 90]
      }
    ]
  };

  var areaChartOptions = {
    //Boolean - If we should show the scale at all
    showScale: true,
    //Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines: false,
    //String - Colour of the grid lines
    scaleGridLineColor: "rgba(0,0,0,.09)",
    //Number - Width of the grid lines
    scaleGridLineWidth: 1,
    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,
    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: true,
    //Boolean - Whether the line is curved between points
    bezierCurve: true,
    //Number - Tension of the bezier curve between points
    bezierCurveTension: 0.3,
    //Boolean - Whether to show a dot for each point
    pointDot: false,
    //Number - Radius of each point dot in pixels
    pointDotRadius: 5,
    //Number - Pixel width of point dot stroke
    pointDotStrokeWidth: 1,
    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
    pointHitDetectionRadius: 20,
    //Boolean - Whether to show a stroke for datasets
    datasetStroke: true,
    //Number - Pixel width of dataset stroke
    datasetStrokeWidth: 2,
    //Boolean - Whether to fill the dataset with a color
    datasetFill: true,
    //String - A legend template
    legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
    //Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
    maintainAspectRatio: true,
    //Boolean - whether to make the chart responsive to window resizing
    responsive: true
  };

  //Create the line chart
  areaChart.Line(areaChartData, areaChartOptions);

  //-------------
  //- LINE CHART -
  //--------------
  var lineChartCanvas = $("#lineChart").get(0).getContext("2d");
  var lineChart = new Chart(lineChartCanvas);
  var lineChartOptions = areaChartOptions;
  lineChartOptions.datasetFill = false;
  lineChart.Line(areaChartData, lineChartOptions);


  //-------------
  //- BAR CHART -
  //-------------
  var barChartCanvas = $("#barChart").get(0).getContext("2d");
  var barChart = new Chart(barChartCanvas);
  var barChartData = areaChartData;
  barChartData.datasets[1].fillColor = "#00a65a";
  barChartData.datasets[1].strokeColor = "#00a65a";
  barChartData.datasets[1].pointColor = "#00a65a";
  var barChartOptions = {
    //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
    scaleBeginAtZero: true,
    //Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines: true,
    //String - Colour of the grid lines
    scaleGridLineColor: "rgba(0,0,0,.09)",
    //Number - Width of the grid lines
    scaleGridLineWidth: 1,
    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,
    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: true,
    //Boolean - If there is a stroke on each bar
    barShowStroke: true,
    //Number - Pixel width of the bar stroke
    barStrokeWidth: 2,
    //Number - Spacing between each of the X value sets
    barValueSpacing: 5,
    //Number - Spacing between data sets within X values
    barDatasetSpacing: 1,
    //String - A legend template
    legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
    //Boolean - whether to make the chart responsive
    responsive: true,
    maintainAspectRatio: true
  };

  barChartOptions.datasetFill = false;
  barChart.Bar(barChartData, barChartOptions);

});

app.controller("errorCtrl", function ($scope, $stateParams) {
  $scope.description = "Error";
  $scope.stateParams = $stateParams;

});



app.controller('mainCtrl', function ($scope, $state, $timeout, $http) {
  $scope.description = 'Main Controller';

  //console.log("Caricato main");
  $timeout(function () { $state.go('link2') });


  //richiamo api per ottenere le caratteristiche utente
  $http.post('/account').success(function (data) {
    $scope.credentials = data;
    $scope.getMenu({ Livello: $scope.credentials.livello });
    // $scope.skills=$scope.credentials.skills;

    var array = $scope.credentials.skills[0].split(',');
    $scope.skills = array;


  }).error(function () {
    alert("Error");
  });

  //ottengo il menu in funzione al livello utente
  $scope.getMenu = function (objIn) {
    console.log("richiamo menu", objIn);
    //richiamo api per ottenere le caratteristiche utente
    $http.post('/menu', objIn).success(function (data) {
      console.log("Successo");
      $scope.menu = data;
      $scope.submenu = data[0].submenu;
      $scope.menuVisible = true;
      /* var array = [];
       for (var i=0; i<$scope.menu; i++){
        array[i]=data[i].route;
       }
       $scope.submenu = array;*/
      console.log($scope.menu);


    }).error(function () {
      alert("Error" + $scope.menu);
    })

  }

});



app.controller('profileCtrl', function ($scope) {
});



app.controller('adminCtrl', function ($scope) {
});



app.controller('homeCtrl', function ($scope, $http) {
  $http.post('/info').success(function (response) {
    $scope.dati = response;

    console.log($scope.dati);
    $scope.getTicket({ user: $scope.dati.username });
  });
  $scope.getTicket = function (obj) {
    $http.post('/ticket', obj).success(function (data) {
      $scope.dati = data;
    });

  }
});

app.controller('richiestaCtrl', function ($scope, $http, $location) {

  $scope.inoltra = function () {
    $http.post('/form', {
      '_id': $scope._id,
      'id': $scope.id,
      'username': $scope.credentials.username,
      'categoria': $scope.categoria,
      'createDate': $scope.createDate,
      'createDate': $scope.createDate,
      'messaggio': $scope.messaggio,
     
      'risposta': $scope.risposta
    });
    console.log("Richiesta effettuata");
    $location.path('/ticket');

  };
});


app.controller('ticketCtrl', function ($scope, $location) {
  $scope.states = ['Spedizione', 'Cambio Login', 'Cambio password', 'Gestione PannelloControllo'];
  $scope.currentState = 'Spedizione';
  $scope.conferma = function () {
    if ($scope.currentState === 'Spedizione') {
      $location.path('/form');
    }
  }
});


app.controller('tabellaCtrl', function ($scope, $http) {
  $http.get('/assistenza').success(function (data) {
    $scope.tabella = data;
  });

  $scope.nuvoletta2 = function (obj) {
    $http.put('/risposta', {
      status: $scope.status
    });


  //  $("#modalRisposta").modal('show');
    $("#modalRisposta").modal('show');
    $scope.selectedTicket = obj;
    $scope.inoltra = function (obj) {
      $http.post('/risposta',
        {
       //   id:obj.id,
          username: obj.username,
          status: obj.status,
          risposta: obj.risposta,
          dataRisposta: obj.dataRisposta
        });

    
      console.log("Richiesta effettuata");

    }

  }



});


/*app.controller('rispostaCtrl', function ($scope, $stateParams, $http, $location) {
  $scope._id = $stateParams._id;
  console.log("StateParams" + $stateParams._id);
  $scope.inoltra = function () {
    $http.post('/risposta',
      {
        //_id:$scope.id,
        username:$scope.username,
        status: $scope.status,
        risposta: $scope.risposta,
        dataRisposta: $scope.dataRisposta
      });
      console.log("Richiesta effettuata");
     $location.path('/modal');
  }
  
});
app.controller('modalCtrl', function ($scope, $http) {
  $http.get('/modal').success(function (data) {
    $scope.modal = data;
  });
    
  
  });
*/
