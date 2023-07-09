import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { GeneralContext } from "../../App";
import { FormElement, HorizontallyFlexGapContainer, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer, VerticallyFlexGapForm } from "../styles/GenericStyles";
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;

export default function CreateProjectForm() {
    const [isProcessing, setIsProcessing] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { setOpen, setResponseMessage } = useContext(GeneralContext);

    const onSubmit = data => {
        if (data.password !== data.confirmPassword) {
          setResponseMessage({message:'Passwords do not match', severity: 'warning'});
          setOpen(true);
          return;
        } else {
    
          data.role = 'Consultant';
          setIsProcessing(true);
    
          axios.post(serverUrl+'/api/v1/cpta/user/signup', data)
          .then(response => {
            setTimeout(() => {
              if (response.status === 201) {
                setIsProcessing(false);
                setCookie('AuthToken', response.data.user.token);
                setCookie('UserData', JSON.stringify(response.data.user));
                
                console.log(response.data.user);
    
                // window.location.replace('/');
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
        }
      };

    return (
        <VerticallyFlexGapForm onSubmit={handleSubmit(onSubmit)} style={{ gap: '20px', backgroundColor: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)' }}>
            <p style={{ width: '100%', fontWeight: '600', textAlign:'left' }}>Create New Project</p>
            <VerticallyFlexGapContainer style={{ gap: '15px' }}>
                <HorizontallyFlexGapContainer style={{ gap: '20px' }}>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="fullName">Name</label>
                        <input 
                        type="text" 
                        id="name"
                        placeholder="name" 
                        {...register("name", 
                        {required: true})} 
                        aria-invalid={errors.name ? "true" : "false"}
                        />
                        {errors.name?.type === "required" && (
                        <p role="alert">Project name is required</p>
                        )}
                    </FormElement>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="fullName">Full name</label>
                        <input 
                        type="text" 
                        id="fullName"
                        placeholder="name" 
                        {...register("fullName", 
                        {required: true})} 
                        aria-invalid={errors.fullName ? "true" : "false"}
                        />
                        {errors.fullName?.type === "required" && (
                        <p role="alert">Full name is required</p>
                        )}
                    </FormElement>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="fullName">Full name</label>
                        <input 
                        type="text" 
                        id="fullName"
                        placeholder="name" 
                        {...register("fullName", 
                        {required: true})} 
                        aria-invalid={errors.fullName ? "true" : "false"}
                        />
                        {errors.fullName?.type === "required" && (
                        <p role="alert">Full name is required</p>
                        )}
                    </FormElement>
                </HorizontallyFlexGapContainer>
                <FormElement style={{ color: 'gray' }}>
                    <label htmlFor="fullName">Full name</label>
                    <input 
                    type="text" 
                    id="fullName"
                    placeholder="name" 
                    {...register("fullName", 
                    {required: true})} 
                    aria-invalid={errors.fullName ? "true" : "false"}
                    />
                    {errors.fullName?.type === "required" && (
                    <p role="alert">Full name is required</p>
                    )}
                </FormElement>
                <FormElement>
                    {isProcessing 
                    ? <Button disabled variant="contained" color="primary" size="small">PROCESSING...</Button> 
                    : <Button variant="contained" color="primary" size="medium" type="submit">CREATE</Button>
                    }
                </FormElement>
            </VerticallyFlexGapContainer>
        </VerticallyFlexGapForm>
    )
}