import ToastComponent, { ToastProps } from '../components/ToastComponent';

const ToastConfig = {
  success: (props: ToastProps) => <ToastComponent {...props} />,
};

export default ToastConfig;
