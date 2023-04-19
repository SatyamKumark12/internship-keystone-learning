import { useState } from "react"
import { gql , useMutation } from "@apollo/client";
import { useRouter } from 'next/router';

export const LOGIN_MUTATION = gql`
mutation Mutation($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        sessionToken
      }
    }
  }
`;

const LoginForm = () => {

  const router = useRouter();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loginUser, { error , loading , data }] = useMutation(LOGIN_MUTATION , {
    onCompleted(data){
        localStorage.setItem("token",data.authenticateUserWithPassword.sessionToken)
        router.push('/');
    }
  });

  if(loading) return <h1>Loading</h1>

  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // loginUser({
    //     variables:{
    //         email , password
    //     }
    // })

    try {
        const { data } = await loginUser({
          variables: { email, password },
        })
  
        localStorage.setItem('token', data.login.sessionToken)
        console.log(data);
        
        router.push('/')
      } catch (error) {
        console.error(error);
      }
    console.log({ email, password })
  }

  return (
    <>
    <div className="flex justify-center items-center h-screen">
    <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

        {
            error && 
            <div className="bg-red-600"><h1>{error.message}</h1></div>
        }
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-gray-700 font-bold mb-2"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Login
      </button>
    </form>

</div>
    </div>
    </>
  )
}

export default LoginForm;




// export default LoginForm;

// import { useState } from "react";
// import { gql, useMutation } from "@apollo/client";
// import { GetStaticProps, InferGetStaticPropsType } from "next";
// import router from "next/router";

// interface Props {
//   isLoggedIn: boolean;
// }

// export const LOGIN_MUTATION = gql`
//   mutation Mutation($email: String!, $password: String!) {
//     authenticateUserWithPassword(email: $email, password: $password) {
//       ... on UserAuthenticationWithPasswordSuccess {
//         sessionToken
//       }
//     }
//   }
// `;

// const LoginPage = ({
//   isLoggedIn,
// }: InferGetStaticPropsType<typeof getStaticProps>) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loginUser, { error, loading, data }] = useMutation(LOGIN_MUTATION);

//   if (loading) return <h1>Loading</h1>;

//   if (data) {
//     localStorage.setItem(
//       "token",
//       data.authenticateUserWithPassword.sessionToken
//     );
//     router.push("/");
//   }

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     loginUser({
//       variables: {
//         email,
//         password,
//       },
//     });
//     console.log({ email, password });
//   };

//   return (
//     <>
//       <div className="flex justify-center items-center h-screen">
//         <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
//           {error && (
//             <div className="bg-red-600 card-panel">{error.message}</div>
//           )}
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label
//                 htmlFor="email"
//                 className="block text-gray-700 font-bold mb-2"
//               >
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="mb-6">
//               <label
//                 htmlFor="password"
//                 className="block text-gray-700 font-bold mb-2"
//               >
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               Login
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export const getStaticProps: GetStaticProps<Props> = async () => {
//   return {
//     props: {
//       isLoggedIn: false,
//     },
//   };
// };

// export default LoginPage;

