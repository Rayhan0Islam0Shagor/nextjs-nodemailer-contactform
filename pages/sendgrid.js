import * as React from "react";
import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { sendContactFormBySendGrid } from "../lib/api";

const initialValue = {
  name: "",
  email: "",
  message: "",
  subject: "",
};

const initialState = {
  isLoading: false,
  error: "",
  values: initialValue,
};

const SendBySendGrid = () => {
  const toast = useToast();
  const [state, setState] = React.useState(initialState);
  const [touched, setTouched] = React.useState({});

  const { values, isLoading, error } = state;

  const onBlurred = ({ target }) =>
    setTouched((prev) => ({ ...prev, [target.name]: true }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      await sendContactFormBySendGrid(values);

      setTouched({});
      setState(initialState);
      toast({
        title: "Message sent",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false, error: error.message }));
    }
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState((prev) => ({
      ...prev.values,
      values: {
        ...prev.values,
        [name]: value,
      },
    }));
  };

  return (
    <Container maxW="450px" mt={12}>
      <Heading>Contact</Heading>
      {error && (
        <Text color="red.300" my={4} fontSize="xl">
          {error}
        </Text>
      )}

      <FormControl isRequired isInvalid={touched.name && !values.name} mb={5}>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          name="name"
          errorBorderColor="red.300"
          value={values.name}
          onChange={handleChange}
          onBlur={onBlurred}
        />
        <FormErrorMessage>Required</FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={touched.email && !values.email} mb={5}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          name="email"
          errorBorderColor="red.300"
          value={values.email}
          onChange={handleChange}
          onBlur={onBlurred}
        />
        <FormErrorMessage>Required</FormErrorMessage>
      </FormControl>

      <FormControl
        mb={5}
        isRequired
        isInvalid={touched.subject && !values.subject}
      >
        <FormLabel>Subject</FormLabel>
        <Input
          type="text"
          name="subject"
          errorBorderColor="red.300"
          value={values.subject}
          onChange={handleChange}
          onBlur={onBlurred}
        />
        <FormErrorMessage>Required</FormErrorMessage>
      </FormControl>

      <FormControl
        isRequired
        isInvalid={touched.message && !values.message}
        mb={5}
      >
        <FormLabel>Message</FormLabel>
        <Textarea
          type="text"
          name="message"
          rows={4}
          errorBorderColor="red.300"
          value={values.message}
          onChange={handleChange}
          onBlur={onBlurred}
        />
        <FormErrorMessage>Required</FormErrorMessage>
      </FormControl>

      <Button
        variant="outline"
        colorScheme="blue"
        isLoading={isLoading}
        disabled={
          !values.name || !values.email || !values.subject || !values.message
        }
        onClick={onSubmit}
      >
        Submit
      </Button>
    </Container>
  );
};

export default SendBySendGrid;
