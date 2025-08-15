import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  decrement,
  increment,
  incrementByAmount,
  setStep,
} from "@/store/slices/counterSlice";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const CounterScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { value, step } = useAppSelector((state) => state.counter);
  const [amount, setAmount] = useState<string>("");

  const handleIncrementByAmount = (): void => {
    const numericAmount = parseInt(amount) | 0;
    dispatch(incrementByAmount(numericAmount));
    setAmount("");
  };

  const stepValues = [1, 5, 10] as const;

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Counter Example</Text>
      <Text style={styles.value}> {value}</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => dispatch(decrement())}
        >
          <Text style={styles.buttonText}>-{step}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => dispatch(increment())}
        >
          <Text style={styles.buttonText}>+{step}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          placeholder="Enter amount"
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleIncrementByAmount}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.stepRow}>
        <Text>Step size: </Text>
        {stepValues.map((stepValue) => (
          <TouchableOpacity
            key={stepValue}
            style={[styles.stepButton, step === stepValue && styles.activeStep]}
            onPress={() => dispatch(setStep(stepValue))}
          >
            <Text
              style={[
                styles.stepButtonText,
                step === stepValue && styles.activeStepText,
              ]}
            >
              {stepValue}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  value: {
    fontSize: 48,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#007Aff",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#007Aff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    minWidth: 60,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  stepButton: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeStep: {
    backgroundColor: "#007AFF",
  },
  stepButtonText: {
    color: "#333",
  },
  activeStepText: {
    color: "white",
  },
  resetButton: {
    backgroundColor: "#FF3B30",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignSelf: "center",
  },
});

export default CounterScreen;
