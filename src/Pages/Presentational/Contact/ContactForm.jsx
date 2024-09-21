import styled from "styled-components";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { useDarkMode } from "../../../Contexts/DarkModeContext";
import {
  emailRegex,
  media31_25em,
  media48em,
  media84_37em,
} from "../../../Constants/constants";

const StyledForm = styled.form`
  width: 100%;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 2rem;
  color: var(--color-text);
  font-size: 1rem;
`;
const StyledTextField = styled(TextField)`
  border: 1px solid var(--color-text);

  width: 100%;
  & > label {
    font-family: "Kanit", sans-serif;
    color: var(--color-text);
    font-size: 1.2rem;
    ${media84_37em} {
      font-size: 1.1rem;
    }

    ${media48em} {
      font-size: 1rem;
    }
    ${media31_25em} {
      font-size: 0.9rem;
    }

    & + div {
      color: var(--color-text);
      font-family: "Kanit", sans-serif;
      ${media84_37em} {
        font-size: 1rem;
      }
      ${media48em} {
        font-size: 0.8rem;
      }
      ${media31_25em} {
        font-size: 0.7rem;
      }
    }
  }
`;
const StyledContactFormTitle = styled.h3`
  margin-bottom: 1rem;
  letter-spacing: 0.1rem;
  color: var(--color-text);
  text-align: center;
  font-size: 2rem;

  ${media84_37em} {
    font-size: 1.4rem;
    margin-bottom: 2rem;
  }
  ${media48em} {
    font-size: 1.3rem;
  }
  ${media31_25em} {
    font-size: 1.2rem;
  }
`;
const StyledButton = styled.button`
  color: var(--color-text);
  background-color: var(--color-secondary);
  padding: 0.6rem 1rem;
  margin-top: 1rem;
  border-radius: 2px;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  }
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  ${media48em} {
    font-size: 0.7rem;
    align-self: center;
  }
  ${media31_25em} {
    font-size: 0.6rem;
  }
`;

function ContactForm() {
  const { isDarkMode } = useDarkMode();
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;

  //????????????????? submit işlemini yap
  function onSubmit() {
    reset();
  }
  errors?.message?.message;
  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Paper
        elevation={2}
        sx={{
          p: "2rem 4rem ",
          m: "1rem",

          backgroundColor: "transparent",
          [media48em]: {
            p: "1rem",
            display: "flex",
            flexDirection: "column",
          },
          [media31_25em]: {
            p: ".8rem",
          },
        }}
      >
        <StyledContactFormTitle>Contact Form</StyledContactFormTitle>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={2}
            sx={{
              [media48em]: {
                marginLeft: "-16px",
              },
            }}
          >
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                "&>div>p": {
                  fontSize: "1rem",
                  [media84_37em]: {
                    fontSize: ".9rem",
                  },
                  [media48em]: {
                    fontSize: ".8rem",
                  },
                  [media31_25em]: {
                    fontSize: ".7rem",
                  },
                },
              }}
            >
              <StyledTextField
                label="First Name"
                variant={isDarkMode ? "filled" : "outlined"}
                {...register("firstName", {
                  required: "This field is required!",
                })}
                id="firstName"
                helperText={errors?.firstName?.message}
                error={errors?.firstName}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                "&>div>p": {
                  fontSize: "1rem",
                  [media84_37em]: {
                    fontSize: ".9rem",
                  },
                  [media48em]: {
                    fontSize: ".8rem",
                  },
                  [media31_25em]: {
                    fontSize: ".7rem",
                  },
                },
              }}
            >
              <StyledTextField
                label="Last Name"
                variant={isDarkMode ? "filled" : "outlined"}
                {...register("lastName", {
                  required: "This field is required!",
                })}
                id="lastName"
                helperText={errors?.lastName?.message}
                error={errors?.lastName}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                "&>div>p": {
                  fontSize: "1rem",
                  [media84_37em]: {
                    fontSize: ".9rem",
                  },
                  [media48em]: {
                    fontSize: ".8rem",
                  },
                  [media31_25em]: {
                    fontSize: ".7rem",
                  },
                },
              }}
            >
              <StyledTextField
                label="Email"
                variant={isDarkMode ? "filled" : "outlined"}
                {...register("eMail", {
                  required: "This field is required!",
                  validate: (value) =>
                    emailRegex.test(value) || "Format does not match email",
                })}
                id="eMail"
                helperText={errors?.eMail?.message}
                error={errors?.eMail}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                "&>div>p": {
                  fontSize: "1rem",
                  [media84_37em]: {
                    fontSize: ".9rem",
                  },
                  [media48em]: {
                    fontSize: ".8rem",
                  },
                  [media31_25em]: {
                    fontSize: ".7rem",
                  },
                },
              }}
            >
              <StyledTextField
                label="Subject"
                variant={isDarkMode ? "filled" : "outlined"}
                {...register("subject", {
                  required: "This field is required!",
                })}
                id="subject"
                helperText={errors?.subject?.message}
                error={errors?.subject}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                "&>div>p": {
                  fontSize: "1rem",
                  [media84_37em]: {
                    fontSize: ".9rem",
                  },
                  [media48em]: {
                    fontSize: ".8rem",
                  },
                  [media31_25em]: {
                    fontSize: ".7rem",
                  },
                },
              }}
            >
              <StyledTextField
                multiline
                minRows={5}
                label="Message"
                variant={isDarkMode ? "filled" : "outlined"}
                {...register("message", {
                  required: "This field is required!",
                })}
                id="message"
                helperText={errors?.message?.message}
                error={errors?.message}
              />
            </Grid>
          </Grid>
        </Box>
        <StyledButton> Send Message</StyledButton>
      </Paper>
    </StyledForm>
  );
}

export default ContactForm;
