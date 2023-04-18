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
    <h1>List of all phones</h1>
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

export async function getStaticProps() {
    const { data } = await client.query({
      query: gql`
      query Query {
        phones {
          id
          name
        }
      }
      `,
    });
  
    return {
      props: {
        data: data.phones,
      },
    };
  }

export default index;