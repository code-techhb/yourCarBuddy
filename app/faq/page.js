"use client";

// --------------------------------- Imports ------------------------------------
import { useState } from "react";
import {
  Box,
  Typography,
  ThemeProvider,
  Button,
  Stack,
  Avatar,
  Collapse,
  IconButton,
  CssBaseline,
} from "@mui/material";
import Theme from "../components/theme";
import Navbar from "../components/navbar";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Footer from "../components/footer";

export default function Home() {
  // State to manage expanded questions
  const [expanded, setExpanded] = useState(Array(10).fill(false)); // Assuming 10 questions

  // Toggle expansion
  const handleToggle = (index) => {
    const newExpanded = [...expanded];
    newExpanded[index] = !newExpanded[index];
    setExpanded(newExpanded);
  };

  return (
    <ThemeProvider theme={Theme}>
      <Navbar />
      <Box
        minHeight="100%"
        bgcolor="primary.main"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        {/* Main Title */}
        <Typography
          variant="h5"
          align="center"
          sx={{
            fontSize: {
              xs: "30px",
              sm: "40px",
              md: "60px",
              lg: "80px",
            },
            fontStyle: "normal",
            fontWeight: 800,
            color: Theme.palette.text.white,
            marginTop: "80px",
          }}
        >
          Do you have questions?
        </Typography>

        {/* Subtitle */}
        <Typography
          variant="h4"
          padding={0}
          align="center"
          sx={{
            //fontSize: '30px',
            fontSize: {
              xs: "15px",
              sm: "20px",
              md: "30px",
              lg: "30px",
            },
            fontStyle: "normal",
            margin: 3,
            color: Theme.palette.text.green,
          }}
        >
          We have answers (well, most of the time)
        </Typography>

        {/* Description */}
        <Typography
          variant="body1"
          //fontSize={21}
          maxWidth="800px"
          align="center"
          marginTop={2}
          sx={{
            color: Theme.palette.text.white,
            fontSize: {
              xs: "15px",
              sm: "15px",
              md: "21px",
              lg: "21px",
            },
            width: {
              xs: "80%",
              sm: "80%",
              md: "90%",
              lg: "100%",
            },
          }}
        >
          Below you'll find answers to the most common questions you may have on
          Rate My WorkPlace. Also, please feel free to check our contact Us page
          if you still can't find the answers that you're looking for.
        </Typography>

        {/* Image */}
        <Box marginTop={0} marginBottom={4}>
          <Avatar
            src="/buddy.png"
            alt="FAQ Image"
            sx={{ width: 600, height: 600 }}
          />
        </Box>

        {/* FAQ Section */}
        <Stack spacing={2} width="100%" maxWidth="800px">
          <Box>
            {[
              {
                question: "What is Car Buddy?",
                answer:
                  "Car Buddy is a web application that helps you keep track of your car's maintenance schedules and due dates. It features AI-powered tools to answer questions about upcoming maintenance, compare service prices, and provide valuable insights for car care.",
              },
              {
                question:
                  "How does Car Buddy track my car's maintenance schedule?",
                answer:
                  "Car Buddy tracks your car's maintenance schedule by recording details such as make, model, and year. It then monitors and reminds you of due dates for various maintenance tasks based on manufacturer recommendations and your car's usage.",
              },
              {
                question: "How do I input my car's information into Car Buddy?",
                answer:
                  "You can input your car's information by manually entering details into the app or uploading documents like service records. Car Buddy also allows you to save and manage multiple vehicles.",
              },
              {
                question: "How does the AI feature work in Car Buddy?",
                answer:
                  "The AI feature in Car Buddy assists by answering questions about your car's maintenance schedule and service prices. You can ask the AI about your next due maintenance or request a comparison of service prices from different providers.",
              },
              {
                question:
                  "Can Car Buddy help me compare prices for car maintenance services?",
                answer:
                  "Yes, Car Buddy can compare prices for various car maintenance services by accessing and analyzing information from multiple online sources. This feature helps you find the best deals and avoid overcharging by mechanics.",
              },
              {
                question:
                  "How often does Car Buddy update the maintenance schedules and prices?",
                answer:
                  "Car Buddy updates maintenance schedules based on the latest manufacturer recommendations and service data. Price comparisons are updated regularly to ensure you receive current and accurate information.",
              },
              {
                question:
                  "What types of maintenance services does Car Buddy track?",
                answer:
                  "Car Buddy tracks a wide range of maintenance services, including oil changes, tire rotations, brake inspections, fluid checks, and more. It provides reminders for each service based on your car's specific needs.",
              },
              {
                question: "Is my data secure with Car Buddy?",
                answer:
                  "Yes, Car Buddy prioritizes data security and employs encryption and secure storage methods to protect your personal and vehicle information. Your data is accessible only to you and used solely for tracking and managing your car's maintenance.",
              },
              {
                question: "Can I access Car Buddy on mobile devices?",
                answer:
                  "Currently, Car Buddy is a web application accessible via any modern web browser. For mobile access, you can use the app on your smartphone or tablet through a web browser. Future updates may include dedicated mobile apps for enhanced usability.",
              },
              {
                question:
                  "How do I contact support if I have issues or questions?",
                answer:
                  "If you encounter any issues or have questions, you can contact Car Buddy's support team through the app's support page. We offer email support and a contact form for your convenience. Our team is here to assist you with any inquiries or problems you may have.",
              },
            ].map((faq, index) => (
              <Box key={index} marginBottom={6} marginLeft={3}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{
                    width: {
                      xs: "80%",
                      sm: "80%",
                      md: "90%",
                      lg: "100%",
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: Theme.palette.text.white,
                      fontSize: {
                        xs: "18px",
                        sm: "18px",
                        md: "23px",
                        lg: "23px",
                      },
                    }}
                  >
                    {faq.question}
                  </Typography>
                  <IconButton onClick={() => handleToggle(index)}>
                    <ExpandMoreIcon />
                  </IconButton>
                </Box>
                <Collapse in={expanded[index]}>
                  <Typography
                    variant="body1"
                    fontSize={15}
                    paddingLeft={2}
                    paddingTop={1}
                    sx={{
                      color: Theme.palette.text.green,
                      fontSize: {
                        xs: "12px",
                        sm: "12px",
                        md: "15px",
                        lg: "15px",
                      },
                    }}
                  >
                    {faq.answer}
                  </Typography>
                </Collapse>
              </Box>
            ))}
          </Box>
        </Stack>
      </Box>

      <Footer />
    </ThemeProvider>
  );
}
