/**
 * 共通化nav情報
 */
var incNav = incNav || {};
incNav.onArray = [ // 上が優先。
	// proudのディレクトリ名一覧です。必要のないディレクトリは削除して使用してください。
  // 一般公開（基本）
	{dir : '_template', index : null, layer : 1, new : false, off: false, next : '', back : ''},
	{dir : 'concept', index : 1, layer : 1, new : false, off: false, next : '', back : ''},
];

/**
 * Topic Header Package.
 */
var thp = {};
thp.onChoice = null;
thp.onArray = {};
var siteAddress = location.href;
if (siteAddress.indexOf('?')) {
	var siteArray = siteAddress.split('?');
	siteAddress = siteArray[0];
}
thp.init = function(){
	for(var i = 0; i < incNav.onArray.length; i++){
		if(thp.onChoice == null){
			if(siteAddress.indexOf(incNav.onArray[i].dir) > -1) thp.onChoice = incNav.onArray[i];
		}
		thp.onArray[incNav.onArray[i].dir] = incNav.onArray[i];
	}
	if(thp.onChoice == null) thp.onChoice = {dir : '', index : 0, layer : 0, next : '', back : ''};
	window.document.write(thp.createTag());
};
thp.createTag = function(){
	var result = '';
	var layer = '';
	for(var i = 0; i < thp.onChoice.layer; i++){
		layer += '../';
	}

	// href="' + layer + ' // パス（../）の変数
	// if(thp.onChoice.index == 1) result += 'is-current '; それぞれ固有の処理をさせたい時（番号はindexに基づく
	// if(thp.onArray._template.new) result += 'is-new '; NEWマーク
	// if(thp.onArray._template.off) result += 'is-off '; off処理

	result += '';
	result += '';
	result += '';
	result += '';
	result += '';
	result += '';

	return result;
};
thp.init();
