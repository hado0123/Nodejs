import { odd, even } from './ment.mjs'

function checkOddOrEven(num) {
   if (num % 2 === 0) {
      return even
   } else {
      return odd
   }
}

// 함수를 내보냄
export default checkOddOrEven
