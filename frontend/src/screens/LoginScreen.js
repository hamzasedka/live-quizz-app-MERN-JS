import React, { useState, useEffect} from 'react'
import { Form, Button, } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import FormContainer from '../components/FormContainer.js'
import { login } from '../actions/userActions.js'

const LoginScreen = ( { location, history } ) => {
    const [emailUtilisateur, setEmail] = useState('') 
    const [mdp, setMdp] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)

    const { loading, error, userInfo } = userLogin 

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if(userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(emailUtilisateur, mdp))
    }


    return (
        <>
            <h1 className='text-center mt-5' style={{color: '#11246F'}}><strong>Se Connecter</strong></h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>   }
            <FormContainer>
            <Form onSubmit={submitHandler} className='mt-4'>
                <Form.Group controlId='emailUtilisateur' >
                    <Form.Label> <strong>Addresse Email :</strong></Form.Label>
                    <Form.Control  type='email' placeholder='Entrer Votre Email' value={emailUtilisateur} onChange={(e) => setEmail(e.target.value)}
                    required>

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='mdp'className='mt-4' >
                    <Form.Label> <strong>Mot De Passe :</strong></Form.Label>
                    <Form.Control type='password' placeholder='Entrer Votre Mot de passe' value={mdp} onChange={(e) => setMdp(e.target.value)}
                    required></Form.Control>
                </Form.Group>
                <Button type='Submit' variant='primary' className='mt-4'>
                    Se Connecter
                </Button>
            </Form>
        </FormContainer>
        </>
    )
}

export default LoginScreen
