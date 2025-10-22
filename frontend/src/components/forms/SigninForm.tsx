import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type SigninSchemaType, signinSchema } from "@/schemas/signinSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound, LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";

const SigninForm = () => {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = (data: SigninSchemaType) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="my-2"></div>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-6 w-full">
          <KeyRound />
          {false && <LoaderCircle className="animate-spin" />}
          Sign in
        </Button>
      </form>
    </Form>
  );
};
export default SigninForm;
