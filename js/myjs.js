$(document).on('touchmove', function(ev) {
	ev.preventDefault();
});

$(function() {
	var $main = $('#main');
	var $list = $('#list');
	var $li = $list.children('li');

	var desW = 640;
	var desH = 1138;
	var viewHeight = $(window).height();

	$main.css('height', viewHeight);

	slideList();

	function nowWidth() {
		var w = desW / desH * viewHeight;
		return w;
	}

	function write(str) {
		var $write = $('.write');
		var $writeStr = str;
		var $spans = $write.children();

		if ($spans.length > 0) return;
		for (var i = 0; i < $writeStr.length; i++) {
			var $span = $('<span></span>');
			$span.html($writeStr.charAt(i));
			$write.append($span);
		}
		var i = 0;
		var $timer = null;

		var $span = $write.children();
		$timer = setInterval(function() {
			$span.eq(i).attr('class', 'active');
			i++;
			if (i == $span.length) {
				clearInterval($timer);
			}
		}, 30)
	};

	function slideList() {
		var downY = 0;
		var step = 1 / 4;

		var nowIndex = 0;
		var nextorprevIndex = 0;
		var bBtn = true;

		$li.on('touchstart', function(ev) {
			if (!bBtn) {
				return;
			}

			bBtn = false;
			var touch = ev.originalEvent.changedTouches[0];
			downY = touch.pageY;
			nowIndex = $(this).index();

			$li.on('touchmove', function(ev) {
				var touch = ev.originalEvent.changedTouches[0];

				$(this).siblings().hide();

				if (touch.pageY < downY) { //↑
					nextorprevIndex = nowIndex == $li.length - 1 ? 0 : nowIndex + 1;
					$li.eq(nextorprevIndex).css('transform', 'translate(0,' + (viewHeight + touch.pageY - downY) + 'px)');

				} else if (touch.pageY > downY) { //↓
					nextorprevIndex = nowIndex == 0 ? $li.length - 1 : nowIndex - 1;
					$li.eq(nextorprevIndex).css('transform', 'translate(0,' + (-viewHeight + touch.pageY - downY) + 'px)');
				} else {
					bBtn = true;
				}

				$li.eq(nextorprevIndex).show().addClass('zIndex');
				$(this).css('transform', 'translate(0,' + (touch.pageY - downY) * step + 'px)');

			});

			$li.on('touchend', function(ev) {

				var touch = ev.originalEvent.changedTouches[0];
				if (touch.pageY < downY) { //↑
					$(this).css('transform', 'translate(0,' + (-viewHeight * step) + 'px)');
				} else if (touch.pageY > downY) { //↓
					$(this).css('transform', 'translate(0,' + (viewHeight * step) + 'px)');
				}
				$(this).css('transition', '.3s');
				$li.eq(nextorprevIndex).css('transform', 'translate(0,0)');
				$li.eq(nextorprevIndex).css('transition', '.3s');
			});

		});
		$li.on('transitionEnd webkitTransitionEnd', function(ev) {
			if ($li.is(ev.target)) {
				resetFn();
				if (cjAnimate[nowIndex]) {
					cjAnimate[nowIndex].outAn();
				}
				if (cjAnimate[nextorprevIndex]) {
					cjAnimate[nextorprevIndex].inAn();
				}
			}
		});

		function resetFn() {
			$li.css('transition', '');
			$li.eq(nextorprevIndex).removeClass('zIndex').siblings().hide();
			bBtn = true;
		}

	}

	var cjAnimate = [{
		inAn: function() {
			var $divChild = $li.eq(0).find('div');
			$divChild.css('transform', 'rotateY(360deg)');
			$divChild.css('transition', '1s');

		},
		outAn: function() {
			var $divChild = $li.eq(0).find('div');
			$divChild.css('transform', 'rotateY(0)');
			$divChild.css('transition', '');

		}
	}, {
		inAn: function() {
			var $liChild0 = $li.eq(1).find('li').eq(0);
			var $liChild1 = $li.eq(1).find('li').eq(1);
			$liChild1.attr('class', 'write');
			var str = '爱康金服，隶属于上海爱康富罗纳投资管理有限公司，总部位于上海，与上市公司爱康科技同属爱康集团。注册资本8000万元，公司核心管理团队成员均拥有5年以上金融行业从业经验。爱康金服利用信息化平台和技术，研发绿色能源产业链下金融理财产品，为客户提供安全、便捷、高收益的普惠金融产品与财富管理服务';
			write(str);
			$liChild0.css('transform', 'translateX(0)');
			$liChild0.css('transition', '1s');
		},
		outAn: function() {
			var $liChild0 = $li.eq(1).find('li').eq(0);
			var $liChild1 = $li.eq(1).find('li').eq(1);
			$('.write').html('');
			$liChild1.attr('class', '');
			$liChild0.css('transform', 'translateX(2000px)');
			$liChild0.css('transition', '');

		}
	}, {
		inAn: function() {
			var $liChild0 = $li.eq(2).find('li').eq(0);
			var $liChild1 = $li.eq(2).find('li').eq(1);
			$liChild1.attr('class', 'write');
			var str = '爱康金服发布的理财标的产品，以新能源产业链作为切入点，承兑企业均为业内优质企业及有深度合作的产业链企业和供应商。产品标的投向光伏辅材制造业、新能源光伏产业，光伏太阳能电厂建设、运维，绿色农业，碳金融等方向';
			write(str);
			$liChild0.css('transform', 'translateX(0)');
			$liChild0.css('transition', '1s');
		},
		outAn: function() {
			var $liChild0 = $li.eq(2).find('li').eq(0);
			var $liChild1 = $li.eq(2).find('li').eq(1);
			$('.write').html('');
			$liChild1.attr('class', '');
			$liChild0.css('transform', 'translateX(-1500px)');
			$liChild0.css('transition', '');
		}
	}, {
		inAn: function() {
			var $liChild0 = $li.eq(3).find('li').eq(0);
			var $liChild1 = $li.eq(3).find('li').eq(1);
			$liChild1.attr('class', 'write');
			var str = '平台上所有资金的往来全部通过第三方支付进行托管，凭借成熟的管理团队在金融领域的专业经验和风控优势，借助核心企业提供的大数据，批量锁定优质的借款企业，并通过量身定制的风险控制体系进行严格的风险把控、流程监控和贷后管理，确保借款项目资质优良、还款来源有可靠保障，有效控制风险，最大限度保护投资人利益';
			write(str);
			$liChild0.css('transform', 'translateX(0)');
			$liChild0.css('transition', '1s');
		},
		outAn: function() {
			var $liChild0 = $li.eq(3).find('li').eq(0);
			var $liChild1 = $li.eq(3).find('li').eq(1);
			$('.write').html('');
			$liChild1.attr('class', '');
			$liChild0.css('transform', 'translateX(-1500px)');
			$liChild0.css('transition', '');
		}
	}, {
		inAn: function() {
			var $liChild0 = $li.eq(4).find('li').eq(0);
			var $liChild1 = $li.eq(4).find('li').eq(1);
			$liChild1.attr('class', 'write');
			var str = '平台上所有资金的往来全部通过第三方支付进行托管，凭借成熟的管理团队在金融领域的专业经验和风控优势，借助核心企业提供的大数据，批量锁定优质的借款企业，并通过量身定制的风险控制体系进行严格的风险把控、流程监控和贷后管理，确保借款项目资质优良、还款来源有可靠保障，有效控制风险，最大限度保护投资人利益';
			write(str);
			$liChild0.css('transform', 'rotateY(360deg)');
			$liChild0.css('transition', '1s');
		},
		outAn: function() {
			var $liChild0 = $li.eq(4).find('li').eq(0);
			var $liChild1 = $li.eq(4).find('li').eq(1);
			$('.write').html('');
			$liChild1.attr('class', '');
			$liChild0.css('transform', '');
			$liChild0.css('transition', '');
		}
	}];

	$.each(cjAnimate, function(i, obj) {
		obj.outAn();
	});

	function showMusic() {
		var $music = $('#music');
		var $audio1 = $('#audio1');
		var onoff = true;
		$music.on('touchstart', function() {
			if (onoff) {
				$(this).attr('class', 'active');
				$audio1.get(0).play();
			} else {
				$(this).attr('class', '');
				$audio1.get(0).pause();
			}
			onoff = !onoff;
		});
		$music.trigger('touchstart');

	}
	showMusic();
	cjAnimate[0].inAn();

});