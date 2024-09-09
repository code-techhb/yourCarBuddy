"use client";

// --------------------------------- Imports ------------------------------------
import { useState, useRef, useEffect } from "react";
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
import theme from "../components/theme";
import Navbar from "../components/navbar";
import { MuiMarkdown } from "mui-markdown";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import BottomNav from "../components/bottom_nav";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/sign-in");
    }
  });

  // --------------------------------- State Management vars -----------------------
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hey there! I'm your CarBuddy, here to help you keep your car in top-notch condition. Whether you have questions about maintenance, need advice on repairs, or just want to make sure your ride is running smoothly, I’m here to steer you in the right direction. Let’s keep your car in perfect shape! 🚗🔧`,
    },
  ]);

  const [message, setMessage] = useState("");
  const fileInputRef = useRef(null);

  const { user } = useUser();
  const userId = user?.id;

  // --------------------------------- event handler functions -------------------------------
  // function to send message to chatbot
  const sendMessage = async () => {
    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", content: "" },
    ]);
    setMessage("");

    const allMessages = [...messages, { role: "user", content: message }];

    // fetch api
    const response = fetch("/api/chat", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ messages: allMessages, userId: userId }),
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
        sx={{
          marginBottom: "16px",
          lineHeight: 1.6,
          fontSize: {
            xs: "0.75rem", // 12px
            sm: "0.875rem", // 14px
            md: "1rem", // 16px
            lg: "1.25rem", // 20px
          },
        }}
      >
        {children}
      </Typography>
    ),
  };
  // ----------------- UI --------------------------
  return (
    <ThemeProvider theme={theme}>
      {/* background */}
      <Navbar></Navbar>
      <Box
        minHeight={"100vh"}
        sx={{ bgcolor: theme.palette.primary.main }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexGrow={1}
        gap={2}
      >
        {/* Box Outside */}
        <Box
          width="90%"
          alignItems="center"
          justifyContent="center"
          display="flex"
          flexDirection="column"
          sx={{
            border: (theme) => `1px solid ${theme.palette.primary.secondary}`,
            bgcolor: "white", //white
            borderRadius: "12px",
            height: { xs: "500px", sm: "700px", md: "800px", lg: "800px" },
          }}
        >
          <Box
            height="70px"
            width="100%"
            sx={{
              bgcolor: theme.palette.primary.secondary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
              marginBottom: "30px",
            }}
          >
            <Typography>AI Chatbot</Typography>
          </Box>

          {/* chat window */}
          <Stack
            sx={{
              height: { xs: "450px", sm: "700px", md: "800px", lg: "750px" },
              width: "90%",
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
                      bgcolor: theme.palette.text.darker,
                      width: 50,
                      height: 50,
                    }}
                    src={message.role === "assistant" ? "advisor.png" : ""}
                  />
                  <Typography
                    sx={{
                      bgcolor:
                        message.role === "assistant"
                          ? theme.palette.primary.dark
                          : theme.palette.primary.beige2,
                      color:
                        message.role === "assistant"
                          ? theme.palette.text.light
                          : theme.palette.text.black,
                      fontSize: {
                        xs: "0.75rem", // 12px
                        sm: "0.875rem", // 14px
                        md: "1rem", // 16px
                        lg: "1.25rem", // 20px
                      },
                      borderRadius: "12px",
                      padding: "30px",
                      whiteSpace: "normal",
                      wordBreak: "break-word",
                      overflowWrap: "break-word",
                      maxWidth: "100%",
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
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* Image upload button */}
              <IconButton
                component="label"
                sx={{
                  color: theme.palette.text.dark,
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
                sx={{ width: "80%" }}
                variant="standard"
                multiline
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
                  height: "48px",
                  fontFamily: "Montserrat",
                  bgcolor: theme.palette.primary.secondary,
                  fontWeight: "Bold",
                  color: theme.palette.text.black,
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
      <BottomNav />
    </ThemeProvider>
  );
}
