// display image before content 
window.onload = function(){
  document.querySelector('.container').style.setProperty("overflow", "unset");
  document.getElementById('before-load-page').style.display = 'none';
}

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
// scroll event javascript end



// local storage store
class Store {
  static getId(){
   let ids;
   if(localStorage.getItem('ids') === null){
     ids = [];
   }
   else{ids = JSON.parse(localStorage.getItem('ids'))}

   return ids;
  }

  // static addId(id){
  //   const ids = Store.getId();
  //   ids.push(id);
  //   localStorage.setItem('ids', JSON.stringify(ids))
  // }

  static clearId(){
    localStorage.removeItem("ids");  
  }
}

// local storage end

// set display for the whole page from storage
document.addEventListener('DOMContentLoaded', function(){
   resultT();
})

const resultT = async function(){
  let id = Store.getId();
  let iD = Number(id);  
  await fetch('https://dapphome.herokuapp.com/api/teachers')
  .then((res) => {
      return res.json()
  }).then((data) => { 
    const teachDetails = data[iD];
     const teacherName = document.querySelector('.teacher-name');
     const teacherBioHead = document.querySelector('.teacher-bio-heading');
     const teacherBio = document.querySelector('.teacher-bio-text');
     const teacherImg = document.querySelector('.teacher-img');
     const teacherField = document.querySelector('.teacher-field');
     const teacherAge = document.querySelector('.teacher-age');
     const teacherState = document.querySelector('.teacher-state');
     const teacherCountry = document.querySelector('.teacher-country');
     teacherName.textContent = `${teachDetails.firstname} ${teachDetails.lastname}`; 
     teacherBioHead.textContent = `${teachDetails.bio_heading}`; 
     teacherBio.textContent = `${teachDetails.bio}`;
     teacherField.textContent = `${teachDetails.field}`;   
     teacherAge.textContent = `${teachDetails.age}`;
     teacherState.textContent = `${teachDetails.state}`; 
     teacherCountry.textContent = `${teachDetails.country}`;
     teacherImg.src = `${teachDetails.img_url}`;
  })
   
}





// end of what to display for a teacher






// star values
var totalLike = 0;
var totalUnLike = 0;
let starRate = 0;
// var starNum = function(){
//   const value = Math.floor((((totalLike) / totalClick) * 5));
//   return value;
// }

// page action controller
var actionControl = (function(){
   return{
     calculateStars: function(){
                        const value = Math.round((totalLike / (totalUnLike + totalLike) ) * 5);  
                        
                        return value;
     }
   }
})();

// user interface controller
var uiControl = (function(){
    // return all functions
  return{
   
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
      // remove learning and notify boxcd
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


  //  eventlistener to remove category box
 //document.querySelector('.section-title').addEventListener('click', uiCtrl.removeCategoryBox);
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
  //  rating event
  document.querySelector('.fa-thumbs-up').addEventListener('click', function(){
    totalLike += 1;
    var value = acCrtl.calculateStars();
    starRate = value;
    document.querySelector('.like-no').textContent = totalLike;  
    document.getElementById("stars").innerHTML = getStars(starRate);  
  });
  document.querySelector('.fa-thumbs-down').addEventListener('click', function(){
    totalUnLike += 1;
    var value = acCrtl.calculateStars();
    starRate = value;
    document.querySelector('.unlike-no').textContent = totalUnLike;
    document.getElementById("stars").innerHTML = getStars(starRate);  
    // else{
    //  num = 1;  
    // }
    // const numb = Number(num);
    // totalLike += numb;
    // acCrtl.calculateStars();
  })

})(actionControl, uiControl);
// covert number to stars
document.getElementById("stars").innerHTML = getStars(starRate);   
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

