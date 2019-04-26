window.onload = function(){
	var oul=document.getElementById('ul')
    var oli=oul.getElementsByTagName('li')
    var obtn=document.getElementById('btn')
    var olis=obtn.getElementsByTagName('li')
    var ol=document.getElementById('left')
    var or=document.getElementById('right')
    var now=0;
    var key=0;
    olis[0].style.backgroundColor='red'
    for (var i = 0; i < olis.length; i++) {
    	olis[i].index=i
    	olis[i].onclick=function(){
            now=key=this.index
            show()
    	}
    }
    function next(){
    	now++;
    	if (now>olis.length-1) {
    		now=0
    	}
    	key++;
    	if (key>olis.length) {
    		key=1
    		oul.style.left=0
    	}
    	show()
    }
    var time=setInterval(next,2000)
    oul.onmouseover=function(){
    	clearInterval(time)
    }
    oul.onmouseout=function(){
    	time=setInterval(next,2000)
    }
    var time1=null
    function show(){
    	for (var i = 0; i < olis.length; i++) {
    		olis[i].style.backgroundColor=''
    	};
    	olis[now].style.backgroundColor='red'
    	var len=(-oli[0].offsetWidth)*key-oul.offsetLeft;
    	var start=oul.offsetLeft;
    	var count=20;
    	var a=0;
    	clearInterval(time1)
    	time1=setInterval(function(){
    		a++;
    		oul.style.left=start+len*a/count+'px';
    		if (a==count) {
    			clearInterval(time1)
    		}
    	},30)
    }
$(function() {
    var $sidescroll = (function() {
        var $rows   = $('#ss-container > div.ss-row'),
            $rowsViewport, $rowsOutViewport,
            $links  = $('#ss-links > a'),
            $win    = $(window),
            winSize = {},
            anim    = false,
            scollPageSpeed  = 2000 ,
            scollPageEasing = 'easeInOutExpo',
            hasPerspective  = false,
            perspective     = hasPerspective && Modernizr.csstransforms3d,
            init = function() {
                getWinSize();
                initEvents();
                defineViewport();
                setViewportRows();
                if( perspective ) {
                    $rows.css({
                        '-webkit-perspective' : 600,
                        '-webkit-perspective-origin' : '50% 0%'
                    });
                }
                $rowsViewport.find('a.ss-circle').addClass('ss-circle-deco');
                placeRows();
            },
            defineViewport = function() {
                $.extend( $.expr[':'], {
                    inviewport : function ( el ) {
                        if ( $(el).offset().top < winSize.height ) {
                            return true;
                        }
                        return false;
                    }
                });
            },
            setViewportRows = function() {
                
                $rowsViewport       = $rows.filter(':inviewport');
                $rowsOutViewport    = $rows.not( $rowsViewport )
            },
            getWinSize = function() {
            
                winSize.width   = $win.width();
                winSize.height  = $win.height();
            },
            initEvents = function() {
                $links.on( 'click.Scrolling', function( event ) {
                    $('html, body').stop().animate({
                        scrollTop: $( $(this).attr('href') ).offset().top
                    }, scollPageSpeed, scollPageEasing );
                    return false;
                });
                $(window).on({
                    'resize.Scrolling' : function( event ) {
                        getWinSize();
                        setViewportRows();
                        $rows.find('a.ss-circle').removeClass('ss-circle-deco');
                        $rowsViewport.each( function() {
                        
                            $(this).find('div.ss-left')
                                   .css({ left   : '0%' })
                                   .end()
                                   .find('div.ss-right')
                                   .css({ right  : '0%' })
                                   .end()
                                   .find('a.ss-circle')
                                   .addClass('ss-circle-deco');
                        });
                    },
                    'scroll.Scrolling' : function( event ) {
                        if( anim ) return false;
                        anim = true;
                        setTimeout( function() {
                            
                            placeRows();
                            anim = false;
                            
                        },10);
                    
                    }
                });
            
            },
            placeRows = function() {
                var winscroll   = $win.scrollTop(),
                    winCenter   = winSize.height / 2 + winscroll;
                $rowsOutViewport.each( function(i) {
                    
                    var $row    = $(this),
                        $rowL   = $row.find('div.ss-left'),
                        $rowR   = $row.find('div.ss-right'),
                        rowT    = $row.offset().top;
                    if( rowT > winSize.height + winscroll ) {
                        if( perspective ) {
                            $rowL.css({
                                '-webkit-transform' : 'translate3d(-75%, 0, 0) rotateY(-90deg) translate3d(-75%, 0, 0)',
                                'opacity'           : 0
                            });
                            $rowR.css({
                                '-webkit-transform' : 'translate3d(75%, 0, 0) rotateY(90deg) translate3d(75%, 0, 0)',
                                'opacity'           : 0
                            });
                        
                        }
                        else {
                        
                            $rowL.css({ left : '-50%' });
                            $rowR.css({ right : '-50%' });
                        }
                    }
                    else {
                        var rowH    = $row.height(),
                            factor  = ( ( ( rowT + rowH / 2 ) - winCenter ) / ( winSize.height / 2 + rowH / 2 ) ),
                            val     = Math.max( factor * 50, 0 );
                            
                        if( val <= 0 ) {
                            if( !$row.data('pointer') ) {
                            
                                $row.data( 'pointer', true );
                                $row.find('.ss-circle').addClass('ss-circle-deco');
                            }
                        
                        }
                        else {
                            if( $row.data('pointer') ) {
                                
                                $row.data( 'pointer', false );
                                $row.find('.ss-circle').removeClass('ss-circle-deco');
                            }
                        }
                        if( perspective ) {
                            
                            var t       = Math.max( factor * 75, 0 ),
                                r       = Math.max( factor * 90, 0 ),
                                o       = Math.min( Math.abs( factor - 1 ), 1 );
                            
                            $rowL.css({
                                '-webkit-transform' : 'translate3d(-' + t + '%, 0, 0) rotateY(-' + r + 'deg) translate3d(-' + t + '%, 0, 0)',
                                'opacity'           : o
                            });
                            $rowR.css({
                                '-webkit-transform' : 'translate3d(' + t + '%, 0, 0) rotateY(' + r + 'deg) translate3d(' + t + '%, 0, 0)',
                                'opacity'           : o
                            });
                        }
                        else {
                            
                            $rowL.css({ left : - val + '%' });
                            $rowR.css({ right : - val + '%' });
                        }
                    }   
                });
            };
        return { init : init };
    })();
    $sidescroll.init();
});

        $(document).ready(function () {
            function fixHeight() {
                var headerHeight = $("#switcher").height();
                $("#iframe").attr("height", $(window).height()-54+ "px");
            }
            $(window).resize(function () {
                fixHeight();
            }).resize();

            $('.icon-monitor').addClass('active');

            $(".icon-mobile-3").click(function () {
                $("#by").css("overflow-y", "auto");
                $('#iframe-wrap').removeClass().addClass('mobile-width-3');
                $('.icon-tablet,.icon-mobile-1,.icon-monitor,.icon-mobile-2,.icon-mobile-3').removeClass('active');
                $(this).addClass('active');
                return false;
            });

            $(".icon-mobile-2").click(function () {
                $("#by").css("overflow-y", "auto");
                $('#iframe-wrap').removeClass().addClass('mobile-width-2');
                $('.icon-tablet,.icon-mobile-1,.icon-monitor,.icon-mobile-2,.icon-mobile-3').removeClass('active');
                $(this).addClass('active');
                return false;
            });

            $(".icon-mobile-1").click(function () {
                $("#by").css("overflow-y", "auto");
                $('#iframe-wrap').removeClass().addClass('mobile-width');
                $('.icon-tablet,.icon-mobile,.icon-monitor,.icon-mobile-2,.icon-mobile-3').removeClass('active');
                $(this).addClass('active');
                return false;
            });

            $(".icon-tablet").click(function () {
                $("#by").css("overflow-y", "auto");
                $('#iframe-wrap').removeClass().addClass('tablet-width');
                $('.icon-tablet,.icon-mobile-1,.icon-monitor,.icon-mobile-2,.icon-mobile-3').removeClass('active');
                $(this).addClass('active');
                return false;
            });

            $(".icon-monitor").click(function () {
                $("#by").css("overflow-y", "hidden");
                $('#iframe-wrap').removeClass().addClass('full-width');
                $('.icon-tablet,.icon-mobile-1,.icon-monitor,.icon-mobile-2,.icon-mobile-3').removeClass('active');
                $(this).addClass('active');
                return false;
            });
        });
    
    function Responsive($a) {
        if ($a == true) $("#Device").css("opacity", "100");
        if ($a == false) $("#Device").css("opacity", "0");
        $('#iframe-wrap').removeClass().addClass('full-width');
        $('.icon-tablet,.icon-mobile-1,.icon-monitor,.icon-mobile-2,.icon-mobile-3').removeClass('active');
        $(this).addClass('active');
        return false;
    };
    var _hmt = _hmt || [];
    (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?382f81c966395258f239157654081890";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();

}