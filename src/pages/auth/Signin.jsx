import { Link } from "react-router-dom"
import { FormElement, HeaderOne, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer, VerticallyFlexGapForm, VerticallyFlexSpaceBetweenContainer } from "../../components/styles/GenericStyles"
import { useForm } from 'react-hook-form';
import axios from 'axios';
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;
import { useCookies } from 'react-cookie';
import { GeneralContext } from "../../App";
import { Button } from "@mui/material";
import { useContext, useState } from "react";

const Signin = () => {
  const [ cookies, setCookie, removeCookie ] = useCookies(null);
  const { setOpen, setResponseMessage } = useContext(GeneralContext);
    
  const [isProcessing, setIsProcessing] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    setIsProcessing(true);

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    data.requestingUserId = userInfo.id;

    axios.post(serverUrl+'api/v1/cpta/user/signin', data)
    .then(response => {
      setTimeout(() => {
        if (response.status === 201) {
          setIsProcessing(false);
          setCookie('AuthToken', response.data.user.token);
          setCookie('UserData', JSON.stringify(response.data.user));
          window.location.replace('/');
        }
      }, 3000)
    })
    .catch(error => {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setIsProcessing(false);
        setResponseMessage({ message: error.response.data.msg, severity:'error'})
        setOpen(true);
      }
    })
  };

  return (
    <HorizontallyFlexSpaceBetweenContainer>
      <VerticallyFlexSpaceBetweenContainer>
        <VerticallyFlexGapContainer style={{ gap: '30px' }}>
          <h1>Construc</h1>
          <p>With the power of construc, you can now organize, manage, track, share, maintain all you construct project work load in one place. </p>
        </VerticallyFlexGapContainer>
        <VerticallyFlexGapContainer style={{ gap: '30px' }}>
          <div>
            <p>Don't have an account?</p>
            <Link to={'/auth/signup'}>Get started</Link>
          </div>
          <p>&copy; All rights reserved. Construc 2023</p>
        </VerticallyFlexGapContainer>
      </VerticallyFlexSpaceBetweenContainer>

      <VerticallyFlexGapForm onSubmit={handleSubmit(onSubmit)}>
        <HeaderOne>Account Login</HeaderOne>
        <FormElement>
          <label htmlFor="email">Email address</label>
          <input 
            type="email" 
            id="email"
            placeholder="email" 
            {...register("email", 
            {required: true})} 
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email?.type === "required" && (
            <p role="alert">Email is required</p>
          )}
        </FormElement>  
        <FormElement>
          <label htmlFor="password">Password</label>
          <input 
            type="password"
            id="password" 
            placeholder="password" 
            {...register("password", {required: true})} 
            aria-invalid={errors.password ? "true" : "false"}
          />
          {errors.password?.type === "required" && (
            <p role="alert">Password is required</p>
          )}
        </FormElement>
        <FormElement>
          {isProcessing 
            ? <Button disabled variant="contained" color="primary" size="small">PROCESSING...</Button> 
            : <Button variant="contained" color="primary" size="small" type="submit">Log in</Button>
          }
        </FormElement>
      </VerticallyFlexGapForm>
    </HorizontallyFlexSpaceBetweenContainer>
  )
}

export default Signin