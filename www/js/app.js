function star1() {
    $('#star1').attr("class", "ons-icon fa-star fa fa-lg");
    $('#star2').attr("class", "ons-icon fa-star-o fa fa-lg");
    $('#star3').attr("class", "ons-icon fa-star-o fa fa-lg");
    $('#star4').attr("class", "ons-icon fa-star-o fa fa-lg");
    $('#star5').attr("class", "ons-icon fa-star-o fa fa-lg");
    $('#star-value').text(1);
}

function star2() {
    $('#star1').attr("class", "ons-icon fa-star fa fa-lg");
    $('#star2').attr("class", "ons-icon fa-star fa fa-lg");
    $('#star3').attr("class", "ons-icon fa-star-o fa fa-lg");
    $('#star4').attr("class", "ons-icon fa-star-o fa fa-lg");
    $('#star5').attr("class", "ons-icon fa-star-o fa fa-lg");
    $('#star-value').text(2);
}

function star3() {
    $('#star1').attr("class", "ons-icon fa-star fa fa-lg");
    $('#star2').attr("class", "ons-icon fa-star fa fa-lg");
    $('#star3').attr("class", "ons-icon fa-star fa fa-lg");
    $('#star4').attr("class", "ons-icon fa-star-o fa fa-lg");
    $('#star5').attr("class", "ons-icon fa-star-o fa fa-lg");
    $('#star-value').text(3);
}

function star4() {
    $('#star1').attr("class", "ons-icon fa-star fa fa-lg");
    $('#star2').attr("class", "ons-icon fa-star fa fa-lg");
    $('#star3').attr("class", "ons-icon fa-star fa fa-lg");
    $('#star4').attr("class", "ons-icon fa-star fa fa-lg");
    $('#star5').attr("class", "ons-icon fa-star-o fa fa-lg");
    $('#star-value').text(4);
}

function star5() {
    $('#star1').attr("class", "ons-icon fa-star fa fa-lg");
    $('#star2').attr("class", "ons-icon fa-star fa fa-lg");
    $('#star3').attr("class", "ons-icon fa-star fa fa-lg");
    $('#star4').attr("class", "ons-icon fa-star fa fa-lg");
    $('#star5').attr("class", "ons-icon fa-star fa fa-lg");
    $('#star-value').text(5);
}

var latitude;
var longitude;
var categoryName;

(function(){
  'use strict';

    NCMB.initialize(
      "324165a7688bf86c0fd74f7f686651160c20081dbd78e0a0a5610b2815b8585b",
      "c1402f5f01e6254f4a72e8c0bdeaec4f82e26e66cfd30ac8f81ac9d444759a18"
    );

  var currentItem = {};
  var currentCategory = {};

  $(document).on('pageinit', '#detail-page', function() {
    $('.item-title', this).text(currentItem.title);
    $('.item-desc', this).text(currentItem.desc);
    $('.item-label', this).text(currentItem.label);
    $('.add-note-action-item', this).click(function () {
        alert('dummy message');
    });
  });

  $(document).on('pageinit', '#map-page', function(){
      loadMap();
  });

  $(document).on('pageinit', '#list-page', function() {
    $('#list-page').on('click', '.item', function() {
      currentItem = {
        title : $('.item-title', this).text(),
        latitude : $('.item-latitude', this).text(),
        longitude : $('.item-longitude', this).text()
      };

      var CategoryClass = NCMB.Object.extend("Category");
      var query = new NCMB.Query(CategoryClass);

      query.find({
        success: function(categories) {
          for (var i = 0; i < categories.length; i++){
            var category = categories[i];
            $("#category-list")
              .append('<ons-list-item modifier="chevron" id="category-item' + i + '" class="item category-item"><ons-row><ons-col><header><span class="item-title">'
                      + category.get("name") +
                  '</span></header></ons-col></ons-row></ons-list-item>'
              );
            ons.compile($("#category-list")[0]);
            $("#category-item" + i).on('click', function() {
              app.navi.pushPage('MAP.html');
              currentCategory = {
                  name : $('.item-title', this).text()
              };
              latitude = currentItem.latitude;
              longitude = currentItem.longitude;
              categoryName = currentCategory.name;
            });
          }
        },
        error: function(error) {
            console.log(error.message);
        }
      });

      app.navi.pushPage('category.html');
    });
  });
})();

var map;
var infowindow;
var placeName;

function initMap() {
}

function loadMap() {
    // alert(typeof(latitude) == "string" );
  var pyrmont = {lat: latitude - 0, lng: longitude - 0};

  map = new google.maps.Map(document.getElementById('map'), {
    center: pyrmont,
    zoom: 15
  });

  infowindow = new google.maps.InfoWindow();

  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: pyrmont,
    radius: 500,
    // types: ['cafe']
    name : categoryName
  }, callback);
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
      // alert(results[0].geometry)
  for (var i = 0; i < results.length; i++) {
    createMarker(results[i]);
    }
  }
}

var count;

