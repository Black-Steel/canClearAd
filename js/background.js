/*!
 * canClearAd v0.1.0
 * Copyright (c) 2016 Ineer
 * Licensed under MIT (https://github.com/ineer/canclearad/blob/master/LICENSE)
 */

// 特定网站列表
// 如果你新建了一个新的js规则，请把相应的文件名改为网站域名，
// 写入webRule中，重启插件才能生效。
var webRule = ['baidu.com'
		,'163.com'
		,'jb51.net'
		,'zhihu.com'
		,'csdn.net'
		,'ncar.cc'
		,'icoolxue.com'
	        ,'iqiyi.com'
	];

var webpage  = document.getElementById('webpage');
var clearNum = document.getElementById('adClearNum');
var totalNum = document.getElementById('adTotalNum');

chrome.extension.onRequest.addListener(function(request, sender, sendRequest) {

	// 计算清除广告数目
	if (request.clearNum || request.clearNum === 0) {
		clearNum.innerText = Number(request.clearNum);
		totalNum.innerText = Number(totalNum.innerText) + Number(request.clearNum);	
	}

	// 地址规则
	if (request.url){
		webpage.value = request.url;
		for (var i = 0; i < webRule.length; i++) {
			if (request.url.indexOf(webRule[i]) > -1) {
				// 导入JS
				chrome.tabs.executeScript(null, {file: 'js/rules/' + webRule[i] + '.js'});
				chrome.tabs.executeScript(null, {file: 'js/clear.js'});
			}
		}
	}
	if (request.common) {
		chrome.tabs.executeScript(null, {file: request.common});
	}
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {                
	
	chrome.pageAction.show(tabId);

});
filter1 = {
	urls: [
		 '*://pos.baidu.com/*'
		,'*://cpro.baidustatic.com/*'
		,'*://dup.baidustatic.com/*'
		,'*://eclick.baidu.com/*'
		,'*://hm.baidu.com/*'
		,'*://push.zhanzhang.baidu.com/*'
		,'*://api.share.baidu.com/*'
		,'*://wn.pos.baidu.com/*'
		,'*://sp0.baidu.com/*'
		,'*://sp1.baidu.com/*'
		,'*://t12.baidu.com/*'
		,'*://t10.baidu.com/*'
		,'*://t11.baidu.com/*'
		,'*://bzclk.baidu.com/*'
		,'*://cb.baidu.com/*'
		,'*://cbjs.baidu.com/*'
		,'*://im-x.jd.com/*'
		,'*://wn.x.jd.com/*'
		,'*://x.jd.com/*'
		,'*://static.360buyimg.com/*'
		,'*://img30.360buyimg.com/*'
		,'*://img1.126.net/*'
		,'*://pagead2.googlesyndication.com/*'
		,'*://googleads.g.doubleclick.net/*'
		,'*://files.jb51.net/*'
		,'*://s0.2mdn.net/*'
		,'*://img.ads.csdn.net/*'
		,'*://ads.csdn.net/*'
		,'*://bj.bcebos.com/*'
		,'*://irs01.net/MTFlashStore.swf'
		,'*://m.kejet.net/ms/16912/565f1f1c6.swf'
		,'*://stuff.cdn.biddingx.com/*'
		,'*://player.letvcdn.com/1c02_p/*' // 乐视广告
		,'*://imgcache.qq.com/tencentvideo_v1/player/MediaPlugin.swf*' // 腾讯广告
		,'*://imgcache.qq.com/tencentvideo_v1/player/partialup/MediaPlugin.swf*'
		,'*://imgcache.qq.com/tencentvideo_v1/playerv3/MediaPlugin.swf*'
		,'*://imgcache.qq.com/tencentvideo_v1/playerv3/partialup/MediaPlugin.swf*'
		,'*://pic.fastapi.net/sdk/fl/ku6/ku6sdk.swf*' // 酷6广告
		,'*://p.you.video.sina.com.cn/swf/sub/publicityPlayer20160913_V4_1_39_74.swf*'  // 新浪广告
		,'*://static.funshion.com/market/p2p/preroll/*' // 风行广告
		,'*://static.hd.baofeng.com/swf/player/material/swf/*' // 暴风广告
		,'http://stadig.ifeng.com/apvsta.js?*' // 凤凰广告
		,'http://static.xyimg.net/*'

	]
};
filter2 = {
	urls: [
		 '*://*.iqiyi.com/v_*.html'
		,'*://www.tudou.com/*'
	]
};

chrome.webRequest.onBeforeRequest.addListener(function(request) {
    return {cancel: true};
}, filter1, ['blocking']);
chrome.webRequest.onBeforeSendHeaders.addListener(function(request) {
  for (var i = 0; i < request.requestHeaders.length; ++i) {
	if (request.requestHeaders[i].name === 'User-Agent') {
	  request.requestHeaders[i].value = 'Mozilla/5.0 (Linux; Android 4.4.4; Nexus 5 Build/KTU84P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.130 Mobile Safari/537.36';
	  break;
	}
  }
  return {requestHeaders: request.requestHeaders};
}, filter2, ['blocking', 'requestHeaders']);
