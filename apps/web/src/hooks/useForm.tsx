// Write useForm hooker handle form data and submit

import { FormEvent, useCallback, useState } from "react";
import { type ZodSchema } from "zod";

//
export const useForm = <T extends object>({
  schema,
}: {
  schema: ZodSchema<T>;
}) => {
  const [errorState, setErrorState] = useState<string | undefined>();
  const handleSubmit = useCallback(
    (onSubmit: (f: any) => void) => (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // if (!isFilesValid) return;
      const formData = new FormData(e.currentTarget);
      const json = Object.fromEntries(formData.entries());

      const parsed = schema.safeParse(json);

      if (parsed.error) {
        // Set only the first error
        setErrorState(parsed.error.errors[0]?.message);
        return;
      }

      setErrorState(undefined);

      onSubmit(parsed.data);
    },
    [schema, setErrorState]
  );

  return {
    handleSubmit,
    error: errorState,
  };
};
