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
import userServices, { DropdownOption } from "@/service/userService";
import { useToast } from "@/hooks/useToast";
import AppointmentServices from "@/service/appointmentServices";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),

  withName: z.string().nonempty({
    message: "Time preference is required.",
  }),
  end: z.date().refine((value) => value !== null || value !== undefined, {
    message: "end is required.",
  }),
  start: z.date().refine((value) => value !== null || value !== undefined, {
    message: "start is required.",
  }),
  with_user_id: z.number().min(1, {
    message: "with_user_id is required.",
  }),
});

const CreateAppointMent: React.FC<{ handleRefetchTable: () => void }> = ({
  handleRefetchTable,
}) => {
  const { toast } = useToast();
  const { visibleModalCreate, setVisibleModalCreate } =
    useContext(AppointmentsContext);

  const [startDate, setStartDate] = React.useState<Date>();
  const [endDate, setEndDate] = React.useState<Date>();
  const [dropdownOptions, setDropdownOptions] = React.useState<
    DropdownOption[]
  >([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      withName: "",
    },
  });

  useEffect(() => {
    form.setValue("start", endDate as Date);
    form.setValue("end", startDate as Date);
  }, [startDate, endDate, form]);

  const handleSelectDropdown = useCallback(
    (value: string) => {
      console.log("selected", value);
      form.setValue("withName", value);

      const dropdownByUsername = dropdownOptions.find(
        (item) => item.username === form.getValues("withName")
      );
      if (dropdownByUsername) {
        form.setValue("with_user_id", dropdownByUsername.id);
        console.log("with_user_id", form.getValues("with_user_id"));
      }
    },
    [form, dropdownOptions]
  );

  const handleOpenDropdown = async () => {
    try {
      const { data } = await userServices.getDropdownOptions();
      setDropdownOptions(data.data);
    } catch (error) {
      console.error(error);
      toast({ description: "Failed to get dropdown options" });
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    await AppointmentServices.createAppointMent(values);
    toast({ description: "Successfully create appointment" });
    handleRefetchTable();
    setTimeout(() => {
      handleCloseModal();
    }, 500);
    try {
    } catch (error) {
      console.error(error);
      toast({ description: "Failed to create appointment" });
    }
  };

  const handleCloseModal = () => {
    setVisibleModalCreate(false);
    setEndDate(undefined);
    setStartDate(undefined);
    form.reset();
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
                      name="withName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>withName</FormLabel>
                          <FormControl>
                            <Dropdown
                              items={dropdownOptions.map(
                                (item) => item.username
                              )}
                              text={field.value}
                              handleOpen={handleOpenDropdown}
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
                      <Button onClick={handleCloseModal}>Cancel</Button>
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
