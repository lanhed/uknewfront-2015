/**
 * Main entry point of app
 * configures and creates an app
 */

require.config({
	paths: {
		text: '../bower_components/requirejs-text/text',
		jquery: '../bower_components/jquery/dist/jquery.min',
		bootstrap: '../libs/bootstrap.min'
	},
	shim: {
		bootstrap: {
			deps: ['jquery']
		}
	}
});

require([
	'bootstrap'
	], 
function(
) {
	this.app = {
		setup: function() {
			this.$window = $(window);
			this.halfViewport = this.$window.height()/2;
			this.scrollTimeoutId = null;
			this.sections = ["event", "speakers", "think", "share", "about" ];
			this.positions = {};

			this.currentSpeakerId = null;

			this.counter = 0;
			this.$logo = $('.js-animate .logo');
			this.animationHandler = $.proxy(this.animationHandler,this);
			this.timeoutid = window.setInterval(this.animationHandler,4000);

			this.player = null;
			this.$container = $('#global-youtube-container');
			this.$content = this.$container.find('.youtube-player--content');
			this.$overlay = $('#global-youtube-overlay');
			this.videoIds = {
				"video1":"RxlBgtoZyOM",
				"video2":"78zKx9uYk8g",
				"video3":"https://www.youtube.com/channel/UCTuIuKGORxpNiOmGNmWQgUA"
			}

			for (var i=0; i < this.sections.length; i++) {
				var section = this.sections[i];
				this.positions[section] = $('section.'+section).offset().top;
			}


			this.setupEventListeners();

			// deep linking onload
			if (window.location.hash) {
				this.scrollToSection(window.location.hash.split('#')[1]);
			}
		},
		
		setupEventListeners: function() {
			var that = this;
			this.onScrollHandler = $.proxy(this.onScrollHandler,this);
			this.$window.on('scroll resize', this.onScrollHandler);
			


			var $navbar = $('.nav.navbar-nav');
			$navbar.on('click', 'a' , function(e) {
				window.la
				var section = $(e.currentTarget).data('section');
				if (section) {
					window.location.hash = '#'+section;
					e.preventDefault();
					that.scrollToSection(section);
				}
			});

			// video
			var tag = document.createElement('script');
			tag.src = "https://www.youtube.com/iframe_api";
			var firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


			var $videoPosterBig = $('section.event .video-poster');
			var $videoCloseButton = $('.video-close');
			var $videoPosterSmall = $('section.event .video-poster-small');

			this.playVideo = $.proxy(this.playVideo, this);
			this.onPlayerReady = $.proxy(this.onPlayerReady, this);

			$videoPosterBig.on('click', this.playVideo);
			$videoPosterSmall.on('click', this.playVideo);
			$videoPosterSmall.on("mouseenter", function(e) {
				$(this).addClass('active');
			});
			$videoPosterSmall.on("mouseleave", function(e) {
				$(this).removeClass('active');
			});
			$videoCloseButton.on('click', function() {
				that.stopVideo();
				that.$container.hide();
				that.$overlay.hide();
				that.$content.html('<div id="video-player"></div>');
			});

			var $speakerWrapper = $('section.speakers');
			var $speakers = $speakerWrapper.find('a');
			$speakers.on('click',function(e) {
				e.preventDefault();
				that.currentSpeakerId = $(e.currentTarget).data('id');
				$speakerWrapper.find('.lineup').hide();
				var $speaker = $("body").find("[data-speaker-id='" + that.currentSpeakerId + "']");
				//console.log('speaker',that.currentSpeakerId, $speaker);
				$speaker.addClass('active');
				$('html, body').animate({
					scrollTop: $speaker.offset().top + 'px'
				}, 'fast');
			});

			var $speakersClose = $speakerWrapper.find('.speaker-close');
			$speakersClose.on('click', function(e) {
				e.preventDefault();
				$speakerWrapper.find('.lineup').show();
				var $speaker = $("body").find("[data-speaker-id='" + that.currentSpeakerId + "']");
				$speaker.removeClass('active');
				that.currentSpeakerId = null;
			});
		},

		onScrollHandler: function(e) {
			this.scrollTimeoutHandler = $.proxy(this.scrollTimeoutHandler, this);

			if (!this.scrollTimeoutId) {
				this.scrollTimeoutId = setTimeout($.proxy(this.scrollTimeoutHandler,this), 500);
			}
		},
		scrollTimeoutHandler: function() {
			var currentSection = null,
				hash = null,
				section = null,
				scrollTop=0;

			for (var i=0; i < this.sections.length; i++) {
				section = this.sections[i];
				if (navigator.userAgent.toLowerCase().indexOf('firefox') !== -1) {
					scrollTop = document.documentElement.scrollTop;
				} else {
					scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
				}
				if (scrollTop + this.halfViewport >= this.positions[section]) {
					currentSection = section;
				}
			}
			if (scrollTop > 0) {
				hash = window.location.hash.split('#')[1]
				if (hash !== currentSection && currentSection) {
					window.location.hash = currentSection;
				} else if (!currentSection) {
					window.location.hash = '';
				}
			}
			
			clearTimeout(this.scrollTimeoutId);
			this.scrollTimeoutId = null;
		},
		playVideo: function(e){
			e.preventDefault();
			var videoReferenceId = $(e.delegateTarget).data('video-id');
			var videoId = this.videoIds[videoReferenceId];
			if (videoId && videoReferenceId === 'video3'){
				window.location.href=videoId;
			} else if (videoId) {
				this.onYouTubeIframeAPIReady(videoId);
			}
		},
		onYouTubeIframeAPIReady: function(id) {
			player = new YT.Player('video-player', {
				width: '100%',
				height: '100%',
				videoId: id,
				playerVars: { 'autoplay': 1, 'controls': 1 },
				events: {
					'onReady': this.onPlayerReady/*,
					'onStateChange': this.onPlayerStateChange,
					'onError': this.onPlayerError*/
				}
			});
		},
		onPlayerReady: function(event) {
			this.player = event.target;
			this.player.playVideo();
			this.$container.show();
			this.$overlay.show();
		},
		stopVideo: function() {
			this.player.stopVideo();
		},

		animationHandler: function(){
			var scrollTop=0;
			if (navigator.userAgent.toLowerCase().indexOf('firefox') !== -1) {
				scrollTop = document.documentElement.scrollTop;
			} else {
				scrollTop = document.body.scrollTop;
			}
			if (scrollTop < this.$logo.offset().top + this.$logo.height()) {
				this.counter++;
				this.$logo.css({'transform':'rotate('+this.counter*180+'deg)'});
			}
		},

		scrollToSection: function(section) {
			if (section) {
				var $el = $('section.'+section);
				$('html, body').animate({
					scrollTop: $el.offset().top + 'px'
				}, 'slow');
			}
		}
	};

	this.app.setup();
});
