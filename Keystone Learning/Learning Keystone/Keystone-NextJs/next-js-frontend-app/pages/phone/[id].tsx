import React from 'react';
import { gql } from "@apollo/client";
import client from "../../helpers/apollo-client";
import Link from "next/link";
import { DocumentRenderer } from '@keystone-6/document-renderer';


interface PhoneDataProps {
  data: {
    name: string,
    document: {
      document: string
    }
  }
}

const PhoneData = ({ data }: PhoneDataProps) => {
  return (
    <>
    <h1>Phone name: {data.name}</h1>
      <h2>Description:</h2>
      {/* <DocumentRenderer document={data.document.document} /> */}
    </>
  )
}

  interface Phone {
    id: string;
    // Add more properties as needed
  }


//get list of all phones..
export async function getStaticPaths() {
    const { data } = await client.query({
      query: gql`
        query {
          phones {
            id
          }
        }
      `,
    });
  
    const paths = data.phones.map((item : Phone) => ({
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


  //fetch just one phone... you're doing it right
export async function getStaticProps({ params }: { params: Params }) {
    const { id } = params;
    const { data } = await client.query({
      query: gql`
        query phone($id: ID!) {
          phone(where: { id: $id }) {
            name
            id
            document {
              document
            }
          }
        }
      `,
      variables: { id },
    });
    return {
      props: {
        data: data.phone,
      },
    };
  }

export default PhoneData;