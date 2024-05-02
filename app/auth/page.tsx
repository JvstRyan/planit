"use client";

import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import RegistrationForm from "./RegistrationForm";
import LoginForm from "./LoginForm";

export default function Login() {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <>
      <Toaster />
      <Box
        component="section"
        className="flex flex-col items-center justify-center min-h-screen"
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: "bold",
            fontSize: "38px",
            padding: "20px",
            color: "white",
          }}
        >
          <span className="text-accent">Plan</span>
          It
        </Typography>
        <Box
          component="article"
          className="flex items-center justify-center mt-5 bg-white rounded-md"
        >
          <Button
            className={`${
              isRegistering ? "bg-accent text-white" : "bg-white text-primary"
            }  h-10 w-48`}
            onClick={() => setIsRegistering(true)}
          >
            Registreren
          </Button>
          <Button
            onClick={() => setIsRegistering(false)}
            className={`${
              isRegistering ? "bg-white text-primary" : "bg-accent text-white"
            }  h-10 w-48`}
          >
            Inloggen
          </Button>
        </Box>
        {isRegistering ? (
          <RegistrationForm setIsRegistering={setIsRegistering} />
        ) : (
          <LoginForm />
        )}
        <Typography
          component={"p"}
          color={"white"}
          fontSize={"15px"}
          className="mt-10"
        >
          {isRegistering ? "Heb je al een account?" : "Nog geen account?"}
          <span
            onClick={
              isRegistering
                ? () => setIsRegistering(false)
                : () => setIsRegistering(true)
            }
            className=" underline text-accent cursor-pointer ml-1"
          >
            {isRegistering ? "Inloggen" : "Registreren"}
          </span>
        </Typography>
      </Box>
    </>
  );
}
