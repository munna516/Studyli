"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import toast from "react-hot-toast";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.address ||
      !form.message
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    // You can add form submission logic here
    toast.success("Message sent!");
    setForm({ name: "", email: "", phone: "", address: "", message: "" });
  };

  return (
    <div className="mt-32 mb-12 ">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-500">
        Contact Us
      </h1>
      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="flex flex-col items-center py-8 bg-blue-50 shadow-md cursor-pointer hover:bg-blue-100">
          <CardHeader className="flex flex-col items-center pb-2">
            <Mail className="w-10 h-10 text-blue-600 mb-2" />
            <CardTitle className="text-lg text-blue-700">Email</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-gray-700">
            studyli@gmail.com
          </CardContent>
        </Card>
        <Card className="flex flex-col items-center py-8 bg-blue-50 shadow-md cursor-pointer hover:bg-blue-100">
          <CardHeader className="flex flex-col items-center pb-2">
            <Phone className="w-10 h-10 text-blue-600 mb-2" />
            <CardTitle className="text-lg text-blue-700">Phone</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-gray-700">
            01717171717
          </CardContent>
        </Card>
        <Card className="flex flex-col items-center py-8 bg-blue-50 shadow-md cursor-pointer hover:bg-blue-100">
          <CardHeader className="flex flex-col items-center pb-2">
            <MapPin className="w-10 h-10 text-blue-600 mb-2" />
            <CardTitle className="text-lg text-blue-700">Address</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-gray-700">
            Dhaka, Bangladesh
          </CardContent>
        </Card>
      </div>
      {/* Contact Form */}
      <div className=" mx-auto bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-6 text-blue-600 text-center">
          Send us a message
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
            <Input
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              required
            />
          </div>
          <Textarea
            name="message"
            placeholder="Message"
            value={form.message}
            onChange={handleChange}
            rows={5}
            required
          />
          <div className="flex justify-end">
            <Button type="submit" variant="primary" className="px-8">
              Send
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
