import React from 'react';
import { gql } from "@apollo/client";
import client from "../../helpers/apollo-client";
import Link from "next/link";


interface MyData {
    id: number;
    name: string;
    // Add more properties as needed
  }



const index = ({ data }: { data: MyData[] }) => {
  return (
   <>
   <h1> List of all companies shown here.</h1>
      {data.map((item) => (
        <p key={item.id}>
          <Link href={`/company/${item.id}`} className='text-5xl mb-5'>
            {item.name}
          </Link>
        </p>
      ))}
   </>
  )
}

export async function getStaticProps() {
    const { data } = await client.query({
      query: gql`
        query Companies {
          companies {
            id
            name
            phone {
              name
            }
          }
        }
      `,
    });
  
    return {
      props: {
        data: data.companies, // Fix here: use "data.companies" instead of "data.allCompanies"
      },
    };
  }
  

export default index;