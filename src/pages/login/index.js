import React,{useState} from 'react';
import { Grid,Paper, Avatar, TextField} from '@material-ui/core';
import LoginIcon from '@mui/icons-material/Login';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';    
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Fingerprint from '@mui/icons-material/Fingerprint';
import { useNavigate } from 'react-router-dom';

import './login.scss';

const Login=()=>{

    const paperStyle={padding :200,height:'70vh',width:310, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#9d1bbd'}

    const [showPassword] = useState(false);
    let navigate = useNavigate();

    //const[currentUserData] =useState([])
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let sendLoginRequest = async()=>{
        if(email != "" || password !=""){
            let responseRequest = await fetch("http://localhost:8080/v1/auth",{
                mode: 'cors',
                method: 'POST',
                body: JSON.stringify({
                  email: email,
                  password: password,
                }),
                headers: {
                  'Access-Control-Allow-Origin': '*',
                  'Content-Type': 'application/json',
                },
              }).then(response => response.json()).then(json => {
                window.$token=json.token;
                window.$expiration=json.expirationDate;
                navigate("../tasks")
            });
        }

    }


    return(
        <Grid >
            <form onSubmit="" className="" >
                <Paper elevation={10} style={paperStyle} className="card">
                    <Grid align='center'>
                        <Avatar style={avatarStyle}><LoginIcon/></Avatar>
                        <h2>Iniciar Sesion</h2>
                    </Grid>
                    <div className="text login">
                        <div>
                            <ListItemIcon><SupervisedUserCircleIcon className="icons"/> </ListItemIcon>
                            <TextField variant="outlined" id="user" name="user" label="Username" type="email" onChange={e => setEmail(e.target.value)}/>
                                
                                 
                        </div>
                        <br></br>
                        <div >
                            <ListItemIcon><VpnKeyOutlinedIcon className="icons"/> </ListItemIcon>
                            <FormControl className="" variant="outlined" >
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput fullWidth label="Password"
                                    id="outlined-adornment-password-login"
                                    type={showPassword? 'text' : 'password'}
                                    name="password"
                                    autoComplete="off"
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </FormControl>
                        </div >
                    </div>
                    <br/><br/><br/>
                    <IconButton aria-label="fingerprint" color="success" onClick={sendLoginRequest}>
                        <Fingerprint /> Sign in
                    </IconButton>
                </Paper>
            </form>
        </Grid>
    )
}

export default Login;