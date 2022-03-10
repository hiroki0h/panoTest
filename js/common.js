var krpano = window.krpano || {};
krpano = (function($){
    "use strict";
    var windowWidth =  $(window).outerWidth(),
        windowHeight =  $(window).outerHeight();
    var common = {
        setCanvas : function(){
            //이미지 객체 생성
            var imgElem = new Image();

            //페이지 로드후 이미지가 로드 되었을 때 이미지 출력
            imgElem.addEventListener('load', function(){
                //로드된 이미지를 캔버스에 출력
                var canvas = document.getElementById('video-canvas'),
                    context = canvas.getContext('2d');

                canvas.width = windowWidth;
                canvas.height = windowHeight;

                //canvas.drawImage() 함수를 사용하여 이미지 출력
                //drawImage ( image sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
                context.drawImage( imgElem , 0, 0, windowWidth, windowHeight);
            },false);

            // 	//이미지 경로 설정
            var current = 1;
            function SetInterval(){
                setInterval(() => {
                    var changeImgSrc = current++;
                    if(changeImgSrc >= 50){
                        clearInterval(SetInterval);
                        $('.intro').addClass('done');
                        return
                    }
                    imgElem.src = "./welcome/welcome_"+changeImgSrc+".jpg";
                }, 100);
            };
            SetInterval();
        },
        panoOpen : function(){
            $('.pano_open').on('click',function(){
                $('#pano').fadeIn(800).addClass('on');
                embedpano({swf:'tour.swf', xml:'tour.xml', target:'pano',
                    html5:'auto', mobilescale:1.0, passQueryParameters:true});
            });
        },
        panoClose : function(){
            $('#pano').fadeOut(800).removeClass('on');
        },
        init : function(){
            common.setCanvas();
            common.panoOpen();
        },
    };
    $(document).ready(function(){
        common.init();
    });
    return{
        panoClose : common.panoClose,
    }
})(jQuery);