if (location.search) {
  var param = getQueryParamter('run');
  // UNSAFE!
  eval(param);
}

function goToUnsafeUrl() {
  location.href= location.origin + location.pathname + '?run=alert("Hola a todos :)");' + location.hash
}
