// display image before content 
window.onload = function(){
  document.querySelector('.container-public').style.setProperty("overflow", "unset");
  document.getElementById('before-load-page').style.display = 'none'}




// scroll event javascript start
const scrollOffset = 100;  

const scrollElements = document.querySelectorAll('.js-scroll');

// const scrollElement = scrollElements.forEach((el) => {
//     return el ;
// })

scrollElements.forEach((el) => {
  el.style.opacity = 0 ;
})

const elementInView = (el, offset = 0) => {
    const elementTop = el.getBoundingClientRect().top;

    return(
        elementTop <= ((window.innerHeight || document.documentElement.clientHeight) - offset)
    );
};

const displayScrollElement = (el) => {
  el.style.opacity = 1;  
  el.classList.add('scrolled-up');
  // if(el.classList.contains('slide-left')){
  //   el.style.opacity = 1;  
  //   el.classList.add('scrolled-left');
  // }
}

const displayScrollElementLeft = (el) => {
  el.style.opacity = 1;  
  el.classList.add('scrolled-left');
  // if(el.classList.contains('slide-left')){
  //   el.style.opacity = 1;  
  //   el.classList.add('scrolled-left');
  // }
}

const displayScrollElementRight = (el) => {
  el.style.opacity = 1;  
  el.classList.add('scrolled-right');
  // if(el.classList.contains('slide-left')){
  //   el.style.opacity = 1;  
  //   el.classList.add('scrolled-left');
  // }
}

const hideScrollElement = (el) => {
  el.style.opacity = 0;  
  el.classList.remove('scrolled-up');  
  // if(el.classList.contains('slide-left')){
  //   el.style.opacity = 0;  
  //   el.classList.remove('scrolled-left');
  // }
}

const hideScrollElementLeft = (el) => {
  el.style.opacity = 0;  
  el.classList.remove('scrolled-left');  
  // if(el.classList.contains('slide-left')){
  //   el.style.opacity = 0;  
  //   el.classList.remove('scrolled-left');
  // }
}

const hideScrollElementRight = (el) => {
  el.style.opacity = 0;  
  el.classList.remove('scrolled-right');  
  // if(el.classList.contains('slide-left')){
  //   el.style.opacity = 0;  
  //   el.classList.remove('scrolled-left');
  // }
}


const handleScrollAnimation = () => {

  scrollElements.forEach((el) => {
    if(el.classList.contains('slide-left')){
      if(elementInView(el, 0)){displayScrollElementLeft(el);}
      else{
        hideScrollElementLeft(el);
      }
    }

    if(el.classList.contains('slide-right')){
      if(elementInView(el, 0)){displayScrollElementRight(el);}
      else{
        hideScrollElementRight(el);
      }
    }

   if(el.classList.contains('slide-up')){
    if(elementInView(el, 20)){  
      displayScrollElement(el);
    }
    else{
      hideScrollElement(el);
    }
   }
  })
   
}

  let throttleTimer = false;
  const throttle = (callback, time) => {
    if(throttleTimer) return;
    throttleTimer = true;

    setTimeout(() => {
      callback();
      throttleTimer = false;
    }, time);
  }

window.addEventListener("scroll", () => {
   throttle( handleScrollAnimation, 250);   
})






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
  // id for teacher
  static getId(){
    let ids;
    if(localStorage.getItem('ids') === null){
      ids = [];
    }
    else{ids = JSON.parse(localStorage.getItem('ids'))}
 
    return ids;
   }
 
   static addId(id){
     let ids = Store.getId();
     ids.push(id);
     localStorage.setItem('ids', JSON.stringify(ids))
   }
 
   static clearId(){
     localStorage.removeItem("ids");  
   }
}

// set color for the whole site from storage
  document.addEventListener('DOMContentLoaded', function(){
    let color = Store.getColor();
    let myColor = String(color);          
    document.documentElement.style.setProperty("--home-primary-color", myColor);
    // const picture = document.querySelector('.public-profile-img');
    // if(myColor === "#D2492F" ){picture.src = "./images/public-profile-img-red.png"}    
    // else{picture.src = "./images/puplic-profile-img.jpg"}  
  })


// page action controller
var actionControl = (function(){

})();

