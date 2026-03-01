export const dynamic = 'force-dynamic';
import { unstable_noStore } from 'next/cache';

import { query } from "../lib/db";
import Radio from "./Radio";

//SSR Server Side Rendering
export default async function page(){
      unstable_noStore(); // disables caching for this request

      const stations=await query(`select * from radio where approved='y' order by priority`);
        
        return  <Radio stations={stations}/>
}

// SSG Static Site Generation
// import { cache } from "react";
// import { query } from "@/lib/db";

// export const getStations = cache(async () => {
//   return await query(
//     `select * from radio where approved='y' order by priority`
//   );
// });
