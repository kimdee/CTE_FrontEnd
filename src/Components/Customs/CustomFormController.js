import react, { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";

const CustomFormController = ({
  isSignup,
  title,
  type,
  value,
  placeholder,
  setValue,
  errorMessage,
  isError,
  children,
}) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <FormControl marginTop={5} isInvalid={isError} border={"red"} isRequired>
        <FormLabel fontSize={"14"} fontWeight="500" color={"#272727"}>
          {title}
        </FormLabel>
        <InputGroup>
          {isSignup ? null : (
            <InputLeftElement pointerEvents="none" children={children} />
          )}
          <Input
            onPaste={(e) => (type === "password" ? e.preventDefault() : null)}
            type={type !== "password" ? type : show ? "text" : type}
            value={value}
            placeholder={placeholder}
            fontSize={13}
            focusBorderColor={"rgba(0,0,255,0.5)"}
            onChange={(e) => setValue(e.target.value)}
            className={"inputs"}
          />
          {type === "password" ? (
            <InputRightElement width="3rem" onClick={() => setShow(!show)}>
              {show ? (
                <MdVisibility size={"22px"} color="#718096" />
              ) : (
                <MdVisibilityOff size={"22px"} color="#718096" />
              )}
            </InputRightElement>
          ) : null}
        </InputGroup>
        {!isError ? null : <FormErrorMessage>{errorMessage}</FormErrorMessage>}
      </FormControl>
    </>
  );
};

export default CustomFormController;
