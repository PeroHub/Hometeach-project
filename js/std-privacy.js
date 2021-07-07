// display image before content 
window.onload = function(){
  document.querySelector('.container-1').style.setProperty("overflow", "unset");
  document.getElementById('before-load-page').style.display = 'none'}


// local storage store
class Store {
  static getColor(){
   let colors;
   if(localStorage.getItem('colors') === null){
     colors = [];
   }
   else{colors = JSON.parse(localStorage.getItem('colors'))}

   return colors;
  }
       
  // static addColors(color){
  //   const colors = Store.getColor();
  //   colors.push(color);
  //   localStorage.setItem('colors', JSON.stringify(colors))
  // }

  static clearColors(){
    localStorage.clear();
  }
 
}

// set color for the whole site from storage
  document.addEventListener('DOMContentLoaded', function(){
    let color = Store.getColor();
    let myColor = String(color);  
    document.documentElement.style.setProperty("--home-primary-color", myColor);
    const picture = document.querySelector('.privacy-img');
    if(myColor === "#D2492F" ){picture.src = "./images/std-privacy-img-red.jpg"}    
    else if(myColor === "#3E8A23" ){picture.src = "./images/std-privacy-img-green.jpg"}  
    else if(myColor === "#C09728" ){picture.src = "./images/std-privacy-img-yellow.jpg"}
    else{picture.src = "./images/std-privacy-img-green.jpg"} 
     
  })


// page action controller
var actionControl = (function(){

})();

// user interface controller
var uiControl = (function(){
    // return all functions
  return{
    //   remove side bar function
     removesidebar: function(){
         document.querySelector('.student-sidebar-box').classList.add('translateX-2');
         document.querySelector('.arrow-left').style.display = 'none';
         document.querySelector('.arrow-right').style.display = 'inline-block';
     },
    //  add sidebar function
    addsidebar: function(){
        document.querySelector('.student-sidebar-box').classList.remove('translateX-2');    
        document.querySelector('.arrow-left').style.display = 'inline-block';
        document.querySelector('.arrow-right').style.display = 'none';
    },
    
    // remove category box
    removeCategoryBox: function(){
      document.querySelector('.category-box').classList.add('remove-box');
      document.querySelector('.learning-box').classList.remove('show-box');
      document.querySelector('.notification-box').classList.remove('show-box');
      const elements = document.querySelectorAll('.proper-box');
      elements.forEach(function(element){
        element.classList.remove('show-box-proper');
      })
    },
    // show proper category box function
    showProperCategoryBox: function (key){
     const elements = document.querySelectorAll('.proper-box');
      const showElement = document.querySelector('.proper-box-' + "" + key);
      if(showElement.classList.contains('show-box-proper')){
        showElement.classList.remove('show-box-proper')
      }
      else{
        elements.forEach(function(element){
          element.classList.remove('show-box-proper');
        })
        showElement.classList.add('show-box-proper')}  
    },
    // show learning box function
    showLearningBox: function(){
      document.querySelector('.learning-box').classList.toggle('show-box');
      document.querySelector('.category-box').classList.add('remove-box');
      document.querySelector('.notification-box').classList.remove('show-box');
    },
    // show Notification box function
    showNotificationBox: function(){
      document.querySelector('.notification-box').classList.toggle('show-box');
      document.querySelector('.category-box').classList.add('remove-box');  
      document.querySelector('.learning-box').classList.remove('show-box');
    },
    // remove learning and notify box
    removeLearningAndNotifyBox: function(){
      document.querySelector('.learning-box').classList.remove('show-box');
      document.querySelector('.notification-box').classList.remove('show-box');
    },
    // remove remove-box class function
    removeRemoveboxClass: function(){
      document.querySelector('.category-box').classList.remove('remove-box'); 
    }

  }    
})();

// global controller

var globalControl = (function(acCrtl, uiCtrl){ 
// eventlistener for sidebar toggle
   document.querySelector('.arrow-left').addEventListener('click', uiCtrl.removesidebar);
   document.querySelector('.arrow-right').addEventListener('click', uiCtrl.addsidebar);
   document.addEventListener('DOMContentLoaded', function(){  
    uiCtrl.addsidebar();
    setTimeout(function(){uiCtrl.removesidebar();}, 4000)  
   });

  //  eventlistener to remove category box
 document.querySelector('.main').addEventListener('click', uiCtrl.removeCategoryBox);
//  remove remove-box class from category box event
document.querySelector('.category-show').addEventListener('mouseup', uiCtrl.removeRemoveboxClass)
 //event to remove learning box and notification
 document.querySelector('.category-show').addEventListener('click', uiCtrl.removeLearningAndNotifyBox)   
// proper category box event listener
  document.querySelector('.item-game').addEventListener('click', function(e){
    
    uiCtrl.showProperCategoryBox('game');
  });
  document.querySelector('.item-quiz').addEventListener('click', function(e){
    e.preventDefault();
    uiCtrl.showProperCategoryBox('quiz');
  });
  document.querySelector('.item-eLibrary').addEventListener('click', function(e){
    e.preventDefault();
    uiCtrl.showProperCategoryBox('eLibrary');
  });
  document.querySelector('.item-basic-school-subjects').addEventListener('click', function(e){
    
    uiCtrl.showProperCategoryBox('basic-school-subjects');
  });
  document.querySelector('.item-high-school-subjects').addEventListener('click', function(e){
    e.preventDefault();
    uiCtrl.showProperCategoryBox('high-school-subjects');
  });
  document.querySelector('.item-marketing').addEventListener('click', function(e){
    e.preventDefault();
    uiCtrl.showProperCategoryBox('marketing');
  });
  document.querySelector('.item-it-and-software').addEventListener('click', function(e){
    e.preventDefault();
    uiCtrl.showProperCategoryBox('it-and-software');
  });
  document.querySelector('.item-Languages').addEventListener('click', function(e){
    e.preventDefault();
    uiCtrl.showProperCategoryBox('Languages');
  });
  document.querySelector('.item-Arts-and-culture').addEventListener('click', function(e){
    e.preventDefault();
    uiCtrl.showProperCategoryBox('Arts-and-culture');  
  });
  // end of category box
  // learning drop down event
  document.querySelector('.learning-drop-down').addEventListener('click', uiCtrl.showLearningBox);
  // notification show event
  document.querySelector('.notification-show').addEventListener('click', uiCtrl.showNotificationBox)
   
})(actionControl, uiControl);


// api fetch
//   let zuriPa = document.querySelector("#zuri")
// let pass = document.querySelector("#pass-here")
// zuriPa.addEventListener('click', () => {
//     zuriFun()
// })
// function zuriFun() {
//     fetch('https://ultrasofti.github.io/hometechapi/teacher.json')
//     .then((res) => {
//         return res.json()
//     }).then((data) => {
//         // data.forEach(element => {
//         //   var pass = document.createElement('div');
//         //     pass.innerHTML += 
//         //     `   <ul>
//         //             <li>FirstName: ${element.firstname}</li>
//         //             <li>LastName: ${element.lastname}</li>
//         //             <li>Country: ${element.country}</li>
//         //             <li>Sate: ${element.state}</li>
//         //             <li>Gender: ${element.gender}</li>
//         //             <li>Price: $${element.price}</li>
//         //         </ul>
//         //     `
//         //     console.log(pass);
//         // })   
//         console.log(data);
//     })
// }

//   zuriFun();
//  https://ultrasofti.github.io/hometechapi/teacher.json
