import { Card, CardContent, CardHeader } from "@/components/ui/card";
import SigninForm from "@/components/forms/SigninForm";
import { Link } from "react-router-dom";

const Signin = () => {
  return (
    <div className="h-full flex justify-center items-center">
      <Card className="min-w-[25rem]">
        <CardHeader>
          <h1 className="text-3xl font-medium text-center">Signin</h1>
        </CardHeader>
        <CardContent>
          <SigninForm />
          <div className="text-center mt-4">
            <p className="text-sm">
              Forgot your password?{" "}
              <Link to="/reset-password" className="text-blue-600 underline">
                Reset it.
              </Link>
            </p>
            <p className="text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 underline">
                Register now.
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default Signin;
