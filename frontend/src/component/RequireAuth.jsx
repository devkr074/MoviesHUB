import { Navigate, useLocation } from "react-router-dom";
function RequireAuth({ user, children }) {
  const location = useLocation();
  if (!user) {
    return (
      <Navigate to="/login" />
    );
  }
  return (
    children
  );
}
export default RequireAuth;