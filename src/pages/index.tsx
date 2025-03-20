import Head from 'next/head';
import useSWR from 'swr';
import { Box } from '@mui/material';
import UserTable from '../components/userTable';
import LoadingSkeleton from '../skeleton/loadingSkeleton';

export type Customer = {
  firstName: string;
  lastName: string;
  email: string;
  businessName?: string;
};

export type Customers = Customer[];

export type ApiError = {
  code: string;
  message: string;
};

const Home = () => {
  // SWR is a great library for geting data, but is not really a solution
  // for POST requests. You'll want to use either another library or
  // the Fetch API for adding new customers.
  const fetcher = async (url: string) => {
    const response = await fetch(url);
    const body = await response.json();
    if (!response.ok) throw body;
    return body;
  };
  const { data, error, isLoading } = useSWR<Customers, ApiError>(
    '/api/customers',
    fetcher
  );

  return (
    <>
      <Head>
        <title>Dwolla | Customers</title>
      </Head>
      <main>
        <Box>
          {isLoading && <LoadingSkeleton />}
          {error && <p>Error: {error.message}</p>}
          {data && <UserTable data={data} />}
        </Box>
      </main>
    </>
  );
};

export default Home;
