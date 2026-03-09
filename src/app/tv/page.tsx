export const dynamic = 'force-dynamic';
import { unstable_noStore } from 'next/cache';

import { query, querytv } from "../lib/db";
import Television from './Television';

//SSR Server Side Rendering

export default async function page(){
      unstable_noStore(); // disables caching for this request
      const channels=await querytv(`select * from tv where approved='y'`);
      return  <Television channels={channels}/>
}

// SSG Static Site Generation
// import { cache } from "react";
// import { query } from "@/lib/db";

// export const getStations = cache(async () => {
//   return await query(
//     `select * from radio where approved='y' order by priority`
//   );
// });
