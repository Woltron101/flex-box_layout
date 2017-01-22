$(".similar-slider").slick({
			// normal options...
			infinite: true,
			slidesToShow: 5,

			// the magic
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
			// normal options...
			infinite: true,

			// the magic
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
