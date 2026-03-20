import pkg from 'validate-npm-package-name';

const validate = pkg

let result = validate("exp-gen");
console.log(result);
