import { toast } from "react-toastify";

export function toastSuccess(ola, name, bemVindo) {
  toast.success(`${ola} ${name}${bemVindo}`, {
    position: "top-center",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
  });
}

export function toastSair(sair) {
  toast.success(`${sair}`, {
    position: "top-center",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
  });
}

export function toastError(msg, time) {
  toast.error(`${msg}`, {
    position: "bottom-center",
    autoClose: time || 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "colored",
    bodyClassName: "rounded-3xl",
  });
}
