import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient"; 
import { Session } from "@supabase/supabase-js";
import { useLocation, useNavigate } from "react-router-dom";

interface WithAuthenticationProps {
}

const withAuthentication = <P extends WithAuthenticationProps>(
  WrappedComponent: React.ComponentType<P>
) => {
  const WithAuthentication: React.FC<P> = (props) => {
    const [session, setSession] = useState<Session | null>(null);
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
      });

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });

      return (() => subscription.unsubscribe());
    }, []);

    if(!session && location.pathname !== '/') {
      navigate('/')
      return null
    }

    if(location.pathname == '/' && session) {
       navigate(-1)
       return null
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuthentication;
};

export default withAuthentication;
