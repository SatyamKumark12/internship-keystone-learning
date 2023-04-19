import React from 'react';
import { gql } from "@apollo/client";
import client from "../../helpers/apollo-client";
import Link from "next/link";

interface MyData {
    id: number;
    name: string;
    // Add more properties as needed
  }

const PhoneList = ({ data }: { data: MyData[] }) => {
  return (
   <>
    <h1> List of phones</h1>
      {data.map((item) => (
        <p key={item.id}>
          <Link href={`/phone/${item.id}`} className='text-3xl'>
           {item.name}
          </Link>
        </p>
      ))}
   </>
  )
}

interface Company {
    id: string;
    // Add more properties as needed
  }
  
  export async function getStaticPaths() {
    const { data } = await client.query({
      query: gql`
        query {
          companies {
            id
          }
        }
      `,
    });
  
    const paths = data.companies.map((item: Company) => ({ // Fix here: use "Company" type instead of "any"
      params: {
        id: item.id,
      },
    }));
  
    return { paths, fallback: false };
  }

  interface Params {
    id: string;
    // Add more properties as needed
  }

  //fetch just one company... you're doing it right
export async function getStaticProps({ params }: { params: Params }) {
    const { id } = params;
    const { data } = await client.query({
      query: gql`
        query company($id: ID!) {
          company(where: { id: $id }) {
            phone {
              name
              id
            }
          }
        } 
      `,
      variables: { id },
    });
    return {
      props: {
        data: data.company.phone,
      },
    };
  }

  
  

export default PhoneList;