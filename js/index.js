(function($){

    // Link
    $('body').on('click', '.navBox .depth2 > li > a', function(){
        var url = this.href
        $('body').addClass('sub')
        $('#container > #content').remove()
        $('#container').load(url + ' #content')
        return false
    })
    $('body').on('click', 'a.home', function(){
        $('body').removeClass('sub')
    })

    // 리사이즈
    function init() {
        var winWidth = $(window).innerWidth()
        if (winWidth > 800 && !$(window).hasClass('pc')){
            $('html').addClass('pc').removeClass('mobile')
            $('.navBox .depth2').stop().slideUp()
            $('.navBox .depth1 > li').removeClass('mobile')
        } else if (winWidth <= 800 && !$(window).hasClass('mobile')){
            $('html').addClass('mobile').removeClass('pc')
        }
    }
    init()
    $(window).resize(function(){ init() })

    // 네비 hover
    $('.navBox .depth1 > li').hover(
        function(){
            if($('html').hasClass('pc')){
                $(this).addClass('on')
                $(this).find('.depth2').stop().slideDown(300)
            }
        },
        function(){
            if($('html').hasClass('pc')){
                $(this).removeClass('on')
                $(this).find('.depth2').stop().slideUp(300)
            }
        }
    )

    // 모바일 네비 Click
    $('.navBox .depth1 > li > a').on('click', function(e){
        e.preventDefault()
        if($('html').hasClass('mobile')){
            $(this).parent().toggleClass('mobile')
            $(this).siblings('.depth2').stop().slideToggle(300)
            $(this).parent().siblings().each(function(){
                $(this).removeClass('mobile')
                $(this).find('.depth2').stop().slideUp(300)
            })
        }
    })
    $('.navBox .depth2 > li > a').on('click', function(){
        if($('html').hasClass('mobile')){
            $(this).parent().parent().stop().slideUp(300)
            $('.navBox .depth1 > li > a').css({background: 'transparent'})
        }
    })


    // 케익 이름
    function changeOn(ind){
        var kor = $(ind).find('img').attr('kor')
        var eng = $(ind).find('img').attr('eng')
        $('.cakeSlide .nameTxt span').eq(0).text(kor)
        $('.cakeSlide .nameTxt span').eq(1).text(eng)
    }

    // 타임바
    var outer = $('.cakeSlide .control .timerBox .outer')
    function timeBarReset (){
        if(outer.hasClass('on')){
            outer.removeClass('on').addClass('on2')
        } else if(outer.hasClass('on2')){
            outer.removeClass('on2').addClass('on')
        }
    }

    // next 오토슬라이드
    function cakeNext (){
        var on = $('.cakeImg ul li.on').next()
        var first = $('.cakeImg ul li').eq(0)
        on.addClass('on').css({transition: '1s ease-in-out'})
        on.next().addClass('next').css({transition: '1s ease-out'})
        on.prev().addClass('prev').css({transition: '0.01s ease'})
        on.removeClass('next prev')
        on.prev().removeClass('on next')
        on.prev().prev().removeClass('prev next on')
        on.next().removeClass('on prev')
        on.parent().append(first)
        timeBarReset()
        changeOn(on)
    }

    // setInterval
    var cakeSlideStart
    var playBtn = $('.cakeSlide .control .playBtn')
    var flag = true
    function resetTime (){
        if( !flag && playBtn.hasClass('on') ){
            $('.control .playBtn .pause').css({display: 'none'})
            $('.control .playBtn .play').css({display: 'block'})
            // outer.removeClass('on on2')
            clearInterval(cakeSlideStart) 
            cakeSlideStart = resetTime()
        }
        else if ( flag && playBtn.hasClass('on') ){
            $('.control .playBtn .pause').css({display: 'block'})
            $('.control .playBtn .play').css({display: 'none'})
            // outer.addClass('on')
            setInterval(function (){
                cakeNext()
            }, 4000)
        }
        else if ( flag && !playBtn.hasClass('on') ){
            return setInterval(function (){
                cakeNext()
            }, 4000)
        }
    }

    // 재생 일시정지
    playBtn.find('.pause').on('click', function(e){
        e.preventDefault()
        if( !playBtn.hasClass('on') ){
            playBtn.addClass('on')
        }
        flag = false
        resetTime()
    })
    playBtn.find('.play').on('click', function(e){
        e.preventDefault()
        if( !playBtn.hasClass('on') ){
            playBtn.addClass('on')
        }
        flag = true
        resetTime()
    })

    // next 버튼 클릭
    $('.control .arrowBtn .next').on('click',function(e){
        e.preventDefault()
        cakeNext()
        clearInterval(cakeSlideStart) 
        cakeSlideStart = resetTime()
        playBtn.removeClass('on')
    })
    // prev 버튼 클릭
    $('.control .arrowBtn .prev').on('click',function(e){
        e.preventDefault()
        var on = $('.cakeImg ul li.on').prev()
        var last = $('.cakeImg ul li').eq(3)
        on.addClass('on').css({transition: '1s ease-in-out'})
        on.next().addClass('next').css({transition: '1s ease'})
        on.prev().addClass('prev').css({transition: '1s ease'})
        on.removeClass('next prev')
        on.prev().removeClass('on next')
        on.next().removeClass('on prev')
        on.next().next().removeClass('prev next on')
        on.parent().prepend(last)
        timeBarReset()
        changeOn(on)
        clearInterval(cakeSlideStart) 
        cakeSlideStart = resetTime()
        playBtn.removeClass('on')
    })

    cakeSlideStart = resetTime()

    

})(jQuery)