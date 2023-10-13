import {
  Container,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  TextField,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

const Register = () => (
  <Container>
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Registrarme
        </Typography>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <RadioGroup row defaultValue="student" name="role">
              <FormControlLabel
                value="student"
                control={<Radio />}
                label="Estudiante"
              />
              <FormControlLabel
                value="professor"
                control={<Radio />}
                label="Profesor"
              />
            </RadioGroup>
          </div>
          <div>
            <TextField
              required
              id="username"
              label="Nombre de usuario"
              fullWidth
            />
            <TextField required id="email" label="Correo" fullWidth />
          </div>
          <div>
            <TextField required id="username" label="Nombre" fullWidth />
            <TextField required id="username" label="Apellidos" fullWidth />
          </div>

          <div>
            <TextField id="password" label="Contrasenna" type="password" />
            <TextField
              id="password2"
              label="Repita la contrasenna"
              type="password"
            />
          </div>
        </Box>
      </CardContent>
      <CardActions>
        <Button size="medium" variant="contained">
          Registrarme
        </Button>
      </CardActions>
    </Card>
  </Container>
);

export default Register;
