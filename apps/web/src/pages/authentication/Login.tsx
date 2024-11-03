import { useCallback, useEffect } from "react";
import { showErrorToast } from "src/helper/toast";
import { useAuth } from "src/hooks/useAuth";
import { useForm } from "src/hooks/useForm";
import { LoginPostData, LoginRequestSchema } from "src/schema/auth/login";

export default function Login() {
  const auth = useAuth();

  const { handleSubmit, error } = useForm<LoginPostData>({
    schema: LoginRequestSchema,
  });

  const onSubmit = useCallback(
    (data: LoginPostData) => {
      auth.login(data, (error) => {
        if (error) {
          showErrorToast({ message: "Invalid email or password" });
        }
      });
    },
    [auth]
  );

  // alert error message is exist
  useEffect(() => {
    if (error) {
      showErrorToast({ message: error });
    }
  }, [error]);

  return (
    <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="./logo.svg"
          className="w-auto h-10 mx-auto"
        />
        <h2 className="mt-10 font-bold tracking-tight text-center text-gray-900 text-2xl/9">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          onSubmit={handleSubmit(onSubmit) as any}
          method="POST"
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="email"
              className="block font-medium text-gray-900 text-sm/6"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block font-medium text-gray-900 text-sm/6"
              >
                Password
              </label>
              {/* <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-blue-600 hover:text-blue-500"
                >
                  Forgot password?
                </a>
              </div> */}
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Sign in
            </button>
          </div>

          <div className="flex flex-col text-sm text-gray-600">
            <span>Email: user@creainc.com</span>
            <span>Password: user123</span>
          </div>
        </form>
      </div>
    </div>
  );
}
