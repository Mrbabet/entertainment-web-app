import React from "react";
import { Link } from "react-router-dom";
import styles from './Login.module.css'
import { useRef,useState,useEffect, useContext } from "react";
import AuthContext from "../../context/AuthProvider";

import axios from '../../api/axios'
const LOGIN_URL = '/auth'



import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button,
    InputGroup,
    InputRightElement
  } from '@chakra-ui/react'

  import {

    Heading,
    Text,
    useToast,
  } from "@chakra-ui/react";
 



const Login = () => {
    const toast = useToast()
    const {setAuth} = useContext(AuthContext)

    const [user,setUser]= useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)
    const [show, setShow] = useState(false)
    const [touched, setTouched] = useState({});

    const onBlur = (e) => {
        setTouched((prev) => ({ ...prev, [e.target.name]: true }));
      };
    

   

    useEffect(()=>{
        setErrMsg('')
    },[user,password])

    const handleSubmit = async (e)=>{
        e.preventDefault()

        try {
            const response = await axios.post(LOGIN_URL,JSON.stringify({user,password}),{
                headers:{'Content-Type': 'aplication/json'},withCredentials:true
            })
        setUser('')
        setPassword('')
        toast({
            title: "Signing in",
            status: "success",
            duration: 2000,
            position: "top",
          });
        console.log(JSON.stringify(response?.data))
        console.log(JSON.stringify(response))
        const accessToken = response?.data?.accessToken
        setAuth({user,password,accessToken})
            
        } catch (error) {
            if(!error?.response){
                setErrMsg('No Server Response')
                toast({
                    title: "No Server Response",
                    status: "error",
                    duration: 2000,
                    position: "top",
                  });
            }else if(error.response?.status === 400){
                setErrMsg('Missing username or password')
                toast({
                    title: "Missing username or password",
                    status: "error",
                    duration: 2000,
                    position: "top",
                  });;
            }if(error.response?.status === 401){
                setErrMsg('Unauthorized')
                toast({
                    title: "Unauthorized",
                    status: "error",
                    duration: 2000,
                    position: "top",
                  });
            }else{
                setErrMsg('Login Failed')
                toast({
                    title: "Login Failed",
                    status: "error",
                    duration: 2000,
                    position: "top",
                  });
            }   
        }
    }

  const content = (
    <section className={styles.public}>

        <Heading>Sign In</Heading>
        {errMsg && (
            <Text color="red.300" my={4} fontSize="xl">
          {errMsg}
        </Text>
      )}

        <main className="login">
       
            <form onSubmit={handleSubmit}>
                <FormControl >
                    <FormLabel htmlFor="username" >Username:</FormLabel>
                    <Input id="username" autoComplete="off" type="text" onChange={(e)=>setUser(e.target.value)} value={user} onBlur={onBlur} required />
                    <FormLabel htmlFor="password">Password:</FormLabel>
                    <InputGroup size='md'>
                        <Input type={show ? 'text' : 'password'} placeholder='Enter password' onChange={(e)=>setPassword(e.target.value)} value={password} onBlur={onBlur} required />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={()=> setShow(!show)}>{show ? 'Hide' : 'Show'}</Button>
                        </InputRightElement>
                    </InputGroup>
                    <Button type="submit">Sign In</Button>
                </FormControl>
            </form>
        
            <p>Need an Account? <br/>
            <Link to='/'>Sign Up</Link>
            </p>
        </main>
        <footer>
            <Link to="/">Back to Home</Link>
        </footer>
    </section>
)

return content

};

export default Login;
