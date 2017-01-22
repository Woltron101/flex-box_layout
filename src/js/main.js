$(".similar-slider").slick({
	infinite: true,
	slidesToShow: 5,
	responsive: [{
		breakpoint: 1024,
		settings: {
			slidesToShow: 3,
			infinite: true
		}
	}, {
		breakpoint: 600,
		settings: {
			slidesToShow: 2,
			dots: true
		}
	}, {
		breakpoint: 300,
		settings: "unslick" // destroys slick

	}],
	arrows: true,
	nextArrow: '<button type="button" class="slick-next"> <span class="icon icon-right-arr"></span></button>',
	prevArrow: '<button type="button" class="slick-prev"> <span class="icon icon-right-arr"></span> </button>'
})

$(".articles-slider").slick({
	infinite: true,
	variableWidth: true,
	arrows: true,
	nextArrow: '<button type="button" class="slick-next"> <span class="icon icon-right-arr"></span></button>',
	prevArrow: '<button type="button" class="slick-prev"> <span class="icon icon-right-arr"></span> </button>'
})

$('.play-btn').click(function() {
	$(this).closest('.video-wrap').find('video').trigger('click');
})

$('.myHTMLvideo').click(function() {
	if (this.paused) {
		this.play();
		$(this).closest('.video-wrap').removeClass('pause')
	} else {
		this.pause();
		$(this).closest('.video-wrap').addClass('pause')
	}
});

$('select').styler();
$('.specifications__menu-list a').smoothScroll();


function showMore(selector) {
	if ($(selector).hasClass('hidden')) {
		$(selector).removeClass('hidden');
		$(this).find('.show-text').hide()
		$(this).find('.hide-text').show()

	} else {
		$(selector).addClass('hidden');
		$(this).find('.show-text').show()
		$(this).find('.hide-text').hide()
	}    
	$(this).find('.icon-arr-down-red').toggleClass('rotate');
}

function showTab(index, t) {
	$('.tab-container').hide();
	$('.tab-container.tab' + index).show();
    $('.specifications__buttons button').removeClass('active');
    $(t).addClass('active');
}