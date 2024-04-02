import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CONFIG_VARS from "../../config";

export function NewOfficeRouteScreenScreen() {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [supervisorName, setSupervisorName] = useState("");
  const [supervisorPhone, setSupervisorPhone] = useState("");
  const [postmasterName, setPostmasterName] = useState("");
  const [postmasterPhone, setPostmasterPhone] = useState("");
  const [routes, setRoutes] = useState([]);
  const [routeInput, setRouteInput] = useState("");
  const [userId, setUserId] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);

  const navigation = useNavigation();

  const handlefetchUserId = async () => {
    try {
      const id = await AsyncStorage.getItem("userId");
      setUserId(id);
    } catch (error) {
      console.error("Error retrieving user information:", error);
    }
  };

  useEffect(() => {
    handlefetchUserId();
  }, []);

  const handleAddRoute = () => {
    if (routeInput.trim() !== "") {
      setRoutes([...routes, routeInput.trim()]);
      setRouteInput("");
    }
  };

  const handleDeleteRoute = (index) => {
    const updatedRoutes = [...routes];
    updatedRoutes.splice(index, 1);
    setRoutes(updatedRoutes);
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return; // Don't proceed if the form is not valid
    }
    const officeData = {
      user_id: userId,
      city: city,
      state: state,
      supervisor_name: supervisorName,
      supervisor_phone_number: supervisorPhone,
      postmaster_name: postmasterName,
      postmaster_phone_number: postmasterPhone,
    };

    // console.log(updatedPostOffices);
    try {
      // Send a POST request to create post offices
      const officeResponse = await fetch(
        `${CONFIG_VARS.DEV_API_BASE_URL}/api/offices`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(officeData),
        }
      );

      if (officeResponse.ok) {
        // Handle success
        console.log("Post office created successfully");
        const officeResponseJson = await officeResponse.json();
        console.log(officeResponseJson);
        try {
          for (let index = 0; index < routes.length; index++) {
            // Send a POST request to create routes
            let routeResponse = await fetch(
              `${CONFIG_VARS.DEV_API_BASE_URL}/api/routes`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  office_id: officeResponseJson.office.id,
                  route_number: routes[index],
                }),
              }
            );

            if (routeResponse.ok) {
              // Handle success
              console.log("Routes created successfully");
              // Optionally, navigate to another screen or perform other actions
              navigation.navigate("Account Created Screen");
            } else {
              // Handle errors
              console.error("Failed to create routes");
            }
            // Optionally, navigate to another screen or perform other actions
            // navigation.navigate("New Route Screen");
          }
        } catch (error) {
          console.error("Error creating routes:", error);
        }
      } else {
        // Handle errors
        console.error("Failed to create post offices");
      }
    } catch (error) {
      console.error("Error creating post offices:", error);
    }
  };

  const validateForm = () => {
    const errors = [];

    // Email validation regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!city.trim()) {
      errors.push("City is required");
    }

    if (!state.trim()) {
      errors.push("State is required");
    }

    if (routes.length === 0) {
      errors.push("Please enter at least one route you work at this office");
    }

    // Add more validation rules as needed for other fields

    setValidationErrors(errors);
    return errors.length === 0;
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20, marginBottom: 20 }}>
          Enter the info for the office you work at the most:{" "}
        </Text>
        <View>
          {validationErrors.map((error, index) => (
            <Text key={index} style={styles.errorText}>
              {error}
            </Text>
          ))}
        </View>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 10,
          }}
          onChangeText={setCity}
          value={city}
          placeholder="City"
        />
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 10,
          }}
          onChangeText={setState}
          value={state}
          placeholder="State"
        />
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 10,
          }}
          onChangeText={setSupervisorName}
          value={supervisorName}
          placeholder="Supervisor Name"
        />
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 10,
          }}
          onChangeText={setSupervisorPhone}
          value={supervisorPhone}
          placeholder="Supervisor Phone"
          keyboardType="phone-pad"
        />
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 10,
          }}
          onChangeText={setPostmasterName}
          value={postmasterName}
          placeholder="Postmaster Name"
        />
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 10,
          }}
          onChangeText={setPostmasterPhone}
          value={postmasterPhone}
          placeholder="Postmaster Phone"
          keyboardType="phone-pad"
        />
        <Text>Enter the routes you work at in this office:</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {routes.map((route, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 5,
                marginBottom: 5,
                padding: 8,
                backgroundColor: "#e0e0e0",
                borderRadius: 5,
              }}
            >
              <Text style={{ marginRight: 5 }}>{route}</Text>
              <Button title="x" onPress={() => handleDeleteRoute(index)} />
            </View>
          ))}
        </View>
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <TextInput
            style={{
              flex: 1,
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
            }}
            onChangeText={setRouteInput}
            value={routeInput}
            placeholder="Route Number"
          />
          <Button title="Add Route" onPress={handleAddRoute} />
        </View>
        {/* Submit button */}
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  // ... other styles ...
});
