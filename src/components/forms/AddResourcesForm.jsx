import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { GeneralContext } from "../../App";
import { FormElement, HorizontallyFlexGapContainer, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer, VerticallyFlexGapForm } from "../styles/GenericStyles";
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;
import { WorldCountries } from "../../utils/WorldCountries";
import { ProjectTypes } from "../../utils/ProjectTypes";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getAllProjects } from "../../redux/features/projectSlice";

export default function AddResourcesForm({projectId}) {
    const [isProcessing, setIsProcessing] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { setOpen, setResponseMessage } = useContext(GeneralContext);
    const [ cookies, setCookie, removeCookie ] = useCookies(null);
    const user = cookies.UserData;
    const dispatch = useDispatch();
    const [openForm, setOpenForm] = useState(true);

    const onSubmit = data => {
        if (data.password !== data.confirmPassword) {
          setResponseMessage({message:'Passwords do not match', severity: 'warning'});
          setOpen(true);
          return;
        } else {
          data.project = projectId;
          data.totalPrice = Number(data.quantity) * Number(data.unitPrice)

          setIsProcessing(true);
    
          axios.post(serverUrl+'/api/v1/cpta/material/add', data)
          .then(response => {
            setTimeout(() => {
              if (response.status === 201) {
                setIsProcessing(false);
                setResponseMessage({ message: response.data.message, severity: 'success' });
                setOpen(true);
                // dispatch(getAllMaterials(user.id));
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
            <HorizontallyFlexSpaceBetweenContainer>
                <p style={{ width: '100%', fontWeight: '600', textAlign:'left' }}>Add</p>
            </HorizontallyFlexSpaceBetweenContainer>
            {openForm && 
            <VerticallyFlexGapContainer style={{ gap: '15px' }}>
                <HorizontallyFlexGapContainer style={{ gap: '20px' }}>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="name">Name *</label>
                        <input 
                            type="text" 
                            id="name"
                            placeholder="Project name" 
                            {...register("name", 
                            {required: true})} 
                            aria-invalid={errors.name ? "true" : "false"}
                        />
                        {errors.name?.type === "required" && (
                        <p role="alert">Material name is required</p>
                        )}
                    </FormElement>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="estimatedEndDate">Type *</label>
                        <input 
                            type="text" 
                            id="type"
                            placeholder="Material type" 
                            {...register("type", 
                            {required: true})} 
                            aria-invalid={errors.type ? "true" : "false"}
                        />
                        {errors.type?.type === "required" && (
                            <p role="alert">Material type must be provided</p>
                        )}
                    </FormElement>
                </HorizontallyFlexGapContainer>
                
                <FormElement style={{ color: 'gray' }}>
                    <label htmlFor="description">Description</label>
                    <textarea 
                        rows={3}
                        type="text" 
                        id="description"
                        placeholder="Provide a short description of the material if necessary" 
                        {...register("description", 
                        {required: true})} 
                        aria-invalid={errors.description ? "true" : "false"}
                    ></textarea>
                </FormElement>

                <HorizontallyFlexGapContainer style={{ gap: '20px' }}>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="quantity">Quantity *</label>
                        <input 
                            type="number" 
                            id="quantity"
                            placeholder="Quantity" 
                            {...register("quantity", 
                            {required: true})} 
                            aria-invalid={errors.quantity ? "true" : "false"}
                        />
                        {errors.quantity?.type === "required" && (
                            <p role="alert">The quantity must be provided</p>
                        )}
                    </FormElement>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="unitPrice">Unit price *</label>
                        <input 
                            type="number" 
                            id="unitPrice"
                            placeholder="Price per unit" 
                            {...register("unitPrice", 
                            {required: true})} 
                            aria-invalid={errors.unitPrice ? "true" : "false"}
                        />
                    </FormElement>
                </HorizontallyFlexGapContainer>

                <FormElement style={{ color: 'gray' }}>
                    <label htmlFor="picture">Picture</label>
                    <input 
                        type="file" 
                        id="picture" 
                        {...register("picture", 
                        {required: true})} 
                        aria-invalid={errors.picture ? "true" : "false"}
                    />
                </FormElement>

                <FormElement style={{ flexDirection: 'row', gap: '60%' }}>
                    {isProcessing 
                    ? <Button disabled variant="contained" color="primary" size="small">PROCESSING...</Button> 
                    : <Button variant="contained" color="primary" size="medium" type="submit">Add</Button>
                    }
                    <Button variant="contained" color="secondary" size="medium" type="button" onClick={() => {window.location.reload()}}>Cancel</Button>
                </FormElement>
            </VerticallyFlexGapContainer>}
        </VerticallyFlexGapForm>
    )
}