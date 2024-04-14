import { css } from "@emotion/react";

//최상위에서 색 변수 지정
export const colorPalette = css`
  :root {
    --red: #f44336;
    --blue: #2196f3;
    --green: #4caf50;
    --white: #fff;
    --black: #212121;
    --grey: #f0efef;
  }
`;

//지정한 색 변수를 바탕으로 생성
export const colors = {
  red: "var(--red)",
  blue: "var(--blue)",
  green: "var(--green)",
  white: "var(--white)",
  black: "var(--black)",
  grey: "var(--grey)",
};

//색상 이름을 나타내는 문자열 중 하나만을 선택할 수 있는 타입을 정의
//keyof: TypeScript의 keyof 키워드를 사용해 객체의 모든 키를 문자열 리터럴 유니온 타입으로 가져옴. 즉, 객체의 모든 키를 문자열로 나타내는 타입을 만든다
//export type Colors :  외부에서 사용할 수 있도록 내보내는 TypeScript의 타입 정의
//이 타입은 colors 객체의 모든 키를 나타내는 문자열 중 하나만을 선택할 수 있다
export type Colors = keyof typeof colors;
