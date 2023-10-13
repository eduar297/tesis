import {
  Container,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  TextField,
  Box,
} from "@mui/material";
import { useState } from "react";
import useAuth from "../../hooks/useAuth.hook";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { login } = useAuth();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    login(username, password);
  };
  return (
    <Container>
      <Card sx={{ minWidth: 275 }}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Acceder
            </Typography>
            <Box
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
            >
              <div>
                <TextField
                  required
                  id="username"
                  label="Nombre de usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  fullWidth
                />
                <TextField
                  id="password"
                  label="Contrasenna"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </Box>
          </CardContent>
          <CardActions sx={{ justifyContent: "center" }}>
            <Button size="medium" variant="contained" type="submit">
              Acceder
            </Button>
          </CardActions>
        </Box>
      </Card>
    </Container>
  );
};

export default Login;
