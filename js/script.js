// Selectors 
const contents = document.querySelectorAll('.content')

// Btns 
const dailyBtn = document.querySelector('#daily')
const weeklyBtn = document.querySelector('#weekly')
const monthlyBtn = document.querySelector('#monthly')

// Data (:
document.addEventListener('DOMContentLoaded' , () => {
fetch('./data/data.json')
.then(res => res.json())
.then(data=>{
   situation.info= data
   showHandler()
})
dailyBtn.classList.add('active')
})

// Handler
const situation ={ 
  status: 'daily',
  info: [],
}

// EventListener 
  dailyBtn.addEventListener('click',(e) => {
   e.preventDefault()
   situationHandler(dailyBtn.id) 
   showHandler()
 })

  weeklyBtn.addEventListener('click',(e) => {
   e.preventDefault()
   situationHandler(weeklyBtn.id) 
   showHandler()
   
 })
  monthlyBtn.addEventListener('click',(e) => {
   e.preventDefault()
   situationHandler(monthlyBtn.id) 
   showHandler()
   
 })

// Functions
const activeHandler = (addActive , removeActive1 , removeActive2) => {
  addActive.classList.add('active')
  removeActive1.classList.remove('active')
  removeActive2.classList.remove('active')
}

const situationHandler = (type) => {
  situation.status = type
}

// for English mode
// const clockHandler = (clock) => clock == 1 || clock == 0 ? 'hr' : 'hrs'

const showHandler = () =>{
  const data = situation.info
  const status = situation.status
  const timeOut = 2000;
  data.map(item => {
    Array.prototype.forEach.call(contents, (pos) => {
      if( pos.classList.contains(`${item.title}`)){
        let parent = pos.parentNode

        if(status == 'daily'){
          if(!parent.classList.contains('animation')){
            activeHandler(dailyBtn, weeklyBtn, monthly)
            parent.classList.add('animation')
            setTimeout(() => {
              pos.innerHTML = `
              <h1 class="current">${item.timeframes.daily.current} ساعت </h1>
              <p class="previous">دیروز - ${item.timeframes.daily.previous} ساعت </p>
              `
            }, timeOut/2);
            setTimeout(() => {
              parent.classList.remove('animation')
            }, timeOut);
          }
        }
        if(status == 'weekly'){
          if(!parent.classList.contains('animation')){
            activeHandler(weeklyBtn, dailyBtn, monthly)
            parent.classList.add('animation')
            setTimeout(() => {
              pos.innerHTML = `
              <h1 class="current">${item.timeframes.weekly.current} ساعت </h1>
              <p class="previous">هفته گذشته -${item.timeframes.weekly.previous}  ساعت </p>
            `
            }, timeOut/2);
            setTimeout(() => {
              parent.classList.remove('animation')
            }, timeOut);
          }
        }
        if(status == 'monthly'){
          if(!parent.classList.contains('animation')){
            activeHandler(monthly, weeklyBtn, dailyBtn)
            parent.classList.add('animation')
            setTimeout(() => {
              pos.innerHTML = `
              <h1 class="current">${item.timeframes.monthly.current} ساعت </h1>
              <p class="previous">ماه گذشته - ${item.timeframes.monthly.previous} ساعت</p>
            `
            }, timeOut/2);
            setTimeout(() => {
              parent.classList.remove('animation')
            }, timeOut);
          }
          
        }
      }
    });
  })
 }