// user interface controller
var uiControl = (function(){
    // return all functions
  return{
   translateSidebox: function(){
       document.querySelector('.student-public-profile-sidebar-box').classList.toggle('translateX');
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
      },
      // show more teacher
      showTeacherWrap2: function(){
        document.querySelector('.teacher-wrap-2').classList.remove('remove-box'); 
          document.querySelector('.view-more-teacher').classList.add('remove-box');
          document.querySelector('.view-category').textContent = 'close teacher view';
          document.querySelector('.view-category').classList.remove('remove-box');
      },
      // show more teacher
      closeTeacherWrap2: function(){
        document.querySelector('.teacher-wrap-2').classList.add('remove-box'); 
          document.querySelector('.view-more-teacher').classList.remove('remove-box');
          document.querySelector('.view-category').classList.add('remove-box');
      }

  }    
})();

// global controller

var globalControl = (function(acCrtl, uiCtrl){ 
// eventlistener for sidebar toggle
document.querySelector('.public-profile-sidebar-icon').addEventListener('click', function(){
    uiCtrl.translateSidebox();
})
 //  eventlistener to remove category box
 document.querySelector('.section').addEventListener('click', uiCtrl.removeCategoryBox);
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
  document.querySelector('.notification-show').addEventListener('click', uiCtrl.showNotificationBox);

  // event for teacher wrap
//document.querySelector('.view-more-teacher').addEventListener('click', uiCtrl.showTeacherWrap2);
// close teacher view event
// document.querySelector('.view-category').addEventListener('click', function(){
//   uiCtrl.closeTeacherWrap2();
// })
// event to get teachers id
document.querySelector('.teacher-wrap-2').addEventListener('click', function(e){
  
  Store.clearId();
  const id = e.target.parentElement.parentElement.id;
  Store.addId(id);
})

})(actionControl, uiControl);


async function zuriFun() {
  await fetch('https://dapphome.herokuapp.com/api/teachers')
  .then((res) => {
      return res.json()
  }).then((data) => { 
      data.forEach((el) => {
        const index = data.indexOf(el);
        const teacher = `
    <div class="teacher-box js-scroll slide-up">
        <div class="video-box"><img src="${el.img_url}" alt="" class="img-play"></div>
        <div class="teacher-title">${el.firstname} ${el.lastname}</div>
        <div class="btn-box" id = "${index}">   
            <button class="btn-view-details teacher-rating"><b><span id=stars>${getStars(el.rating)}</span></b></button>  
            <button class="btn-add-to-cart teacher-contact"><a href="./teacher-contact.html" class="teacher-contact-link">contact</a></button>  
            </div>      
    </div>
        `;
        // document.querySelector('#stars').innerHTML = getStars(el.rating)  
        teacher.className = 'teacher-box js-scroll slide-up';
        const parent = document.querySelector(".teacher-wrap-2"); 
        parent.insertAdjacentHTML('beforeend', teacher);
      })    
      // const teach = data[index];
      // console.log(data);
      // console.log(teach);
  })
  
}
  
zuriFun();

// covert number to stars  
document.querySelectorAll("#stars").forEach((el) =>{
  el.innerHTML = getStars(3.7);   
})
function getStars(rating) {

  // Round to nearest half
  rating = Math.round(rating * 2) / 2;
  let output = [];

  // Append all the filled whole stars
  for (var i = rating; i >= 1; i--)
    output.push('<i class="fa fa-star" aria-hidden="true" style="color: gold;"></i>&nbsp;');

  // If there is a half a star, append it
  if (i == .5) output.push('<i class="fa fa-star-half-o" aria-hidden="true" style="color: gold;"></i>&nbsp;');

  // Fill the empty stars
  for (let i = (5 - rating); i >= 1; i--)
    output.push('<i class="fa fa-star-o" aria-hidden="true" style="color: gold;"></i>&nbsp;');

  return output.join('');

}
// end of star

//Logout feature

let logout_btn = document.getElementById('logout-btn');

logout_btn.addEventListener('click', (e) => {
  e.preventDefault()
  logout_User();
  
})

let logout_User = () => {
  let redirect = () => {
    window.location.href = "./index.html";
  };
  fetch('https://dapphome.herokuapp.com/ap/logout', {
    method:"POST",
  }).then(response => response.json).then( redirect() );
};