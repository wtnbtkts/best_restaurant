// This is a JavaScript file
$(document).on('pageinit',"#top-page",function(){
    setTimeout('move()', 1000);
});
function move(){
    $("#top-page").animate({opacity: 0}, {duration:1350});
    setTimeout('listpage()',1000);
}
function listpage(){
    var options = {
        animation: "fade"
    };
    app.navi.pushPage("list.html",options);
    list();
}
function list(){
    var CollegeClass = NCMB.Object.extend("College");
    var query = new NCMB.Query(CollegeClass);
    // alert("aa");
    query.find({
        success: function(colleges) {
            // alert(JSON.stringify(colleges));
            for (var i = 0; i < colleges.length; i++){
                var college = colleges[i];
                $("#result").append("<p>" + college.get("name") + "</p>");
                $("#college-list")
                    .append('<ons-list-item modifier="chevron" class="item"><ons-row><ons-col><header>' +
                    '<span class="item-title">'     + college.get("name")      + '</span>' +
                    '<span class="item-latitude">'  + college.get("latitude")  + '</span>' +
                    '<span class="item-longitude">' + college.get("longitude") + '</span>' +
                    '</header></ons-col></ons-row></ons-list-item>'
                );
                ons.compile($("#college-list")[0]);
            }
        },
        error: function(error) {
            console.log(error.message);
        }
    }); 
}
