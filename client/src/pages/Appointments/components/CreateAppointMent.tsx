import React, { useCallback, useContext, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import { AppointmentsContext } from "@/context/AppointmentsContext";
import Button from "@/components/ui/button/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Dropdown from "@/components/ui/Dropdown";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { PopoverContent } from "@/components/ui/Popover";
import { Calendar } from "@/components/ui/Calendar";
import { cn } from "@/lib/neoBrutalism";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),

  participant: z.string().nonempty({
    message: "Time preference is required.",
  }),
  end: z.date().refine((value) => value !== null || value !== undefined, {
    message: "end is required.",
  }),
  start: z.date().refine((value) => value !== null || value !== undefined, {
    message: "start is required.",
  }),
});

const CreateAppointMent: React.FC = () => {
  const { visibleModalCreate, setVisibleModalCreate } =
    useContext(AppointmentsContext);

  const [startDate, setStartDate] = React.useState<Date>();
  const [endDate, setEndDate] = React.useState<Date>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      participant: "",
    },
  });

  useEffect(() => {
    form.setValue("start", endDate as Date);
    form.setValue("end", startDate as Date);
  }, [startDate, endDate, form]);

  const handleSelectDropdown = useCallback(
    (value: string) => {
      console.log("selected", value);
      form.setValue("participant", value);
    },
    [form]
  );

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
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
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 font-bold"
                  >
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="participant"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Participant</FormLabel>
                          <FormControl>
                            <Dropdown
                              items={["dummy1", "dummy2", "dummy3"]}
                              text={field.value}
                              handleOpen={() => console.log("open")}
                              onSelect={handleSelectDropdown}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="start"
                      render={() => (
                        <FormItem>
                          <FormLabel>Start</FormLabel>
                          <br />
                          <FormControl>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="noShadow"
                                  className={cn(
                                    "w-[280px] justify-start text-left font-base",
                                    !startDate && "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4 text-text" />
                                  {startDate ? (
                                    format(startDate, "PPP")
                                  ) : (
                                    <span className="text-text">
                                      Pick a date
                                    </span>
                                  )}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto !border-0 p-0">
                                <Calendar
                                  mode="single"
                                  selected={startDate}
                                  onSelect={setStartDate}
                                  autoFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="end"
                      render={() => (
                        <FormItem>
                          <FormLabel>End</FormLabel>
                          <br />
                          <FormControl>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="noShadow"
                                  className={cn(
                                    "w-[280px] justify-start text-left font-base",
                                    !endDate && "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4 text-text" />
                                  {endDate ? (
                                    format(endDate, "PPP")
                                  ) : (
                                    <span className="text-text">
                                      Pick a date
                                    </span>
                                  )}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto !border-0 p-0">
                                <Calendar
                                  mode="single"
                                  selected={endDate}
                                  onSelect={setEndDate}
                                  autoFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-between">
                      <Button
                        onClick={() => {
                          setVisibleModalCreate(false);
                          setEndDate(undefined);
                          setStartDate(undefined);
                          form.reset();
                        }}
                      >
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
