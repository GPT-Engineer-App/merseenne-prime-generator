import { Box, Button, Container, Heading, Input, Text, VStack, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { FaCalculator } from "react-icons/fa";

// Function to check if a number is prime
const isPrime = (num) => {
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return num > 1;
};

// Function to check if a number is a Mersenne prime
const isMersennePrime = (num) => {
  return isPrime(num) && ((num + 1) & num) === 0;
};

const Index = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const toast = useToast();

  const handleInputChange = (event) => setInput(event.target.value);

  const calculateMersennePrimes = () => {
    const num = parseInt(input);
    if (isNaN(num)) {
      toast({
        title: "Invalid input",
        description: "Please enter a valid number",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const mersennePrimes = [];
    for (let p = 2; mersennePrimes.length < num; p++) {
      const mersenneCandidate = Math.pow(2, p) - 1;
      if (isMersennePrime(mersenneCandidate)) {
        mersennePrimes.push(mersenneCandidate);
      }
    }

    setResult(mersennePrimes);
  };

  return (
    <Container centerContent>
      <VStack spacing={8} marginY={12}>
        <Heading>Mersenne Prime Calculator</Heading>
        <Text>Enter a number to calculate that many Mersenne primes. Please note that this calculation is performed on the client side and for very large numbers it can be quite resource-intensive.</Text>
        <Input placeholder="Enter a number" value={input} onChange={handleInputChange} />
        <Button leftIcon={<FaCalculator />} colorScheme="teal" onClick={calculateMersennePrimes}>
          Calculate
        </Button>
        <Box>
          {result && (
            <VStack>
              <Heading size="md">Mersenne Primes</Heading>
              {result.map((prime, index) => (
                <Text key={index}>{prime}</Text>
              ))}
            </VStack>
          )}
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
