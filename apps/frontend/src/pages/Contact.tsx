import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

/* =========================
   EMAILJS CONFIG (HOSTINGER)
   ========================= */
const EMAILJS_SERVICE_ID = "service_zyj7vpf";
const EMAILJS_ADMIN_TEMPLATE_ID = "template_ln3k5x9";
const EMAILJS_USER_TEMPLATE_ID = "template_085tqv5";
const EMAILJS_PUBLIC_KEY = "lTPr4XZmF7eu3yn2T";

/* ========================= */

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address").max(255),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "prasulabs@gmail.com",
    href: "mailto:prasulabs@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 87880 69300",
    href: "tel:+918788069300",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "A 702, Ruturang Society Phase 1, Aranyeshwar Road, Pune 411009",
    href: null,
  },
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      // Admin email
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_ADMIN_TEMPLATE_ID,
        {
          name: data.name,
          email: data.email,
          message: data.message,
          to_email: "prasulabs@gmail.com",
        },
        EMAILJS_PUBLIC_KEY
      );

      // User auto-reply
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_USER_TEMPLATE_ID,
        {
          name: data.name,
          email: data.email,
          message: data.message,
          to_email: data.email,
        },
        EMAILJS_PUBLIC_KEY
      );

      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });

      reset();
    } catch (error) {
      console.error("Email error:", error);
      toast({
        title: "Failed to send message",
        description: "Please try again later.",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <Layout>
      <section className="bg-gradient-hero py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl lg:text-4xl font-display font-bold text-primary-foreground mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-primary-foreground/80">
            Have questions? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12">
          <div className="bg-card rounded-xl border p-8">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label>Your Name</Label>
                <Input {...register("name")} />
                {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
              </div>

              <div>
                <Label>Email</Label>
                <Input type="email" {...register("email")} />
                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
              </div>

              <div>
                <Label>Message</Label>
                <Textarea rows={5} {...register("message")} />
                {errors.message && (
                  <p className="text-sm text-destructive">{errors.message.message}</p>
                )}
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? <Loader2 className="animate-spin" /> : <Send />}
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <div className="space-y-6">
              {contactInfo.map((info) => (
                <div key={info.label} className="flex gap-4">
                  <info.icon />
                  {info.href ? <a href={info.href}>{info.value}</a> : <p>{info.value}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
