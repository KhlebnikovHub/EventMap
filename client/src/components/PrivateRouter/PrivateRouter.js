import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";

function PrivateRoute({ children, ...rest }) {
  let auth = useSelector(state => state.currentuser);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/Auth",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute
