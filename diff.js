console.log('hello world')
const oldObj = {
  name: 'John',
  age: 25,
  address: {
    city: 'New York',
    country: 'USA'
  }
};

const newObj = {
  name: 'John',
  age: 26,
  address: {
    city: 'Los Angeles',
    country: 'USA'
  }
};

const foo = {
  name: 'miao',
  age: 16
}
const bar = {
  name: 'miao',
  age: 16,
  gender: 1
}
const baz = {
  name: 'miao',
  gender: 1
}

function diff(oldObj, newObj) {
  const patch = {};

  for(const key in oldObj) {
    if(oldObj.hasOwnProperty(key)) {
      if(newObj.hasOwnProperty(key)) {
        if(typeof oldObj[key] === 'object' && typeof newObj[key] === 'object') {
          const subPatch = diff(oldObj[key], newObj[key]);
          if(Object.keys(subPatch).length > 0) {
            patch[key] = subPatch;
          }
        } else {
          if(oldObj[key] !== newObj[key]) {
            patch[key] = newObj[key]
          }
        }
      } else {
        console.log('patch', key, oldObj)
        patch[key] = null
      }
    }
    console.log(patch);
  }

  for(const key in  newObj) {
    if(newObj.hasOwnProperty(key)) {
      if(!oldObj.hasOwnProperty(key)) {
        patch[key] = newObj[key]
      }
    }
  }

  console.log('result')
  console.log(patch)
  return patch;
}

diff(oldObj, newObj)
// diff(baz, foo)
