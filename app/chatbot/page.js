"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Avatar,
  ThemeProvider,
  createTheme,
} from "@mui/material";

// Create a simple theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#004d40",
      dark: "#00251a",
      light: "#39796b",
    },
    background: {
      default: "#ffffff",
    },
    text: {
      primary: "#000000",
      light: "#ffffff",
    },
  },
});

const ChatbotComponent = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hey! I'm your AI assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([
        ...messages,
        { role: "user", content: input },
        {
          role: "assistant",
          content: "This is a mock response. Implement your AI logic here.",
        },
      ]);
      setInput("");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        height="100vh"
        sx={{ bgcolor: "primary.main" }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Stack
          sx={{
            height: "700px",
            width: "60%",
            maxWidth: "800px",
            borderRadius: "12px",
            bgcolor: "background.default",
            boxShadow: 3,
          }}
        >
          <Typography variant="h6" sx={{ p: 2, color: "primary.main" }}>
            AI Chatbot
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              p: 2,
            }}
          >
            {messages.map((message, index) => (
              <Stack
                key={index}
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent={
                  message.role === "assistant" ? "flex-start" : "flex-end"
                }
                mb={2}
              >
                {message.role === "assistant" && (
                  <Avatar sx={{ bgcolor: "primary.main" }}>AI</Avatar>
                )}
                <Typography
                  sx={{
                    bgcolor:
                      message.role === "assistant"
                        ? "primary.light"
                        : "primary.dark",
                    color: "text.light",
                    borderRadius: "12px",
                    p: 2,
                    maxWidth: "70%",
                  }}
                >
                  {message.content}
                </Typography>
                {message.role === "user" && (
                  <Avatar sx={{ bgcolor: "primary.dark" }}>U</Avatar>
                )}
              </Stack>
            ))}
          </Box>

          <Stack direction="row" spacing={2} sx={{ p: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <Button
              variant="contained"
              onClick={sendMessage}
              sx={{ bgcolor: "primary.dark", color: "text.light" }}
            >
              Send
            </Button>
          </Stack>
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

export default ChatbotComponent;
