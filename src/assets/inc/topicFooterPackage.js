/**
 * Topic Footer Package.
 */
var tfp = {};
tfp.onChoice = null;
tfp.onArray = {};
tfp.init = function () {
  for (var i = 0; i < incNav.onArray.length; i++) {
    if (tfp.onChoice == null) {
      if (siteAddress.indexOf(incNav.onArray[i].dir) > -1) tfp.onChoice = incNav.onArray[i];
    }
    tfp.onArray[incNav.onArray[i].dir] = incNav.onArray[i];
  }
  if (tfp.onChoice == null) tfp.onChoice = {
    dir: '',
    index: 0,
    layer: 0,
    next: '',
    back: ''
  };
  window.document.write(tfp.createTag());


};
tfp.createTag = function () {
  var result = '';
  var layer = '';
  for (var i = 0; i < tfp.onChoice.layer; i++) {
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
tfp.init();
