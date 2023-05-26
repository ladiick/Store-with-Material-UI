import React, { useState } from "react";
import { HOST } from "../../components/actions/HOST";

import { useNavigate } from "react-router-dom";
import {Avatar, Box, Button, Container, TextField, Typography} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const Registration = () => {
  const [visibleInputCode, setVisibleInputCode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const navigate = useNavigate();

  const getCodeRequest = async () => {
    if (!email) return;
    setVisibleInputCode(true);

    await fetch(`${HOST}/api/v1/auth/code/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        email: email,
      }),
    });
  };

  const onSubmit = async () => {
    await fetch(`${HOST}/api/v1/auth/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        email,
        password,
        code,
      }),
    });

    const token = await fetch(`${HOST}/auth/token/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const auth_token = await token.json();

    localStorage.setItem("token", auth_token.auth_token);
  };

  return (
    <Container component={'main'} maxWidth={'xs'}>
      <Box sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography variant={'h5'} component={'h1'} align="center">
          Зарегистрироваться
        </Typography>
        <Box component="form" onSubmit={onSubmit} noValidate sx={{mt: 1}}>
          <div>
            {visibleInputCode ? (
                <TextField
                  type="text"
                  label="Введите код"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
            ) : (
              <>

                  <TextField
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    label="Email"
                    sx={{mb:2}}
                  />

                  <TextField
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    label="Password"
                  />
              </>
            )}
          </div>
          {visibleInputCode ? (
            <Button
              variant={'contained'}
              type="submit"
              fullWidth>Зарегистрироваться</Button>
          ) : (
            <div>
              <Button
                type="submit"
                sx={{mb:2,mt:2}}
                variant={'contained'}
                fullWidth
                >Получить код</Button>
              <Button
                variant={'contained'}
                fullWidth
                onClick={() => navigate("/authorization")}>
                Войти
              </Button>
            </div>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Registration;
