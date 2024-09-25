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
  media62_5em,
  media84_37em,
} from "../../../Constants/constants";
import { useSendContactMessage } from "../../../services/contactServices";
import Loader from "../../../Components/Loader/Loader";

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
    font-size: 1.6rem;
    margin-bottom: 2rem;
  }
  ${media48em} {
    font-size: 1.5rem;
  }
  ${media31_25em} {
    font-size: 1.4rem;
  }
`;
const StyledButton = styled.button`
  color: var(--color-text);
  background-color: var(--color-secondary);
  padding: 0.6rem 1rem;
  margin-top: 1rem;
  border-radius: 2px;
  border: none;
  font-size: 1.5rem;
  align-self: center;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  }
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  ${media84_37em} {
    font-size: 1rem;
  }
  ${media62_5em} {
    font-size: 0.9rem;
  }
  ${media48em} {
    font-size: 0.8rem;
  }
  ${media31_25em} {
    font-size: 0.7rem;
  }
`;

function ContactForm() {
  const { isDarkMode } = useDarkMode();
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;
  const { mutateAsync: sendMessage, isPending } = useSendContactMessage();
  console.log(errors);
  if (isPending) return <Loader />;

  const onSubmit = async (newMessage) => {
    await sendMessage(newMessage);
    reset();
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)} action="POST">
      <Paper
        elevation={2}
        sx={{
          padding: "2rem 4rem ",
          margin: "1rem",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "transparent",
          [media48em]: {
            padding: "1rem",
            margin: 0,
          },
          [media31_25em]: {
            padding: ".8rem",
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
                {...register("email", {
                  required: "This field is required!",
                  validate: (value) =>
                    emailRegex.test(value) || "Format does not match email",
                })}
                id="eMail"
                helperText={errors?.email?.message}
                error={errors?.email}
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
        <StyledButton type="submit"> Send Message</StyledButton>
      </Paper>
    </StyledForm>
  );
}

export default ContactForm;
