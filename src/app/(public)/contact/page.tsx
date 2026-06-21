"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, TextField, Label, Input, TextArea, FieldError, Button, Surface } from "@heroui/react";
import { Mail, MapPin, CheckCircle2 } from "lucide-react";
import { useSubmitContact } from "@/hooks/useContact";

const contactSchema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const submitContact = useSubmitContact();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({ resolver: zodResolver(contactSchema) });

  const onSubmit = (data: ContactForm) => {
    submitContact.mutate(data, {
      onSuccess: () => {
        setSubmitted(true);
        reset();
      },
    });
  };

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-foreground">Get in touch</h1>
        <p className="mt-2 text-foreground/70">Questions, product suggestions, or feedback — we read everything.</p>
      </div>

      <div className="mx-auto mt-10 grid max-w-3xl gap-8 md:grid-cols-[1fr_1.3fr]">
        <div className="space-y-4 text-sm text-foreground/70">
          <div className="flex items-start gap-3">
            <Mail size={18} className="mt-0.5 text-accent" />
            <div>
              <p className="font-medium text-foreground">Email</p>
              <a href="mailto:mellowm678@gmail.com" className="hover:text-accent">mellowm678@gmail.com</a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin size={18} className="mt-0.5 text-accent" />
            <div>
              <p className="font-medium text-foreground">Based in</p>
              <p>Chattogram, Bangladesh</p>
            </div>
          </div>
        </div>

        <Surface className="rounded-2xl p-6">
          {submitted ? (
            <div className="flex flex-col items-center gap-2 py-8 text-center">
              <CheckCircle2 className="text-success" size={28} />
              <p className="font-medium text-foreground">Message sent</p>
              <p className="text-sm text-foreground/60">We'll get back to you soon.</p>
            </div>
          ) : (
            <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <TextField isInvalid={!!errors.name}>
                <Label>Name</Label>
                <Input variant="secondary" placeholder="Jane Doe" {...register("name")} />
                {errors.name && <FieldError>{errors.name.message}</FieldError>}
              </TextField>

              <TextField isInvalid={!!errors.email}>
                <Label>Email</Label>
                <Input type="email" variant="secondary" placeholder="you@example.com" {...register("email")} />
                {errors.email && <FieldError>{errors.email.message}</FieldError>}
              </TextField>

              <TextField isInvalid={!!errors.message}>
                <Label>Message</Label>
                <TextArea variant="secondary" placeholder="How can we help?" rows={5} {...register("message")} />
                {errors.message && <FieldError>{errors.message.message}</FieldError>}
              </TextField>

              {submitContact.isError && <p className="text-sm text-danger">Something went wrong. Please try again.</p>}

              <Button type="submit" variant="primary" fullWidth isPending={submitContact.isPending}>
                Send Message
              </Button>
            </Form>
          )}
        </Surface>
      </div>
    </div>
  );
}