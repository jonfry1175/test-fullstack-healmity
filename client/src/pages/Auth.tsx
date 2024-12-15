import React, { useState } from "react";
import Button from "@/components/ui/button/Button";
import {
  Card,
  CardHeader,
  CardFooter,
  CardContent,
  CardTitle,
} from "@/components/ui/Card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/Label";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { useToast } from "@/hooks/useToast";
import Dropdown from "@/components/ui/Dropdown";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  timePreference: z.string().nonempty({
    message: "Time preference is required.",
  }),
});

const Auth: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [timezones, setTimezones] = useState([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      timePreference: "Asia/Jakarta",
    },
  });

  const handleOpenDropdown = () => {
    // Mendapatkan daftar timezone menggunakan Intl
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let tzList = (Intl as any).supportedValuesOf("timeZone");
    setTimezones(tzList);
    console.log("time", timezones);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    if (pathname === "/register") {
      console.log("register");
      toast({ description: "Registered successfully" });
    } else if (pathname === "/login") {
      toast({ description: "Logged in successfully" });
      console.log("login cuuy");
    }
    navigate("/");
  };

  return (
    <>
      <Header />
      <div className="flex justify-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>
              {pathname === "/register" ? "Register" : "Login"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8 font-bold"
                >
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="ekmas" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="timePreference"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time Preference, {field.value}</FormLabel>
                        <FormControl>
                          <Dropdown
                            items={timezones}
                            text={field.value}
                            handleOpen={handleOpenDropdown}
                            onSelect={(value) => {
                              console.log("selected", value);
                              form.setValue("timePreference", value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button className="flex justify-end" type="submit">
                    {pathname === "/register" ? "Register" : "Login"}
                  </Button>
                </form>
              </Form>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            {pathname === "/register" && (
              <Label>
                Already have an account?{" "}
                <Link className="text-darkText" to={"/login"}>
                  Login
                </Link>
              </Label>
            )}
            {pathname === "/login" && (
              <Label>
                Dont have an account?{" "}
                <Link className="text-darkText" to={"/register"}>
                  Register
                </Link>
              </Label>
            )}
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Auth;
