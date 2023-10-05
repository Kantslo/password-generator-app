import iconCheck from "./assets/images/icon-check.svg"
import React, { useState } from 'react'
import {
  upperCaseLetters,
  lowerCaseLetters,
  numbers,
  specialCharacters
}
  from "./properties"

function App() {

  const [passwordLength, setPasswordLength] = useState(10);

  const handleSliderChange = (event) => {
    setPasswordLength(event.target.value);
  }

  const [password, setPassword] = useState("")
  const [incUppercase, setIncUppercase] = useState(false);
  const [incLowercase, setIncLowercase] = useState(false);
  const [incNumbers, setIncNumbers] = useState(false);
  const [incSymbols, setIncSymbols] = useState(false);
  const [isClicked, setIsClicked] = useState(false)

  let barColor = ''
  let barBorder = 'none'
  let strength = ''

  if (passwordLength <= 5) {
    barColor = '#F64A4A';
    strength = 'too weak!';
    barBorder = 'none';
  } else if (passwordLength > 5 && passwordLength <= 10) {
    barColor = '#FB7C58';
    strength = 'weak';
    barBorder = 'none';
  } else if (passwordLength > 10 && passwordLength <= 15) {
    barColor = '#F8CD65';
    strength = 'medium';
    barBorder = 'none';
  } else {
    barColor = '#A4FFAF';
    strength = 'strong';
    barBorder = 'none'
  }

  const handleGeneratePassword = (e) => {
    let characterList = ''

    if (incLowercase) {
      characterList += lowerCaseLetters;
    }

    if (incUppercase) {
      characterList += upperCaseLetters;
    }

    if (incNumbers) {
      characterList += numbers;
    }

    if (incSymbols) {
      characterList += specialCharacters;
    }

    setPassword(createPassword(characterList))

    setIsClicked(true)
  }

  const createPassword = (characterList) => {
    let password = '';

    const characterListLength = characterList.length;

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength)
      password = password + characterList.charAt(characterIndex)
    }
    return password
  }

  const [isCopied, setIsCopied] = useState(false)

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password);
    console.log(password);

    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }

  const handleCheckboxChange1 = () => {
    setIncUppercase(!incUppercase);
  };

  const handleCheckboxChange2 = () => {
    setIncLowercase(!incLowercase);
  };

  const handleCheckboxChange3 = () => {
    setIncNumbers(!incNumbers);
  };

  const handleCheckboxChange4 = () => {
    setIncSymbols(!incSymbols);
  };

  return (
    <>
      <div className="container">
        <h1>Password Generator</h1>
        <div className="password">
          <input
            placeholder="P4$5W0rD!"
            className="pass"
            type="text"
            readOnly value={password}
          />
          {isCopied && (
            <p
              className="copyText">
              COPIED
            </p>
          )}
          <button
            onClick={() => {
              handleCopyPassword();
            }}
            className="copyButton">
            <svg
              className="copy"
              width="21" height="24"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M20.341 3.091 17.909.659A2.25 2.25 0 0 0 16.319 0H8.25A2.25 2.25 0 0 0 6 2.25V4.5H2.25A2.25 2.25 0 0 0 0 6.75v15A2.25 2.25 0 0 0 2.25 24h10.5A2.25 2.25 0 0 0 15 21.75V19.5h3.75A2.25 2.25 0 0 0 21 17.25V4.682a2.25 2.25 0 0 0-.659-1.591ZM12.469 21.75H2.53a.281.281 0 0 1-.281-.281V7.03a.281.281 0 0 1 .281-.281H6v10.5a2.25 2.25 0 0 0 2.25 2.25h4.5v1.969a.282.282 0 0 1-.281.281Zm6-4.5H8.53a.281.281 0 0 1-.281-.281V2.53a.281.281 0 0 1 .281-.281H13.5v4.125c0 .621.504 1.125 1.125 1.125h4.125v9.469a.282.282 0 0 1-.281.281Zm.281-12h-3v-3h.451c.075 0 .147.03.2.082L18.667 4.6a.283.283 0 0 1 .082.199v.451Z" />
            </svg>
          </button>
        </div>

        <div className="password-card">

          <div className="character-length">
            <div className="charLength">
              <label htmlFor="length" className="char-length">
                Character Length
              </label>
              <span className="show-length" id="sliderValue">
                {passwordLength}
              </span>
            </div>
            <input
              name="length"
              type="range"
              min="1"
              max="20"
              step="1"
              className="slider"
              id="mySlider"
              defaultValue={passwordLength}
              onChange={handleSliderChange}
            />
          </div>


          <div className="checkbox-properties">
            <label
              htmlFor="incUppercase"
              className={`custom-checkbox ${incUppercase ? 'checked' : ''}`}>
              <input
                id="incUppercase"
                type="checkbox"
                checked={incUppercase}
                onChange={() => {
                  handleCheckboxChange1();
                  (e) => setIncUppercase(e.target.checked);
                }}
              />
              Include Uppercase Letters
              <span className="custom-checkbox-box">
                <span className="custom-checkbox-check"><img src={iconCheck} alt="check-icon" /></span>
              </span>

            </label>

            <label
              htmlFor="incLowercase"
              className={`custom-checkbox ${incLowercase ? 'checked' : ''}`}>
              <input
                id="incLowercase"
                type="checkbox"
                checked={incLowercase}
                onChange={() => {
                  handleCheckboxChange2();
                  (e) => setIncLowercase(e.target.checked);
                }}
              />
              Include Lowercase Letters

              <span className="custom-checkbox-box">
                <span className="custom-checkbox-check"><img src={iconCheck} alt="check-icon" /></span>
              </span>

            </label>

            <label
              htmlFor="incNumbers"
              className={`custom-checkbox ${incNumbers ? 'checked' : ''}`}>
              <input
                id="incNumbers"
                type="checkbox"
                checked={incNumbers}
                onChange={() => {
                  handleCheckboxChange3();
                  (e) => setIncNumbers(e.target.checked);
                }}
              />
              Include Numbers

              <span className="custom-checkbox-box">
                <span className="custom-checkbox-check"><img src={iconCheck} alt="check-icon" /></span>
              </span>

            </label>

            <label
              htmlFor="incSymbols"
              className={`custom-checkbox ${incSymbols ? 'checked' : ''}`}>
              <input
                id="incSymbols"
                type="checkbox"
                checked={incSymbols}
                onChange={() => {
                  handleCheckboxChange4();
                  (e) => setIncSymbols(e.target.checked);
                }}
              />
              Include Symbols
              <span className="custom-checkbox-box">
                <span className="custom-checkbox-check"><img src={iconCheck} alt="check-icon" /></span>
              </span>

            </label>
          </div>


          <div className="password-strength">
            <h2>Strength</h2>
            <div className="strength">
              <p className="strengthText">{isClicked ? strength : 'too weak!'}</p>
              <div
                style={{ backgroundColor: isClicked ? barColor : 'transparent', border: isClicked ? barBorder : '2px solid #fff' }}
                id="bar1"
                className="bars bar1">
              </div>
              <div
                style={{ backgroundColor: isClicked && strength !== 'too weak!' ? barColor : 'transparent', border: isClicked && strength !== 'too weak!' ? barBorder : '2px solid #fff' }}
                id="bar2"
                className="bars bar2">
              </div>
              <div
                style={{ backgroundColor: isClicked && strength !== 'too weak!' && strength !== 'weak' ? barColor : 'transparent', border: isClicked && strength !== 'too weak!' && strength !== 'weak' ? barBorder : '2px solid #fff' }}
                id="bar3"
                className="bars bar3">
              </div>
              <div
                style={{ backgroundColor: isClicked && strength === 'strong' ? barColor : 'transparent', border: isClicked && strength === 'strong' ? barBorder : '2px solid #fff' }}
                id="bar4"
                className="bars bar4">
              </div>
            </div>
          </div>
          <button
            onClick={handleGeneratePassword}
            type="submit"
            id="generateBtn"
            className="generateBtn">
            Generate
            <svg
              className="arrowRight"
              width="12" height="12"
              xmlns="http://www.w3.org/2000/svg">
              <path d="m5.106 12 6-6-6-6-1.265 1.265 3.841 3.84H.001v1.79h7.681l-3.841 3.84z" />
            </svg>
          </button>
        </div>
      </div >
    </>
  )
}

export default App
