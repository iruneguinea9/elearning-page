export const isValidEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email.trim()).toLowerCase());
  };
  
  export const isValidOtp = (otp) => {
    const re = /^([A-Z0-9]{6})$/;
    return re.test(String(otp.trim()));
  };


export const validatePassword = (value) => {
    const res = {
        score: 0,
        strength: '',
        hasSixChar: false,
        hasLowerCase: false,
        hasUpperCase: false,
        hasNumericChar: false,
        hasSpecialChar: false,
        maxThirtySixChar: false,
    };

    if (value.length >= 6) {
        res.score = res.score + 1;
        res.hasSixChar = true;
    }

    if (value.length > 0 && value.length <= 36) {
        res.score = res.score + 1;
        res.maxThirtySixChar = true;
    }

    const hasSpecialChar = (char) => {
        const regex = /[^a-zA-Z0-9]+$/;
        return regex.test(char);
    };

    Array.from(value).forEach((char) => {
        if (char >= 'A' && char <= 'Z' && !res.hasUpperCase) {
            res.score = res.score + 1;
            res.hasUpperCase = true;
        } else if (char >= 'a' && char <= 'z' && !res.hasLowerCase) {
            res.score = res.score + 1;
            res.hasLowerCase = true;
        } else if (char >= '0' && char <= '9' && !res.hasNumericChar) {
            res.score = res.score + 1;
            res.hasNumericChar = true;
        } else if (hasSpecialChar(char) && !res.hasSpecialChar) {
            res.score = res.score + 1;
            res.hasSpecialChar = true;
        }
    });

    if (res.score <= 2) {
        res.strength = 'Weak';
    } else if (res.score <= 4) {
        res.strength = 'Good';
    } else if (res.score <= 5) {
        res.strength = 'Strong';
    } else {
        res.strength = 'Very Strong';
    }

    const isValid = Object.values(res).every((i) => Boolean(i));

    return { ...res, isValid };
};