function showStarAverage(result, checker) {
  if (checker > 4.5) {
    result.html(
       '<ons-icon icon="fa-star" class="ons-icon fa-star fa fa-lg"></ons-icon>' +
       '<ons-icon icon="fa-star" class="ons-icon fa-star fa fa-lg"></ons-icon>' +
       '<ons-icon icon="fa-star" class="ons-icon fa-star fa fa-lg"></ons-icon>' +
       '<ons-icon icon="fa-star" class="ons-icon fa-star fa fa-lg"></ons-icon>' +
       '<ons-icon icon="fa-star" class="ons-icon fa-star fa fa-lg"></ons-icon>'
    );
  } else if (checker > 4) {
    result.html(
       '<ons-icon icon="fa-star" class="ons-icon fa-star fa fa-lg"></ons-icon>' +
       '<ons-icon icon="fa-star" class="ons-icon fa-star fa fa-lg"></ons-icon>' +
       '<ons-icon icon="fa-star" class="ons-icon fa-star fa fa-lg"></ons-icon>' +
       '<ons-icon icon="fa-star" class="ons-icon fa-star fa fa-lg"></ons-icon>' +
       '<ons-icon icon="fa-star" class="ons-icon fa-star-half-o fa fa-lg"></ons-icon>'
    );
  } else if (checker > 3.5) {
    result.html(
       '<ons-icon icon="fa-star" class="ons-icon fa-star fa fa-lg"></ons-icon>' +
       '<ons-icon icon="fa-star" class="ons-icon fa-star fa fa-lg"></ons-icon>' +
       '<ons-icon icon="fa-star" class="ons-icon fa-star fa fa-lg"></ons-icon>' +
       '<ons-icon icon="fa-star" class="ons-icon fa-star fa fa-lg"></ons-icon>' +
       '<ons-icon icon="fa-star" class="ons-icon fa-star-o fa fa-lg"></ons-icon>'
    );
  } else if (checker > 3) {
    result.html(
       '<ons-icon icon="fa-star" class="ons-icon fa-star fa fa-lg"></ons-icon>' +
       '<ons-icon icon="fa-star" class="ons-icon fa-star fa fa-lg"></ons-icon>' +
       '<ons-icon icon="fa-star" class="ons-icon fa-star fa fa-lg"></ons-icon>' +
       '<ons-icon icon="fa-star" class="ons-icon fa-star-half-o fa fa-lg"></ons-icon>' +
       '<ons-icon icon="fa-star" class="ons-icon fa-star-o fa fa-lg"></ons-icon>'
    );
  } else if (checker > 2.5) {
    result.html(
       '<ons-icon icon="fa-star" class="ons-icon fa-star fa fa-lg"></ons-icon>' +
       '<ons-icon icon="fa-star" class="ons-icon fa-star fa fa-lg"></ons-icon>' +
       '<ons-icon icon="fa-star" class="ons-icon fa-star fa fa-lg"></ons-icon>' +
       '<ons-icon icon="fa-star" class="ons-icon fa-star-o fa fa-lg"></ons-icon>' +
       '<ons-icon icon="fa-star" class="ons-icon fa-star-o fa fa-lg"></ons-icon>'
    );
  } else if (checker > 2) {
    result.html(
       '<ons-icon icon="fa-star" class="ons-icon fa-star fa fa-lg"></ons-icon>' +
       '<ons-icon icon="fa-star" class="ons-icon fa-star fa fa-lg"></ons-icon>' +
       '<ons-icon icon="fa-star" class="ons-icon fa-star-half-o fa fa-lg"></ons-icon>' +
       '<ons-icon icon="fa-star" class="ons-icon fa-star-o fa fa-lg"></ons-icon>' +
       '<ons-icon icon="fa-star" class="ons-icon fa-star-o fa fa-lg"></ons-icon>'
    );
  } else if (checker > 1.5) {
    result.html(
       '<ons-icon icon="fa-star" class="ons-icon fa-star fa fa-lg"></ons-icon>' +
       '<ons-icon icon="fa-star" class="ons-icon fa-star fa fa-lg"></ons-icon>' +
       '<ons-icon icon="fa-star" class="ons-icon fa-star-o fa fa-lg"></ons-icon>' +
       '<ons-icon icon="fa-star" class="ons-icon fa-star-o fa fa-lg"></ons-icon>' +
       '<ons-icon icon="fa-star" class="ons-icon fa-star-o fa fa-lg"></ons-icon>'
    );
  } else {
    result.html(
       '<ons-icon icon="fa-star" class="ons-icon fa-star fa fa-lg"></ons-icon>' +
       '<ons-icon icon="fa-star" class="ons-icon fa-star-o fa fa-lg"></ons-icon>' +
       '<ons-icon icon="fa-star" class="ons-icon fa-star-o fa fa-lg"></ons-icon>' +
       '<ons-icon icon="fa-star" class="ons-icon fa-star-o fa fa-lg"></ons-icon>' +
       '<ons-icon icon="fa-star" class="ons-icon fa-star-o fa fa-lg"></ons-icon>'
    );
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    placeName = place.name;
    infowindow.setContent(placeName);
    infowindow.open(map, this);

      var ReviewClass = NCMB.Object.extend("Review");
      var reviewQuery = new NCMB.Query(ReviewClass);

      reviewQuery.equalTo("store_id", placeName);

      reviewQuery.find({
        success: function(reviews) {
          var starAverage = 0;
          var priceAverage = 0;

          for (var i = 0; i < reviews.length; i++) {
              var object = reviews[i];
              starAverage += object.get("star") - 0;
              priceAverage += object.get("price") - 0;
          }

          starAverage /= reviews.length;
          priceAverage /= reviews.length;

          showStarAverage($("#show-star-average"), starAverage);

          $("#show-price-average").html( Math.round(priceAverage) + "円" );
        },
        error: function(error) {
            alert(error.message);
        }
      });

        var query = new NCMB.Query("file");
        query.descending("createDate");

        query.find({
          success: function(files) {
            count = files.length;
            for (var i = files.length; i >= 1; i--) {
              $("#list-img").append('<img id="gazo' + i + '" alt="" />');
            }

            for (var i = files.length; i >= 1; i--) {
              // console.log(placeName + i + ".jpg");
              var objFile = new NCMB.File(placeName + i + ".jpg");
              var imageTag = document.getElementById("gazo" + i);
              objFile.fetchImgSource(imageTag);
            }
          },
          error: function(err) {
            console.log(err.message);
          }
        });
        app.navi.pushPage('img.html');
  });

  // google.maps.event.addDomListener( placeName, 'click', function() {
  //     alert('a');
  // } );
}


