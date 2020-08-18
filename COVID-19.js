$('#search').keyup(function(){
    var keycode = (event.keyCode ? event.keyCode : event.which);
      if(keycode == '13'){
        $('#search-btn').click();
        return;
      }
      if($('#search').val()=="" || $('#search').val()==''){
        $('#search-btn').attr('disabled',true);
      }else
        $('#search-btn').attr('disabled',false);
  });
  $('#search-btn').on('click',function(){
  
    $.ajax({
      type: "GET",
      url: "https://disease.sh/v3/covid-19/countries/"+$('#search').val()+"?strict=true",
      statusCode: {
        404: function (response) {
           $('#table').first().append('<h2 style="color:white"><center>No Results Found</h2></center>')
        }
      },
      success: function (response) {
        var tbody = $("<tbody />");
        tbody.append('<tr>');
        Object.entries(response).forEach(entry => {
            
        const [key, value] = entry;
        console.log(key, value);
        if (key!='countryInfo' && key!='updated') {
          tbody.append('<tr><th class="row">'+key+'</th>'+'<td class="col">'+value+'</td></tr>');
        }
        
    });
      tbody.append('</tr>');
      tbody.appendTo("#table");
      }
    });
  
    $('.background-image').addClass('blur');
    $('#head').fadeOut();
    $('#search').fadeOut();
    $(".vertical-container").animate({top:'50px'},1000);
  
    $('#back').fadeIn(function(){
      $('#table').fadeIn(400,function(){
        $('#search-btn').fadeOut(1000,function(){
        $('#table').fadeIn();
        });
      }); 
    });
  
  });
  
  $('#back').on('click',function(){
    $('#table').fadeOut(700,function(){
      $('#head').fadeIn();
    $('#search').fadeIn();
    $('.background-image').removeClass('blur');
    $('#back').fadeOut(function(){
    $('#search-btn').fadeIn(function(){
    $(".vertical-container").animate({top:'50%'},1000);
    }); 
    });
    });
  $('#table').html('');
  })