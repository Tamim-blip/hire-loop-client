import { toast } from "@/components/ui/toast";

/** Show a success toast using the shadcn (Base UI) toast manager. */
export function toastSuccess(title: string, description?: string) {
  toast.add({ type: "success", title, description });
}

/** Show an error toast using the shadcn (Base UI) toast manager. */
export function toastError(title: string, description?: string) {
  toast.add({ type: "error", title, description, priority: "high" });
}
