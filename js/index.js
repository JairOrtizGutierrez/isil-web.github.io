$(function() {
    
    function onShow() {
        $('body').append('<div id="background-image"></div>');
        $('#background-image').append('<img src="' + $(this).attr('src') + '">');
        $('#background-image').animate({opacity: 1}, 500);
        $('#background-image').click((e) => {
            $('#background-image').animate({opacity: 0}, 500, 'swing', () => {
                $(e.currentTarget).remove();
            });
        });
    }
    
    function onToggle() {
        
        if($(this).attr('data') == 'active') {
            
            var currently_url = $(this).find('img').attr('src');
            var url = currently_url.substr(0, currently_url.length - 10) + '.png';
            
            $(this).css('background-color', 'transparent');
            $(this).find('img').attr('src', url);
            $(this).find('span').first().css('color', '#191207');
            $(this).find('span').first().next().css('color', '#838b8c');
            $(this).attr('data', 'inactive');
            
        } else {
            
            var currently_url = $(this).find('img').attr('src');
            var url = currently_url.substr(0, currently_url.length - 4) + '_white.png';
            
            $(this).css('background-color', '#191207');
            $(this).find('img').attr('src', url);
            $(this).find('span').css('color', '#fff');
            $(this).attr('data', 'active');
            
        }
        
    }
    
    $('#options img').click(onShow);
    $('#info > div').click(onToggle);
    
    $('nav .nav-item a').click((e) => {
        
        e.preventDefault();
        
        var url = '';
        
        switch($(e.currentTarget).attr('id')) {
          case 'home':
            url = 'another_index.html';
            break;
          case 'services':
            url = 'services.html';
            break;
          default:
            return;
        }
        
        fetch(url)
        .then(response => {
            return response.text();
        })
        .then(data => {
            $('#main-content').html(data);
            $(window).scrollTop(0);
            // cuando se carga de nuevo el contenido del index, tenemos que vincular de nuevo los eventos correspondientes
            if(url == 'another_index.html') {
                $('#options img').bind('click', onShow);
                $('#info > div').bind('click', onToggle);
            }
        });
        
    });
    
});