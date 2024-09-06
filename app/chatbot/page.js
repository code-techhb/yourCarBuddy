"use client";

// --------------------------------- Imports ------------------------------------
import { useState, useRef } from "react";
import {
  Box,
  Typography,
  ThemeProvider,
  Button,
  TextField,
  Stack,
  Avatar,
  IconButton,
} from "@mui/material";
import Theme from "../components/theme";
import Navbar from "../components/navbar";
import { MuiMarkdown } from "mui-markdown";
import PhotoCamera from "@mui/icons-material/PhotoCamera"; // Icon for the upload button
import BottomNav from "../components/bottom_nav";

export default function Home() {
  // --------------------------------- State Management vars -----------------------
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hey there! I'm your CarBuddy, here to help you keep your car in top-notch condition. Whether you have questions about maintenance, need advice on repairs, or just want to make sure your ride is running smoothly, I’m here to steer you in the right direction. Let’s keep your car in perfect shape! 🚗🔧`,
    },
  ]);

  const [message, setMessage] = useState("");
  const fileInputRef = useRef(null);

  // --------------------------------- event handler functions -------------------------------
  // function to send message to chatbot
  const sendMessage = async () => {
    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", content: "" },
    ]);
    setMessage("");

    // fetch api
    const response = fetch("/api/chat", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify([...messages, { role: "user", content: message }]),
    }).then(async (res) => {
      const reader = res.body.getReader();
      const decoder = new TextDecoder(); //decode the text from api

      let result = "";
      return reader.read().then(function processText({ done, value }) {
        if (done) {
          return result;
        }
        const text = decoder.decode(value || new Uint8Array(), {
          stream: true,
        });
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);
          return [
            ...otherMessages,
            {
              ...lastMessage,
              content: lastMessage.content + text,
            },
          ];
        });
        return reader.read().then(processText);
      });
    });
  };

  // Function to handle image uploads
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Create a URL for the uploaded image
    const imageUrl = URL.createObjectURL(file);

    // Add the image to the messages
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        role: "user",
        content: imageUrl,
        type: "image",
      },
    ]);

    // Create a FormData object and append the image file
    const formData = new FormData();
    formData.append("image", file);

    // Upload the image to your server and handle it accordingly
    try {
      console.log("Sending image to server...");
      const response = await fetch("/api/chat/upload-image/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error response:", errorText);
        throw new Error(`Image upload failed: ${response.status} ${errorText}`);
      }

      const result = await response.json();

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content:
            result.analysis || "Image processed, but no analysis returned.",
          type: "text",
        },
      ]);
    } catch (error) {
      console.error("Error in image upload process:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: `Error: ${error.message}`, type: "text" },
      ]);
    } finally {
      URL.revokeObjectURL(imageUrl);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const renderMessageContent = (content) => {
    const parts = content.split(/(!?\[.*?\]\(.*?\))/);
    return parts.map((part, index) => {
      const imageMatch = part.match(/!\[(.*?)\]\((.*?)\)/);
      if (imageMatch) {
        return (
          <img
            key={index}
            src={imageMatch[2]}
            alt={imageMatch[1]}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  //------------------ MUI Markdown Edit-----------
  const customRenderers = {
    // Override how paragraphs are rendered
    p: ({ children }) => (
      <Typography
        variant="body1"
        sx={{ marginBottom: "16px", lineHeight: 1.6 }}
      >
        {children}
      </Typography>
    ),
  };
  // ----------------- UI --------------------------
  return (
    <ThemeProvider theme={Theme}>
      {/* background */}
      <Navbar></Navbar>
      <Box
        // width="100wh"
        height="100vh"
        sx={{ bgcolor: Theme.palette.primary.main }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={2}
      >
        {/* Box Outside */}
        <Box
          height="900px"
          width="80%"
          alignItems="center"
          justifyContent="center"
          display="flex"
          flexDirection="column"
          sx={{
            border: (theme) => `1px solid ${theme.palette.primary.secondary}`,
            bgcolor: "white",
            borderRadius: "12px",
          }}
        >
          <Box
            height="70px"
            width="100%" // Adjust width to fill the container
            sx={{
              bgcolor: Theme.palette.primary.secondary,
              display: "flex", // Enable flexbox
              alignItems: "center", // Center vertically
              justifyContent: "center", // Center horizontally
              borderTopLeftRadius: "12px", // Only top-left corner
              borderTopRightRadius: "12px",
              marginBottom: "30px",
            }}
          >
            <Typography>AI Chatbot</Typography>
          </Box>

          {/* chat window */}
          <Stack
            sx={{
              height: "800px",
              width: "70%", // change this later
              borderRadius: "12px",
              borderColor: "black",
            }}
          >
            {/* messages window */}
            <Box
              sx={{
                backgroundColor: "background.default",
                flexGrow: "1",
                borderRadius: "12px",
                height: "85%",
                border: (theme) => `1px solid ${theme.palette.primary.dark}`,
                marginBottom: "15px",
                overflow: "auto",
                boxShadow: "1",
              }}
            >
              {/* Chat box */}
              {messages.map((message, index) => (
                <Stack
                  key={index}
                  direction="row"
                  spacing={2}
                  flexDirection="row"
                  alignItems="center"
                  padding="20px"
                  justifyContent={
                    message.role === "assistant" ? "flex-start" : "flex-end"
                  }
                >
                  <Avatar
                    sx={{
                      bgcolor: Theme.palette.text.darker,
                      width: 50,
                      height: 50,
                    }}
                    src={message.role === "assistant" ? "advisor.png" : ""}
                  />
                  <Typography
                    sx={{
                      bgcolor:
                        message.role === "assistant"
                          ? Theme.palette.primary.dark
                          : Theme.palette.primary.beige2,
                      color:
                        message.role === "assistant"
                          ? Theme.palette.text.light
                          : Theme.palette.text.black,
                      borderRadius: "12px",
                      padding: "30px",
                      whiteSpace: "normal", // Ensures that text wraps and doesn't overflow
                      wordBreak: "break-word", // Ensures long words break to fit the container
                      overflowWrap: "break-word", // Ensures that text breaks at the end of lines
                      maxWidth: "100%", // Limits width to the container's width
                    }}
                  >
                    {message.type === "image" ? (
                      <img
                        src={message.content}
                        alt="Uploaded content"
                        style={{
                          maxWidth: "100%",
                          height: "auto",
                          borderRadius: "8px",
                        }}
                      />
                    ) : message.content ? (
                      <MuiMarkdown options={{ overrides: customRenderers }}>
                        {message.content}
                      </MuiMarkdown>
                    ) : (
                      <span>...</span>
                    )}
                  </Typography>
                </Stack>
              ))}
            </Box>

            {/* chat input space */}
            <Stack
              direction={"row"}
              spacing={2}
              sx={{
                backgroundColor: "background.default",
                padding: "10px",
                borderRadius: "12px",
                border: (theme) => `1px solid ${theme.palette.primary.dark}`,
                boxShadow: "1",
                marginBottom: "40px",
              }}
            >
              {/* Image upload button */}
              <IconButton
                component="label"
                sx={{
                  color: Theme.palette.text.dark,
                }}
              >
                <PhotoCamera />
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageUpload}
                />
              </IconButton>
              <TextField
                width="80%"
                variant="standard"
                fullWidth
                placeholder="Type here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <Button
                variant="contained"
                disableElevation="true"
                sx={{
                  borderRadius: "20px",
                  px: "15px",
                  width: "120px",
                  fontFamily: "Montserrat",
                  bgcolor: Theme.palette.primary.secondary,
                  fontWeight: "Bold",
                  color: Theme.palette.text.black,
                  //border: (theme) => `1px solid ${theme.palette.primary.dark}`,
                  textAlign: "right",
                }}
                onClick={sendMessage}
              >
                Send
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>
      <BottomNav></BottomNav>
    </ThemeProvider>
  );
}
