import { Card } from "@/components/ui/card";
import SigninForm from "@/components/forms/SigninForm";

const Signin = () => {
  return (
    <div className="h-full flex justify-center items-center">
      <Card className="p-8 min-w-[25rem]">
        <h1 className="text-3xl font-medium text-center">Signin</h1>
        <SigninForm />
        <p className="m-0">forgot my password or register</p>
      </Card>
    </div>
  );
};
export default Signin;
