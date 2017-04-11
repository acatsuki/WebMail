//noinspection JSUnresolvedFunction
/**
 * Created by nicolas on 31/03/2017.
 */
angular.module('webMail', [ 'ngSanitize' ])
  .config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix(''); //Permet d'éviter la transformation des caractéres spéciaux après le hash comme le slash
  }])
  .controller('webMailCtrl', function($scope, $location, $filter) {

    $scope.folders = [
      {
        value:'RECEPTION',
        label: 'Boite de réception',
        emails: [
          {id:1, from:'Nicolas', to:'moi', subject:'bla', date: new Date(2012, 2, 20, 15, 30), content: 'Lorem ipsum dolor <strong>sit amet</strong>, consectetur adipisicing elit. Asperiores cum debitis dicta dolorem ducimus ea error eveniet illum iure minima modi molestias nemo neque numquam perspiciatis praesentium, quasi ullam voluptatum?'},
          {id:2, from:'Maike', to:'Pat', subject:'goofy goober', date: new Date(2013, 4, 10, 15, 00), content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores cum debitis dicta dolorem ducimus ea error eveniet illum iure minima modi molestias nemo neque numquam perspiciatis praesentium, quasi ullam voluptatum?'},
          {id:3, from:'Carl', to:'loic', subject: 'w00t', date: new Date(2014, 6, 30, 16, 30), content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores cum debitis dicta dolorem ducimus ea error eveniet illum iure minima modi molestias nemo neque numquam perspiciatis praesentium, quasi ullam voluptatum?'},
          {id:4, from:'Loic', to:'Carl', subject: 'hola!', date: new Date(2017, 5, 12, 8, 30), content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores cum debitis dicta dolorem ducimus ea error eveniet illum iure minima modi molestias nemo neque numquam perspiciatis praesentium, quasi ullam voluptatum?'}
        ]
      },
      {
        value:'ARCHIVES',
        label: 'Archives',
        emails: [
          {id:5, from:'Nicolas', to:'moi', subject:'bla', date: new Date(2012, 2, 20, 12, 25), content: 'Lorem ipsum dolor <strong>sit amet</strong>, consectetur adipisicing elit. Asperiores cum debitis dicta dolorem ducimus ea error eveniet illum iure minima modi molestias nemo neque numquam perspiciatis praesentium, quasi ullam voluptatum?'},
          {id:6, from:'Maike', to:'Pat', subject:'goofy goober', date: new Date(2015, 11, 2, 10, 30), content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores cum debitis dicta dolorem ducimus ea error eveniet illum iure minima modi molestias nemo neque numquam perspiciatis praesentium, quasi ullam voluptatum?'},
        ]
      },
      {
        value:'SEND',
        label: 'Envoyés',
        emails: [
          {id:7, from:'Maike', to:'Pat', subject:'goofy goober', date: new Date(2016, 7, 20, 15, 30), content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores cum debitis dicta dolorem ducimus ea error eveniet illum iure minima modi molestias nemo neque numquam perspiciatis praesentium, quasi ullam voluptatum?'},
          {id:8, from:'Carl', to:'loic', subject: 'w00t', date: new Date(2017, 1, 3, 15, 30), content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores cum debitis dicta dolorem ducimus ea error eveniet illum iure minima modi molestias nemo neque numquam perspiciatis praesentium, quasi ullam voluptatum?'},
        ]
      },
      {
        value:'SPAM',
        label: 'Courier indésirable',
        emails: [
          {id:9, from:'Nicolas', to:'moi', subject:'bla', date: new Date(2017, 8, 12, 10, 0), content: 'Lorem ipsum dolor <strong>sit amet</strong>, consectetur adipisicing elit. Asperiores cum debitis dicta dolorem ducimus ea error eveniet illum iure minima modi molestias nemo neque numquam perspiciatis praesentium, quasi ullam voluptatum?'},
          {id:10, from:'Maike', to:'Pat', subject:'goofy goober', date: new Date(2017, 5, 15, 9, 30), content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores cum debitis dicta dolorem ducimus ea error eveniet illum iure minima modi molestias nemo neque numquam perspiciatis praesentium, quasi ullam voluptatum?'},
        ]}
    ];

    $scope.nextId = 12;

    $scope.currentFolder = null;
    $scope.currentEmail  = null;
    $scope.sortBy = null;
    $scope.sortDesc = false;

    $scope.selectFolder = function(folder) {
      $scope.currentFolder = folder;
      if (folder) {
        $scope.newEmail = null;
        $scope.currentEmail = null;
      }
    };

    $scope.selectedEmail = function(email) {
      $scope.currentEmail = email;
    };

    $scope.toEmail = function(folder, email) {
      $location.path("/" + folder.value + '/' + email.id);
    };


    //Filters
    $scope.sortEmails = function(field) {
      if ($scope.sortBy === field) {
        $scope.sortDesc = !$scope.sortDesc;
      } else {
        $scope.sortBy = field;
        $scope.sortDesc = false;
      }
    };

    $scope.cssChevronSort = function(field) {
      return {
        'glyphicon': $scope.sortBy === field,
        'glyphicon-chevron-up': $scope.sortBy === field && !$scope.sortDesc,
        'glyphicon-chevron-down': $scope.sortBy === field && $scope.sortDesc
      }
    };

    //Search
      $scope.search = "";

      $scope.searchReset = function() {
        $scope.search = "";
      };

      //Create email
      $scope.newEmail = null;

      $scope.resetMail = function() {
        $scope.newEmail = {
          from: 'Nicolas',
          date: new Date()
        };
      };

      $scope.sendEmail = function() {
        $scope.folders.forEach(function(item){
          if (item.value === 'SEND') {
            $scope.newEmail.id = $scope.nextId++;
            item.emails.push($scope.newEmail);
            $scope.newEmail = null;
            $location.path();
          }
        })
      };

    /*
     * Permet de regarder en temps réel l'évolution d'un éléments ici le path de l'url
     * La premier function permet de retourner la valeur surveiller ici la path
     * Une fois cette valeur retourné on execute le deuxième paramétre qui est une function
    */
    $scope.$watch(function() {
      return $location.path();
    }, function(newPath) {
      var tabPath = newPath.split('/');

      if (tabPath.length > 1) {
        var valFolder = tabPath[1];

        if (tabPath[1] === "newEmail") {
          $scope.resetMail();
          $scope.selectFolder(null);
        } else {
          $scope.folders.forEach(function (item) {
            if (item.value === valFolder) {
              $scope.selectFolder(item);
            }
          });
          if (tabPath.length > 2) {
            var valEmail = parseInt(tabPath[2]);

            $scope.currentFolder.emails.forEach(function(item){
              if (item.id === valEmail) {
                  $scope.selectedEmail(item);
              }

            });
          }
        }
      }
    });
  })
    .filter('highlightSearch', function() {
      return function(input, search) {
        if (search) {
          return input.replace(new RegExp("(" + search + ")", "gi"), "<span class='heighlightSearch'>$1</span>")
        } else {
          return input;
        }
      }
    });
