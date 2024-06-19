import React from 'react';
import { PrimaryButton, SecondaryButton } from './button.styled';

function Button({ children, btnType = 'primary', btnDisabled = false, ...rest }) {

    const ChechButton = () => {

        switch (btnType) {
            case 'primary':
                return PrimaryButton

            case 'secondary':
                return SecondaryButton

            default:
                return PrimaryButton
        }

    }

    const CustomButton = ChechButton()

    return (
        <>

            <CustomButton disabled={btnDisabled} {...rest}>
                {children}
            </CustomButton>

        </>
    );
}

export default Button;