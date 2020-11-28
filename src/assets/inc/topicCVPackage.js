/**
 * Topic CV Package.
 */
var tcp = {};
tcp.onChoice = null;
tcp.onArray = {};

tcp.init = function () {
  for (var i = 0; i < incNav.onArray.length; i++) {
    if (tcp.onChoice == null) {
      if (siteAddress.indexOf(incNav.onArray[i].dir) > -1) tcp.onChoice = incNav.onArray[i];
    }

    tcp.onArray[incNav.onArray[i].dir] = incNav.onArray[i];
  }

  if (tcp.onChoice == null) tcp.onChoice = {
    dir: '',
    index: 0,
    layer: 0,
    next: '',
    back: ''
  };
  window.document.write(tcp.createTag());
};

tcp.createTag = function () {
  var result = '';
  var layer = '';

  for (var i = 0; i < tcp.onChoice.layer; i++) {
    layer += '../';
  }

  result += '';
  result += '';
  result += '';
  result += '';
  result += '';
  result += '';
  result += '';
  result += '';
  result += '';
  result += '';
  result += '';
  result += '';
  result += '';
  result += '';

  return result;
};

tcp.init();
