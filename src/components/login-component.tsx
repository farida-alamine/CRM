"use client";
import React, { useState } from "react";
import { Button } from "@mantine/core";
import axios from "axios";
import { useRouter } from "next/navigation";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { deleteCookie, setTokenCookie } from "../services/login-service";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function LoginComponent() {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currUrl = process.env.NEXT_PUBLIC_SERVER_API + "/users/login";
    try {
      const response = await axios.post(currUrl, {
        username: username,
        password: pass,
      });

      if (response.data.message) {
        setTokenCookie(username, pass);

        setTimeout(() => {
          router.replace("/users");
        }, 200);
      }
    } catch (error) {
      console.log("errr", error);
      deleteCookie();
      // handle error in login form
      setErrorMessage("");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="Username"
              autoComplete="Username"
              autoFocus
            />
            <TextField
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
// const LoginContainer = styled.div`
//     display: flex;
//     justify-content: center;
//     margin-top: 30px;
//     width: 100%;
// `;
// const StyledLoginComponent = styled.div`
//     width: 30%;
//     padding: 40px;
// `;
// const StyledForm = styled.form`
//     display: flex;
//     flex-direction: column;
//     gap: 1em;

//     .error-message {
//         color: red;
//         font-size: 14px;
//         margin-top: 8px;
//     }
// `;
