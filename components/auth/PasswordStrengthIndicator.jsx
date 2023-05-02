import React from "react";

function PasswordStrengthIndicator({ score, strength, hasSixChar, hasLowerCase, hasUpperCase, hasNumericChar, hasSpecialChar, maxThirtySixChar }) {
    return (
        <div>
            <div className="flex items-center justify-center">
                <div className={`w-3 h-3 rounded-full ${score > 2 ? 'bg-red-500' : 'bg-gray-400'}`}></div>
                <div className={`w-3 h-3 rounded-full mx-2 ${score > 3 ? 'bg-yellow-500' : 'bg-gray-400'}`}></div>
                <div className={`w-3 h-3 rounded-full ${score > 4 ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                <div className={`w-3 h-3 rounded-full mx-2 ${score > 5 ? 'bg-blue-500' : 'bg-gray-400'}`}></div>
                {!!score && <div>{strength}</div>}
            </div>
           <p>
                <b>Criteria for a strong password:</b>
            </p>
            <div className="flex flex-col">
                <div className="flex items-center w-full">
                    <input readOnly type="checkbox" checked={hasSixChar} />
                    <div className="ml-2">At least 6 characters</div>
                </div>
                <div className="flex items-center w-full">
                    <input readOnly type="checkbox" checked={hasLowerCase} />
                    <div className="ml-2">At least 1 lowercase letter</div>
                </div>
                <div className="flex items-center w-full">
                    <input readOnly type="checkbox" checked={hasUpperCase} />
                    <div className="ml-2">At least 1 uppercase letter</div>
                </div>
                <div className="flex items-center w-full">
                    <input readOnly type="checkbox" checked={hasNumericChar} />
                    <div className="ml-2">At least 1 numeric character</div>
                </div>
                <div className="flex items-center w-full">
                    <input readOnly type="checkbox" checked={hasSpecialChar} />
                    <div className="ml-2">At least 1 special character</div>
                </div>
                <div className="flex items-center w-full">
                    <input readOnly type="checkbox" checked={maxThirtySixChar} />
                    <div className="ml-2">Maximum 36 characters</div>
                </div>
            </div> 
        </div>
    );
}

export default PasswordStrengthIndicator;