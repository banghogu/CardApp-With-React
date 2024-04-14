import { css } from "@emotion/react";
import styled from "@emotion/styled";
import {
  ButtonColor,
  ButtonSize,
  buttonColorMap,
  buttonWeakMap,
  buttonSizeMap,
} from "@styles/button";

//버튼 타입 속성 정의
interface ButtonProps {
  color?: ButtonColor;
  size?: ButtonSize;
  weak?: boolean;
  full?: boolean;
  disabled?: boolean;
}

//styled.button 버튼 태그를 만드는데 props로 받는 속성은 ButtonProps을 사용함
//
const BaseButton = styled.button<ButtonProps>(
  //기본 버튼 스타일 정의
  {
    cursor: "pointer",
    fontWeight: "bold",
    borderRadius: "6px",
  },

  //color와 weak에 대한 스타일 정의.
  //둘다 없으면  primary색으로 그냥 일반 버튼이고
  //색만 있으면 해당 색의 일반버튼
  //색도 있고, weak면 해당 색의 weak버튼
  ({ color = "primary", weak }) =>
    weak ? buttonWeakMap[color] : buttonColorMap[color],

  //기본 버튼 사이즈는 small이고 size속성 받은 대로 해당 버튼 사이즈
  ({ size = "small" }) => buttonSizeMap[size],

  //full 속성을 받으면 w-100% 버튼
  ({ full }) =>
    full
      ? css`
          display: block;
          width: 100%;
          border-radius: 0;
        `
      : undefined,

  //disabled 속성 받으면 살짝 투명해지고 커서x
  ({ disabled }) =>
    disabled
      ? css`
          opacity: 0.26;
          cursor: initial;
        `
      : undefined
);

export default BaseButton;
