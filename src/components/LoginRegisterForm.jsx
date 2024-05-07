import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  FlexContainer,
  Image,
  InputField,
  StyledText,
} from "../assets/styled-components/global/style";
import {
  FormContainer,
  FormFieldContainer,
  StyledFormIcons,
} from "../assets/styled-components/LoginRegister";
import { colors } from "../assets/styled-components/global/theme";
import { useDispatch, useSelector } from "react-redux";
import { getUser, login, register } from "../store/slices/authSlice";
import Eyeopen from "../assets/icons/eyeopen.png";
import Eyeclose from "../assets/icons/closedeye.png";
import { ModalContext } from "../modalcontext/ModalProvider";

const LoginRegisterForm = ({ formType }) => {
  const [showPassword, setShowPassword] = useState(false);
  const {closeModal} = useContext(ModalContext);
  const { isAuthenticated, username } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const formData = watch();

  useEffect(() => {
    if (isAuthenticated) {
      closeModal();
      dispatch(getUser(username));
    }
  }, [isAuthenticated]);

  const onSubmit = (formData) => {
    if (formType === "login") {
        dispatch(login(formData));
        reset();  
    } else if (formType === "register") {
        dispatch(register(formData));
        reset();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <StyledText fontSize="22px" fontWeight="600" mobileFontSize="15px">
        {formType === "login" ? "Login" : "Register"} To SwipTory
      </StyledText>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <FlexContainer direction="column" align="center" gap="1.5rem">
          <FormFieldContainer>
            <StyledText fontSize="18px" fontWeight="600" mobileFontSize="14px">
              Username{" "}
            </StyledText>
            <InputField
              type="text"
              placeholder="Enter username"
              name="username"
              {...formRegister("username", {
                required: "Please enter valid username",
              })}
            />
          </FormFieldContainer>
          <FormFieldContainer>
            <StyledText fontSize="18px" fontWeight="600" mobileFontSize="14px">
              Password&nbsp;{" "}
            </StyledText>
            <StyledFormIcons>
              <InputField
                placeholder="Enter password"
                type={showPassword ? "text" : "password"}
                name="password"
                {...formRegister("password", {
                  required: "Please enter valid password",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
                style={{ outline: "none", border: "none", padding:'0 0.5em',marginLeft:'0' }}
              />
              {showPassword ? (
                <Image
                  src={Eyeclose}
                  alt="Eye icon"
                  height="100%"
                  width="2rem"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <Image
                  src={Eyeopen}
                  alt="Eye icon"
                  height="100%"
                  width="2rem"
                  onClick={togglePasswordVisibility}
                />
              )}
            </StyledFormIcons>
          </FormFieldContainer>
          <div>
            {(errors.username && errors.password && (
              <StyledText color="red">Please fill all input</StyledText>
            )) ||
              (errors.password && (
                <StyledText color="red">{errors.password.message}</StyledText>
              ))}
          </div>
          <Button
            width="120px"
            height="2rem"
            fontWeight="600"
            borderRadius="20px"
            backgroundColor={colors.loginregisterbutton}
            type="submit"
          >
            {formType === "login" ? "Login" : "Register"}
          </Button>
        </FlexContainer>
      </FormContainer>
    </>
  );
};

export default LoginRegisterForm;
