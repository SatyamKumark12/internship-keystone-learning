import { useState } from 'react';
import { gql , useMutation } from "@apollo/client";
import { useRouter } from 'next/router';

 export const CREATE_USER = gql`
  mutation CreateUser($data: UserCreateInput!) {
    createUser(data: $data) {
      name
      email
      password {
        isSet
      }
    }
  }
`;

const Signup = () => {
  const [createUser, { loading, error, data }] = useMutation(CREATE_USER);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  if(loading) return <h1>Loading</h1>

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const result = await createUser({
        variables: { data: { name, email, password } },
      });
      
      console.log(result.data);

      if (result.data.createUser) {
        router.push('/login');
      }

    } catch (e) {
      console.error(e);
    }
  };
  
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md">

      {
            error && 
            <div className="bg-red-600"><h1>{error.message}</h1></div>
      }

      {
           data && data.createUser && 
           <div className='bg-blue-500'><h1>{data.createUser.name} is Signedup . You can login now</h1></div>
      }


        <h2 className="text-lg font-medium text-gray-900 mb-4">Sign up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                Sign up
            </button>
            </div>
            </form>
            </div>
            </div>
            );
            };


          export default Signup;