var fileName = placeName + String(count) + ".jpg"; //保存File名

///// Called when app launch

function toBlob(base64) {
    var bin = atob(base64.replace(/^.*,/, ''));
    var buffer = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) {
        buffer[i] = bin.charCodeAt(i);
    }
    // Blobを作成
    try{
        var blob = new Blob([buffer.buffer], {
            type: 'image/png'
        });
    }catch (e){
        return false;
    }
    return blob;
}

function snapPicture () {
    var img_count;
    var query = new NCMB.Query("file");

    query.find({
        success: function(files) {
            img_count = files.length;
        },
        error: function(err) {
          console.log(err.message);
        }
    });


    navigator.camera.getPicture (onSuccess, onFail,
        { quality: 50, destinationType: Camera.DestinationType.DATA_URL,
          targetWidth: 400, targetHeight: 300});

    //成功した際に呼ばれるコールバック関数
    function onSuccess (imageData) {
        var byteCharacters = toBlob(imageData);
        fileName = placeName + String(img_count + 1) + ".jpg"; //保存File名
        var NCMBFile = new NCMB.File(fileName, byteCharacters, "image/png");
        NCMBFile.save().then(function() {
          //NCMBサーバーからファイルをダウンロード
          var getFile =  new NCMB.File(fileName);
          var image_canvas = document.getElementById("showImage");
          getFile.fetchImgSource(image_canvas);
        },
        function(error) {
          // The file either could not be read, or could not be saved to NCMB.
          alert(JSON.stringify(error));
        });
    }

    //失敗した場合に呼ばれるコールバック関数
    function onFail (message) {
        alert ('エラーです: ' + message);
    }
}

function saveData(){

    var Data = NCMB.Object.extend("Review");
    var data = new Data();

    var star = $("#star-value").text();
    var price = $("#price-value").val();

    data.set("star", star);
    data.set("price", price);
    data.set("store_id", placeName)

    data.save(null, {
        success: function (){
        },
        error: function (obj, error){
            console.log("error:" + error.message);
        }
    });

    var ReviewClass = NCMB.Object.extend("Review");

        var reviewQuery = new NCMB.Query(ReviewClass);

        reviewQuery.equalTo("store_id", placeName);

        reviewQuery.find({
            success: function(reviews) {
                var starAverage = 0;
                var priceAverage = 0;

                for (var i = 0; i < reviews.length; i++) {
                    var object = reviews[i];
                    starAverage += object.get("star") - 0;
                    priceAverage += object.get("price") - 0;
                }

                starAverage /= reviews.length;
                priceAverage /= reviews.length;

                showStarAverage($("#show-star-average"), starAverage);

                $("#show-price-average").html( Math.round(priceAverage) + "円" );
            },
            error: function(error) {
                alert("error");
            }
        });

        var query = new NCMB.Query("file");
        query.descending("createDate");

        query.find({
          success: function(files) {
            $("#list-img").html("");
            for (var i = files.length; i >= 1; i--) {
              $("#list-img").append('<img id="gazo' + i + '" alt="" />');
            }

            for (var i = files.length; i >= 1; i--) {
              // console.log(placeName + i + ".jpg");
              var objFile = new NCMB.File(placeName + i + ".jpg");
              var imageTag = document.getElementById("gazo" + i);
              objFile.fetchImgSource(imageTag);
            }
          },
          error: function(err) {
            console.log(err.message);
          }
        });
}
