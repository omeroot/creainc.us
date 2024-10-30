import toast from "react-hot-toast";

type ToasterProps = {
  message: string;

  // show duration in ms
  duration?: number;
};

export const showErrorToast = ({ message, duration = 5000 }: ToasterProps) => {
  toast.error(message, {
    style: {
      backgroundColor: "var(--color-red-50)",
      padding: "1rem",
      border: "1px solid var(--color-red-200)",
      fontSize: "1rem",
      color: "var(--color-red-800)",
    },
    duration,
  });
};

export const showSuccessToast = ({
  message,
  duration = 2000,
}: ToasterProps) => {
  toast.success(message, {
    style: {
      padding: "1rem",
      border: "1px solid green",
      fontSize: "1rem",
      color: "#171717",
    },
    duration,
  });
};
