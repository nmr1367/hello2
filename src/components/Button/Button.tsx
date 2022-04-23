// import React from "react";
// import "./Button.scss";

// export interface ButtonProps {
//   label: string;
// }

// const Button = (props: ButtonProps) => {
//   return <button>{props.label}</button>;
// };

// export default Button;

import { Button as AntButton } from "antd";
import { ButtonProps as AntButtonProps, ButtonType } from "antd/lib/button";
import cls from "classnames";
import React, { FC } from "react";
import "./styles/index.less";

export type ButtonTheme = "default" | "error" | "warning";

export type IconPlacement = "right" | "left";
export type ButtonTypes = "primary" | "secondary" | "linear" | "flat" | "dashed";
export type ButtonModes = "primary" | "secondary" | "danger" | "warning" | "disabled" | "success" | "grey";
export interface IButtonProps extends AntButtonProps {
  iconPlacement?: IconPlacement;
  typeButton?: ButtonTypes;
  buttonMode?: ButtonModes;
}

const Button: FC<IButtonProps> = ({ size, typeButton, children, icon, iconPlacement, buttonMode = 'primary', onClick, ...rest }) => {
  // used for setting type

  let buttonType: ButtonType = "default";
  switch (typeButton) {
    case "primary":
      buttonType = "primary";

      break;
    case "secondary":
      buttonType = "ghost";
      break;
    case "linear":
      buttonType = "default";
      break;
    case "flat":
      buttonType = "link";
      break;
    case "dashed":
      buttonType = "dashed";
      break;

    default:
  }

  return (
    <div className={cls("button-container ", `icon-${iconPlacement}`, `button-${typeButton}-${buttonMode}`)}>
      <AntButton
        size={size}
        icon={icon}
        type={buttonType}
        disabled={buttonMode === "disabled"}
        onClick={onClick}
        {...rest}>
        {children}
      </AntButton>
    </div>
  );
};

export default Button;

