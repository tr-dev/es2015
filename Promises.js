'use strict'
/*
* TR McAlexaner
* 2016-06-26
* Promises.js - Examples of promises vs callbacks
* and wrapping callbacks in promises
*/


class PromiseHelper {
  constructor(config){
    config = Object.assign({}, {
      name : 'Promise',
      desc : `We're talking about ${this.name}`,
      currPromise : ''
    }, config || {});


  }

  promiseMe(promise) {
    return new Promise((resolve, reject) => {
      //Do some logic logic
      return promise ? (this.currPromise = promise) && resolve('We good!') : reject('Nothing to promise');
    });
  }

  log(attr) {
    console.log(this[attr] ? `this.${attr} = "${this[attr]}"` : 'Nothing to report');
  }
  delayTest(ms) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Slept for ${ms} ms`);
        resolve(ms);
      }, ms)
    });
  }
}

let p = new PromiseHelper();

//Success
//Should log out
// - We good!
// - this.currPromise = "My Love"
//#########################
// p.promiseMe('My Love')
//   .then((msg) => {
//     console.log(msg);
//     p.log('currPromise');
//   });
//#########################
//Errors
//Should log out
// - "error"
// - "Nothing to report"
//#########################
// p.promiseMe()
//   .then((msg) => {
//     console.log('We should never get here')
//     console.log(msg);
//     p.log('currPromise');
//   }, (err) => {
//     console.log('error')
//     p.log('currPromise')
//   });
//#########################

//Promise.all allows passing an array of Promises,
//and will return a resolve that has an array of results
//return by the resolved functions, in order that the promise
//calls are listed in

//Success
//Should log out
// results[0]="We good!
// results[1]="We good!
// results[2]="We good!
//#########################
// Promise.all([
//   p.promiseMe('LIFE'),
//   p.promiseMe('LIBERTY'),
//   p.promiseMe('HAPPINESS')
//   ])
//   .then((results) => {
//      //Node 4 doesn't support destructuring--declarations
//      //let [ item1, item2 ] = results;

//      results.forEach((item, el) => {
//       console.log(`results[${el}]="${item}"`)
//      })
//   }
// );
//#########################

//Error
//Should log out
// Error: Nothing to promise
//#########################
// Promise.all([
//   p.promiseMe('LIFE'),
//   p.promiseMe(),
//   p.promiseMe('HAPPINESS')
//   ])
//   .then((results) => {
//     console.log('Should never get here')
//   }, (err) => {
//     console.log(`Error: ${err}`)
//   });
//#########################

//Return order of promises is not guaranteed, only
//the order of the results passed into then
// Slept for 3000 ms
// Slept for 5000 ms
// results[0]="5000
// results[1]="3000
//#########################
// Promise.all([
//   p.delayTest(5000),
//   p.delayTest(3000)
//   ])
//   .then((results) => {
//     results.forEach((item, el) => {
//       console.log(`results[${el}]="${item}"`)
//     });
//   });
//#########################
//vs
// Slept for 3000 ms
// Slept for 5000 ms
// results[0]="3000
// results[1]="5000
//#########################
// Promise.all([
//   p.delayTest(3000),
//   p.delayTest(5000)
//   ])
//   .then((results) => {
//     results.forEach((item, el) => {
//       console.log(`results[${el}]="${item}"`)
//     });
//   });
//#########################