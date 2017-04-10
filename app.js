//noinspection JSUnresolvedFunction
/**
 * Created by nicolas on 31/03/2017.
 */
angular.module('webMail', [ 'ngSanitize' ])
  .config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix(''); //Permet d'éviter la transformation des caractéres spéciaux après le hash comme le slash
  }])
  .controller('webMailCtrl', function($scope, $location) {

    $scope.folders = [
      {
        value:'RECEPTION',
        label: 'Boite de réception',
        emails: [
          {id:1, from:'Nicolas', to:'moi', subject:'bla', date: '29/03/2017', content: 'Lorem ipsum dolor <strong>sit amet</strong>, consectetur adipisicing elit. Asperiores cum debitis dicta dolorem ducimus ea error eveniet illum iure minima modi molestias nemo neque numquam perspiciatis praesentium, quasi ullam voluptatum?'},
          {id:2, from:'Maike', to:'Pat', subject:'goofy goober', date: '01/03/2017', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores cum debitis dicta dolorem ducimus ea error eveniet illum iure minima modi molestias nemo neque numquam perspiciatis praesentium, quasi ullam voluptatum?'},
          {id:3, from:'Carl', to:'loic', subject: 'w00t', date: '12/03/2017', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores cum debitis dicta dolorem ducimus ea error eveniet illum iure minima modi molestias nemo neque numquam perspiciatis praesentium, quasi ullam voluptatum?'},
          {id:4, from:'Loic', to:'Carl', subject: 'hola!', date: '25/06/2017', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores cum debitis dicta dolorem ducimus ea error eveniet illum iure minima modi molestias nemo neque numquam perspiciatis praesentium, quasi ullam voluptatum?'}
        ]
      },
      {
        value:'ARCHIVES',
        label: 'Archives',
        emails: [
          {id:5, from:'Nicolas', to:'moi', subject:'bla', date: '29/03/2017', content: 'Lorem ipsum dolor <strong>sit amet</strong>, consectetur adipisicing elit. Asperiores cum debitis dicta dolorem ducimus ea error eveniet illum iure minima modi molestias nemo neque numquam perspiciatis praesentium, quasi ullam voluptatum?'},
          {id:6, from:'Maike', to:'Pat', subject:'goofy goober', date: '01/03/2017', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores cum debitis dicta dolorem ducimus ea error eveniet illum iure minima modi molestias nemo neque numquam perspiciatis praesentium, quasi ullam voluptatum?'},
        ]
      },
      {
        value:'SEND',
        label: 'Envoyés',
        emails: [
          {id:7, from:'Maike', to:'Pat', subject:'goofy goober', date: '01/03/2017', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores cum debitis dicta dolorem ducimus ea error eveniet illum iure minima modi molestias nemo neque numquam perspiciatis praesentium, quasi ullam voluptatum?'},
          {id:8, from:'Carl', to:'loic', subject: 'w00t', date: '12/03/2017', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores cum debitis dicta dolorem ducimus ea error eveniet illum iure minima modi molestias nemo neque numquam perspiciatis praesentium, quasi ullam voluptatum?'},
        ]
      },
      {
        value:'SPAM',
        label: 'Courier indésirable',
        emails: [
          {id:9, from:'Nicolas', to:'moi', subject:'bla', date: '29/03/2017', content: 'Lorem ipsum dolor <strong>sit amet</strong>, consectetur adipisicing elit. Asperiores cum debitis dicta dolorem ducimus ea error eveniet illum iure minima modi molestias nemo neque numquam perspiciatis praesentium, quasi ullam voluptatum?'},
          {id:10, from:'Maike', to:'Pat', subject:'goofy goober', date: '01/03/2017', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores cum debitis dicta dolorem ducimus ea error eveniet illum iure minima modi molestias nemo neque numquam perspiciatis praesentium, quasi ullam voluptatum?'},
        ]}
    ];

    $scope.currentFolder = null;
    $scope.currentEmail  = null;
    $scope.sortBy = null;
    $scope.sortDesc = false;

    $scope.selectFolder = function(folder) {
      $scope.currentFolder = folder;
    };

    $scope.selectedEmail = function(email) {
      $scope.currentEmail = email;
    };

    $scope.toEmail = function(folder, email) {
      $location.path("/" + folder.value + '/' + email.id);
    };

    $scope.sortBySender = function() {
      if ($scope.sortBy === 'from') {
        $scope.sortDesc = !$scope.sortDesc;
      } else {
        $scope.sortBy = 'from';
        $scope.sortDesc = false;
      }
    };

    $scope.sortByReceiver = function() {
      if ($scope.sortBy === 'to') {
        $scope.sortDesc = !$scope.sortDesc;
      } else {
        $scope.sortBy = 'to';
        $scope.sortDesc = false;
      }

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

        $scope.folders.forEach(function(item) {
          if (item.value === valFolder) {
            $scope.selectFolder(item);
          }

        });
      }

      if (tabPath.length > 2) {
        var valEmail = parseInt(tabPath[2]);

        $scope.currentFolder.emails.forEach(function(item){
          if (item.id === valEmail) {
            $scope.selectedEmail(item);
          }

        });
      }

    });

  });
