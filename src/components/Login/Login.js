import React, { useState, useEffect } from 'react';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
//debouncing, debounce жазып жатканда активный болуп турат, жазып буткондон кийин не актвный болуп калат
//т.е. жазып буткон сон  setFormIsValid(enteredEmail.includes('@') && enteredPassword.trim().length > 6);//ивенттен келген данныйларыбызды сактап берет
      // console.log('changed'); иштеп кетиши керек
      //fetch запрос болуп калышы мумкун, но бул туура эмес каждый раз жазган сайын запрос жонотулуп кеткен, бул туура эмес , ошол учун debouncing, debounce  жардамы менен булл проблеманы чечсе болот
const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState(''); // email жаза турган состояние
  const [emailIsValid, setEmailIsValid] = useState(); // email  туурабы туура эмесби текшере состояние
  const [enteredPassword, setEnteredPassword] = useState(''); //  password жаза турган состояние
  const [passwordIsValid, setPasswordIsValid] = useState(); // password  туурабы туура эмесби текшере турган состояние
  const [formIsValid, setFormIsValid] = useState(false); // email и password жарактуу болсо иштей турган состояние
  //useEffectти кобунчо sideEffectке колдонушат
  //useEffectтин жардаы менен эки жерге болуп жазып жаткан логикабызды бир эле жерге кошуп жазып койсок болот
  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(enteredEmail.includes('@') && enteredPassword.trim().length > 6);//ивенттен келген данныйларыбызды сактап берет
      console.log('changed');
    }, 3000);
    // clean up function  (мунун ичинде коптогон манипуляцияларды контроль кылсак болот)
    //(баардык таймерди тазалап акыркы таймерди койуп коет)
    return () => {
      clearTimeout(timer);
    };
  }, [enteredEmail, enteredPassword]);
  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };
  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };
  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);//пропс аркылуу которулуучу состояниядан келген.. бул жерде app.jsxтен келген функция иштейт
  };
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div className={`${classes.control} ${emailIsValid === false ? classes.invalid : ''}`}>
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div className={`${classes.control} ${passwordIsValid === false ? classes.invalid : ''}`}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
        {/* Button качан email, password экоо туура жазылган болсо кнопка иштейт . Бул жердеги  жогорууда жазылган проверкалардан откондо иштесин туура эмес болсо иштебесин деп жазылган логика*/}
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};
export default Login;