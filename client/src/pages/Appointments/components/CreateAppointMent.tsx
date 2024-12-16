import React, { useContext } from "react";
import Modal from "@/components/ui/Modal";
import { AppointmentsContext } from "@/context/AppointmentsContext";
import Button from "@/components/ui/button/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  name: z.string().nonempty().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  preferred_timezone: z.string().nonempty({
    message: "Time preference is required.",
  }),
});

const CreateAppointMent: React.FC = () => {
  const { visibleModalCreate, setVisibleModalCreate } =
    useContext(AppointmentsContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      preferred_timezone: "Asia/Jakarta",
      name: "",
    },
  });
  return (
    <div>
      <Modal
        active={visibleModalCreate}
        setActive={() => setVisibleModalCreate(false)}
      >
        <div className="flex justify-center">
          <Card className="w-[400px]">
            <CardHeader>
              <CardTitle>Create Appointment</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Form {...form}>
                  <form className="space-y-8 font-bold">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="jonfry118" {...field} />
                          </FormControl>
                          <FormDescription>Must be unique.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-between">
                      <Button onClick={() => setVisibleModalCreate(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Submit</Button>
                    </div>
                  </form>
                </Form>
              </div>
            </CardContent>
          </Card>
        </div>
      </Modal>
    </div>
  );
};

export default CreateAppointMent;
