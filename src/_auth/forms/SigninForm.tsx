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
import { SigninValidation } from "@/lib/validation"
import Loader from "@/components/ui/Loader"
import { Link } from "react-router-dom"
import {  useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"


const SigninForm = () => {
  const { toast } = useToast()
  
    const navigate = useNavigate()
    const {checkAuthUser, isLoading: isUserLoading} = useUserContext()
    const {mutateAsync: signInAccount, isPending } = useSignInAccount()

    const form = useForm<z.infer<typeof SigninValidation>>({
        resolver: zodResolver(SigninValidation),
        defaultValues: {
          email: "",
          password:"",
        },
      });

     
      // 2. Define a submit handler.
      const handleSignin  = async (user: z.infer<typeof SigninValidation>) => {
        console.log("we are here")

        const session = await signInAccount({
          email: user.email,
          password: user.password,
        })
        console.log({session})
        if(!session){
          console.log("i amiin")
          toast({
            title: "Login failed. line 62 Please try again.",
          })
          return;
        }


        const isLoggedIn = await checkAuthUser();
        console.log({isLoggedIn})
        if(isLoggedIn){
          form.reset()
          navigate('/');
        }
        else{
          toast({
            title: "Login failed. line 75 Please try again."
          })
          return;
        }
      
      

      }
  return (
    <Form {...form}>
        <div className="sm:w-420 flex-center flex-col">
            <div className="flex items-center space-x-2 ">
            <div className="overflow-hidden rounded-3xl w-10 h-10">
        <img src="assets/images/jiik.png" alt="Logo" className="object-cover w-full h-full"/>
    </div>              <span className="text-3xl font-serif font-bold">LinkUp</span>
            </div>
            <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Log in to your account</h2>
            <p className="text-light-3 small-medium md-base-regular mt-2">Welcome back! Please enter your details</p>
            <form onSubmit={form.handleSubmit(handleSignin)} className="space-y-1 flex-col flex gap-3 w-full">
                
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
        { isPending || isUserLoading ? (<div className="flex-center gap-2"><Loader/> Loading...</div>):("Sign in")}
      </Button>
      
      <p className="text-small-regular text-light-2 text-center mt-2">Don&apos;t have an Account? <Link to="/sign-up" className="text-primary-500 text-small-semibold ml-1">Sign up </Link></p>

    </form>
        </div>
    
  </Form>
  )
}

export default SigninForm
