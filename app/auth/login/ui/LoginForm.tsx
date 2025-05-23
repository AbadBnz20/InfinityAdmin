"use client";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import { useState } from "react";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
import { FormMessage, Message } from "./form-message";
import { Turnstile } from "@marsidev/react-turnstile";
import { useTheme } from "next-themes";

interface Props {
  searchParams: Message;
}

export const LoginForm = ({ searchParams }: Props) => {
  const [selected, setSelected] = useState<string | number | null>("login");
  const [captchaToken, setCaptchaToken] = useState("");
  const { theme } = useTheme();
  const image = theme === 'dark' ? "https://res.cloudinary.com/devz7obre/image/upload/v1742005463/ACT_350X55px-04_b5dqrf.png" : "https://res.cloudinary.com/devz7obre/image/upload/v1742005463/ACT_350X55px-02_2_f9gxig.png"
  // const site = "29125b28-4758-4a6e-9c02-1334e26a77da";
  const site = "0x4AAAAAABAG3GMy0bEbQ6Da";

  return (
    <div className="w-full max-w-md m-auto p-6">
      <div className="my-3 text-center flex justify-center items-center flex-col">
        <img
          src={image}
          alt="Infinity Luxury Travel Logo"
          className="h-20"
        />
        <p className="text-4xl font-semibold">Dashboard</p>
        <p className="text-small font-light">Ingrese credenciales</p>
      </div>

      <div className="flex flex-col w-full">
        <Card className="max-w-full w-[440px]">
          <CardBody className="overflow-hidden">
            <Tabs
              fullWidth
              size="md"
              aria-label="Tabs form"
              selectedKey={selected}
              onSelectionChange={setSelected}
            >
              <Tab key="login" title="Email">
                <SignIn captchaToken={captchaToken} />
              </Tab>
              <Tab key="sign-up" title="Phone">
                <SignUp captchaToken={captchaToken} />
              </Tab>
            </Tabs>
            <div className="flex justify-center items-center">
              <Turnstile
                siteKey={site}
                onSuccess={(token) => {
                  setCaptchaToken(token);
                }}
              />
            </div>
          </CardBody>
        </Card>
      </div>
      <FormMessage message={searchParams} />
    </div>
  );
};
