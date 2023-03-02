import { TextField, Button } from "@mui/material";
import { alpha, styled } from '@mui/material/styles';

export const PurpleTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: alpha(theme.palette.primary.main, 0.25),
      },
      '&.Mui-focused fieldset': {
        borderColor: '#633DBA',
      },
    },
    '& label.Mui-focused': {
      color: '#633DBA',
    },
  }));

export const PurpleButton = styled(Button)(({ theme }) => ({
    color: 'white',
    backgroundColor: '#633DBA',
    '&:hover': {
      backgroundColor: alpha('#633DBA', 0.75),
    },
  }));