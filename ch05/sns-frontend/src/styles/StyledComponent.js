import styled from 'styled-components'

/*
falsy 연산

[falsy 값 종류]
false (Boolean false)
0 (숫자 0)
"" 또는 '' (빈 문자열)
null
undefined
NaN (Not-a-Number)

*/
export const Wrap = styled.div`
   overflow: hidden;
   min-width: ${(props) => props.$minWidth || '1200px'};
`

export const Main = styled.main`
   width: ${(props) => props.$width || '1200px'};
   margin: 0 auto;
   overflow: hidden;
   padding: ${(props) => props.$padding || 0};
`
