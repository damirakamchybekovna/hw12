import React, { useState,useEffect  } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import Users from './components/Users';


//useEffect(()тин жардамы менен биз экранда, браузерди обновление кылганда экранга чыккан нерсебиз жоголуп кетпеши учун жонокой турун колдонсок болот

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
// биз useEffectке ороп коебуз getItem isLoggedIn озгоргон сайын getItem озгоро бербеши учун
    useEffect(()=>{
      // getItem аркылуу биз ключубузду алсак болот
     const storedUserLoggedInfo = localStorage.getItem("isLoggedIn")//isLoggedInти текшерет true болуп калса
                      //качан бирге барар болот logoutHandler иштегенде, себеби биз 1ге барарлап жазганбыз
     if(storedUserLoggedInfo === "1"){
        setIsLoggedIn(true);
     }
    }, []);

// бул жерге биз жазган email, password келет 
//side effectти биз функциянын обработчигине бергенибиз жакшы
  const loginHandler = (email, password) => { 
      //и биз бул жерге fetch жазсакда болот 
    localStorage.setItem('isLoggedIn','1')//функциянын ичине берсек это нормально потом что ,качан бироо басса кнопканы ошондо гана озгорот 
    //без useEffectта сыртка жазганы жаман(болбойт) себеби биз функциянын сыртына берип койсок isLoggedInтин озгоруп кетет, и ар дайым localStorageке isLoggedIn деп сактай берет
    setIsLoggedIn(true);
  };


  //бул жерде биз экранды logout кылганда экранда сакталып калган страницабыз очушу учун томонкудой логика жазсак болот, ал localStorageти жон гана тазалап коебуз
  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
      {/* loginHandler аркылуу биз жазган email, password пропс аркылуу Login.jsке барат,бул которулуучу состояние*/}
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
        {/* isLoggedIn true болсо usersти корсот,usersти корсоткондо бизде ичинде useEffect иштейт, бул логика канча жолу пайда болсо isLoggedIn ошончо жолу иштей берет  и ошончо жолу 
        useEffect иштеп турат */}
     {isLoggedIn && <Users isLoggedIn={isLoggedIn}/>}

      </main>
    </React.Fragment>
   );  
}

export default App;
