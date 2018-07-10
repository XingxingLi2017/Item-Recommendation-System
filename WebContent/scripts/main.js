(function(){
  /**
    Variables
  */

  var user_id = '1111';
  var user_fullname='Xing'
  var longitude = -122.08;
  var latitude=37.38;

  /**
    Initializatin functions
    1. add event listeners to buttons
    2. get location and send query to server
    3. load response in content area
  */
  function init(){
      $('nearby-btn').addEventListener('click',loadNearbyItems);
      $('fav-btn').addEventListener('click', loadFavoriteItems);
      $('recommend-btn').addEventListener('click', loadRecommendedItems);
      var welcomeMassage = $('welcome-msg');
      welcomeMassage.innerHTML = 'Hi! '+user_fullname;
      initGeolocation();

  }

  // get current geolocation
  function initGeolocation(){
    if(navigator.geolocation){
      // Asynchronous method
      // params: success callback, fail callback, PositionOptions object
      navigator.geolocation.getCurrentPosition(onPositionUpdated,onLoadPositionFailed,{
        // can hold the position in cache for 60 second
        maximumAge: 60000
      });
      showLoadingMessage("Retrieving your location...");
    }
    // if the browser doesn't support geolocation property
    else{
        onLoadPositionFailed();
    }
  }

  // if get position successfully, send query to server and update page
  function onPositionUpdated(position){
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    loadNearbyItems();
  }

  // if can't use navigator.geolocation to get latitude&longitude
  // send query to http://ipinfo.io/json and get the location
  function onLoadPositionFailed(){
    console.warn('navigator.geolocation is not available');
    getLocationFromIP();
  }

  function getLocationFromIP(){
    // Get location from http://ipinfo.io/json
    var url = "http://ipinfo.io/json";
    var data = null;
    ajax('GET', url,data, function(res){
      var res = JSON.parse(res);
      if('loc' in res){
        var loc = res.loc.split(',');
        latitude = loc[0];
        longitude=loc[1];
      }else{
        console.warn('getting location by ip failed.');
      }
      loadNearbyItems();
    });
  }

  /*
    Helper functions #1
    showing message functions
  */
  function showLoadingMessage(msg){
    var itemList = $('item-list');
    itemList.innerHTML = "<p class='notice'><i class='fa fa-spinner fa-spin'></i>"+msg+"</p>";
  };

  function showWarningMessage(msg){
    var itemList = $('item-list');
    itemList.innerHTML = '<p class="notice"><i class="fa fa-exclamation-triangle"></i> ' +
        msg + '</p>';
  }

  function showErrorMessage(msg){
    var itemList = $('item-list');
    itemList.innerHTML = '<p class="notice"><i class="fa fa-exclamation-circle"></i> ' +
        msg + '</p>';
  }

  /*
    Helper functions #2
    a helper function that returns DOM Object
    based on input tag name and attrs
    @param tag
    @param options, object contains attrs and values
    @return DOM object
  */
  function $(tag, options){
    // get element
    if(!options){
      return document.getElementById(tag);
    }
    // create element
    var  element = document.createElement(tag);
    for(option in options){
      // if the key is not get by inheritance
      if(options.hasOwnProperty(option)){
        // option is string, can't use e.key=value
        element[option] = options[option];
      }
    }
    return element;
  }

  /***
   * Helper functions #3: AJAX helper
   *
   * @param method -
   *            GET|POST|PUT|DELETE
   * @param url -
   *            API end point
   * @param callback -
   *            This the successful callback
   * @param errorHandler -
   *            This is the failed callback
   */
   function ajax(method, url, data, callback, errorHandler){
     var xhr = new XMLHttpRequest();
     // method, url,whether asynchronize,username,password
     xhr.open(method, url, true);
     //callback after request completing successfully
     xhr.onload = function(){
       // request successfully
       if(xhr.status === 200){
         callback(xhr.responseText);
       }else{
         errorHandler();
       }
     };

     xhr.onerror = function() {
         console.error("The request couldn't be completed.");
         errorHandler();
     };

     if (data === null) {
         xhr.send();
     } else {
         xhr.setRequestHeader("Content-Type",
             "application/json;charset=utf-8");
         xhr.send(data);
     }
   }

   /*
    helper functions #4:
    use an array of obeject to update the #item-list part
   */
   function listItems(items){
     var itemList = $('item-list');
     itemList.innerHTML = '';
     for(let i in items){
       addItem(itemList, items[i]);
     }
   }

   // item attributes:
   // item_id, name, rating, address, image_url, url, distance, favorite
   function addItem(itemList, item){
     var item_id = item.item_id;

     // create <li> and specify id and class name
     var li = $('li',{
       id: 'item-'+item_id,
       className: 'item'
     });

     // set the data attributes
     li.dataset.item_id = item_id;
     li.dataset.favorite = item.favorite;

     // item image
     if(item.image_url){
       li.appendChild($('img',{
         src: item.image_url
       }));
     }else{
       li.appendChild($('img',{
         src: 'https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png'
       }));
     }

     // name category rating div
     var div = $('div',{});
     // name
     var name = $('a',{
       href: item.url,
       target: '_blank',
       className:'item-name'
     });
     name.innerHTML = item.name;
     div.appendChild(name);
     //categories
     var category = $('p',{
       className: 'item-category'
     });
     category.innerHTML = item.categories.join(',');
     div.appendChild(category);

     // stars
     var stars = $('div',{
       className: 'stars'
     });
     for(var i = 0 ; i < item.rating ; i++){
       var star = $('i',{
         className: 'fa fa-star'
       });
       stars.appendChild(star);
     }
     if((''+item.rating).match(/\.5$/)){ // deal with 3.5
       stars.appendChild($('i',{
         className: 'fa fa-star-half-o'
       }));
     }

     div.appendChild(stars);
     li.appendChild(div);

     // address
     var address = $('p',{
       className: 'item-address'
     });
     address.innerHTML = item.address.replace(/,/g ,'<br/>')
     .replace(/\"/g, ''); // /g regex flag sign
     li.appendChild(address);

     // favorite favLink
     var favLink = $('p',{
       className: 'fav-link'
     });

     favLink.onclick = function(){
       // click event
       changeFavoriteItem(item_id);
     }
     favLink.appendChild($('i',{
       id: 'fav-icon-' + item_id,
       className: item.favorite?'fa fa-heart': 'fa fa-heart-o'
     }));
     li.appendChild(favLink);
     itemList.appendChild(li);
   }

   function changeFavoriteItem(item_id){
     // check the status
     var li = $('item-'+item_id);
     var favIcon = $('fav-icon-'+item_id);
     var favorite = li.dataset.favorite !== 'true';

     // query
     var url = './history';
     var data = JSON.stringify({
       user_id: user_id,
       favorite: [item_id]
     });
     var method = favorite ? 'POST':'DELETE';
     ajax(method,url,data,function(res){
       var res = JSON.parse(res);
       if(res.result === 'SUCCESS'){
         li.dataset.favorite = favorite;
         favIcon.className = favorite?'fa fa-heart' : 'fa fa-heart-o';
       }
     });
   }

   /*
    Helper function #5:
    make a navigator button active
   */
   function activeBtn(btnId){
     var btns = document.getElementsByClassName('main-nav-btn');
     // var btns = document.getElementsByClassName('main-nav-btn');

     // deactivate all navigator buttons
     // for(let i in btns){
     for (var i = 0; i < btns.length; i++) {
       btns[i].className = btns[i].className.replace(/\bactive\b/,'');
     }


     // active the choosen one
     var btn = $(btnId);
     btn.className +=' active';
   }

  //-----------------------------------
  //  use AJAX call server-side APIs and update the page
  //-----------------------------------

  /**
   * API #1 Load the nearby items API end point: [GET]
   * /Dashi/search?user_id=1111&lat=current_Lat&longitude=current_lon
   */
  function loadNearbyItems(){
    console.log('loadNearbyItems');
    activeBtn('nearby-btn');

    // generate the query
    var url = './search';
    var params = "user_id="+user_id+"&lat="+latitude+"&lon="+longitude;
    url=url+'?'+params;
    console.log("nearby query ="+url);
    var data = JSON.stringify({});

    // show loading message
    showLoadingMessage('loading nearby items...');

    ajax('GET',url, data,function(res){
      // success
      var items = JSON.parse(res);
      if(!items || items.length === 0){
        showWarningMessage('No nearby items.');
      }else{
        listItems(items);
      }
    },function(){
      // failed
      showErrorMessage('cannot load nearby items.');
    });
  }

  /**
   * API #2 Load favorite (or visited) items API end point: [GET]
   * /Dashi/history?user_id=1111
   */
  function loadFavoriteItems(){
    activeBtn('fav-btn');

    var url = './history';
    var params = 'user_id='+user_id;
    url = url+'?'+params;
    var data = JSON.stringify({});
    showLoadingMessage('loading favorite items...');
    ajax('GET',url,data,function(res){
      var items = JSON.parse(res);
      if(!items || items.length === 0){
        showWarningMessage('there is no favorite items...');
      }else{
        console.log(items);
        listItems(items);
      }
    },function(){
      showErrorMessage('cannot load favorite items');
    });
  }

  /**
   * API #3 Load recommended items API end point: [GET]
   * /Dashi/recommendation?user_id=1111
   */
  function loadRecommendedItems(){
    activeBtn('recommend-btn');
    var url='./recommendation';
    var params='user_id='+user_id+'&lat='+latitude+'&lon='+longitude;
    url=url+'?'+params;
    var data = JSON.stringify({});
    showLoadingMessage('loading recommended items...');
    ajax('GET',url,data,function(res){
      var items = JSON.parse(res);
      if(!items || items.length === 0){
        showWarningMessage('No recommend item, Please like some items first.');
      }else{
        listItems(items);
      }
    },function(){
        showErrorMessage('cannot load recommended items.');
    });
  }

  init();

})();
