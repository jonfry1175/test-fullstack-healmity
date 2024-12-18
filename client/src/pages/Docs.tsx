import React from "react";
import login from "../assets/login.png";
import table from "../assets/table.png";
import register from "../assets/register.png";
import createAppointment from "../assets/createApppointment.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/Card";
import ImageCard from "@/components/ui/ImageCard";
import Header from "@/components/Header";

type Data = {
  title: string;
  description: string;
  image: string;
};

const data: Data[] = [
  {
    title: "Register Page",
    description:
      "Includes fields for username (unique), name, and timezone. Timezone options are retrieved using Intl.supportedValuesOf('timeZone').",
    image: register,
  },
  {
    title: "Login Page",
    description:
      "Includes a username field (unique). If the username does not exist, a toast error notification will be displayed.",
    image: login,
  },
  {
    title: "Home Page",
    description:
      "Features a table to display appointments. The table updates dynamically when a new appointment is created.",
    image: table,
  },
  {
    title: "Create Appointment Modal",
    description:
      "Includes a form for creating an appointment with fields for title, withName, start, and end. The withName dropdown options are fetched from an API and display users with the same timezone (selected during registration). Upon submitting, the data is sent to the API, and the appointment table is refreshed.",
    image: createAppointment,
  },
];

const Docs: React.FC = () => {
  return (
    <div className="container mx-auto">
      <Header isLoggedIn={false} />
      {data.map((item, index) => (
        <ul key={index}>
          <Card key={index}>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
            <CardContent>
              <ImageCard imageUrl={item.image} caption="" />
            </CardContent>
          </Card>
        </ul>
      ))}
    </div>
  );
};

export default Docs;
