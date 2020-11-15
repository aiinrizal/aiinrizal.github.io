import React from 'react'

function PasswordStrengthMeter() {
    const changePasswordColor = () => ({
        width: "70%",
        background: "red"
    });

    return (
        <>
            <div className="progress" style={{height: "7px"}}>
                <div className="progress-bar" style={changePasswordColor()}></div>
            </div>
        </>
    )
}

export default PasswordStrengthMeter
