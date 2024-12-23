"use client";

import { useEffect, useState } from "react";

import { ThemeProvider } from "@emotion/react";
import theme from "@/theme/theme";
import MainColumnHeader from "@/components/MainColumnHeader";
import { Stepper, Step, StepLabel, Box, Button } from "@mui/material";

import { useUserContext } from "@/context/UserContext";

import Step0 from "./Step0";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

const page = () => {
  const [activeStep, setActiveStep] = useState(0);

  const pageContent = [<Step0 />, <Step1 />, <Step2 />, <Step3 />];

  const nextStep = () => {
    setActiveStep(
      activeStep + 1 == 1 ? 2 : Math.min(activeStep + 1, pageContent.length - 1)
    );
  };

  const prevStep = () => {
    setActiveStep(activeStep - 1 == 1 ? 0 : Math.max(activeStep - 1, 0));
  };

  return (
    <ThemeProvider theme={theme}>
      <MainColumnHeader>
        <h3 className="font-bold tracking-wider">購入確認</h3>
      </MainColumnHeader>
      <Box sx={{ py: 4 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          <Step>
            <StepLabel>カート確認</StepLabel>
          </Step>
          <Step>
            <StepLabel
              optional={<span className="text-sm">(スキップされます)</span>}
            >
              お支払方法確認
            </StepLabel>
          </Step>
          <Step>
            <StepLabel>購入確認</StepLabel>
          </Step>
          <Step>
            <StepLabel>購入完了</StepLabel>
          </Step>
        </Stepper>
        <Box sx={{ mx: 4, px: 4, py: 2 }}>
          {pageContent[activeStep]}
          <Box
            sx={{
              display: "flex",
              justifyContent:
                activeStep === pageContent.length - 1
                  ? "center"
                  : "space-between",
            }}
          >
            {activeStep === pageContent.length - 1 ? (
              <Button variant="contained" color="primary" href="/">
                トップへ
              </Button>
            ) : (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={prevStep}
                  disabled={activeStep === 0}
                >
                  戻る
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={nextStep}
                  disabled={activeStep === 3}
                >
                  次へ
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default page;
