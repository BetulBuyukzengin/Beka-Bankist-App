import { supabase } from "../Supabase/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

async function signIn(credentials) {
  let { data, error } = await supabase.auth.signInWithPassword(credentials);
  if (error) throw new Error(error.message);
  return data;
}

export function useSignIn() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: ({ email, password }) => signIn({ email, password }),
    onSuccess: (user) => {
      toast.success("Sign in successful");
      // navigate("/applayout");
      queryClient.setQueryData(["user", user.user]);
      navigate("/applayout/accounts", { replace: true });
    },
    onError: () => {
      toast.error("Sign in failed");
    },
  });
  return { mutateAsync, isLoading };
}

async function logout() {
  let { error } = await supabase.auth.signOut();
  if (error) throw new Error("Logout failed");
}
export function useLogout() {
  const navigate = useNavigate();
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("Logout successful");
      navigate("/signIn");
    },
    onError: () => {
      toast.error("Logout failed");
    },
  });
  return { mutateAsync, isLoading };
}

async function getCurrentUser() {
  // get user token from locale storage with getSession()
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return;
  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data?.user;
}

export function useUser() {
  const { data: user, isLoading } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ["user"],
  });
  return { isLoading, user, isAuthenticated: user?.role === "authenticated" };
}

async function signUp(data) {
  const { data: user, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        fullName: data.fullName,
      },
    },
  });
  if (error) throw new Error(error.message);
  if (user) await signIn({ email: data.email, password: data.password });
  return user;
}

export function useSignUp() {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: signUp,
    onSuccess: (user) => {
      toast.success("Successfully sign up ");
      user && navigate("/applayout");
    },
    onError: (error) => {
      error.message;
      toast.error("Failed sign up ");
    },
  });
  return { mutate, isLoading };
}
