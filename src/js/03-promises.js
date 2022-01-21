import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const creatBtn = document.querySelector('.form button');

form.addEventListener('submit', getInputValue);

function getInputValue(event) {
  event.preventDefault();
  const {
    elements: { delay, step, amount }
  } = event.currentTarget;

  if (delay.value !== "" && step.value !== "" && amount.value !== "") {
    
    const inputVales = {
      startDelay: `${delay.value}`,
      delay: `${step.value}`,
      number: `${amount.value}`,
    };
    creatPromisesChaning(inputVales);
  } 
  else {
    window.alert("Все поля должны быть заполнены");
  };
  event.currentTarget.reset();
};
  
   

function creatPromisesChaning( {startDelay, delay, number} ) { 
  
  
  // let totalDelay = 0;

  // if (startDelay >= delay) {
  //   totalDelay = startDelay - delay;
  // }
  // else {
  //   totalDelay = delay - startDelay;
  // };

  setTimeout(() => {
    for (let i = 0; i < number; i += 1) { 

      createPromise(i, delay)
         .then(result => Notify.success(result))
        .catch(error => Notify.failure(error));
      
        
    };

  }, startDelay)

  

};

function createPromise(position, delay) { 
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      
      if (shouldResolve) { 
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      }

      else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }  
    }, delay)
   });
};


