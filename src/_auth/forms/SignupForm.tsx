import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useNavigate } from "react-router-dom"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {useForm} from 'react-hook-form'
import { SignupValidation } from "@/lib/validation"
import Loader from "@/components/ui/Loader"
import { Link } from "react-router-dom"
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"
const formSchema = z.object({
  username: z.string().min(2).max(50),
})

const SignupForm = () => {
  const { toast } = useToast()
  const {checkAuthUser, isLoading: isUserLoading} = useUserContext()
    const navigate = useNavigate()

    
    const form = useForm<z.infer<typeof SignupValidation>>({
        resolver: zodResolver(SignupValidation),
        defaultValues: {
          name:"",
          username: "",
          email: "",
          password:"",
        },
      });

      const {mutateAsync: createUserAccount, isPending: isCreatingUser} = useCreateUserAccount();
      const {mutateAsync: signInAccount, isPending: isSigningInUser } = useSignInAccount()
     
      // 2. Define a submit handler.
      const handleSignup  = async (user: z.infer<typeof SignupValidation>) => {
        try {
          const newUser = await createUserAccount(user);
        if(!newUser){
          toast({
            title: "Sign up failed. Please try again.",
          })
          return;
        }

        const session = await signInAccount(
          {email: user.email,
          password: user.password,}
        )

        if(!session){
          toast({
            title: "Sign in failed. line 62 Please try again.",
          })
          navigate('/sign-in')
          return
        }


        const isLoggedIn = await checkAuthUser();
        if(isLoggedIn){
          form.reset()
          navigate('/');
        }
        else{
          toast({
            title: "Sign up failed. line 75 Please try again."
          })
          return;
        }
      }catch(error){
        console.log({error})
      }

      }
  return (
    <Form {...form}>
        <div className="sm:w-420 flex-center flex-col">
            <div className="flex items-center space-x-2 mt-5">
            <div className="overflow-hidden rounded-3xl w-10 h-10">
        <img src="assets/images/jiik.png" alt="Logo" className="object-cover w-full h-full"/>
    </div>              <span className="text-3xl font-serif font-bold">LinkUp</span>
            </div>
            <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create a new account</h2>
            <p className="text-light-3 small-medium md-base-regular mt-2">To use Linkup, please enter your details</p>
            <form onSubmit={form.handleSubmit(handleSignup)} className="space-y-1 flex-col flex gap-3 w-full">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                        <Input type="text" className="shad-input" {...field} />
                        </FormControl>
                        
                        <FormMessage />
                    </FormItem>
                    )}
      />
      <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                        <Input type="text" className="shad-input" {...field} />
                        </FormControl>
                        
                        <FormMessage />
                    </FormItem>
                    )}
      />
      <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                        <Input type="email" className="shad-input" {...field} />
                        </FormControl>
                        
                        <FormMessage />
                    </FormItem>
                    )}
      />
      <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                        <Input type="password" className="shad-input" {...field} />
                        </FormControl>
                        
                        <FormMessage />
                    </FormItem>
                    )}
      />
      <Button type="submit" className="shad-button_primary">
        {isCreatingUser ? (<div className="flex-center gap-2"><Loader/> Loading...</div>):("Sign up")}
      </Button>
      
      <p className="text-small-regular text-light-2 text-center mt-2">Already have an Accound? <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1">Log in </Link></p>

    </form>
        </div>
    
  </Form>
  )
}

export default SignupForm
