import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { supabase } from "../Supabase/supabase";

async function signIn(credentials) {
  let { data, error } = await supabase.auth.signInWithPassword(credentials);
  if (error) throw new Error(error.message);
  return data;
}

export function useSignIn() {
  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: ({ email, password }) => signIn({ email, password }),
    onSuccess: () => {
      // toast.success("Sign in successful");

      queryClient.setQueryData(["user"]);
      // navigate("/applayout/account", { replace: true });
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
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // toast.success("Logout successful");
      navigate("/signIn");
      //! Use removeQueries to clear cache. So in every login accounts can be fetch again.
      queryClient.removeQueries("accounts");
      queryClient.removeQueries("users");
    },

    onError: () => {
      toast.error("Logout failed");
    },
  });
  return { mutateAsync, isLoading };
}

// active user
export async function getCurrentUser() {
  // get user token from locale storage with getSession()
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return;
  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data?.user;
}

//! Auth user
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

  if (user) {
    //! create users table
    await supabase.from("users").insert([
      {
        id: user.user.id,
        email: user.user.email,
        fullName: user.user.user_metadata.fullName,
      },
    ]);
    // await signIn({ email: data.email, password: data.password });
  }
  return { user, data };
}

export function useSignUp() {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: signUp,
    onSuccess: (returnedObject) => {
      signIn({
        email: returnedObject.data.email,
        password: returnedObject.data.password,
      });
      toast.success("Successfully sign up! ");
      returnedObject.user && navigate("/applayout/account");
      navigate("/applayout/settings", { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { mutate, isLoading };
}

async function getUsers() {
  let { data: users, error } = await supabase.from("users").select("*");
  if (error) throw new Error(error.message);
  return users;
}
export function useGetUsers() {
  const { data, isLoading } = useQuery({
    queryFn: getUsers,
    queryKey: ["users"],
  });
  return { data, isLoading };
}
async function updateUser(id, user) {
  const { data, error } = await supabase
    .from("users")
    .update(user)
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return data;
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ id, user }) => updateUser(id, user),
    // onError: () => toast.error("User could not be updated"),
    onError: (error) => toast.error(error.message),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      // queryClient.removeQueries("users");
      toast.success("Personal information updated successfully");
    },
  });
  return { mutateAsync, isPending };
}

async function uploadImg(file) {
  //! Firstly upload file
  const { error: uploadError } = await supabase.storage
    .from("UserImages")
    .upload(file.name, file);

  if (uploadError) throw new Error(uploadError.message);

  //! Secondly create signed URL
  const { data: signedUrlData, error: signedUrlError } = await supabase.storage
    .from("UserImages")
    .createSignedUrl(file.name, 60 * 60 * 24 * 365); // 1 saat geçerli olacak şekilde ayarla

  if (signedUrlError) throw new Error(signedUrlError.message);

  //! Update user's profile
  await supabase.auth.updateUser({
    data: {
      image: signedUrlData.signedUrl,
    },
  });

  //! URL to save on the user's profile
  return signedUrlData.signedUrl;
}

export function useUploadImg() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: uploadImg,
    mutationKey: ["upload"],
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      toast.success("User profile successfully updated");
    },
  });
  return { mutateAsync, isPending };
}
