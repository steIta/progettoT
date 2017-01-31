  $(document).ready(function(){
    var username,password;
    $("#submit").click(function(){
        username=$("#username").val();
        password=$("#password").val();
        $.post("http://localhost:3000/login",{username:username,password:password},function(data){        
            if(data==='done')           
            {
                window.location.href="/personale" ;
            }
        });
    });
});