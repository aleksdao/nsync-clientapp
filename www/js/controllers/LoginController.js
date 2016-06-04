app.controller('LoginController', function ($scope, $state, ServerSocketFactory) {

$state.logIn = function(){
  $state.go('showPage');


};
});
